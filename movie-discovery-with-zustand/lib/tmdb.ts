const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

if (!API_KEY) {
  console.warn('Missing NEXT_PUBLIC_TMDB_API_KEY environment variable');
}

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

export const getImageUrl = (path: string, size: 'w500' | 'original' = 'w500') => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : '/placeholder-movie.png';
};
