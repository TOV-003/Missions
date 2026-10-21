import { useQuery } from "@tanstack/react-query";
import { getMissions } from "@/api/api";

export function useMissions() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getMissions,
  });
}
