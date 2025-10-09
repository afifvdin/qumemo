import { QuranChapter, Verse } from "@/types/content";
import useSWR, { SWRResponse } from "swr";

const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export const useChapters = (): SWRResponse<QuranChapter[]> => {
  const key = "/api/content/chapters";

  const data = typeof window !== "undefined" ? localStorage.getItem(key) : null;
  const initialData = data ? JSON.parse(data) : null;

  return useSWR<QuranChapter[]>(key, fetcher, {
    revalidateOnFocus: false,
    fallbackData: initialData,
    onSuccess: (data) => {
      localStorage.setItem(key, JSON.stringify(data));
    },
  });
};

export const useVerses = (
  id: string | undefined | null,
): SWRResponse<{ chapter: QuranChapter; verses: Verse[] }> => {
  const key = `/api/content/chapters/${id}/verses`;

  const data = typeof window !== "undefined" ? localStorage.getItem(key) : null;
  const initialData = data ? JSON.parse(data) : null;

  return useSWR<{ chapter: QuranChapter; verses: Verse[] }>(
    id ? key : null,
    fetcher,
    {
      revalidateOnFocus: false,
      fallbackData: initialData,
      onSuccess: (data) => {
        // simpan hasil ke localStorage setiap kali SWR sukses fetch data baru
        localStorage.setItem(key, JSON.stringify(data));
      },
    },
  );
};
