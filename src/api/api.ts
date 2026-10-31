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
  subtaskData: string[] = [],
) {
  const id = randomUUID();

  await db.withTransactionAsync(async () => {
    await db.runAsync(
      `INSERT INTO missions
         (id, title, directive, target_domain, priority, deadline, notify_60_min, created_at)
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

export async function deleteMission(db: SQLiteDatabase, id: string) {
  await db.withTransactionAsync(async () => {
    await assertMissionUnresolved(db, id);
    await db.runAsync(`DELETE FROM missions WHERE id = ?`, [id]);
  });
}

async function assertMissionUnresolved(db: SQLiteDatabase, missionId: string) {
  const mission = await db.getFirstAsync<{ resolved_at: string | null }>(
    `SELECT resolved_at FROM missions WHERE id = ?`,
    [missionId],
  );

  if (!mission) {
    throw new Error("Mission not found.");
  }

  if (mission.resolved_at !== null) {
    throw new Error("This mission is resolved and is read-only.");
  }
}

export type MissionEditableFields = {
  target_domain: Mission["target_domain"];
  priority: Mission["priority"];
  deadline: string;
};

export type SubtaskInput = {
  id?: string;
  title: string;
};

export async function updateMission(
  db: SQLiteDatabase,
  missionId: string,
  missionData: MissionEditableFields,
  subtaskData: SubtaskInput[] = [],
) {
  await db.withTransactionAsync(async () => {
    await assertMissionUnresolved(db, missionId);

    await db.runAsync(
      `UPDATE missions
         SET target_domain = ?, priority = ?, deadline = ?
       WHERE id = ?`,
      [
        missionData.target_domain,
        missionData.priority,
        missionData.deadline,
        missionId,
      ],
    );

    const existing = await db.getAllAsync<{ id: string }>(
      `SELECT id FROM subtasks WHERE mission_id = ? ORDER BY position ASC`,
      [missionId],
    );
    const existingIds = new Set(existing.map((subtask) => subtask.id));

    const nextSubtasks = subtaskData
      .map((subtask) => ({
        id: subtask.id,
        title: String(subtask.title ?? "").trim(),
      }))
      .filter((subtask) => subtask.title !== "")
      .slice(0, 4);

    const retainedIds = new Set(
      nextSubtasks
        .map((subtask) => subtask.id)
        .filter(
          (subtaskId): subtaskId is string =>
            subtaskId !== undefined && existingIds.has(subtaskId),
        ),
    );

    for (const subtask of existing) {
      if (!retainedIds.has(subtask.id)) {
        await db.runAsync(`DELETE FROM subtasks WHERE id = ?`, [subtask.id]);
      }
    }

    for (let i = 0; i < nextSubtasks.length; i++) {
      const { id, title } = nextSubtasks[i];
      const position = i + 1;

      if (id !== undefined && existingIds.has(id)) {
        // Keep is_done untouched so completion survives edits.
        await db.runAsync(
          `UPDATE subtasks SET title = ?, position = ? WHERE id = ?`,
          [title, position, id],
        );
      } else {
        await db.runAsync(
          `INSERT INTO subtasks (id, mission_id, title, position, is_done)
           VALUES (?, ?, ?, ?, 0)`,
          [randomUUID(), missionId, title, position],
        );
      }
    }
  });
}

export async function resolveMission(db: SQLiteDatabase, id: string) {
  await db.runAsync(
    `UPDATE missions SET resolved_at = ? WHERE id = ? AND resolved_at IS NULL`,
    [new Date().toISOString(), id],
  );
}

export async function setSubtaskDone(
  db: SQLiteDatabase,
  subtaskId: string,
  missionId: string,
  isDone: boolean,
) {
  await db.withTransactionAsync(async () => {
    await assertMissionUnresolved(db, missionId);
    await db.runAsync(
      `UPDATE subtasks SET is_done = ? WHERE id = ? AND mission_id = ?`,
      [isDone ? 1 : 0, subtaskId, missionId],
    );
  });
}

type DailyCommitmentRow = {
  id: string;
  committed_at: string;
};

async function getTodayCommitments(db: SQLiteDatabase, missionId: string) {
  const today = localDate(new Date());
  const commitments = await db.getAllAsync<DailyCommitmentRow>(
    `SELECT id, committed_at FROM daily_commitments WHERE mission_id = ?`,
    [missionId],
  );

  return commitments.filter(
    (commitment) => localDate(commitment.committed_at) === today,
  );
}

export async function commitMission(db: SQLiteDatabase, missionId: string) {
  const existingCommitments = await getTodayCommitments(db, missionId);
  if (existingCommitments.length > 0) return false;

  await db.runAsync(
    `INSERT INTO daily_commitments (id, mission_id, committed_at) VALUES (?, ?, ?)`,
    [randomUUID(), missionId, new Date().toISOString()],
  );

  return true;
}

export async function removeDailyCommitment(
  db: SQLiteDatabase,
  missionId: string,
) {
  const commitments = await getTodayCommitments(db, missionId);
  if (commitments.length === 0) return false;

  await db.withTransactionAsync(async () => {
    for (const commitment of commitments) {
      await db.runAsync(`DELETE FROM daily_commitments WHERE id = ?`, [
        commitment.id,
      ]);
    }
  });

  return true;
}
