'use client';

import { useGenres } from '@/hooks/useGenres';
import { useSearchStore } from '@/store/useSearchStore';
import { Radio, Space } from 'antd';

/**
 * Component for filtering movies by genre.
 * 
 * Fetches available genres from TMDB and renders them as a radio group.
 * Updates the global search store with the selected genre ID.
 */
export default function GenreFilter() {
  const { data: genresData } = useGenres();
  const { selectedGenre, setSelectedGenre } = useSearchStore();

  if (!genresData?.genres) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
      <Space wrap>
        <Radio.Group
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value={''}>All</Radio.Button>
          {genresData.genres.map((genre) => (
            <Radio.Button key={genre.id} value={genre.id}>
              {genre.name}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Space>
    </div>
  );
}
