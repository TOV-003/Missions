import { Text, View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/components/Logo";
import { Link } from "expo-router";
import { moderateScale } from "react-native-size-matters";
export const msC = (size: number) => moderateScale(size, 0.2);

export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Logo size={msC(96)} />
        <Text style={{ fontFamily: "Outfit-Bold", fontSize: msC(64) }}>
          WELCOME{"\n"}TO{"\n"}MISSIONS
        </Text>
        <Link
          style={{
            fontFamily: "Outfit-SemiBold",
            fontSize: msC(24),
            backgroundColor: "#8AD8FF",
            padding: msC(12),
            borderWidth: msC(4),
            shadowColor: "#000",
            shadowOffset: { width: msC(4), height: msC(4) },
            shadowRadius: 0,
          }}
          href="/Tasks"
        >
          CONTINUE
        </Link>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: msC(16),
    gap: msC(20),
  },
});
