import SelectedLocation from "@/types/selected-location";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export function useSearch() {
  const [search, setSearch] = useState<string>("");
  const [countries, setCountries] = useState<SelectedLocation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [debouncedSearch] = useDebounce(search, 1000);
  const handleChangeText = (text: string) => {
    setSearch(text);
    setCountries([]);
    setError(null);
    setLoading(true);
  };

  const searchLocation = useCallback(async (query: string) => {
    try {
      setError(null);
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`,
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(
          data.error.message || "An error occurred during search",
        );
      }
      if (!data.results || data.results.length === 0) {
        setError("No results found");
        setCountries([]);
      } else {
        setCountries(data.results);
      }
    } catch (error: any) {
      setError(error.message || "Could not fetch locations");
      setCountries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedSearch) {
      searchLocation(debouncedSearch);
    }
  }, [debouncedSearch, searchLocation]);

  return {
    search,
    countries,
    loading,
    error,
    handleChangeText,
    setSearch,
  };
}
