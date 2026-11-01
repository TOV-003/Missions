import { useMemo, type ReactNode } from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import * as ExpoDevice from "expo-device";
import Constants from "expo-constants";

import { msC } from "@/app/index";
import {
  Back,
  Database,
  Device as DeviceIcon,
  Info,
  Settings as SettingsIcon,
} from "@/components/Icons";
import {
  useAppStats,
  useLastLocalBackup,
  useLocalBackup,
} from "@/hooks/useSettings";

type Row = { label: string; value: string };

const FALLBACK = "Unknown";

function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

function formatTimestamp(iso: string | null | undefined): string {
  if (!iso) return "No local backup yet.";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "No local backup yet.";
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function executionEnvironmentLabel(): string {
  const environment = String(Constants.executionEnvironment ?? "");
  switch (environment) {
    case "storeClient":
      return "Expo Go";
    case "standalone":
      return "Standalone app";
    case "bare":
      return "Bare workflow";
    default:
      return FALLBACK;
  }
}

function deviceTypeLabel(): string {
  switch (ExpoDevice.deviceType) {
    case ExpoDevice.DeviceType.PHONE:
      return "Phone";
    case ExpoDevice.DeviceType.TABLET:
      return "Tablet";
    case ExpoDevice.DeviceType.DESKTOP:
      return "Desktop";
    case ExpoDevice.DeviceType.TV:
      return "TV";
    default:
      return FALLBACK;
  }
}

function Row({ label, value }: Row) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

function Card({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardIcon}>{icon}</View>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View style={{ gap: msC(8) }}>{children}</View>
    </View>
  );
}

