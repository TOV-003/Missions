import { useState, useEffect } from "react";
import { Text } from "react-native";
import { msC } from "@/app";
export function LoaderDots() {
  const [dots, setDots] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setDots((d) => (d + 1) % 4), 400);
    return () => clearInterval(id);
  }, []);
  return (
    <Text
      style={{
        fontFamily: "Outfit-Bold",
        fontSize: msC(64),
        textAlign: "center",
      }}
    >
      Loading Missions{"\n"}
      {".".repeat(dots + 1)}
    </Text>
  );
}
