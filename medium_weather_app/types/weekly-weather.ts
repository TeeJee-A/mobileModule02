interface WeeklyData {
  daily: {
    name: string;
    region: string;
    country: string;
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
    time: string[];
  };
  daily_units: {
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
}

export default WeeklyData;
