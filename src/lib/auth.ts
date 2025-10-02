import { getSession } from "@/db/sessions";
import {
  COOKIE_MAX_AGE_DAY,
  IS_PROD,
  REFRESH_THRESHOLD_MINUTE,
} from "./constant";
import { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { cookies } from "next/headers";

export function base64url(buffer: ArrayBuffer | Uint8Array): string {
  let bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  return Buffer.from(bytes)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function makePkce() {
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);
  const codeVerifier = base64url(randomBytes);

  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(codeVerifier),
  );
  const codeChallenge = base64url(digest);

  return { codeVerifier, codeChallenge };
}

export function saveCookie(
  c: Context,
  name: string,
  value: string,
  maxAge?: number,
) {
  setCookie(c, name, value, {
    httpOnly: true,
    sameSite: "Lax",
    secure: IS_PROD,
    path: "/",
    maxAge: maxAge ?? 3600 * 24 * COOKIE_MAX_AGE_DAY,
  });
}

export async function getCurrentSession(c?: Context) {
  let sessionId = "";
  if (!c) {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    sessionId = session || "";
  } else {
    const session = getCookie(c, "session");
    sessionId = session || "";
  }
  if (!sessionId) return null;
  return await getSession(sessionId);
}
