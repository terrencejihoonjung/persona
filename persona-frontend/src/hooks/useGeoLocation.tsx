import { Coordinates, GeoLocationHook } from "../types/GeoLocationTypes";
import { useState, useEffect } from "react";

function useGeoLocation(): GeoLocationHook {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [geoLocationError, setGeoLocationError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoLocationError("Geolocation is not supported by your browser");
      return;
    }

    function handleSuccess(position: GeolocationPosition) {
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    function handleError(error: GeolocationPositionError) {
      setGeoLocationError(error.message);
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
    });
  }, []);

  const validCoordinates =
    coordinates &&
    coordinates.latitude !== null &&
    coordinates.longitude !== null
      ? coordinates
      : null;

  return { coordinates: validCoordinates, geoLocationError };
}

export default useGeoLocation;
