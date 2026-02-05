interface CurrentlyWeather {
  current_weather: {
    name: string;
    region: string;
    country: string;
    temperature: number;
    condition: string;
    windSpeed: number;
  };
  current_weather_units: {
    temperature: string;
    windspeed: string;
  };
}

export default CurrentlyWeather;
