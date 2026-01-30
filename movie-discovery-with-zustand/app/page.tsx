'use client';

import { useTrendingMovies } from '@/hooks/useTrendingMovies';
import { useSearchMovies } from '@/hooks/useSearchMovies';
import { useDiscoverMovies } from '@/hooks/useDiscoverMovies';
import { useSearchStore } from '@/store/useSearchStore';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import GenreFilter from '@/components/GenreFilter';
import MovieSkeleton from '@/components/MovieSkeleton';
import { Typography, Alert, Empty, Spin } from 'antd';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Movie } from '@/types/tmdb';

const { Title } = Typography;

/**
 * Home page component.
 * 
 * Orchestrates the main movie discovery experience by coordinating:
 * - Search functionality (via SearchBar and useSearchStore).
 * - Genre filtering (via GenreFilter and useSearchStore).
 * - Data fetching (Trending vs Search vs Discover by Genre).
 * 
 * It determines the correct data source based on user interaction:
 * 1. If a search query exists -> Show search results.
 * 2. If a genre is selected -> Show movies by genre.
 * 3. Default -> Show trending movies.
 * 
 */
export default function Home() {
  const { searchQuery, selectedGenre } = useSearchStore();

  const trendingQuery = useTrendingMovies();
  const searchQueryResult = useSearchMovies(searchQuery);
  const discoverQuery = useDiscoverMovies(selectedGenre);

  // Determine which query to use based on current state priority:
  // Search > Genre Filter > Trending (Default)
  let currentQuery;
  let title;
  let isInfinite = false; // Flag to track if current query is infinite scrolling

  if (searchQuery) {
    currentQuery = searchQueryResult;
    title = `Search Results for "${searchQuery}"`;
  } else if (selectedGenre) {
    currentQuery = discoverQuery;
    title = 'Movies by Genre';
    isInfinite = true;
  } else {
    currentQuery = trendingQuery;
    title = 'Trending This Week';
    isInfinite = true;
  }

  // Type assertion or flexible destructuring since types differ between infinite and regular queries
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = currentQuery as any;

  // Intersection Observer setup for infinite scrolling
  const { ref, inView } = useInView();

  // Infinite scroll logic
  // Load more movies when the trigger element is in view and conditions are met
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && isInfinite) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isInfinite]);

  // Normalize data structure for infinite scrolling and regular queries
  const rawMovies: Movie[] = isInfinite
    ? data?.pages.flatMap((page: any) => page.results) || []
    : data?.results || [];

  // Deduplicate movies based on ID
  // This prevents "duplicate key" errors if the API returns the same movie on different pages
  // Map by ID to ensure uniqueness, then extract values
  const movies = Array.from(new Map(rawMovies.map((m) => [m.id, m])).values());

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
      ) : !error && movies.length === 0 ? (
        <Empty description="No movies found" />
      ) : (
        <>
          <Title level={3} style={{ marginBottom: 24 }}>{title}</Title>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>

          {/* Infinite Scroll Trigger */}
          {isInfinite && hasNextPage && (
            <div ref={ref} style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
              {isFetchingNextPage && <Spin size="large" />}
            </div>
          )}
        </>
      )}
    </div>
  );
}
