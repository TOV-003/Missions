import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMissions,
  getMission,
  createMission,
  deleteMission,
  commitMission,
  removeDailyCommitment,
} from "@/api/api";
import { useSQLiteContext } from "expo-sqlite";

export function useMissions() {
  const db = useSQLiteContext();
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => getMissions(db),
  });
}

export function useMission(id: string) {
  const db = useSQLiteContext();
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getMission(db, id),
  });
}

export function useCreateMission() {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      missionData,
      subtaskData,
    }: {
      missionData: any;
      subtaskData?: any[];
    }) => createMission(db, missionData, subtaskData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useDeleteMission() {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMission(db, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useCommitMission() {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (missionId: string) => commitMission(db, missionId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useRemoveDailyCommitment() {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (missionId: string) => removeDailyCommitment(db, missionId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}
