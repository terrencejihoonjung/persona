export type Coordinates = {
  latitude: number | null;
  longitude: number | null;
};

export type GeoLocationHook = {
  coordinates: Coordinates | null;
  geoLocationError: string | null;
};
