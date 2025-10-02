import http from "@/lib/http";
import { QuranChapter, Verse } from "@/types/content";

export const getChapters = async () => {
  return (await http.get<QuranChapter[]>("/api/content/chapters")).data;
};

export const getVerses = async ({ id }: { id: string }) => {
  return (
    await http.get<{ chapter: QuranChapter; verses: Verse[] }>(
      `/api/content/chapters/${id}/verses`,
    )
  ).data;
};
