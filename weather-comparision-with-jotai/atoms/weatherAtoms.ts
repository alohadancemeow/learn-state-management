import { atom } from 'jotai';
import { atomWithStorage, loadable } from 'jotai/utils';
import { atomFamily } from 'jotai-family'
import axios from 'axios';
import { WeatherData, ForecastData } from '@/types/weather';

// Atom for selected cities (array of city names)
// We use a simple atom here. For persistence, we could use atomWithStorage.
/**
 * Atom holding the list of currently selected cities for comparison.
 * 
 * @type {PrimitiveAtom<string[]>}
 * @default []
 */
export const selectedCitiesAtom = atom<string[]>([]);

// Atom for favorite cities (persisted)
// atomWithStorage automatically syncs with localStorage and handles updates across tabs
/**
 * Atom holding the list of favorite cities, persisted in local storage.
 * This allows the user's favorite cities to be remembered across sessions.
 * 
 * @type {WritableAtom<string[], [string[]], void>}
 * @default []
 * @storageKey 'weather-favorites'
 */
export const favoriteCitiesAtom = atomWithStorage<string[]>('weather-favorites', []);

// Atom family for current weather per city
// atomFamily creates a unique atom for each parameter (city).
// This ensures we cache data per city and don't re-fetch when other state changes.
/**
 * Atom Family for fetching current weather data for a specific city.
 * 
 * Creates a unique atom for each city name provided.
 * - Caches the result (Jotai behavior for async atoms).
 * - Handles API calls to `/api/weather`.
 * - Throws an error if the city is not found (404), which is handled by the `loadable` wrapper or Error Boundaries.
 * 
 * @param {string} city - The name of the city to fetch weather for.
 * @returns {Atom<Promise<WeatherData>>} An async atom resolving to the weather data.
 */
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

/**
 * Atom Family for fetching 5-day forecast data for a specific city.
 * 
 * Similar to `weatherFamily`, this creates a unique atom for each city.
 * 
 * @param {string} city - The name of the city to fetch forecast for.
 * @returns {Atom<Promise<ForecastData>>} An async atom resolving to the forecast data.
 */
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
/**
 * Derived atom that returns an array of weather atoms for the currently selected cities.
 * 
 * Useful for rendering a list of components where each component subscribes to its own city's atom.
 * This prevents re-rendering the entire list when one city's data updates.
 * 
 * @returns {Atom<Atom<Promise<WeatherData>>[]>} An atom containing an array of weather atoms.
 */
export const comparisonWeatherAtomsAtom = atom((get) => {
  const cities = get(selectedCitiesAtom);
  return cities.map((city) => weatherFamily(city));
});

// Derived atom that waits for all weather data to be resolved (for Table view)
// This atom suspends until ALL selected cities have loaded.
// It's useful for the table view where we want to show all rows at once.
// Performance Note: Adding a new city will cause this to suspend again while the new city loads.
// Previously loaded cities are cached by weatherFamily, so they won't re-fetch.
/**
 * Derived atom that resolves when ALL selected cities' weather data is fetched.
 * 
 * - Waits for all promises to settle.
 * - Filters out any failed requests (returning null) to prevent the entire view from crashing.
 * - Useful for aggregated views like tables where data needs to be presented together.
 * 
 * @returns {Atom<Promise<WeatherData[]>>} An async atom resolving to an array of successfully fetched weather data.
 */
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

/**
 * Derived atom that resolves when ALL selected cities' forecast data is fetched.
 * 
 * Similar to `allWeatherAtom`, but for forecasts.
 * 
 * @returns {Atom<Promise<ForecastData[]>>} An async atom resolving to an array of successfully fetched forecast data.
 */
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
/**
 * Loadable Atom Family for Weather.
 * 
 * Wraps `weatherFamily` with `loadable` utility.
 * Instead of suspending React (requiring Suspense), it returns an object with the current state:
 * - `state`: 'loading' | 'hasData' | 'hasError'
 * - `data`: The resolved data (if hasData)
 * - `error`: The error object (if hasError)
 * 
 * This allows components to render loading spinners or error messages inline.
 * 
 * @param {string} city - The city name.
 */
export const weatherFamilyLoadable = atomFamily((city: string) => loadable(weatherFamily(city)));

/**
 * Loadable Atom Family for Forecast.
 * Wraps `forecastFamily` with `loadable` utility.
 * 
 * @param {string} city - The city name.
 */
export const forecastFamilyLoadable = atomFamily((city: string) => loadable(forecastFamily(city)));
