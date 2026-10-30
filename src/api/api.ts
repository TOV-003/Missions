import { type SQLiteDatabase } from "expo-sqlite";
import { randomUUID } from "expo-crypto";

import {
  TaskCardProps,
  Mission,
  Subtask,
  DailyList,
} from "@/components/interfaces";

const localDate = (d: string | Date) => new Date(d).toLocaleDateString("en-CA");

export async function getMissions(db: SQLiteDatabase) {
  const [missions, subtaskRows, commitments] = await Promise.all([
    db.getAllAsync<TaskCardProps>(
      `SELECT * FROM missions ORDER BY deadline ASC`,
    ),
    db.getAllAsync<any>(
      `SELECT * FROM subtasks ORDER BY mission_id, position ASC`,
    ),
    db.getAllAsync<DailyList>(`SELECT * FROM daily_commitments`),
  ]);

  const subtasks: Subtask[] = subtaskRows.map((s) => ({
    ...s,
    is_done: s.is_done === 1,
  }));

  const subtasksByMission = new Map<string, Subtask[]>();
  for (const s of subtasks) {
    const list = subtasksByMission.get(s.mission_id) ?? [];
    list.push(s);
    subtasksByMission.set(s.mission_id, list);
  }

  const withSubtasks = (mission: TaskCardProps) => {
    const all_subtasks = subtasksByMission.get(mission.id) ?? [];
    return {
      ...mission,
      all_subtasks,
      resolved_subtasks: all_subtasks.filter((s) => s.is_done),
    };
  };

  const active = missions.filter((m) => m.resolved_at === null);
  const resolved = missions.filter((m) => m.resolved_at !== null);

  const today = localDate(new Date());
  const committedToday = new Set(
    commitments
      .filter((c) => localDate(c.committed_at) === today)
      .map((c) => c.mission_id),
  );
  const daily = missions.filter((m) => committedToday.has(m.id));

  return {
    missionsWithSubtasks: active.map(withSubtasks),
    dailyMissionsWithSubtasks: daily.map(withSubtasks),
    resolvedMissionsWithSubtasks: resolved.map(withSubtasks),
  };
}

export async function getMission(db: SQLiteDatabase, id: string) {
  const [mission, subtaskRows] = await Promise.all([
    db.getFirstAsync<Mission>(`SELECT * FROM missions WHERE id = ?`, [id]),
    db.getAllAsync<any>(
      `SELECT * FROM subtasks WHERE mission_id = ? ORDER BY position ASC`,
      [id],
    ),
  ]);

  if (!mission) return null;

  const all_subtasks: Subtask[] = subtaskRows.map((s) => ({
    ...s,
    is_done: s.is_done === 1,
  }));

  return {
    ...mission,
    all_subtasks,
    resolved_subtasks: all_subtasks.filter((s) => s.is_done),
  };
}

export async function createMission(
  db: SQLiteDatabase,
  missionData: Mission,
  subtaskData: Subtask[] = [],
) {
  const id = randomUUID();

  await db.withTransactionAsync(async () => {
    await db.runAsync(
      `INSERT INTO missions
         (id, title, directive, target_domain, priority, deadline, notify_15_min, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        missionData.title,
        missionData.directive,
        missionData.target_domain,
        missionData.priority,
        missionData.deadline,
        missionData.notify_60_min ? 1 : 0,
        new Date().toISOString(),
      ],
    );

    const titles = subtaskData
      .map((s) => String(s ?? "").trim())
      .filter((s) => s !== "")
      .slice(0, 4);

    for (let i = 0; i < titles.length; i++) {
      await db.runAsync(
        `INSERT INTO subtasks (id, mission_id, title, position) VALUES (?, ?, ?, ?)`,
        [randomUUID(), id, titles[i], i + 1],
      );
    }
  });

  return id;
}
