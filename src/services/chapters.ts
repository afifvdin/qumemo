import { useQuery } from "@tanstack/react-query";
import { getChapters } from "./apis";

export function useChapters({ enabled = true }: { enabled?: boolean }) {
  return useQuery({
    enabled,
    refetchOnWindowFocus: false,
    queryKey: ["chapters"],
    queryFn: () => getChapters(),
  });
}
