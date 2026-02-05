import Entypo from "@expo/vector-icons/Entypo";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface LocationButtonProps {
  colorScheme: "light" | "dark";
  onPress: () => void;
}

export default function LocationButton({
  colorScheme,
  onPress,
}: LocationButtonProps) {
  return (
    <View
      style={[
        styles.headerRight,
        {
          backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#F0F0F0",
        },
      ]}
    >
      <TouchableOpacity onPress={onPress} style={styles.headerButton}>
        <Entypo name="location-pin" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    height: 48,
    width: 48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
  },
  headerButton: {
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#f5c419",
  },
});
