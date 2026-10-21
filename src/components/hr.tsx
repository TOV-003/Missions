import React from "react";
import { View, StyleSheet } from "react-native";

type HrProps = {
  color?: string;
};

const Hr = ({ color = "#cccccc" }: HrProps) => {
  return <View style={[styles.hr, { borderBottomColor: color }]} />;
};

const styles = StyleSheet.create({
  hr: {
    borderBottomWidth: 2,
    width: "100%",
    marginVertical: 6,
  },
});

export default Hr;
