import { Platform } from "react-native";
import { type SQLiteDatabase } from "expo-sqlite";
import Storage from "expo-sqlite/kv-store";

export const LAST_BACKUP_KEY = "lastLocalBackupAt";

const BACKUP_MIME_TYPE = "application/x-sqlite3";

export type BackupResult = {
  fileName: string;
  uri?: string;
  method: "share" | "download";
};

const pad = (value: number) => String(value).padStart(2, "0");

export function buildBackupFileName(date: Date = new Date()): string {
  const stamp = [
    date.getFullYear(),
    "-",
    pad(date.getMonth() + 1),
    "-",
    pad(date.getDate()),
    "_",
    pad(date.getHours()),
    "-",
    pad(date.getMinutes()),
    "-",
    pad(date.getSeconds()),
  ].join("");

  return `missions-backup-${stamp}.db`;
}

async function serializeDatabase(
  db: SQLiteDatabase,
): Promise<Uint8Array<ArrayBuffer>> {
  const raw = (await db.serializeAsync()) as Uint8Array | ArrayBuffer;
  const source = raw instanceof Uint8Array ? raw : new Uint8Array(raw);

  // Copy into a fresh, non-shared buffer so Blob/File APIs accept it.
  const bytes = new Uint8Array(source.byteLength);
  bytes.set(source);
  return bytes;
}

function downloadOnWeb(bytes: Uint8Array<ArrayBuffer>, fileName: string) {
  const blob = new Blob([bytes], { type: BACKUP_MIME_TYPE });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.style.display = "none";

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}

async function shareOnNative(
  bytes: Uint8Array<ArrayBuffer>,
  fileName: string,
): Promise<{ uri: string }> {
  const [{ File, Paths }, Sharing] = await Promise.all([
    import("expo-file-system"),
    import("expo-sharing"),
  ]);

  const available = await Sharing.isAvailableAsync();
  if (!available) {
    throw new Error("Sharing isn't available on this device.");
  }

  const file = new File(Paths.cache, fileName);
  file.create({ overwrite: true });
  file.write(bytes);

  await Sharing.shareAsync(file.uri, {
    mimeType: BACKUP_MIME_TYPE,
    UTI: "public.database",
    dialogTitle: "Save database backup",
  });

  return { uri: file.uri };
}

export async function createDatabaseBackup(
  db: SQLiteDatabase,
): Promise<BackupResult> {
  const bytes = await serializeDatabase(db);
  const fileName = buildBackupFileName();

  if (Platform.OS === "web") {
    downloadOnWeb(bytes, fileName);
    await Storage.setItem(LAST_BACKUP_KEY, new Date().toISOString());
    return { fileName, method: "download" };
  }

  const { uri } = await shareOnNative(bytes, fileName);
  await Storage.setItem(LAST_BACKUP_KEY, new Date().toISOString());

  return { fileName, uri, method: "share" };
}
