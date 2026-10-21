import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/components/Logo";
import { Calendar, Clock } from "@/components/Icons";
import { msC } from "@/app/index";
import TaskCard from "@/components/TaskCard";
import { TaskCardProps, Subtask, DailyList } from "@/components/TaskCard";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMissions } from "@/hooks/useMissions";
import { Link } from "expo-router";

export default function Tasks() {
  const [allTasks, setAllTasks] = useState<TaskCardProps[]>([]);
  const [display, setDisplay] = useState<"today's" | "resolved" | "pending">(
    "today's",
  );

  function todayDisplay() {
    setDisplay("today's");
  }
  function resolvedDisplay() {
    setDisplay("resolved");
  }
  function pendingDisplay() {
    setDisplay("pending");
  }

  const { data, isPending, error } = useMissions();
  if (isPending) return <Text>Loading…</Text>;
  if (error) return <Text>{error.message}</Text>;
  console.log(data);
  const allDaily = data.dailyMissionsWithSubtasks;
  const pendingDaily = allDaily.filter(
    (mission) => mission.resolved_at === null,
  );

  function renderMission(mission: TaskCardProps) {
    return (
      <Link
        href={{ pathname: "/Tasks/[id]", params: { id: mission.id } }}
        asChild
        key={mission.id}
      >
        <Pressable style={{ width: "100%" }}>
          <TaskCard
            id={mission.id}
            title={mission.title}
            priority={mission.priority}
            target_domain={mission.target_domain}
            deadline={mission.deadline}
            resolved_at={mission.resolved_at}
            resolved_subtasks={mission.resolved_subtasks}
            all_subtasks={mission.all_subtasks}
          />
        </Pressable>
      </Link>
    );
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
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Logo size={msC(32)} />
            <Text style={{ fontFamily: "Outfit-Bold", fontSize: msC(16) }}>
              MISSIONS
            </Text>
          </View>
          <View
            style={{
              shadowColor: "#000",
              shadowOffset: { width: msC(1), height: msC(1) },
              shadowOpacity: 1,
              shadowRadius: 0,
            }}
          >
            <Image
              source={require("@/assets/images/PIC.jpg")}
              style={{ width: msC(32), height: msC(32), borderWidth: msC(1.5) }}
            />
          </View>
        </View>
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{
            gap: msC(10),
            marginTop: msC(10),
          }}
        >
          <View
            style={{
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
                  gap: msC(10),
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: msC(4),
                    borderWidth: msC(2),
                    shadowColor: "#000",
                    shadowOffset: { width: msC(1), height: msC(1) },
                    shadowOpacity: 1,
                    shadowRadius: 0,
                    minWidth: "40%",
                    alignItems: "center",
                    alignSelf: "flex-end",
                  }}
                >
                  <Text
                    style={{ fontFamily: "Outfit-Bold", fontSize: msC(10) }}
                  >
                    {data?.dailyMissionsWithSubtasks
                      ? data?.dailyMissionsWithSubtasks.filter(
                          (mission: TaskCardProps) =>
                            mission.resolved_at !== null,
                        ).length
                      : "0"}{" "}
                    OF{" "}
                    {data?.dailyMissionsWithSubtasks
                      ? data?.dailyMissionsWithSubtasks.length
                      : "0"}{" "}
                    COMPLETED
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: "Outfit-Bold",
                    fontSize: msC(16),
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  TODAY'S COMMITMENTS
                </Text>
                <View
                  style={{
                    backgroundColor: "white",
                    padding: msC(3),
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
                      backgroundColor: "#10B981",
                      padding: msC(3),
                      borderWidth: msC(1.5),
                      width: `${
                        data?.dailyMissionsWithSubtasks
                          ? (data?.dailyMissionsWithSubtasks.filter(
                              (mission: TaskCardProps) =>
                                mission.resolved_at !== null,
                            ).length /
                              data?.dailyMissionsWithSubtasks.length) *
                            100
                          : "0"
                      }%`,
                      alignItems: "center",
                      alignSelf: "flex-start",
                    }}
                  ></View>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    alignSelf: "flex-end",
                  }}
                >
                  <Text
                    style={{ fontFamily: "Outfit-Bold", fontSize: msC(10) }}
                  >
                    {data?.dailyMissionsWithSubtasks
                      ? data?.dailyMissionsWithSubtasks.length -
                        data?.dailyMissionsWithSubtasks.filter(
                          (mission: TaskCardProps) =>
                            mission.resolved_at !== null,
                        ).length
                      : "No Missions Commited"}{" "}
                    MISSIONS LEFT
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              paddingHorizontal: msC(16),
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: msC(2),
                borderWidth: msC(2),
                backgroundColor: "white",
                gap: msC(2),
                shadowColor: "#000",
                shadowOffset: { width: msC(2), height: msC(2) },
                shadowOpacity: 1,
                shadowRadius: 0,
              }}
            >
              <Pressable
                style={{
                  backgroundColor: `${display === "today's" ? "#8AD8FF" : "white"}`,
                  padding: msC(4),
                  borderWidth: msC(1.5),
                  alignItems: "center",
                  flex: 1,
                }}

                onPress={todayDisplay}
              >
                <Text style={{ fontFamily: "Outfit-Bold", fontSize: msC(10) }}>
                  TODAY'S (
                  {data?.dailyMissionsWithSubtasks
                    ? data?.dailyMissionsWithSubtasks.length
                    : "0"}
                  )
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: `${display === "resolved" ? "#8AD8FF" : "white"}`,
                  padding: msC(4),
                  borderWidth: msC(1.5),
                  alignItems: "center",
                  flex: 1,
                }}
                onPress={resolvedDisplay}
              >
                <Text style={{ fontFamily: "Outfit-Bold", fontSize: msC(10) }}>
                  RESOLVED (
                  {data?.resolvedMissionsWithSubtasks
                    ? data?.resolvedMissionsWithSubtasks.length
                    : "0"}
                  )
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: `${display === "pending" ? "#8AD8FF" : "white"}`,
                  padding: msC(4),
                  borderWidth: msC(1.5),
                  alignItems: "center",
                  flex: 1,
                }}
                onPress={pendingDisplay}
              >
                <Text style={{ fontFamily: "Outfit-Bold", fontSize: msC(10) }}>
                  PENDING (
                  {data?.missionsWithSubtasks
                    ? data?.missionsWithSubtasks.length
                    : "0"}
                  )
                </Text>
              </Pressable>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              paddingHorizontal: msC(16),
              paddingVertical: msC(6),
              alignItems: "center",
              gap: msC(10),
            }}
          >
            {display === "today's" &&
              allDaily.length !== 0 &&
              pendingDaily.length === 0 && (
                <Text
                  style={{
                    fontFamily: "Outfit",
                    fontSize: msC(24),
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  You have finished all commited missions. You can commit more
                  tasks!
                </Text>
              )}
            {display === "today's" && allDaily.length == 0 && (
              <Text
                style={{
                  fontFamily: "Outfit",
                  fontSize: msC(24),
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                You have not commited any missions for today!
              </Text>
            )}
            {display === "today's" &&
              allDaily.length !== 0 &&
              pendingDaily.length !== 0 && (
                <>
                  <>
                    {data?.dailyMissionsWithSubtasks
                      .filter(
                        (mission: TaskCardProps) =>
                          mission.resolved_at === null &&
                          mission.priority === "critical",
                      )
                      .map(renderMission)}
                  </>
                  <>
                    {data?.dailyMissionsWithSubtasks
                      .filter(
                        (mission: TaskCardProps) =>
                          mission.resolved_at === null &&
                          mission.priority !== "critical",
                      )
                      .map(renderMission)}
                  </>
                </>
              )}

            {display === "resolved" &&
              data?.resolvedMissionsWithSubtasks.length === 0 && (
                <Text
                  style={{
                    fontFamily: "Outfit",
                    fontSize: msC(24),
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  You haven't resolved a mission yet!
                </Text>
              )}
            {display === "resolved" && (
              <>
                {data?.resolvedMissionsWithSubtasks
                  .filter(
                    (mission: TaskCardProps) => mission.resolved_at !== null,
                  )
                  .map(renderMission)}
              </>
            )}

            {display === "pending" &&
              data?.missionsWithSubtasks.length === 0 && (
                <Text
                  style={{
                    fontFamily: "Outfit",
                    fontSize: msC(24),
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  You have no pending mission!
                </Text>
              )}
            {display === "pending" && (
              <>
                <>
                  {data?.missionsWithSubtasks
                    .filter(
                      (mission: TaskCardProps) =>
                        mission.resolved_at === null &&
                        mission.priority === "critical",
                    )
                    .map(renderMission)}
                </>
                <>
                  {data?.missionsWithSubtasks
                    .filter(
                      (mission: TaskCardProps) =>
                        mission.resolved_at === null &&
                        mission.priority !== "critical",
                    )
                    .map(renderMission)}
                </>
              </>
            )}
          </View>
        </ScrollView>
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
