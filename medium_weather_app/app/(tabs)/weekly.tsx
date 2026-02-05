import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLocationSearch } from "@/hooks/use-fetch-location";
import { GeolocationMessage } from "@/types/geolocation";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { weatherCodeMap } from "../../lib/weather-code";
import SelectedLocation from "../../types/selected-location";
import WeeklyWeather from "../../types/weekly-weather";

const WeeklyScreen = ({
  selectedLocation,
  geoLocation,
}: {
  selectedLocation: SelectedLocation | null;
  geoLocation: GeolocationMessage | null;
}) => {
  const colorScheme = useColorScheme();
  const [weather, setWeather] = useState<WeeklyWeather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { selectCountry } = useLocationSearch();

  const select = async () => {
    try {
      setError(null);
      const data = await selectCountry(
        selectedLocation?.latitude!,
        selectedLocation?.longitude!,
        "weekly",
      );
      setWeather({
        daily_units: {
          temperature_2m_max: data.daily_units.temperature_2m_max,
          temperature_2m_min: data.daily_units.temperature_2m_min,
        },
        daily: {
          name: selectedLocation?.name!,
          region: selectedLocation?.admin1!,
          country: selectedLocation?.country!,
          temperature_2m_max: data.daily.temperature_2m_max,
          temperature_2m_min: data.daily.temperature_2m_min,
          weathercode: data.daily.weathercode,
          time: data.daily.time,
        },
      });
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather data");
    }
  };

  useEffect(() => {
    if (selectedLocation) {
      select();
    }
  }, [selectedLocation]);

  const textColor = colorScheme === "dark" ? "white" : "black";

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <Text style={{ color: textColor }}>Weekly</Text>
        {geoLocation && !selectedLocation && !geoLocation.error && (
          <Text style={{ color: textColor }}>{geoLocation.message}</Text>
        )}
        {geoLocation && !selectedLocation && geoLocation.error && (
          <Text style={{ color: "red" }}>{geoLocation.message}</Text>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      {selectedLocation && (
        <View style={styles.headerContainer}>
          <Text style={{ color: textColor }}>{weather?.daily.name}</Text>
          <Text style={{ color: textColor }}>{weather?.daily.region}</Text>
          <Text style={{ color: textColor }}>{weather?.daily.country}</Text>
        </View>
      )}
      {selectedLocation && (
        <View style={styles.dataRow}>
          <View style={styles.dataColumn}>
            {weather?.daily.time.map((time, index) => (
              <Text key={index} style={{ color: textColor }}>
                {time}
              </Text>
            ))}
          </View>
          <View style={styles.dataColumn}>
            {weather?.daily.temperature_2m_min.map((temp, index) => (
              <Text key={index} style={{ color: textColor }}>
                {temp} {weather?.daily_units.temperature_2m_min}
              </Text>
            ))}
          </View>
          <View style={styles.dataColumn}>
            {weather?.daily.temperature_2m_max.map((temp, index) => (
              <Text key={index} style={{ color: textColor }}>
                {temp} {weather?.daily_units.temperature_2m_max}
              </Text>
            ))}
          </View>
          <View style={styles.dataColumn}>
            {weather?.daily.weathercode.map((code, index) => (
              <Text key={index} style={{ color: textColor }}>
                {weatherCodeMap[code] ?? "Unknown"}
              </Text>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default WeeklyScreen;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dataRow: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dataColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginTop: 20,
    textAlign: "center",
  },
});
