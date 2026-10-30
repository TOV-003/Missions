import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS missions (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      directive TEXT NOT NULL,
      target_domain TEXT NOT NULL,
      priority TEXT NOT NULL,
      deadline TEXT NOT NULL,
      notify_60_min INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      resolved_at TEXT
    );

    CREATE TABLE IF NOT EXISTS subtasks (
      id TEXT PRIMARY KEY NOT NULL,
      mission_id TEXT NOT NULL,
      title TEXT NOT NULL,
      position INTEGER NOT NULL,
      is_done INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS daily_commitments (
      id TEXT PRIMARY KEY NOT NULL,
      mission_id TEXT NOT NULL,
      committed_at TEXT NOT NULL,
      FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_subtasks_mission ON subtasks(mission_id);
    CREATE INDEX IF NOT EXISTS idx_daily_mission ON daily_commitments(mission_id);
  `);
}
