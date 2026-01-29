'use client';

import { useTrendingMovies } from '@/hooks/useTrendingMovies';
import { useSearchMovies } from '@/hooks/useSearchMovies';
import { useDiscoverMovies } from '@/hooks/useDiscoverMovies';
import { useSearchStore } from '@/store/useSearchStore';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import GenreFilter from '@/components/GenreFilter';
import MovieSkeleton from '@/components/MovieSkeleton';

export default function Home() {
  const { searchQuery, selectedGenre } = useSearchStore();
  
  const trendingQuery = useTrendingMovies();
  const searchQueryResult = useSearchMovies(searchQuery);
  const discoverQuery = useDiscoverMovies(selectedGenre);

  // Determine which query to use
  let currentQuery;
  let title;

  if (searchQuery) {
    currentQuery = searchQueryResult;
    title = `Search Results for "${searchQuery}"`;
  } else if (selectedGenre) {
    currentQuery = discoverQuery;
    title = 'Movies by Genre';
  } else {
    currentQuery = trendingQuery;
    title = 'Trending This Week';
  }

  const { data, isLoading, error } = currentQuery;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Movie Discovery</h1>
      
      <SearchBar />
      {!searchQuery && <GenreFilter />}

      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <MovieSkeleton key={i} />
          ))}
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 p-8">
          Error loading movies. Please try again later.
        </div>
      )}

      {!isLoading && !error && data?.results.length === 0 && (
        <div className="text-center text-gray-500 p-8">
          No movies found.
        </div>
      )}

      {!isLoading && !error && (
        <>
          <h2 className="text-xl font-semibold mb-6">{title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data?.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
