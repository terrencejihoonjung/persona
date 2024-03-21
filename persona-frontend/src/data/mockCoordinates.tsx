interface CityCoordinates {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export const mockCities: CityCoordinates[] = [
  {
    name: "New York, USA",
    coordinates: { latitude: 40.712776, longitude: -74.005974 },
  },
  {
    name: "London, UK",
    coordinates: { latitude: 51.507351, longitude: -0.127758 },
  },
  {
    name: "Tokyo, Japan",
    coordinates: { latitude: 35.689487, longitude: 139.691711 },
  },
  {
    name: "Sydney, Australia",
    coordinates: { latitude: -33.86882, longitude: 151.20929 },
  },
  {
    name: "Paris, France",
    coordinates: { latitude: 48.856613, longitude: 2.352222 },
  },
  {
    name: "Berlin, Germany",
    coordinates: { latitude: 52.520008, longitude: 13.404954 },
  },
  {
    name: "Moscow, Russia",
    coordinates: { latitude: 55.755825, longitude: 37.617298 },
  },
  {
    name: "Cape Town, South Africa",
    coordinates: { latitude: -33.92487, longitude: 18.424055 },
  },
  {
    name: "Rio de Janeiro, Brazil",
    coordinates: { latitude: -22.906847, longitude: -43.172897 },
  },
  {
    name: "Beijing, China",
    coordinates: { latitude: 39.904202, longitude: 116.407394 },
  },
];

export default mockCities;
