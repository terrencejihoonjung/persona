import { useState } from "react";
import ToggleSwitch from "../../ToggleSwitch";
import useWeather from "../../hooks/useWeather";
import WeatherIcon from "./WeatherIcon";
import HourlyWeatherCard from "./HourlyWeatherCard";

function WeatherWidget() {
  const [isFahrenheit, setIsFahrenheit] = useState(true);
  const { weatherData, error } = useWeather(33.6846, 117.8265);
  console.log(weatherData);

  const toggleTemperature = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  return (
    <div className="flex flex-col items-center border rounded-2xl w-full max-w-4xl h-1/2 py-7 px-14">
      {error || !weatherData ? (
        <p>There was an error fetching from weather data</p>
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
                  {isFahrenheit
                    ? `${Math.round(weatherData.current.temp)}°F`
                    : `${Math.round(weatherData.current.tempCelsius)}°C`}
                </h1>
              </div>
              <div id="b2" className="flex flex-col items-end">
                <h3 className="text-lg font-black mb-2">Mostly Clear</h3>
                <WeatherIcon
                  weatherIconCode={weatherData.current.weather[0].icon}
                />
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="flex justify-between space-x-8">
              {/* HourlyWeatherCard */}
              {weatherData.hourlyForecastData.map((hourlyData) => {
                return (
                  <HourlyWeatherCard
                    key={hourlyData.dt}
                    weatherData={hourlyData}
                    isFahrenheit={isFahrenheit}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherWidget;
