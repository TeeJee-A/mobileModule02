import SelectedLocation from "@/types/selected-location";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SearchResultsProps {
  countries: SelectedLocation[];
  loading: boolean;
  error: string | null;
  colorScheme: "light" | "dark";
  onSelectCountry: (location: SelectedLocation) => void;
}

export default function SearchResults({
  countries,
  loading,
  error,
  colorScheme,
  onSelectCountry,
}: SearchResultsProps) {
  return (
    <View
      style={[
        styles.searchResults,
        {
          backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#F0F0F0",
        },
      ]}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="gray" />
        </View>
      ) : (
        <View style={styles.resultsContainer}>
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            countries.map((country) => (
              <TouchableOpacity
                key={country.id}
                onPress={() =>
                  onSelectCountry({
                    latitude: country.latitude,
                    longitude: country.longitude,
                    name: country.name,
                    country: country.country,
                    admin1: country.admin1,
                    id: country.id,
                  })
                }
                style={styles.resultItem}
              >
                <Text
                  style={{
                    color: colorScheme === "dark" ? "white" : "black",
                  }}
                >
                  {country.name} {country.admin1}, {country.country}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchResults: {
    position: "absolute",
    top: 70,
    borderRadius: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
    zIndex: 100,
  },
  loadingContainer: {
    padding: 10,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 15,
  },
  resultsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    width: "100%",
    gap: 10,
  },
  errorText: {
    color: "red",
    padding: 10,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
});
