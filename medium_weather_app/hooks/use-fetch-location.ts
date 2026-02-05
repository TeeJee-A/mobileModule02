import { useCallback } from "react";

interface UseLocationSearchReturn {
  selectCountry: (
    latitude: string,
    longtitude: string,
    days?: string,
  ) => Promise<any>;
}

export function useLocationSearch(): UseLocationSearchReturn {
  const selectCountry = useCallback(
    async (latitude: string, longtitude: string, flag?: string) => {
      const CURRENT_API = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longtitude}&current_weather=true&timezone=auto`;
      const HOURLY_API = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longtitude}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,windspeed_10m&timezone=auto&forecast_days=1`;
      const WEEKLY_API = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longtitude}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum&timezone=auto&forecast_days=7`;

      try {
        const response = await fetch(
          flag == "weekly"
            ? WEEKLY_API
            : flag == "hourly"
              ? HOURLY_API
              : CURRENT_API,
        );
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error: any) {
        throw error;
      }
    },
    [],
  );

  return {
    selectCountry,
  };
}
