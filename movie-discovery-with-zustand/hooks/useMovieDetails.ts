import { useQuery } from '@tanstack/react-query';
import { fetchFromTMDB } from '@/lib/tmdb';
import { MovieDetails } from '@/types/tmdb';

export const useMovieDetails = (id: string) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchFromTMDB<MovieDetails>(`/movie/${id}`),
    enabled: !!id,
  });
};
