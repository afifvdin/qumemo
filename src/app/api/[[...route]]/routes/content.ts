import { getCurrentSession } from "@/lib/auth";
import { API_URI, OAUTH_CLIENT_ID } from "@/lib/constant";
import { Pagination, QuranChapter, QuranVerse, Verse } from "@/types/content";
import { Hono } from "hono";

export const contentRoutes = new Hono();

contentRoutes.get("/chapters", async (c) => {
  const session = await getCurrentSession(c);
  if (!session) {
    return c.redirect("/api/auth/login");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
    "x-auth-token": session.accessToken,
    "x-client-id": OAUTH_CLIENT_ID,
  };

  const response = await fetch(`${API_URI}/chapters`, {
    method: "GET",
    headers,
  });
  const data: { chapters: QuranChapter[] } = await response.json();

  return c.json<QuranChapter[]>(data.chapters);
});

contentRoutes.get("/chapters/:id/verses", async (c) => {
  const id = c.req.param("id");

  const session = await getCurrentSession(c);
  if (!session) {
    return c.redirect("/api/auth/login");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
    "x-auth-token": session.accessToken,
    "x-client-id": OAUTH_CLIENT_ID,
  };

  const chapterResponse = await fetch(`${API_URI}/chapters/${id}`, {
    method: "GET",
    headers,
  });

  const chapterData: { chapter: QuranChapter } = await chapterResponse.json();
  const versesCount = chapterData.chapter.verses_count;
  const requests = [];

  for (let i = 0; i < Math.ceil(versesCount / 50); i++) {
    let url = new URL(`${API_URI}/verses/by_chapter/${id}`);
    url.searchParams.set("word_fields", "text_imlaei");
    url.searchParams.set("fields", "text_imlaei");
    url.searchParams.set("per_page", "50");
    url.searchParams.set("page", (i + 1).toString());
    requests.push(fetch(url, { method: "GET", headers }));
  }

  const results = await Promise.all(requests);
  const rawData: { verses: QuranVerse[]; pagination: Pagination }[] =
    await Promise.all(results.map((result) => result.json()));
  const data = rawData.map((r) => r.verses).flat();

  return c.json<{ chapter: QuranChapter; verses: Verse[] }>({
    chapter: chapterData.chapter,
    verses: data.map((verse) => ({ id: verse.id, text: verse.text_imlaei })),
  });
});
