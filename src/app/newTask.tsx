import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { msC } from ".";
import Logo from "@/components/Logo";
import {
  Bolt,
  Calendar,
  Clock,
  Yes,
  No,
  Bell,
  Delete,
} from "@/components/Icons";
import { Domain, Mission, Priority, Subtask } from "@/components/interfaces";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function NewTask() {
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
  const [formData, setFormData] = useState<Mission>({
    id: "",
    user_id: "",
    title: "",
    directive: "",
    target_domain: null,
    priority: null,
    deadline: "",
    notify_15_min: false,
    created_at: "",
    resolved_at: null,
  });
  const [subtaskData, setSubtaskData] = useState<Subtask[]>([]);
  const [subtaskText, setSubtaskText] = useState<string[]>(["", "", "", ""]);
  const [dateStr, setDateStr] = useState<string>("");
  const [timeStr, setTimeStr] = useState<string>("");

  function handleDomain(domain: Domain) {
    setFormData((data) => ({ ...data, target_domain: domain }));
  }
  function handlePriority(priority: Priority) {
    setFormData((data) => ({ ...data, priority: priority }));
  }
  function toggleNotify15Min() {
    setFormData((data) => ({ ...data, notify_15_min: !data.notify_15_min }));
  }
  function handleSubtaskText(index: number, value: string) {
    setSubtaskText((prev) => prev.map((x, i) => (i === index ? value : x)));
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
              style={{
                width: msC(32),
                height: msC(32),
                borderWidth: msC(1.5),
              }}
            />
          </View>
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
              }}
            >
              <View style={{ gap: msC(6) }}>
                <Text style={{ fontFamily: "Outfit-Bold", fontSize: msC(20) }}>
                  CREATE A NEW MISSION
                </Text>
                <Text
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
                  LOCK IT IN AND GET IT DONE
                </Text>
              </View>
              <Bolt size={msC(40)} />
            </View>
          </View>
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontFamily: "Outfit-Bold",
                fontSize: msC(10),
                letterSpacing: msC(1),
              }}
            >
              MISSION TITLE
            </Text>
            <TextInput
              style={{
                backgroundColor: "white",
                padding: msC(12),
                borderWidth: msC(2),
                shadowColor: "#000",
                shadowOffset: { width: msC(2), height: msC(2) },
                shadowOpacity: 1,
                shadowRadius: 0,
                width: "100%",
                fontFamily: "Outfit-Bold",
                fontSize: msC(16),
                color: "#000",
                textAlign: "left",
                letterSpacing: msC(0.5),
                paddingVertical: msC(12),
                paddingHorizontal: msC(8),
              }}
              underlineColorAndroid="transparent"
              placeholder="Enter your Mission title here..."
            />
          </View>
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontFamily: "Outfit-Bold",
                fontSize: msC(10),
                letterSpacing: msC(1),
              }}
            >
              DIRECTIVES
            </Text>
            <TextInput
              multiline
              style={{
                backgroundColor: "white",
                padding: msC(12),
                borderWidth: msC(2),
                shadowColor: "#000",
                shadowOffset: { width: msC(2), height: msC(2) },
                shadowOpacity: 1,
                shadowRadius: 0,
                width: "100%",
                fontFamily: "Outfit-Bold",
                fontSize: msC(16),
                color: "#000",
                textAlign: "left",
                letterSpacing: msC(0.5),
                paddingVertical: msC(12),
                paddingHorizontal: msC(8),
              }}
              underlineColorAndroid="transparent"
              placeholder="Enter your Mission directive here..."
            />
          </View>
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontFamily: "Outfit-Bold",
                fontSize: msC(10),
                letterSpacing: msC(1),
              }}
            >
              TARGET DOMAIN
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: msC(4),
                justifyContent: "center",
                marginVertical: msC(6),
              }}
            >
              {DOMAINS.map((domain: string, index) => (
                <Pressable
                  key={index}
                  onPress={() => handleDomain(domain as Domain)}
                >
                  <Text
                    style={{
                      fontFamily: "Outfit-Bold",
                      fontSize: msC(12),
                      backgroundColor:
                        formData.target_domain === domain ? "#8AD8FF" : "white",
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
            <Text
              style={{
                fontFamily: "Outfit-Bold",
                fontSize: msC(10),
                letterSpacing: msC(1),
              }}
            >
              PRIORITY
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: msC(4),
                justifyContent: "center",
                marginVertical: msC(6),
              }}
            >
              {PRIORITIES.map((priority: string, index) => (
                <Pressable
                  key={index}
                  onPress={() => handlePriority(priority as Priority)}
                  style={{ width: "100%", flex: 1 }}
                >
                  <Text
                    style={{
                      fontFamily: "Outfit-Bold",
                      fontSize: msC(12),
                      backgroundColor:
                        formData.priority === priority &&
                        priority === "critical"
                          ? "#FF6B4A"
                          : formData.priority === priority &&
                              priority !== "critical"
                            ? "#8AD8FF"
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
                      color:
                        formData.priority === priority &&
                        priority === "critical"
                          ? "white"
                          : "black",
                    }}
                  >
                    {priority.toUpperCase()}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontFamily: "Outfit-Bold",
                fontSize: msC(10),
                letterSpacing: msC(1),
              }}
            >
              DEADLINE
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: msC(4),
                justifyContent: "center",
                marginVertical: msC(6),
              }}
            >
              <Pressable style={{ width: "100%", flex: 1 }}>
                <View
                  style={{
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
                  }}
                >
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
                  <View>
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
                <View
                  style={{
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
                  }}
                >
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
                  <View>
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
            <Text
              style={{
                fontFamily: "Outfit-Bold",
                fontSize: msC(10),
                letterSpacing: msC(1),
              }}
            >
              SUBTASKS
            </Text>
            <View
              style={{
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
              }}
            >
              <TextInput
                value={subtaskText[0]}
                onChangeText={(t) => handleSubtaskText(0, t)}
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
                placeholder="Enter Mission Subtask 1 here..."
                placeholderTextColor="#9CA3AF"
              />
              <Pressable onPress={() => handleSubtaskText(0, "")}>
                <Delete size={msC(24)} />
              </Pressable>
            </View>
            <View
              style={{
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
              }}
            >
              <TextInput
                value={subtaskText[1]}
                onChangeText={(t) => handleSubtaskText(1, t)}
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
                placeholder="Enter Mission Subtask 2 here..."
                placeholderTextColor="#9CA3AF"
              />
              <Pressable onPress={() => handleSubtaskText(1, "")}>
                <Delete size={msC(24)} />
              </Pressable>
            </View>
            <View
              style={{
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
              }}
            >
              <TextInput
                value={subtaskText[2]}
                onChangeText={(t) => handleSubtaskText(2, t)}
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
                placeholder="Enter Mission Subtask 3 here..."
                placeholderTextColor="#9CA3AF"
              />
              <Pressable onPress={() => handleSubtaskText(2, "")}>
                <Delete size={msC(24)} />
              </Pressable>
            </View>
            <View
              style={{
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
              }}
            >
              <TextInput
                value={subtaskText[3]}
                onChangeText={(t) => handleSubtaskText(3, t)}
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
                placeholder="Enter Mission Subtask 4 here..."
                placeholderTextColor="#9CA3AF"
              />
              <Pressable onPress={() => handleSubtaskText(3, "")}>
                <Delete size={msC(24)} />
              </Pressable>
            </View>
          </View>
          <View
            style={{
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
              width: "100%",
              justifyContent: "space-between",
            }}
          >
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
              <Bell size={msC(16)} />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "Outfit-Bold",
                  fontSize: msC(14),
                }}
              >
                ALERT
              </Text>
              <Text
                style={{
                  fontFamily: "Outfit-Bold",
                  fontSize: msC(10),
                  color: "gray",
                }}
              >
                Push Notification 15 min prior to the Deadline
              </Text>
            </View>
            <Pressable onPress={toggleNotify15Min}>
              {formData.notify_15_min ? (
                <Yes size={msC(50)} />
              ) : (
                <No size={msC(50)} />
              )}
            </Pressable>
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
            <Text style={{ fontFamily: "Outfit-SemiBold", fontSize: msC(16) }}>
              CREATE MISSION
            </Text>
          </View>
          <View
            style={{
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
              paddingHorizontal: msC(16),
              paddingVertical: msC(8),
            }}
          >
            <Text style={{ fontFamily: "Outfit-SemiBold", fontSize: msC(16) }}>
              DISCARD
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "stretch",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
});
