import { useQuery } from '@tanstack/react-query';
import { fetchFromTMDB } from '@/lib/tmdb';
import { MovieResponse } from '@/types/tmdb';

/**
 * Custom hook to search for movies based on a text query.
 * 
 * Uses React Query to fetch data from '/search/movie'.
 * The query is only executed if the query string is not empty.
 * 
 * @param {string} query - The search text entered by the user.
 * @returns {UseQueryResult<MovieResponse, Error>} The query result containing matching movies.
 * 
 * @example
 * const { data: results } = useSearchMovies('Batman');
 */
export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => fetchFromTMDB<MovieResponse>('/search/movie', { query }),
    enabled: !!query,
  });
};
