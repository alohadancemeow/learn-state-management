const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

if (!API_KEY) {
  console.warn('Missing NEXT_PUBLIC_TMDB_API_KEY environment variable');
}

/**
 * Generic fetcher for the TMDB API.
 * 
 * Handles authentication via API key, query parameter construction,
 * and basic error handling.
 *
 * @template T - The expected return type of the API response.
 * @param {string} endpoint - The API endpoint path (e.g., '/movie/popular').
 * @param {Record<string, string>} [params={}] - Optional query parameters to include in the request.
 *                                               Default parameters like 'api_key' and 'language' are automatically added.
 * @returns {Promise<T>} A promise that resolves to the JSON response from the API.
 * @throws {Error} Throws an error if the API key is missing or if the network request fails (non-2xx status).
 * 
 * @example
 * const movies = await fetchFromTMDB<MovieListResponse>('/movie/popular', { page: '1' });
 */
export const fetchFromTMDB = async <T>(endpoint: string, params: Record<string, string> = {}): Promise<T> => {
  if (!API_KEY) {
    throw new Error("API Key is missing");
  }
  const query = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    ...params,
  }).toString();

  const response = await fetch(`${BASE_URL}${endpoint}?${query}`);

  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Constructs the full URL for a TMDB image.
 * 
 * @param {string} path - The image path returned by the API (e.g., '/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg').
 * @param {'w500' | 'original'} [size='w500'] - The desired image size. Defaults to 'w500'.
 * @returns {string} The complete URL to the image, or a placeholder image URL if the path is invalid/empty.
 * 
 * @example
 * const posterUrl = getImageUrl(movie.poster_path, 'w500');
 */
export const getImageUrl = (path: string, size: 'w500' | 'original' = 'w500') => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : '/placeholder-movie.png';
};
