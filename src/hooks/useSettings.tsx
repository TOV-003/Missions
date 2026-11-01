import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import Storage from "expo-sqlite/kv-store";

import { getAppStats } from "@/api/settings";
import { createDatabaseBackup, LAST_BACKUP_KEY } from "@/utils/backup";

export function useAppStats() {
  const db = useSQLiteContext();

  return useQuery({
    queryKey: ["settings", "stats"],
    queryFn: () => getAppStats(db),
    staleTime: 0,
  });
}

export function useLastLocalBackup() {
  return useQuery({
    queryKey: ["settings", "lastBackup"],
    queryFn: () => Storage.getItem(LAST_BACKUP_KEY),
    staleTime: 0,
  });
}

export function useLocalBackup() {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createDatabaseBackup(db),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["settings", "lastBackup"] }),
  });
}
