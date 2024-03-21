export type WeatherData = {
  dt: number;
  temp: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  tempCelsius: number;
};

export type TotalWeatherData = {
  timezone: string;
  current: WeatherData;
  hourlyForecastData: WeatherData[];
};
