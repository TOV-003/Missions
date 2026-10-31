import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { msC } from "@/app/index";
import {
  Back,
  Calendar,
  Clock,
  Delete,
  EditBorderless,
} from "@/components/Icons";
import { Domain, Mission, Priority, Subtask } from "@/components/interfaces";
import { LoaderDots } from "@/components/LoaderDots";
import { useMission, useUpdateMission } from "@/hooks/useMissions";

const DOMAINS = [
  "work",
  "study",
  "health",
  "finance",
  "home",
  "social",
  "growth",
  "creative",
  "admin",
];

const PRIORITIES = ["low", "medium", "critical"];

function toUtcIso(dateStr: string, timeStr: string): string | null {
  const dateOk = /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
  const timeOk = /^([01]\d|2[0-3]):[0-5]\d$/.test(timeStr);
  if (!dateOk || !timeOk) return null;

  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = timeStr.split(":").map(Number);

  const date = new Date(y, m - 1, d, hh, mm);

  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return null;
  }

  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}

function toLocalDateTimeParts(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return { date: "", time: "" };

  const pad = (value: number) => String(value).padStart(2, "0");

  return {
    date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    time: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
  };
}

type MissionDetails = Mission & {
  all_subtasks: Subtask[];
  resolved_subtasks: Subtask[];
};

type SubtaskDraft = {
  key: string;
  id?: string;
  title: string;
};

let draftCounter = 0;

function createSubtaskDraft(): SubtaskDraft {
  draftCounter += 1;
  return { key: `draft-${draftCounter}`, title: "" };
}

export default function EditMission() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, error } = useMission(id);

  if (isPending) {
    return (
      <SafeAreaView style={styles.container}>
        <LoaderDots />
      </SafeAreaView>
    );
  }

  if (error || !data) {
    return (
      <SafeAreaView style={styles.container}>
        <Text
          style={{
            fontFamily: "Outfit-Bold",
            fontSize: msC(18),
            padding: msC(16),
          }}
        >
          {error?.message ?? "Mission not found."}
        </Text>
      </SafeAreaView>
    );
  }

  if (data.resolved_at !== null) {
    return <Redirect href={{ pathname: "/Tasks/[id]", params: { id } }} />;
  }

  return <EditMissionForm mission={data} />;
}

