import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFromTMDB } from '@/lib/tmdb';
import { MovieResponse } from '@/types/tmdb';

/**
 * Custom hook to discover movies based on a selected genre with infinite scrolling support.
 * 
 * Uses React Query to fetch data from the TMDB '/discover/movie' endpoint.
 * Results are sorted by popularity in descending order.
 * 
 * @param {number | null} genreId - The ID of the genre to filter by.
 * @returns {UseInfiniteQueryResult<InfiniteData<MovieResponse>, Error>} The query result containing movie data pages.
 * 
 * @example
 * const { data, fetchNextPage, hasNextPage } = useDiscoverMovies(28); // 28 is Action
 */
export const useDiscoverMovies = (genreId: number | null) => {
  return useInfiniteQuery({
    queryKey: ['discover', genreId],
    queryFn: ({ pageParam = 1 }) => fetchFromTMDB<MovieResponse>('/discover/movie', {
      sort_by: 'popularity.desc',
      with_genres: genreId ? genreId.toString() : '',
      page: String(pageParam),
    }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    enabled: !!genreId, // Only enable if genreId is provided
  });
};
