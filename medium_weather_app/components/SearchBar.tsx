import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  search: string;
  colorScheme: "light" | "dark";
  onChangeText: (text: string) => void;
  onSearch: () => void;
}

export default function SearchBar({
  search,
  colorScheme,
  onChangeText,
  onSearch,
}: SearchBarProps) {
  return (
    <View
      style={[
        styles.searchContainer,
        {
          backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#F0F0F0",
        },
      ]}
    >
      <TextInput
        style={[
          styles.searchInput,
          { color: colorScheme === "dark" ? "white" : "black" },
        ]}
        placeholder="Search city..."
        placeholderTextColor="grey"
        value={search}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
        <Ionicons
          name="search"
          size={20}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingLeft: 12,
    height: 48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: "100%",
    color: "#00000060",
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    height: 48,
    width: 48,
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "transparent",
  },
});
