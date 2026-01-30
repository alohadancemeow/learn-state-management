import { useQuery } from '@tanstack/react-query';
import { fetchFromTMDB } from '@/lib/tmdb';
import { GenreResponse } from '@/types/tmdb';

/**
 * Custom hook to fetch the list of movie genres from TMDB.
 * 
 * Uses React Query to fetch data from '/genre/movie/list'.
 * The data is cached for 24 hours (staleTime) as genre lists rarely change.
 * 
 * @returns {UseQueryResult<GenreResponse, Error>} The query result containing the list of genres.
 * 
 * @example
 * const { data: genres } = useGenres();
 */
export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => fetchFromTMDB<GenreResponse>('/genre/movie/list'),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};
