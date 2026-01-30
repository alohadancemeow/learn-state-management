'use client';

import { useEffect, useState } from 'react';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import MovieCard from '@/components/MovieCard';
import { Typography, Empty, Pagination } from 'antd';

const { Title } = Typography;
const PAGE_SIZE = 20;

/**
 * Favorites Page.
 * 
 * Displays the list of movies that the user has marked as favorites.
 * Data is retrieved from the persisted local storage via useFavoriteStore.
 * Supports client-side pagination if the list exceeds 20 items.
 */
export default function FavoritesPage() {
  const { favorites } = useFavoriteStore();
  const [currentPage, setCurrentPage] = useState(1);

  // Hydration handling
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset to page 1 if favorites change and current page is out of bounds
  // If currentPage is greater than maxPage (e.g., currentPage = 2, maxPage = 1),
  // it automatically switches you back to Page 1.
  useEffect(() => {
    const maxPage = Math.ceil(favorites.length / PAGE_SIZE);
    if (currentPage > maxPage && maxPage > 0) {
      setCurrentPage(maxPage);
    }
  }, [favorites.length, currentPage]);

  if (!mounted) {
    return null; // Or a loading skeleton/spinner
  }

  // Calculate current page items
  // 1. Calculate the starting index for the current page
  //    Page 1: (1 - 1) * 20 = 0
  //    Page 2: (2 - 1) * 20 = 20
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  // 2. Extract the subset of movies from the full list
  //    .slice(start, end) extracts elements from index 'start' up to (but not including) 'end'
  //    Page 1: slice(0, 20)  -> items 0 to 19
  //    Page 2: slice(20, 40) -> items 20 to 39
  const currentMovies = favorites.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', paddingBottom: 48 }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>My Favorites</Title>

      {favorites.length === 0 ? (
        <Empty
          description="No favorite movies yet. Go discover some!"
          style={{ margin: '60px 0' }}
        />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {currentMovies.map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>

          {favorites.length > PAGE_SIZE && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
              <Pagination
                current={currentPage}
                pageSize={PAGE_SIZE}
                total={favorites.length}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}