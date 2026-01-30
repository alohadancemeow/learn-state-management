import { atom } from 'jotai';
import { atomFamily, atomWithStorage, loadable } from 'jotai/utils';
import axios from 'axios';
import { WeatherData, ForecastData } from '@/types/weather';

// Atom for selected cities (array of city names)
// We use a simple atom here. For persistence, we could use atomWithStorage.
export const selectedCitiesAtom = atom<string[]>([]);

// Atom for favorite cities (persisted)
// atomWithStorage automatically syncs with localStorage and handles updates across tabs
export const favoriteCitiesAtom = atomWithStorage<string[]>('weather-favorites', []);

// Atom family for current weather per city
// atomFamily creates a unique atom for each parameter (city).
// This ensures we cache data per city and don't re-fetch when other state changes.
export const weatherFamily = atomFamily((city: string) =>
  atom(async () => {
    try {
      const response = await axios.get<WeatherData>(`/api/weather?city=${encodeURIComponent(city)}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error('City not found');
      }
      throw error;
    }
  })
);

// Atom family for 5-day forecast per city
export const forecastFamily = atomFamily((city: string) =>
  atom(async () => {
    try {
      const response = await axios.get<ForecastData>(`/api/forecast?city=${encodeURIComponent(city)}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error('Forecast not found');
      }
      throw error;
    }
  })
);

// Derived atom for comparison data (all selected cities weather)
// Note: This returns an array of atoms. UI can map over them and use useAtomValue for fine-grained updates.
export const comparisonWeatherAtomsAtom = atom((get) => {
  const cities = get(selectedCitiesAtom);
  return cities.map((city) => weatherFamily(city));
});

// Derived atom that waits for all weather data to be resolved (for Table view)
// This atom suspends until ALL selected cities have loaded.
// It's useful for the table view where we want to show all rows at once.
// Performance Note: Adding a new city will cause this to suspend again while the new city loads.
// Previously loaded cities are cached by weatherFamily, so they won't re-fetch.
export const allWeatherAtom = atom(async (get) => {
  const cities = get(selectedCitiesAtom);
  const promises = cities.map(async (city) => {
    try {
      return await get(weatherFamily(city));
    } catch (e) {
      return null;
    }
  });
  const results = await Promise.all(promises);
  return results.filter((item): item is WeatherData => item !== null);
});

export const allForecastAtom = atom(async (get) => {
  const cities = get(selectedCitiesAtom);
  const promises = cities.map(async (city) => {
    try {
      return await get(forecastFamily(city));
    } catch (e) {
      return null;
    }
  });
  const results = await Promise.all(promises);
  return results.filter((item): item is ForecastData => item !== null);
});

// Loadable versions for better error handling in UI
// These wrap the async atoms to return { state, data, error } instead of suspending.
// This allows individual components (like WeatherCard) to handle their own loading/error states.
export const weatherFamilyLoadable = atomFamily((city: string) => loadable(weatherFamily(city)));
export const forecastFamilyLoadable = atomFamily((city: string) => loadable(forecastFamily(city)));
