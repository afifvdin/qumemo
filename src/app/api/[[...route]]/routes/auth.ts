import { createSession } from "@/db/sessions";
import { base64url, getCurrentSession, makePkce, saveCookie } from "@/lib/auth";
import {
  OAUTH_CALLBACK_URI,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_SCOPES,
  OAUTH_URI,
} from "@/lib/constant";
import { TokenInsert, Verifier } from "@/types/auth";
import { randomBytes } from "crypto";
import { Hono } from "hono";
import { deleteCookie, getCookie } from "hono/cookie";

export const authRoutes = new Hono();

authRoutes.get("/login", async (c) => {
  const currentSession = await getCurrentSession(c);
  if (currentSession) {
    return c.redirect("/");
  }

  const { codeVerifier, codeChallenge } = await makePkce();
  const state = base64url(randomBytes(16));
  const nonce = base64url(randomBytes(16));

  const verifier: Verifier = { v: codeVerifier, s: state, n: nonce };
  saveCookie(c, "oauth_temp", JSON.stringify(verifier), 10 * 60);

  const url = new URL("/oauth2/auth", OAUTH_URI);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", OAUTH_CLIENT_ID);
  url.searchParams.set("redirect_uri", OAUTH_CALLBACK_URI);
  url.searchParams.set("scope", OAUTH_SCOPES);
  url.searchParams.set("state", state);
  url.searchParams.set("nonce", nonce);
  url.searchParams.set("code_challenge", codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");

  return c.redirect(url.toString());
});

authRoutes.get("/callback", async (c) => {
  const url = new URL(c.req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    return c.redirect("/");
  }

  const currentSession = await getCurrentSession(c);
  if (currentSession) {
    return c.redirect("/");
  }

  const verifierCookie = getCookie(c, "oauth_temp");
  if (!verifierCookie || !verifierCookie) {
    throw new Error("Missing verifier");
  }

  const verifier: Verifier = JSON.parse(verifierCookie);
  if (state !== verifier.s) {
    throw new Error("State mismatch");
  }

  deleteCookie(c, "oauth_temp");

  const tokenUrl = new URL("/oauth2/token", OAUTH_URI).toString();

  const form = new URLSearchParams();
  form.set("grant_type", "client_credentials");
  form.set("code", code);
  form.set("scope", OAUTH_SCOPES!);
  form.set("redirect_uri", OAUTH_CALLBACK_URI!);
  form.set("code_verifier", verifier.v);

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  if (OAUTH_CLIENT_SECRET) {
    headers["Authorization"] = `Basic ${btoa(
      `${OAUTH_CLIENT_ID}:${OAUTH_CLIENT_SECRET}`,
    )}`;
  } else {
    form.set("client_id", OAUTH_CLIENT_ID!);
  }

  const date = new Date();

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers,
    body: form.toString(),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Token exchange failed: ${text}`);
  }

  const token: TokenInsert = await response.json();
  const session = await createSession(token, date);

  saveCookie(c, "session", session.id, token.expires_in - 30);

  return c.redirect("/", 302);
});
