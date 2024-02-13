import { useState, useEffect, useCallback } from "react";
import { WeatherData, TotalWeatherData } from "../types/WeatherTypes";

// Helper function to convert Fahrenheit to Celsius
const convertFtoC = (fahrenheit: number) => {
  return ((fahrenheit - 32) * 5) / 9;
};

function useWeather(latitude: number, longitude: number) {
  const [weatherData, setWeatherData] = useState<TotalWeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch weather data
  const fetchWeather = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,daily,alerts&units=imperial&appid=${
          import.meta.env.VITE_ONECALL_API_KEY
        }`
      );
      if (!response.ok) {
        throw new Error("Weather data fetch failed");
      }
      const data = await response.json();

      // Convert the temperature for the current weather and next 5 hours from F to C and cache it
      const currTempCelsius = convertFtoC(data.current.temp);
      const hourlyForecastData = data.hourly
        .slice(1, 6)
        .map((hour: WeatherData) => ({
          ...hour,
          tempCelsius: convertFtoC(hour.temp),
        }));

      setWeatherData({
        current: {
          dt: data.current.dt,
          temp: data.current.temp,
          weather: data.current.weather,
          tempCelsius: currTempCelsius,
        },
        hourlyForecastData,
      });
    } catch (error) {
      setError((error as Error).message);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    fetchWeather(); // Initial fetch

    // Set up an interval to fetch weather every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [latitude, longitude, fetchWeather]);

  return { weatherData, error };
}

export default useWeather;
