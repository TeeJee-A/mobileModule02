interface HourlyWeather {
  hourly: {
    name: string;
    region: string;
    country: string;
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
    windspeed_10m: number[];
  };
  hourly_units: {
    temperature_2m: string;
    windspeed_10m: string;
  };
}

export default HourlyWeather;
