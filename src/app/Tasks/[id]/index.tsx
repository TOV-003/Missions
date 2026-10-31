import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Link, router } from "expo-router";
import {
  Edit,
  Delete,
  Back,
  Calendar,
  Clock,
  Checked,
  Unchecked,
  SubtaskDone,
  SubtaskPending,
  Check,
  DeleteBorderless,
  EditBorderless,
} from "@/components/Icons";
import { msC } from "@/app/index";
import React, { useState } from "react";
import {
  useMission,
  useDeleteMission,
  useResolveMission,
  useSetSubtaskDone,
} from "@/hooks/useMissions";
import { Subtask } from "@/components/interfaces";
import Hr from "@/components/hr";
import { LoaderDots } from "@/components/LoaderDots";

export default function MissionDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, error } = useMission(id);
  const { mutate: deleteMission, isPending: isDeleting } = useDeleteMission();
  const { mutate: resolveMission, isPending: isResolving } =
    useResolveMission();
  const {
    mutate: setSubtaskDone,
    isPending: isUpdatingSubtask,
    variables: subtaskUpdateVariables,
  } = useSetSubtaskDone();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

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
  const missionData = data;
  const isResolved = missionData.resolved_at !== null;
  const resolvedAt = missionData.resolved_at
    ? new Date(missionData.resolved_at)
    : null;
  const resolvedLabel =
    resolvedAt && !Number.isNaN(resolvedAt.getTime())
      ? resolvedAt.toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;

  function goToEdit() {
    if (isResolved) return;
    router.push({ pathname: "/Tasks/[id]/edit", params: { id } });
  }

  function handleToggleSubtask(subtask: Subtask) {
    if (isResolved || isUpdatingSubtask) return;

    setActionError(null);
    setSubtaskDone(
      {
        missionId: missionData.id,
        subtaskId: subtask.id,
        isDone: !subtask.is_done,
      },
      {
        onError: (mutationError) =>
          setActionError(
            mutationError.message ||
              "Couldn't update the subtask. Please try again.",
          ),
      },
    );
  }

  function handleResolve() {
    if (isResolved) return;

    setActionError(null);
    resolveMission(id, {
      onSuccess: () => router.replace("/Tasks"),
      onError: (mutationError) =>
        setActionError(
          mutationError.message ||
            "Couldn't resolve the mission. Please try again.",
        ),
    });
  }

  function handleDelete() {
    if (isResolved) return;

    setActionError(null);
    deleteMission(id, {
      onSuccess: () => {
        setShowDeleteConfirm(false);
        router.replace("/Tasks");
      },
      onError: (mutationError) => {
        setShowDeleteConfirm(false);
        setActionError(
          mutationError.message ||
            "Couldn't delete the mission. Please try again.",
        );
      },
    });
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            paddingHorizontal: msC(16),
            height: msC(56),
            borderBottomWidth: msC(2),
            backgroundColor: "white",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Link href="/Tasks" dismissTo asChild>
              <Pressable>
                <Back size={msC(32)} />
              </Pressable>
            </Link>
            <Text style={{ fontFamily: "Outfit-Bold", fontSize: msC(16) }}>
              MISSION DETAILS
            </Text>
          </View>
          {isResolved ? null : (
            <View style={{ flexDirection: "row", gap: msC(2) }}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Edit task"
                onPress={goToEdit}
              >
                <Edit size={msC(32)} />
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Delete task"
                onPress={() => setShowDeleteConfirm(true)}
              >
                <Delete size={msC(32)} />
              </Pressable>
            </View>
          )}
        </View>

        <ScrollView
          style={{ width: "100%", paddingHorizontal: msC(16) }}
          contentContainerStyle={{
            gap: msC(10),
            marginVertical: msC(10),
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "#E7E5DF",
              gap: msC(6),
              padding: msC(12),
              borderWidth: msC(2),
              shadowColor: "#000",
              shadowOffset: { width: msC(2), height: msC(2) },
              shadowOpacity: 1,
              shadowRadius: 0,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: msC(6),
                width: "100%",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  fontFamily: "Outfit-Regular",
                  fontSize: msC(14),
                  backgroundColor: `${missionData.priority === "critical" ? "#FF6B4A" : "#8AD8FF"}`,
                  paddingHorizontal: msC(4),
                  paddingVertical: msC(4),
                  borderWidth: msC(1.5),
                  shadowColor: "#000",
                  shadowOffset: { width: msC(1.5), height: msC(1.5) },
                  shadowOpacity: 1,
                  shadowRadius: 0,
                  textAlign: "center",
                  color: `${missionData.priority === "critical" ? "white" : "black"}`,
                }}
              >
                {missionData.priority?.toUpperCase()}
              </Text>
              <Text
                style={{
                  fontFamily: "Outfit-Regular",
                  fontSize: msC(14),
                  backgroundColor: "#D4B5FF",
                  paddingHorizontal: msC(4),
                  paddingVertical: msC(4),
                  borderWidth: msC(1.5),
                  shadowColor: "#000",
                  shadowOffset: { width: msC(1.5), height: msC(1.5) },
                  shadowOpacity: 1,
                  shadowRadius: 0,
                  textAlign: "center",
                }}
              >
                {missionData.target_domain?.toUpperCase()}
              </Text>
              <Text
                style={{
                  fontFamily: "Outfit-Bold",
                  backgroundColor: "white",
                  fontSize: msC(14),
                  paddingHorizontal: msC(6),
                  paddingVertical: msC(4),
                  borderWidth: msC(1.5),
                  shadowColor: "#000",
                  shadowOffset: { width: msC(1.5), height: msC(1.5) },
                  shadowOpacity: 1,
                  shadowRadius: 0,
                  textAlign: "center",
                }}
              >
                {missionData.all_subtasks.length > 0
                  ? missionData.resolved_subtasks.length > 0
                    ? `${Math.round((missionData.resolved_subtasks.length / missionData.all_subtasks.length) * 100)}% COMPLETE`
                    : "0% COMPLETE"
                  : "NO SUBTASKS"}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Outfit-Regular",
                fontSize: msC(14),
              }}
            >
              {missionData.title.toUpperCase()}
            </Text>
            <View
              style={{
                backgroundColor: "white",
                borderWidth: msC(2),
                shadowColor: "#000",
                shadowOffset: { width: msC(1), height: msC(1) },
                shadowOpacity: 1,
                shadowRadius: 0,
                width: "100%",
                alignItems: "center",
                alignSelf: "flex-end",
              }}
            >
              <View
                style={{
                  backgroundColor: `${missionData.priority === "critical" ? "#FF6B4A" : "#8AD8FF"}`,
                  padding: msC(6),
                  width: `${
                    missionData.resolved_subtasks.length > 0
                      ? (missionData.resolved_subtasks.length /
                          missionData.all_subtasks.length) *
                        100
                      : "0"
                  }%`,
                  alignItems: "center",
                  alignSelf: "flex-start",
                }}
              ></View>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              gap: msC(6),
              padding: msC(12),
              borderWidth: msC(2),
              shadowColor: "#000",
              shadowOffset: { width: msC(2), height: msC(2) },
              shadowOpacity: 1,
              shadowRadius: 0,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: msC(4),
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "black",
                  width: msC(8),
                  height: msC(8),
                }}
              ></View>
              <Text style={{ fontFamily: "Outfit-Regular", fontSize: msC(14) }}>
                DIRECTIVE
              </Text>
            </View>
            <Hr color="black" />
            <Text style={{ fontFamily: "Outfit-Regular", fontSize: msC(12) }}>
              {missionData.directive}
            </Text>
          </View>

          <View style={{ flexDirection: "row", width: "100%", gap: msC(8) }}>
            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                gap: msC(6),
                padding: msC(12),
                borderWidth: msC(2),
                shadowColor: "#000",
                shadowOffset: { width: msC(2), height: msC(2) },
                shadowOpacity: 1,
                shadowRadius: 0,
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: msC(4),
                  alignItems: "center",
                }}
              >
                <Calendar size={14} />
                <Text style={{ fontFamily: "Outfit-Black", fontSize: msC(14) }}>
                  DATE
                </Text>
              </View>
              <Text style={{ fontFamily: "Outfit-Regular", fontSize: msC(18) }}>
                {new Date(missionData.deadline).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                gap: msC(6),
                padding: msC(12),
                borderWidth: msC(2),
                shadowColor: "#000",
                shadowOffset: { width: msC(2), height: msC(2) },
                shadowOpacity: 1,
                shadowRadius: 0,
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: msC(4),
                  alignItems: "center",
                }}
              >
                <Clock size={14} />
                <Text style={{ fontFamily: "Outfit-Black", fontSize: msC(14) }}>
                  TIME
                </Text>
              </View>
              <Text style={{ fontFamily: "Outfit-Regular", fontSize: msC(18) }}>
                {new Date(missionData.deadline).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              gap: msC(6),
              padding: msC(12),
              borderWidth: msC(2),
              shadowColor: "#000",
              shadowOffset: { width: msC(2), height: msC(2) },
              shadowOpacity: 1,
              shadowRadius: 0,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: msC(4),
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: msC(4),
                }}
              >
                <View
                  style={{
                    backgroundColor: "#8AD8FF",
                    borderWidth: msC(0.5),
                    width: msC(8),
                    height: msC(8),
                  }}
                ></View>
                <Text
                  style={{ fontFamily: "Outfit-Regular", fontSize: msC(14) }}
                >
                  SUBTASK CHAIN
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "Outfit-Bold",
                  backgroundColor: "#8AD8FF",
                  fontSize: msC(14),
                  paddingHorizontal: msC(6),
                  paddingVertical: msC(4),
                  borderWidth: msC(1.5),
                  shadowColor: "#000",
                  shadowOffset: { width: msC(1.5), height: msC(1.5) },
                  shadowOpacity: 1,
                  shadowRadius: 0,
                  textAlign: "center",
                }}
              >
                {missionData.resolved_subtasks.length} of{" "}
                {missionData.all_subtasks.length} RESOLVED
              </Text>
            </View>
            <Hr color="black" />
            {isResolved ? (
              <Text
                style={{
                  fontFamily: "Outfit-Regular",
                  fontSize: msC(11),
                  color: "gray",
                }}
              >
                Mission resolved — subtask completion is locked.
              </Text>
            ) : null}
            {missionData.all_subtasks.map((task: Subtask) => (
              <View
                style={{
                  width: "100%",
                  backgroundColor: "#E7E5DF",
                  flexDirection: "row",
                  gap: msC(4),
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderWidth: msC(2),
                  shadowColor: "#000",
                  shadowOffset: { width: msC(2), height: msC(2) },
                  shadowOpacity: 1,
                  shadowRadius: 0,
                  padding: msC(4),
                }}
                key={task.id}
              >
                <Pressable
                  accessibilityRole="checkbox"
                  accessibilityState={{
                    checked: task.is_done,
                    disabled: isResolved || isUpdatingSubtask,
                  }}
                  accessibilityLabel={
                    isResolved
                      ? `${task.title} is locked because the mission is resolved`
                      : `Mark ${task.title} as ${task.is_done ? "pending" : "done"}`
                  }
                  onPress={() => handleToggleSubtask(task)}
                  disabled={isResolved || isUpdatingSubtask}
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    gap: msC(6),
                    justifyContent: "flex-start",
                    alignItems: "center",
                    opacity:
                      isUpdatingSubtask &&
                      subtaskUpdateVariables?.subtaskId === task.id
                        ? 0.6
                        : 1,
                  }}
                >
                  {task.is_done ? (
                    <Checked size={msC(30)} />
                  ) : (
                    <Unchecked size={msC(30)} />
                  )}
                  <Text
                    style={{
                      fontFamily: "Outfit-Bold",
                      fontSize: msC(10),
                      flex: 1,
                    }}
                  >
                    {task.title.toUpperCase()}
                  </Text>
                </Pressable>
                <View style={{ flexShrink: 0 }}>
                  {task.is_done ? (
                    <SubtaskDone size={66} />
                  ) : (
                    <SubtaskPending size={66} />
                  )}
                </View>
              </View>
            ))}
          </View>
          {actionError ? (
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
                {actionError}
              </Text>
            </View>
          ) : null}

          {isResolved ? (
            <View style={styles.resolvedPanel}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: msC(6),
                }}
              >
                <View
                  style={{
                    backgroundColor: "#10B981",
                    width: msC(10),
                    height: msC(10),
                  }}
                />
                <Text
                  style={{
                    fontFamily: "Outfit-Black",
                    fontSize: msC(16),
                    letterSpacing: msC(1),
                  }}
                >
                  RESOLVED
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "Outfit-Regular",
                  fontSize: msC(12),
                  lineHeight: msC(17),
                }}
              >
                This mission is complete and read-only. Subtasks, editing, and
                deletion are locked.
              </Text>
              <Text
                style={{
                  fontFamily: "Outfit-SemiBold",
                  fontSize: msC(11),
                  color: "gray",
                }}
              >
                {resolvedLabel ? `Resolved ${resolvedLabel}` : "Resolved"}
              </Text>
            </View>
          ) : (
            <>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Mark task resolved"
                onPress={handleResolve}
                disabled={isResolving}
                style={{
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
                  opacity: isResolving ? 0.6 : 1,
                }}
              >
                <Check size={msC(20)} />
                <Text
                  style={{ fontFamily: "Outfit-SemiBold", fontSize: msC(16) }}
                >
                  {isResolving ? "RESOLVING..." : "MARK TASK RESOLVED"}
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Edit task"
                onPress={goToEdit}
                style={{
                  width: "100%",
                  backgroundColor: "white",
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
                }}
              >
                <EditBorderless size={msC(20)} />
                <Text
                  style={{ fontFamily: "Outfit-SemiBold", fontSize: msC(16) }}
                >
                  EDIT TASK
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Delete task"
                onPress={() => setShowDeleteConfirm(true)}
                style={{
                  width: "100%",
                  backgroundColor: "white",
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
                }}
              >
                <DeleteBorderless size={msC(20)} />
                <Text
                  style={{ fontFamily: "Outfit-SemiBold", fontSize: msC(16) }}
                >
                  DELETE TASK
                </Text>
              </Pressable>
            </>
          )}
        </ScrollView>

        <Modal
          transparent
          animationType="fade"
          visible={showDeleteConfirm && !isResolved}
          onRequestClose={() => setShowDeleteConfirm(false)}
        >
          <View style={styles.modalBackdrop}>
            <Pressable
              style={StyleSheet.absoluteFill}
              accessibilityRole="button"
              accessibilityLabel="Dismiss delete confirmation"
              onPress={() => setShowDeleteConfirm(false)}
            />
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>DELETE MISSION?</Text>
              <Text style={styles.modalMessage}>
                Delete “{missionData.title}” and all of its subtasks? This
                cannot be undone.
              </Text>
              <View
                style={{ flexDirection: "row", gap: msC(8), width: "100%" }}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Cancel delete"
                  onPress={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  style={[
                    styles.modalButton,
                    { backgroundColor: "#E7E5DF", flex: 1 },
                  ]}
                >
                  <Text style={styles.modalButtonText}>CANCEL</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Confirm delete"
                  onPress={handleDelete}
                  disabled={isDeleting}
                  style={[
                    styles.modalButton,
                    {
                      backgroundColor: "#FF6B4A",
                      flex: 1,
                      opacity: isDeleting ? 0.6 : 1,
                    },
                  ]}
                >
                  <Text style={[styles.modalButtonText, { color: "white" }]}>
                    {isDeleting ? "DELETING..." : "DELETE"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
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
  resolvedPanel: {
    width: "100%",
    backgroundColor: "#E7F8F1",
    borderWidth: msC(2),
    borderColor: "#10B981",
    padding: msC(12),
    gap: msC(6),
    shadowColor: "#000",
    shadowOffset: { width: msC(2), height: msC(2) },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: msC(20),
  },
  modalCard: {
    width: "100%",
    maxWidth: msC(380),
    backgroundColor: "white",
    borderWidth: msC(2),
    shadowColor: "#000",
    shadowOffset: { width: msC(4), height: msC(4) },
    shadowOpacity: 1,
    shadowRadius: 0,
    padding: msC(16),
    gap: msC(12),
  },
  modalTitle: {
    fontFamily: "Outfit-Black",
    fontSize: msC(22),
  },
  modalMessage: {
    fontFamily: "Outfit-Regular",
    fontSize: msC(13),
    lineHeight: msC(18),
  },
  modalButton: {
    borderWidth: msC(2),
    paddingVertical: msC(10),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: msC(2), height: msC(2) },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  modalButtonText: {
    fontFamily: "Outfit-Bold",
    fontSize: msC(14),
    letterSpacing: msC(1),
  },
});
