import { useState } from "react";
import ToggleSwitch from "../../ToggleSwitch";
import useWeather from "../../hooks/useWeather";
import useGeoLocation from "../../hooks/useGeoLocation";

import WeatherIcon from "./WeatherIcon";
import HourlyWeatherCard from "./HourlyWeatherCard";

function WeatherWidget() {
  const [isFahrenheit, setIsFahrenheit] = useState(true);
  const { coordinates, geoLocationError } = useGeoLocation();
  const { weatherData, weatherError } = useWeather(
    coordinates ? coordinates : { latitude: null, longitude: null }
  );

  const toggleTemperature = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  return (
    <div className="flex flex-col items-center border rounded-2xl shadow-lg w-full max-w-4xl h-1/2 py-7 px-14">
      {geoLocationError || weatherError ? (
        <p className="text-lg font-bold text-red-500 w-full">
          {geoLocationError || weatherError}
        </p>
      ) : (
        <>
          <span className="w-full flex justify-end mr-2 mb-4">
            <ToggleSwitch
              onToggle={toggleTemperature}
              isFahrenheit={isFahrenheit}
            />
          </span>

          {/* Main Content */}
          <div className="flex flex-col justify-between w-full">
            {/* Current Weather */}
            <div className="flex justify-between mb-36">
              <div id="b1" className="flex flex-col items-start">
                <h3 className="text-lg font-black">Aliso Viejo, CA</h3>
                <h1 className="text-8xl font-regular">
                  {!coordinates || !weatherData ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-3 ..."
                      viewBox="0 0 24 24"
                    />
                  ) : isFahrenheit ? (
                    `${Math.round(weatherData.current.temp)}°F`
                  ) : (
                    `${Math.round(weatherData.current.tempCelsius)}°C`
                  )}
                </h1>
              </div>
              <div id="b2" className="flex flex-col items-end">
                <h3 className="text-lg font-black mb-2">Mostly Clear</h3>
                {!coordinates || !weatherData ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 ..."
                    viewBox="0 0 24 24"
                  />
                ) : (
                  <WeatherIcon
                    weatherIconCode={weatherData.current.weather[0].icon}
                  />
                )}
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="flex justify-between space-x-8">
              {/* HourlyWeatherCard */}
              {!coordinates || !weatherData ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 ..."
                  viewBox="0 0 24 24"
                />
              ) : (
                weatherData.hourlyForecastData.map((hourlyData) => {
                  return (
                    <HourlyWeatherCard
                      key={hourlyData.dt}
                      weatherData={hourlyData}
                      isFahrenheit={isFahrenheit}
                    />
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherWidget;
