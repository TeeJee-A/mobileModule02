import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const WeeklyScreen = ({
  location,
  errorMsg,
}: {
  location: string | null;
  errorMsg: string | null;
}) => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      {!errorMsg ? (
        <View
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colorScheme === "dark" ? "white" : "black",
            }}
          >
            Currently
          </Text>
          <Text
            style={{
              color: colorScheme === "dark" ? "white" : "black",
            }}
          >
            {location ? location : "Waiting..."}
          </Text>
        </View>
      ) : (
        <Text style={{ padding: 10, color: "red" }}>{errorMsg}</Text>
      )}
    </View>
  );
};

export default WeeklyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
