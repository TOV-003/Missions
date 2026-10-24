import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { msC } from ".";
import Logo from "@/components/Logo";
import { ScrollView } from "react-native";
import { Bolt } from "@/components/Icons";

export default function NewTask() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={{ width: "100%" }}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            gap: msC(10),
            marginTop: msC(10),
            paddingHorizontal: msC(16),
            alignItems: "center",
            width: "100%",
          }}
        >
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
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
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
            <View
              style={{
                backgroundColor: "white",
                padding: msC(12),
                borderWidth: msC(2),
                shadowColor: "#000",
                shadowOffset: { width: msC(2), height: msC(2) },
                shadowOpacity: 1,
                shadowRadius: 0,
                width: "100%",
              }}
            ></View>
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
