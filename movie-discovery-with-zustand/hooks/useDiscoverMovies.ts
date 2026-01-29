import { useQuery } from '@tanstack/react-query';
import { fetchFromTMDB } from '@/lib/tmdb';
import { MovieResponse } from '@/types/tmdb';

export const useDiscoverMovies = (genreId: number | null) => {
  return useQuery({
    queryKey: ['discover', genreId],
    queryFn: () => fetchFromTMDB<MovieResponse>('/discover/movie', {
      sort_by: 'popularity.desc',
      with_genres: genreId ? genreId.toString() : '',
    }),
    enabled: !!genreId,
  });
};
