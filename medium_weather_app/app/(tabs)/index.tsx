import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLocationSearch } from "@/hooks/use-fetch-location";
import { GeolocationMessage } from "@/types/geolocation";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { weatherCodeMap } from "../../lib/weather-code";
import CurrentlyWeather from "../../types/currently-weather";
import SelectedLocation from "../../types/selected-location";

const CurrentlyScreen = ({
  selectedLocation,
  geoLocation,
}: {
  selectedLocation: SelectedLocation | null;
  geoLocation: GeolocationMessage | null;
}) => {
  const colorScheme = useColorScheme();
  const { selectCountry } = useLocationSearch();
  const [weather, setWeather] = useState<CurrentlyWeather | null>(null);
  const [error, setError] = useState<string | null>(null);

  const select = async () => {
    try {
      setError(null);
      const data = await selectCountry(
        selectedLocation?.latitude!,
        selectedLocation?.longitude!,
      );
      setWeather({
        current_weather_units: {
          temperature: data.current_weather_units.temperature,
          windspeed: data.current_weather_units.windspeed,
        },
        current_weather: {
          name: selectedLocation?.name!,
          region: selectedLocation?.admin1!,
          country: selectedLocation?.country!,
          temperature: data.current_weather.temperature,
          condition:
            weatherCodeMap[data.current_weather.weathercode] ?? "Unknown",
          windSpeed: data.current_weather.windspeed,
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
      <View style={styles.contentContainer}>
        <Text style={[styles.text, { color: textColor }]}>Currently</Text>
        {geoLocation && !selectedLocation && !geoLocation.error && (
          <Text style={[styles.text, { color: textColor }]}>
            {geoLocation.message}
          </Text>
        )}
        {geoLocation && !selectedLocation && geoLocation.error && (
          <Text style={[styles.text, { color: "red" }]}>
            {geoLocation.message}
          </Text>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {selectedLocation && !error && (
          <View style={styles.locationText}>
            <Text style={[styles.text, { color: textColor }]}>
              {weather?.current_weather.name}
            </Text>
            <Text style={[styles.text, { color: textColor }]}>
              {weather?.current_weather.region}
            </Text>
            <Text style={[styles.text, { color: textColor }]}>
              {weather?.current_weather.country}
            </Text>
            <Text style={[styles.text, { color: textColor }]}>
              {weather?.current_weather.temperature}{" "}
              {weather?.current_weather_units.temperature}
            </Text>
            <Text style={[styles.text, { color: textColor }]}>
              {weather?.current_weather.condition}
            </Text>
            <Text style={[styles.text, { color: textColor }]}>
              {weather?.current_weather.windSpeed}{" "}
              {weather?.current_weather_units.windspeed}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default CurrentlyScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  locationText: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
    zIndex: 5,

  },
  text: {
    textAlign: "center",
    zIndex: 5,

  },
  errorText: {
    color: "red",
    marginTop: 20,
    zIndex: 5,

  },
});
