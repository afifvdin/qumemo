import { useQuery } from "@tanstack/react-query";
import { getVerses } from "./apis";

export function useVerses({
  id,
  enabled = true,
}: {
  id: string;
  enabled?: boolean;
}) {
  return useQuery({
    enabled,
    refetchOnWindowFocus: false,
    queryKey: [`chapter-${id}-verses`],
    queryFn: () => getVerses({ id: id }),
  });
}
