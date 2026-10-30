import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/components/Logo";
import { msC } from "@/app/index";
import TaskCard from "@/components/TaskCard";
import { TaskCardProps, Subtask, DailyList } from "@/components/interfaces";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDeleteMission, useMissions } from "@/hooks/useMissions";
import { Link } from "expo-router";
import { LoaderDots } from "@/components/LoaderDots";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

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

  const { data, isPending, error, refetch } = useMissions();
  const { mutate: deleteMission } = useDeleteMission();
  if (isPending)
    return (
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <LoaderDots />
        </ScrollView>
      </SafeAreaView>
    );
  if (error)
    return (
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Text
            style={{
              fontFamily: "Outfit-Bold",
              fontSize: msC(32),
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            {error.message}
          </Text>
          <Pressable
            onPress={() => refetch()}
            style={{
              backgroundColor: "#8AD8FF",
              paddingHorizontal: msC(12),
              paddingVertical: msC(6),
              borderWidth: msC(2),
              shadowColor: "#000",
              shadowOffset: { width: msC(2), height: msC(2) },
              shadowOpacity: 1,
              shadowRadius: 0,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Outfit-Bold",
                fontSize: msC(20),
              }}
            >
              Reload
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  console.log(data);
  const allDaily = data.dailyMissionsWithSubtasks;
  const pendingDaily = allDaily.filter(
    (mission) => mission.resolved_at === null,
  );

  function confirmDeleteMission(mission: TaskCardProps) {
    Alert.alert(
      "Delete mission?",
      `Delete “${mission.title}” and all of its subtasks?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            deleteMission(mission.id, {
              onError: () =>
                Alert.alert("Couldn't delete mission", "Please try again."),
            }),
        },
      ],
    );
  }

  function renderMission(mission: TaskCardProps, canDelete: boolean) {
    const missionCard = (
      <Link
        href={{ pathname: "/Tasks/[id]", params: { id: mission.id } }}
        asChild
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

    if (!canDelete) {
      return <View key={mission.id}>{missionCard}</View>;
    }

    return (
      <ReanimatedSwipeable
        key={mission.id}
        containerStyle={{ width: "100%" }}
        overshootRight={false}
        renderRightActions={() => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Delete ${mission.title}`}
            onPress={() => confirmDeleteMission(mission)}
            style={styles.deleteAction}
          >
            <Text style={styles.deleteActionText}>DELETE</Text>
          </Pressable>
        )}
      >
        {missionCard}
      </ReanimatedSwipeable>
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
                      .map((mission) => renderMission(mission, false))}
                  </>
                  <>
                    {data?.dailyMissionsWithSubtasks
                      .filter(
                        (mission: TaskCardProps) =>
                          mission.resolved_at === null &&
                          mission.priority !== "critical",
                      )
                      .map((mission) => renderMission(mission, false))}
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
                  .map((mission) => renderMission(mission, false))}
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
            {display === "pending" &&
              data?.missionsWithSubtasks.length !== 0 && (
                <>
                  <Text
                    style={{ fontFamily: "Outfit-SemiBold", fontSize: msC(12) }}
                  >
                    Long press Mission to commit for today
                  </Text>
                  <>
                    {data?.missionsWithSubtasks
                      .filter(
                        (mission: TaskCardProps) =>
                          mission.resolved_at === null &&
                          mission.priority === "critical",
                      )
                      .map((mission) => renderMission(mission, true))}
                  </>
                  <>
                    {data?.missionsWithSubtasks
                      .filter(
                        (mission: TaskCardProps) =>
                          mission.resolved_at === null &&
                          mission.priority !== "critical",
                      )
                      .map((mission) => renderMission(mission, true))}
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
  deleteAction: {
    alignItems: "center",
    backgroundColor: "#FF6B4A",
    borderWidth: msC(2),
    justifyContent: "center",
    marginLeft: msC(8),
    paddingHorizontal: msC(16),
  },
  deleteActionText: {
    color: "white",
    fontFamily: "Outfit-Bold",
    fontSize: msC(12),
  },
});
