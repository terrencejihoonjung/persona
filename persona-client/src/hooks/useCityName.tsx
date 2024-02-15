import { useState, useEffect } from "react";
import { Coordinates } from "../types/GeoLocationTypes";

const useCityName = ({ latitude, longitude }: Coordinates) => {
  const [cityName, setCityName] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [cityError, setCityError] = useState<string | null>(null);

  useEffect(() => {
    if (latitude === null || longitude === null) {
      setCityError("Invalid Coordinates");
      return;
    }

    setIsFetching(true);
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${
        import.meta.env.VITE_OPENCAGE_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setIsFetching(false);
        const result = data.results[0];
        if (result) {
          setCityName(
            result.components.city ||
              result.components.town ||
              "Unknown Location"
          );
        } else {
          setCityError("Unable to fetch city name");
        }
      })
      .catch((err) => {
        setIsFetching(false);
        setCityError(err.toString());
      });
  }, [latitude, longitude]);

  return { cityName, isFetching, cityError };
};

export default useCityName;
