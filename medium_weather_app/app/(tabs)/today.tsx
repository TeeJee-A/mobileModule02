import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLocationSearch } from "@/hooks/use-fetch-location";
import { weatherCodeMap } from "@/lib/weather-code";
import { GeolocationMessage } from "@/types/geolocation";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HourlyWeather from "../../types/hourly-weather";
import SelectedLocation from "../../types/selected-location";

const TodayScreen = ({
  selectedLocation,
  geoLocation,
}: {
  selectedLocation: SelectedLocation | null;
  geoLocation: GeolocationMessage | null;
}) => {
  const colorScheme = useColorScheme();
  const { selectCountry } = useLocationSearch();
  const [weather, setWeather] = useState<HourlyWeather | null>(null);
  const [error, setError] = useState<string | null>(null);

  const select = async () => {
    try {
      setError(null);
      const data = await selectCountry(
        selectedLocation?.latitude!,
        selectedLocation?.longitude!,
        "hourly",
      );
      setWeather({
        hourly_units: {
          temperature_2m: data.hourly_units.temperature_2m,
          windspeed_10m: data.hourly_units.windspeed_10m,
        },
        hourly: {
          name: selectedLocation?.name!,
          region: selectedLocation?.admin1!,
          country: selectedLocation?.country!,
          time: data.hourly.time,
          temperature_2m: data.hourly.temperature_2m,
          weathercode: data.hourly.weathercode,
          windspeed_10m: data.hourly.windspeed_10m,
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
        <Text style={{ color: textColor }}>Today</Text>
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
          <Text style={{ color: textColor }}>{weather?.hourly.name}</Text>
          <Text style={{ color: textColor }}>{weather?.hourly.region}</Text>
          <Text style={{ color: textColor }}>{weather?.hourly.country}</Text>
        </View>
      )}
      {selectedLocation && (
        <View style={styles.dataRow}>
          <View style={styles.dataColumn}>
            {weather?.hourly.time.map((time, index) => (
              <Text key={index} style={{ color: textColor }}>
                {time}
              </Text>
            ))}
          </View>
          <View style={styles.dataColumn}>
            {weather?.hourly.temperature_2m.map((temp, index) => (
              <Text key={index} style={{ color: textColor }}>
                {temp} {weather?.hourly_units.temperature_2m}
              </Text>
            ))}
          </View>
          <View style={styles.dataColumn}>
            {weather?.hourly.weathercode.map((code, index) => (
              <Text key={index} style={{ color: textColor }}>
                {weatherCodeMap[code] ?? "Unknown"}
              </Text>
            ))}
          </View>
          <View style={styles.dataColumn}>
            {weather?.hourly.windspeed_10m.map((speed, index) => (
              <Text key={index} style={{ color: textColor }}>
                {speed} {weather?.hourly_units.windspeed_10m}
              </Text>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default TodayScreen;

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
