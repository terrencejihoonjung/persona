import { useState } from "react";
import ToggleSwitch from "../../../ToggleSwitch";
import useWeather from "../../../hooks/useWeather";
import useGeoLocation from "../../../hooks/useGeoLocation";
import useCityName from "../../../hooks/useCityName";

import capitalizeString from "../../../utils/capitalizeString";

import WeatherIcon from "./WeatherIcon";
import HourlyWeatherCard from "./HourlyWeatherCard";

// import mockCities from "../../../data/mockCoordinates";

function WeatherWidget() {
  const [isFahrenheit, setIsFahrenheit] = useState(true);

  const { coordinates, geoLocationError } = useGeoLocation();
  const { weatherData, weatherError } = useWeather(
    coordinates ? coordinates : { latitude: null, longitude: null }
  );
  const { cityName, isFetching, cityError } = useCityName(
    coordinates ? coordinates : { latitude: null, longitude: null }
  );

  const isLoading = !coordinates || !weatherData || isFetching;
  const displayError = geoLocationError || cityError || weatherError;

  const toggleTemperature = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  return (
    <div className="flex flex-col justify-between border rounded-2xl shadow-lg w-full h-full p-4">
      {isLoading ? (
        <div className="flex flex-col justify-center items-center flex-grow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="animate-spin h-5 w-5 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </div>
      ) : displayError ? (
        <p className="text-lg font-bold text-red-500 w-full h-full p-2 flex justify-center items-center">
          {displayError}
        </p>
      ) : (
        <>
          <div className="flex flex-col justify-between h-full w-full p-2">
            <div>
              <span className="w-full flex justify-end mr-2 mb-2">
                <ToggleSwitch
                  onToggle={toggleTemperature}
                  isFahrenheit={isFahrenheit}
                />
              </span>

              <div className="flex justify-between">
                <div id="b1" className="flex flex-col items-start">
                  <h3 className="text-lg font-black">{cityName}</h3>
                  <h1 className="text-6xl font-semibold">
                    {isFahrenheit
                      ? `${Math.round(weatherData.current.temp)}°F`
                      : `${Math.round(weatherData.current.tempCelsius)}°C`}
                  </h1>
                </div>
                <div id="b2" className="flex flex-col items-end">
                  <h3 className="text-lg font-black">
                    {capitalizeString(
                      weatherData.current.weather[0].description
                    )}
                  </h3>
                  <WeatherIcon
                    weatherIconCode={weatherData.current.weather[0].icon}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between space-x-8">
              {weatherData.hourlyForecastData.map((hourlyData) => (
                <HourlyWeatherCard
                  key={hourlyData.dt}
                  timezone={weatherData.timezone}
                  weatherData={hourlyData}
                  isFahrenheit={isFahrenheit}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherWidget;
