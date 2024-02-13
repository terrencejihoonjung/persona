type WeatherIconProps = {
  weatherIconCode: string;
};

function WeatherIcon({ weatherIconCode }: WeatherIconProps) {
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;
  return <img src={weatherIconUrl} alt="Current Weather Icon" />;
}

export default WeatherIcon;
