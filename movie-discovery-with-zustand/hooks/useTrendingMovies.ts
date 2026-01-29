import { useQuery } from '@tanstack/react-query';
import { fetchFromTMDB } from '@/lib/tmdb';
import { MovieResponse } from '@/types/tmdb';

export const useTrendingMovies = () => {
  return useQuery({
    queryKey: ['trending'],
    queryFn: () => fetchFromTMDB<MovieResponse>('/trending/movie/week'),
  });
};
