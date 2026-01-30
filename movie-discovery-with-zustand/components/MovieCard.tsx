'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/types/tmdb';
import { getImageUrl } from '@/lib/tmdb';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import { Card, Typography, Button } from 'antd';
import { HeartOutlined, HeartFilled, StarFilled } from '@ant-design/icons';

const { Meta } = Card;
const { Text } = Typography;

interface MovieCardProps {
  movie: Movie;
}

/**
 * Component to display a single movie card.
 * 
 * Features:
 * - Displays movie poster, title, release year, and rating.
 * - Links to the movie details page.
 * - Allows toggling "favorite" status via a heart icon.
 */
export default function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, toggleFavorite } = useFavoriteStore();
  const favorite = isFavorite(movie.id);

  /**
   * Handles the click on the favorite button.
   * Prevents navigation to the movie details page.
   * 
   * @param {React.MouseEvent} e - The click event.
   */
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <Link href={`/movie/${movie.id}`} style={{ display: 'block' }}>
      <Card
        hoverable
        cover={
          <div style={{ position: 'relative', aspectRatio: '2/3', width: '100%' }}>
            <Image
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <Button
              shape="circle"
              icon={favorite ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
              onClick={handleToggleFavorite}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 1,
                border: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            />
          </div>
        }
        styles={{ body: { padding: 12 } }}
      >
        <Meta
          title={movie.title}
          description={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <Text type="secondary">{new Date(movie.release_date).getFullYear()}</Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <StarFilled style={{ color: '#fadb14' }} />
                <Text>{movie.vote_average.toFixed(1)}</Text>
              </div>
            </div>
          }
        />
      </Card>
    </Link>
  );
}
