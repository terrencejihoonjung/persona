import { WeatherData } from "../../types/WeatherTypes";

type HourlyWeatherCardProps = {
  weatherData: WeatherData;
  isFahrenheit: boolean;
};

function HourlyWeatherCard({
  isFahrenheit,
  weatherData,
}: HourlyWeatherCardProps) {
  // Convert UNIX timestamp to Date object
  const date = new Date(weatherData.dt * 1000);

  // Format the time in a human-readable form, e.g., "1 AM" or "2 PM"
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-lg font-black">{timeString}</h3>
      <img className="w-20 h-20" src={iconUrl} alt="Icon" />
      <p className="text-md font-semibold">
        {isFahrenheit
          ? `${Math.round(weatherData.temp)}°F`
          : `${Math.round(weatherData.tempCelsius)}°C`}
      </p>
    </div>
  );
}

export default HourlyWeatherCard;
