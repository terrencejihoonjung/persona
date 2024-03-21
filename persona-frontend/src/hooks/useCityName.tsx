import { useState, useEffect } from "react";
import { Coordinates } from "../types/GeoLocationTypes";

const useCityName = ({ latitude, longitude }: Coordinates) => {
  const [cityName, setCityName] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [cityError, setCityError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCityName = async () => {
      if (latitude === null || longitude === null) {
        setCityError("Invalid Coordinates");
        return;
      }

      setIsFetching(true);
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${
            import.meta.env.VITE_OPENCAGE_API_KEY
          }&pretty=1`
        );
        if (!response.ok) throw new Error("Failed to fetch city name");

        const data = await response.json();
        const result = data.results[0];
        if (result) {
          setCityName(
            result.components.city ||
              result.components.town ||
              "Unknown Location"
          );
          setCityError(null);
        } else {
          throw new Error("City name not found in response");
        }
      } catch (err) {
        setCityError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsFetching(false);
      }
    };

    fetchCityName();
  }, [latitude, longitude]);

  return { cityName, isFetching, cityError };
};

export default useCityName;
