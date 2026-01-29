'use client';

import { useTrendingMovies } from '@/hooks/useTrendingMovies';
import { useSearchMovies } from '@/hooks/useSearchMovies';
import { useDiscoverMovies } from '@/hooks/useDiscoverMovies';
import { useSearchStore } from '@/store/useSearchStore';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import GenreFilter from '@/components/GenreFilter';
import MovieSkeleton from '@/components/MovieSkeleton';
import { Typography, Alert, Empty } from 'antd';

const { Title } = Typography;

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
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>Movie Discovery</Title>

      <SearchBar />
      {!searchQuery && <GenreFilter />}

      {error && (
        <Alert
          title="Error"
          description="Error loading movies. Please try again later."
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, index) => (
            <div key={index}>
              <MovieSkeleton />
            </div>
          ))}
        </div>
      ) : !error && data?.results.length === 0 ? (
        <Empty description="No movies found" />
      ) : (
        <>
          <Title level={3} style={{ marginBottom: 24 }}>{title}</Title>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data?.results.map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
