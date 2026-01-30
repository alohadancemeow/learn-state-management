import { useQuery } from '@tanstack/react-query';
import { fetchFromTMDB } from '@/lib/tmdb';
import { MovieDetails } from '@/types/tmdb';

/**
 * Custom hook to fetch detailed information for a specific movie.
 * 
 * Uses React Query to fetch data from '/movie/{id}'.
 * The query is only enabled if a valid ID is provided.
 * 
 * @param {string} id - The unique identifier of the movie.
 * @returns {UseQueryResult<MovieDetails, Error>} The query result containing full movie details.
 * 
 * @example
 * const { data: movie } = useMovieDetails('12345');
 */
export const useMovieDetails = (id: string) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchFromTMDB<MovieDetails>(`/movie/${id}`),
    enabled: !!id,
  });
};
