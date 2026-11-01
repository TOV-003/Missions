import { type SQLiteDatabase } from "expo-sqlite";

const localDate = (d: string | Date) => new Date(d).toLocaleDateString("en-CA");

export type AppStats = {
  missions: number;
  pendingMissions: number;
  resolvedMissions: number;
  subtasks: number;
  completedSubtasks: number;
  commitments: number;
  databaseSizeBytes: number;
};

type MissionCountsRow = {
  total: number;
  pending: number;
  resolved: number;
};

type SubtaskCountsRow = {
  total: number;
  completed: number;
};

type CommitmentRow = {
  committed_at: string;
};

type PragmaRow = {
  page_count?: number;
  page_size?: number;
};

export async function getAppStats(db: SQLiteDatabase): Promise<AppStats> {
  const [missionCounts, subtaskCounts, commitments, pageCount, pageSize] =
    await Promise.all([
      db.getFirstAsync<MissionCountsRow>(
        `SELECT
           COUNT(*) AS total,
           COALESCE(SUM(CASE WHEN resolved_at IS NULL THEN 1 ELSE 0 END), 0) AS pending,
           COALESCE(SUM(CASE WHEN resolved_at IS NOT NULL THEN 1 ELSE 0 END), 0) AS resolved
         FROM missions`,
      ),
      db.getFirstAsync<SubtaskCountsRow>(
        `SELECT
           COUNT(*) AS total,
           COALESCE(SUM(CASE WHEN is_done = 1 THEN 1 ELSE 0 END), 0) AS completed
         FROM subtasks`,
      ),
      db.getAllAsync<CommitmentRow>(
        `SELECT committed_at FROM daily_commitments`,
      ),
      db.getFirstAsync<PragmaRow>(`PRAGMA page_count`),
      db.getFirstAsync<PragmaRow>(`PRAGMA page_size`),
    ]);

  const today = localDate(new Date());
  const commitmentsToday = commitments.filter(
    (commitment) => localDate(commitment.committed_at) === today,
  ).length;

  const size =
    (pageCount?.page_count ?? 0) * (pageSize?.page_size ?? 0);

  return {
    missions: missionCounts?.total ?? 0,
    pendingMissions: missionCounts?.pending ?? 0,
    resolvedMissions: missionCounts?.resolved ?? 0,
    subtasks: subtaskCounts?.total ?? 0,
    completedSubtasks: subtaskCounts?.completed ?? 0,
    commitments: commitmentsToday,
    databaseSizeBytes: size,
  };
}
