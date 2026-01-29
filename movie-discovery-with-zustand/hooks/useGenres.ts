import { useQuery } from '@tanstack/react-query';
import { fetchFromTMDB } from '@/lib/tmdb';
import { GenreResponse } from '@/types/tmdb';

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => fetchFromTMDB<GenreResponse>('/genre/movie/list'),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};