export default function Settings() {
  const params = useLocalSearchParams<Record<string, string | string[]>>();
  const from = typeof params.from === "string" ? params.from : undefined;

  const statsQuery = useAppStats();
  const lastBackupQuery = useLastLocalBackup();
  const backup = useLocalBackup();

  const stats = statsQuery.data;
  const isEmpty = stats ? stats.missions === 0 : false;

  function goBack() {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace(from === "newTask" ? "/newTask" : "/Tasks");
  }

  const backupDisabled =
    backup.isPending || statsQuery.isPending || statsQuery.isError || isEmpty;

  const backupLabel = backup.isPending
    ? "SAVING BACKUP..."
    : statsQuery.isPending
      ? "CHECKING DATABASE..."
      : statsQuery.isError
        ? "BACKUP UNAVAILABLE"
        : isEmpty
          ? "DATABASE IS EMPTY"
          : "BACKUP LOCALLY";

  const deviceRows = useMemo<Row[]>(() => {
    const appName = Constants.expoConfig?.name ?? FALLBACK;
    const appVersion = Constants.expoConfig?.version ?? FALLBACK;
    const sdkVersion = Constants.expoConfig?.sdkVersion ?? FALLBACK;

    return [
      { label: "App name", value: appName },
      { label: "App version", value: appVersion },
      { label: "Expo SDK", value: sdkVersion },
      { label: "Environment", value: executionEnvironmentLabel() },
      {
        label: "Platform",
        value: `${Platform.OS} ${String(Platform.Version ?? "")}`.trim(),
      },
      { label: "Manufacturer", value: ExpoDevice.manufacturer ?? FALLBACK },
      { label: "Model", value: ExpoDevice.modelName ?? FALLBACK },
      { label: "OS", value: ExpoDevice.osName ?? FALLBACK },
      { label: "OS version", value: ExpoDevice.osVersion ?? FALLBACK },
      { label: "Device type", value: deviceTypeLabel() },
      {
        label: "Hardware",
        value: ExpoDevice.isDevice
          ? "Real device"
          : "Simulator / emulator",
      },
    ];
  }, []);

  const snapshotRows: Row[] = stats
    ? [
        { label: "Missions", value: String(stats.missions) },
        { label: "Pending", value: String(stats.pendingMissions) },
        { label: "Resolved", value: String(stats.resolvedMissions) },
        { label: "Subtasks", value: String(stats.subtasks) },
        { label: "Subtasks done", value: String(stats.completedSubtasks) },
        { label: "Today's commitments", value: String(stats.commitments) },
        {
          label: "Database size",
          value: `~${formatBytes(stats.databaseSizeBytes)}`,
        },
      ]
    : [];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={msC(8)}
              onPress={goBack}
            >
              <Back size={msC(32)} />
            </Pressable>
            <Text style={styles.headerTitle}>SETTINGS</Text>
          </View>
          <SettingsIcon size={msC(26)} />
        </View>

        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{
            paddingHorizontal: msC(16),
            paddingVertical: msC(10),
            gap: msC(10),
          }}
        >
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>SETTINGS</Text>
            <Text style={styles.heroSubtitle}>
              LOCAL DATA, DEVICE INFO, AND BACKUP
            </Text>
          </View>

          <Card
            icon={<Database size={msC(20)} />}
            title="DATA & BACKUP"
          >
            <Text style={styles.description}>
              Export the full database. Your device&apos;s save sheet lets you
              choose the folder.
            </Text>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={backupLabel}
              accessibilityState={{ disabled: backupDisabled }}
              disabled={backupDisabled}
              onPress={() => backup.mutate()}
              style={[
                styles.button,
                backupDisabled ? styles.buttonDisabled : styles.buttonEnabled,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  backupDisabled ? styles.buttonTextDisabled : null,
                ]}
              >
                {backupLabel}
              </Text>
            </Pressable>

            {statsQuery.isError ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Retry database check"
                onPress={() => statsQuery.refetch()}
                style={styles.retry}
              >
                <Text style={styles.retryText}>RETRY DATABASE CHECK</Text>
              </Pressable>
            ) : null}

            {statsQuery.isSuccess && isEmpty ? (
              <Text style={styles.note}>
                Add a mission before creating a backup.
              </Text>
            ) : null}

            {backup.isSuccess && backup.data ? (
              <View style={styles.successBanner}>
                <Text style={styles.bannerText}>
                  {backup.data.method === "download"
                    ? `Backup saved as ${backup.data.fileName}.`
                    : `Backup ready: ${backup.data.fileName}. Pick where to save it in the sheet.`}
                </Text>
              </View>
            ) : null}

            {backup.isError ? (
              <View style={styles.errorBanner}>
                <Text style={styles.bannerText}>
                  {backup.error?.message || "Couldn't create the backup."}
                </Text>
              </View>
            ) : null}

            <Row
              label="Last backup"
              value={formatTimestamp(lastBackupQuery.data)}
            />
            <Text style={styles.note}>
              This file goes only where you save it. Nothing is uploaded.
            </Text>
          </Card>

          <Card icon={<DeviceIcon size={msC(20)} />} title="DEVICE & APP">
            {deviceRows.map((row) => (
              <Row key={row.label} {...row} />
            ))}
          </Card>

          <Card icon={<Database size={msC(20)} />} title="DATABASE SNAPSHOT">
            {statsQuery.isPending ? (
              <Text style={styles.note}>Reading database...</Text>
            ) : null}

            {statsQuery.isError ? (
              <>
                <Text style={styles.note}>
                  {statsQuery.error?.message || "Couldn't read the database."}
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Retry database snapshot"
                  onPress={() => statsQuery.refetch()}
                  style={styles.retry}
                >
                  <Text style={styles.retryText}>RETRY</Text>
                </Pressable>
              </>
            ) : null}

            {stats ? snapshotRows.map((row) => <Row key={row.label} {...row} />) : null}
          </Card>

          <Card icon={<Info size={msC(20)} />} title="ABOUT">
            <Row
              label="App"
              value={Constants.expoConfig?.name ?? FALLBACK}
            />
            <Row
              label="Version"
              value={Constants.expoConfig?.version ?? FALLBACK}
            />
            <Text style={styles.description}>
              Built with Expo, React Native, and SQLite.
            </Text>
            <Text style={styles.description}>
              Missions turns your work into missions you break down into a chain
              of subtasks.
            </Text>
            <Text style={styles.note}>
              Offline by design. Your data stays on this device.
            </Text>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = {
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    width: "100%",
    alignItems: "center" as const,
    paddingHorizontal: msC(16),
    height: msC(56),
    borderBottomWidth: msC(2),
    borderBottomColor: "#000",
  },
  headerTitle: {
    fontFamily: "Outfit-Bold",
    fontSize: msC(16),
  },
  hero: {
    backgroundColor: "#8AD8FF",
    padding: msC(12),
    borderWidth: msC(2),
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: msC(2), height: msC(2) },
    shadowOpacity: 1,
    shadowRadius: 0,
    gap: msC(4),
  },
  heroTitle: {
    fontFamily: "Outfit-Black",
    fontSize: msC(24),
  },
  heroSubtitle: {
    fontFamily: "Outfit-SemiBold",
    fontSize: msC(10),
    letterSpacing: msC(1),
  },
  card: {
    backgroundColor: "white",
    borderWidth: msC(2),
    borderColor: "#000",
    padding: msC(12),
    gap: msC(10),
    shadowColor: "#000",
    shadowOffset: { width: msC(2), height: msC(2) },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  cardHeader: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: msC(8),
    borderBottomWidth: msC(1.5),
    borderBottomColor: "#000",
    paddingBottom: msC(6),
  },
  cardIcon: {
    width: msC(28),
    height: msC(28),
    borderWidth: msC(1.5),
    borderColor: "#000",
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#E7E5DF",
  },
  cardTitle: {
    fontFamily: "Outfit-Bold",
    fontSize: msC(14),
    letterSpacing: msC(1),
  },
  description: {
    fontFamily: "Outfit-Regular",
    fontSize: msC(12),
    lineHeight: msC(17),
  },
  note: {
    fontFamily: "Outfit-Regular",
    fontSize: msC(10),
    color: "#444",
  },
  row: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    gap: msC(10),
    paddingVertical: msC(2),
  },
  rowLabel: {
    fontFamily: "Outfit-SemiBold",
    fontSize: msC(11),
    textTransform: "uppercase" as const,
    color: "#333",
  },
  rowValue: {
    fontFamily: "Outfit-Bold",
    fontSize: msC(11),
    flexShrink: 1,
    textAlign: "right" as const,
  },
  button: {
    borderWidth: msC(2),
    borderColor: "#000",
    paddingVertical: msC(8),
    alignItems: "center" as const,
    shadowColor: "#000",
    shadowOffset: { width: msC(2), height: msC(2) },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  buttonEnabled: {
    backgroundColor: "#8AD8FF",
  },
  buttonDisabled: {
    backgroundColor: "#E7E5DF",
    shadowOpacity: 0,
  },
  buttonText: {
    fontFamily: "Outfit-Bold",
    fontSize: msC(13),
    letterSpacing: msC(1),
  },
  buttonTextDisabled: {
    color: "#777",
  },
  retry: {
    alignSelf: "flex-start" as const,
    backgroundColor: "#D4B5FF",
    borderWidth: msC(1.5),
    borderColor: "#000",
    paddingHorizontal: msC(10),
    paddingVertical: msC(4),
  },
  retryText: {
    fontFamily: "Outfit-Bold",
    fontSize: msC(10),
  },
  successBanner: {
    backgroundColor: "#10B981",
    borderWidth: msC(1.5),
    borderColor: "#000",
    padding: msC(8),
  },
  errorBanner: {
    backgroundColor: "#FF6B4A",
    borderWidth: msC(1.5),
    borderColor: "#000",
    padding: msC(8),
  },
  bannerText: {
    fontFamily: "Outfit-SemiBold",
    fontSize: msC(11),
  },
};
