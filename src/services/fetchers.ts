import { QuranChapter, Verse } from "@/types/content";
import useSWR, { SWRResponse } from "swr";

const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export const useChapters = (): SWRResponse<QuranChapter[]> => {
  return useSWR<QuranChapter[]>("/api/content/chapters", fetcher, {
    revalidateOnFocus: false,
  });
};

export const useVerses = (
  id: string | undefined | null,
): SWRResponse<{ chapter: QuranChapter; verses: Verse[] }> => {
  return useSWR<{ chapter: QuranChapter; verses: Verse[] }>(
    id ? `/api/content/chapters/${id}/verses` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );
};
