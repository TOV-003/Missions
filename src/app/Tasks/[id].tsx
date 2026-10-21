import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Link } from "expo-router";
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
import React from "react";
import { useMissions } from "@/hooks/useMissions";
import { TaskCardProps, Subtask } from "@/components/TaskCard";
import Hr from "@/components/hr";

export default function MissionDetails() {
  const { id } = useLocalSearchParams();
  const { data, isPending, error } = useMissions();
  const missionData = data?.missionsWithSubtasks.filter(
    (mission: TaskCardProps) => mission.id === id,
  )[0];
  console.log(missionData);
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
          <View style={{ flexDirection: "row", gap: msC(2) }}>
            <Edit size={msC(32)} />
            <Delete size={msC(32)} />
          </View>
        </View>

        <ScrollView
          style={{ width: "100%", paddingHorizontal: msC(16) }}
          contentContainerStyle={{
            gap: msC(10),
            marginTop: msC(10),
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
                {missionData.priority.toUpperCase()}
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
                {missionData.target_domain.toUpperCase()}
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
                {new Date("2026-10-26T17:00:00Z").toLocaleDateString("en-GB", {
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
                {new Date("2026-10-26T17:00:00Z").toLocaleTimeString("en-US", {
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
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    gap: msC(6),
                    justifyContent: "flex-start",
                    alignItems: "center",
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
                </View>
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
          <View
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
            }}
          >
            <Check size={msC(20)} />
            <Text style={{ fontFamily: "Outfit-SemiBold", fontSize: msC(16) }}>
              MARK TASK RESOLVED
            </Text>
          </View>
          <View
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
            <Text style={{ fontFamily: "Outfit-SemiBold", fontSize: msC(16) }}>
              EDIT TASK
            </Text>
          </View>
          <View
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
            <Text style={{ fontFamily: "Outfit-SemiBold", fontSize: msC(16) }}>
              DELETE TASK
            </Text>
          </View>
        </ScrollView>
        <Text>MissionID: {id}</Text>
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
});
