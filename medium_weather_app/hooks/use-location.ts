import UseLocationReturn, { GeolocationMessage } from "@/types/geolocation";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";

export function useLocation(): UseLocationReturn {
  const [firstLocation, setFirstLocation] = useState<GeolocationMessage | null>(
    null,
  );

  const getCurrentLocation = useCallback(async () => {
    setFirstLocation({ message: "Waiting...", error: false });
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setFirstLocation({
          message: "Permission to access location was denied",
          error: true,
        });
        return;
      }
    } catch (error: any) {
      setFirstLocation({ message: error.message, error: true });
      return;
    }

    try {
      const position = await Location.getCurrentPositionAsync({});
      if (position) {
        setFirstLocation({
          message:
            position.coords.latitude.toString() +
            " " +
            position.coords.longitude.toString(),
          error: false,
        });
      }
    } catch (error: any) {
      setFirstLocation({ message: error.message, error: true });
    }
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return {
    firstLocation,
    setFirstLocation,
    getCurrentLocation,
  };
}