function EditMissionForm({ mission }: { mission: MissionDetails }) {
  const { mutate, isPending } = useUpdateMission();
  const initialDeadline = toLocalDateTimeParts(mission.deadline);

  const [targetDomain, setTargetDomain] = useState<Domain>(
    mission.target_domain ?? null,
  );
  const [priority, setPriority] = useState<Priority>(mission.priority ?? null);
  const [dateStr, setDateStr] = useState(initialDeadline.date);
  const [timeStr, setTimeStr] = useState(initialDeadline.time);
  const [subtasks, setSubtasks] = useState<SubtaskDraft[]>(
    mission.all_subtasks.slice(0, 4).map((subtask) => ({
      key: subtask.id,
      id: subtask.id,
      title: subtask.title,
    })),
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const deadline = toUtcIso(dateStr, timeStr);

  function returnToMission() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({ pathname: "/Tasks/[id]", params: { id: mission.id } });
    }
  }

  function handleSubtaskTitle(key: string, value: string) {
    setSubtasks((prev) =>
      prev.map((subtask) =>
        subtask.key === key ? { ...subtask, title: value } : subtask,
      ),
    );
  }

  function removeSubtask(key: string) {
    setSubtasks((prev) => prev.filter((subtask) => subtask.key !== key));
  }

  function addSubtask() {
    setSubtasks((prev) =>
      prev.length >= 4 ? prev : [...prev, createSubtaskDraft()],
    );
  }

  function handleSave() {
    setErrorMessage(null);

    if (!targetDomain || !priority) {
      setErrorMessage("Pick a target domain and a priority.");
      return;
    }
    if (!deadline) {
      setErrorMessage("Enter a valid date (YYYY-MM-DD) and time (HH:MM).");
      return;
    }

    mutate(
      {
        id: mission.id,
        missionData: {
          target_domain: targetDomain,
          priority,
          deadline,
        },
        subtaskData: subtasks.map(({ id, title }) => ({ id, title })),
      },
      {
        onSuccess: returnToMission,
        onError: (mutationError) =>
          setErrorMessage(
            mutationError.message ||
              "Couldn't save your changes. Please try again.",
          ),
      },
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back to mission"
              onPress={returnToMission}
            >
              <Back size={msC(32)} />
            </Pressable>
            <Text style={{ fontFamily: "Outfit-Bold", fontSize: msC(16) }}>
              EDIT MISSION
            </Text>
          </View>
          <EditBorderless size={msC(24)} />
        </View>

        <KeyboardAwareScrollView
          style={{ width: "100%" }}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            gap: msC(10),
            marginVertical: msC(10),
            paddingHorizontal: msC(16),
            alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              backgroundColor: "#8AD8FF",
              padding: msC(12),
              borderWidth: msC(2),
              shadowColor: "#000",
              shadowOffset: { width: msC(2), height: msC(2) },
              shadowOpacity: 1,
              shadowRadius: 0,
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ gap: msC(6), flex: 1 }}>
                <Text style={{ fontFamily: "Outfit-Bold", fontSize: msC(20) }}>
                  UPDATE THE PLAN
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: "Outfit-SemiBold",
                    fontSize: msC(10),
                    color: "#8AD8FF",
                    backgroundColor: "black",
                    paddingVertical: msC(4),
                    paddingHorizontal: msC(10),
                    alignSelf: "flex-start",
                    letterSpacing: msC(2),
                  }}
                >
                  {mission.title.toUpperCase()}
                </Text>
              </View>
              <EditBorderless size={msC(40)} />
            </View>
          </View>

          {errorMessage ? (
            <View
              style={{
                width: "100%",
                backgroundColor: "#FFD9D1",
                borderWidth: msC(2),
                padding: msC(10),
                shadowColor: "#000",
                shadowOffset: { width: msC(2), height: msC(2) },
                shadowOpacity: 1,
                shadowRadius: 0,
              }}
            >
              <Text style={{ fontFamily: "Outfit-Bold", fontSize: msC(12) }}>
                {errorMessage}
              </Text>
            </View>
          ) : null}

          <View style={{ width: "100%" }}>
            <Text style={styles.label}>TARGET DOMAIN</Text>
            <View style={styles.chipRow}>
              {DOMAINS.map((domain) => (
                <Pressable
                  key={domain}
                  onPress={() => setTargetDomain(domain as Domain)}
                >
                  <Text
                    style={{
                      fontFamily: "Outfit-Bold",
                      fontSize: msC(12),
                      backgroundColor:
                        targetDomain === domain ? "#8AD8FF" : "white",
                      paddingHorizontal: msC(12),
                      paddingVertical: msC(4),
                      borderWidth: msC(2),
                      shadowColor: "#000",
                      shadowOffset: { width: msC(1.5), height: msC(1.5) },
                      shadowOpacity: 1,
                      shadowRadius: 0,
                      textAlign: "center",
                      alignSelf: "center",
                      margin: msC(2),
                    }}
                  >
                    {domain.toUpperCase()}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={{ width: "100%" }}>
            <Text style={styles.label}>PRIORITY</Text>
            <View style={styles.chipRow}>
              {PRIORITIES.map((value) => {
                const selected = priority === value;
                const isCritical = value === "critical";

                return (
                  <Pressable
                    key={value}
                    onPress={() => setPriority(value as Priority)}
                    style={{ width: "100%", flex: 1 }}
                  >
                    <Text
                      style={{
                        fontFamily: "Outfit-Bold",
                        fontSize: msC(12),
                        backgroundColor: selected
                          ? isCritical
                            ? "#FF6B4A"
                            : "#8AD8FF"
                          : "white",
                        paddingHorizontal: msC(12),
                        paddingVertical: msC(8),
                        borderWidth: msC(2),
                        shadowColor: "#000",
                        shadowOffset: { width: msC(1.5), height: msC(1.5) },
                        shadowOpacity: 1,
                        shadowRadius: 0,
                        textAlign: "center",
                        margin: msC(2),
                        color: selected && isCritical ? "white" : "black",
                      }}
                    >
                      {value.toUpperCase()}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={{ width: "100%" }}>
            <Text style={styles.label}>DEADLINE</Text>
            <View style={styles.chipRow}>
              <Pressable style={{ width: "100%", flex: 1 }}>
                <View style={styles.fieldBox}>
                  <View
                    style={{
                      backgroundColor: "#8AD8FF",
                      padding: msC(6),
                      borderWidth: msC(2),
                      shadowColor: "#000",
                      shadowOffset: { width: msC(1.5), height: msC(1.5) },
                      shadowOpacity: 1,
                      shadowRadius: 0,
                      alignItems: "center",
                    }}
                  >
                    <Calendar size={msC(16)} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "Outfit-Bold",
                        fontSize: msC(10),
                        color: "gray",
                      }}
                    >
                      DATE
                    </Text>
                    <TextInput
                      placeholder="YYYY-MM-DD"
                      value={dateStr}
                      onChangeText={setDateStr}
                      keyboardType="numbers-and-punctuation"
                      maxLength={10}
                      style={{
                        fontFamily: "Outfit-Bold",
                        fontSize: msC(14),
                      }}
                    />
                  </View>
                </View>
              </Pressable>
              <Pressable style={{ width: "100%", flex: 1 }}>
                <View style={styles.fieldBox}>
                  <View
                    style={{
                      backgroundColor: "#D4B5FF",
                      padding: msC(6),
                      borderWidth: msC(2),
                      shadowColor: "#000",
                      shadowOffset: { width: msC(1.5), height: msC(1.5) },
                      shadowOpacity: 1,
                      shadowRadius: 0,
                      alignItems: "center",
                    }}
                  >
                    <Clock size={msC(16)} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "Outfit-Bold",
                        fontSize: msC(10),
                        color: "gray",
                      }}
                    >
                      TIME
                    </Text>
                    <TextInput
                      placeholder="HH:MM"
                      value={timeStr}
                      onChangeText={setTimeStr}
                      keyboardType="numbers-and-punctuation"
                      maxLength={5}
                      style={{
                        fontFamily: "Outfit-Bold",
                        fontSize: msC(14),
                      }}
                    />
                  </View>
                </View>
              </Pressable>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#E7E5DF",
              padding: msC(12),
              borderWidth: msC(2),
              shadowColor: "#000",
              shadowOffset: { width: msC(1.5), height: msC(1.5) },
              shadowOpacity: 1,
              shadowRadius: 0,
              margin: msC(2),
              gap: msC(6),
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={styles.label}>SUBTASKS</Text>
              <Text
                style={{
                  fontFamily: "Outfit-Bold",
                  fontSize: msC(10),
                  color: "gray",
                }}
              >
                {subtasks.length}/4
              </Text>
            </View>

            {subtasks.length === 0 ? (
              <Text
                style={{
                  fontFamily: "Outfit-SemiBold",
                  fontSize: msC(12),
                  color: "gray",
                }}
              >
                No subtasks yet. Add up to four.
              </Text>
            ) : null}

            {subtasks.map((subtask, index) => (
              <View key={subtask.key} style={styles.subtaskRow}>
                <TextInput
                  value={subtask.title}
                  onChangeText={(value) =>
                    handleSubtaskTitle(subtask.key, value)
                  }
                  accessibilityLabel={`Subtask ${index + 1}`}
                  multiline
                  scrollEnabled={false}
                  style={{
                    fontFamily: "Outfit-SemiBold",
                    fontSize: msC(12),
                    color: "#000",
                    textAlign: "left",
                    flex: 1,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder={`Enter Mission Subtask ${index + 1} here...`}
                  placeholderTextColor="#9CA3AF"
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Remove subtask ${index + 1}`}
                  onPress={() => removeSubtask(subtask.key)}
                >
                  <Delete size={msC(24)} />
                </Pressable>
              </View>
            ))}

            {subtasks.length < 4 ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Add subtask"
                onPress={addSubtask}
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  borderWidth: msC(2),
                  borderStyle: "dashed",
                  padding: msC(10),
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Outfit-Bold",
                    fontSize: msC(12),
                    letterSpacing: msC(1),
                  }}
                >
                  + ADD SUBTASK
                </Text>
              </Pressable>
            ) : null}
          </View>

          <Pressable
            onPress={handleSave}
            disabled={isPending}
            style={[styles.primaryButton, { opacity: isPending ? 0.6 : 1 }]}
          >
            <Text style={styles.buttonText}>
              {isPending ? "SAVING..." : "SAVE CHANGES"}
            </Text>
          </Pressable>

          <Pressable
            onPress={returnToMission}
            disabled={isPending}
            style={[styles.secondaryButton, { opacity: isPending ? 0.6 : 1 }]}
          >
            <Text style={styles.buttonText}>DISCARD EDITS</Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: msC(16),
    height: msC(56),
    borderBottomWidth: msC(2),
    backgroundColor: "white",
  },
  label: {
    fontFamily: "Outfit-Bold",
    fontSize: msC(10),
    letterSpacing: msC(1),
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: msC(4),
    justifyContent: "center",
    marginVertical: msC(6),
  },
  fieldBox: {
    backgroundColor: "white",
    padding: msC(12),
    borderWidth: msC(2),
    shadowColor: "#000",
    shadowOffset: { width: msC(1.5), height: msC(1.5) },
    shadowOpacity: 1,
    shadowRadius: 0,
    margin: msC(2),
    flexDirection: "row",
    gap: msC(6),
    alignItems: "center",
  },
  subtaskRow: {
    backgroundColor: "white",
    borderWidth: msC(2),
    shadowColor: "#000",
    shadowOffset: { width: msC(2), height: msC(2) },
    shadowOpacity: 1,
    shadowRadius: 0,
    width: "100%",
    paddingVertical: msC(6),
    paddingHorizontal: msC(8),
    flexDirection: "row",
    gap: msC(4),
    justifyContent: "space-between",
    alignItems: "center",
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#8AD8FF",
    flexDirection: "row",
    gap: msC(4),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: msC(2),
    shadowColor: "#000",
    shadowOffset: { width: msC(2), height: msC(2) },
    shadowOpacity: 1,
    shadowRadius: 0,
    padding: msC(16),
  },
  secondaryButton: {
    width: "100%",
    backgroundColor: "#E7E5DF",
    flexDirection: "row",
    gap: msC(4),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: msC(2),
    shadowColor: "#000",
    shadowOffset: { width: msC(2), height: msC(2) },
    shadowOpacity: 1,
    shadowRadius: 0,
    padding: msC(16),
  },
  buttonText: {
    fontFamily: "Outfit-SemiBold",
    fontSize: msC(16),
  },
});
