import { useState, useEffect } from "react";
import { WeatherData, TotalWeatherData } from "../types/WeatherTypes";
import { Coordinates } from "../types/GeoLocationTypes";

// Helper function to convert Fahrenheit to Celsius
const convertFtoC = (fahrenheit: number) => {
  return ((fahrenheit - 32) * 5) / 9;
};

function useWeather({ latitude, longitude }: Coordinates) {
  const [weatherData, setWeatherData] = useState<TotalWeatherData | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (latitude === null || longitude === null) {
          setWeatherError("Invalid coordinates");
          return;
        }

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
        setWeatherError(null);

        console.log({
          current: {
            dt: data.current.dt,
            temp: data.current.temp,
            weather: data.current.weather,
            tempCelsius: currTempCelsius,
          },
          hourlyForecastData,
        });
      } catch (error) {
        if (error instanceof Error) setWeatherError(error.message);
        else setWeatherError("There was an error fetching data");
      }
    };

    fetchWeather(); // Initial fetch

    // Set up an interval to fetch weather every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [latitude, longitude]);

  return { weatherData, weatherError };
}

export default useWeather;
