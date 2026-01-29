'use client';

import { useGenres } from '@/hooks/useGenres';
import { useSearchStore } from '@/store/useSearchStore';

export default function GenreFilter() {
  const { data: genresData } = useGenres();
  const { selectedGenre, setSelectedGenre } = useSearchStore();

  if (!genresData?.genres) return null;

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      <button
        onClick={() => setSelectedGenre(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedGenre === null
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        All
      </button>
      {genresData.genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => setSelectedGenre(genre.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedGenre === genre.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}
