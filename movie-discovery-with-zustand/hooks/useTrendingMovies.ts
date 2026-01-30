import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFromTMDB } from '@/lib/tmdb';
import { MovieResponse } from '@/types/tmdb';

/**
 * Custom hook to fetch the current trending movies with infinite scrolling support.
 * 
 * Uses React Query's useInfiniteQuery to fetch data from '/trending/movie/week'.
 * Displays movies trending over the last week.
 * 
 * @returns {UseInfiniteQueryResult<InfiniteData<MovieResponse>, Error>} The query result containing trending movies pages.
 * 
 * @example
 * const { data, fetchNextPage, hasNextPage } = useTrendingMovies();
 */
export const useTrendingMovies = () => {
  return useInfiniteQuery({
    queryKey: ['trending'],
    queryFn: ({ pageParam = 1 }) => fetchFromTMDB<MovieResponse>('/trending/movie/week', { page: String(pageParam) }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });
};
