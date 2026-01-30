'use client';

import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMovieDetails } from '@/hooks/useMovieDetails';
import { getImageUrl } from '@/lib/tmdb';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import { Typography, Row, Col, Rate, Tag, Button, Spin, Alert, Card, Space } from 'antd';
import { HeartOutlined, HeartFilled, ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

/**
 * Movie Detail Page.
 * 
 * Displays comprehensive information about a specific movie, including:
 * - Backdrop and Poster images.
 * - Title, Tagline, Genres, Runtime, Status, and Overview.
 * - Rating (converted to 5-star scale).
 * - Action to add/remove from favorites.
 * 
 */
export default function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const { id } = use(params);

  const { data: movie, isLoading, error } = useMovieDetails(id);
  const { isFavorite, toggleFavorite } = useFavoriteStore();

  // We need to handle hydration for the favorite button to match server/client
  // because local storage (where favorites are kept) is only available on the client.
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <Alert
        title="Error"
        description="Error loading movie details."
        type="error"
        showIcon
      />
    );
  }

  const favorite = isClient ? isFavorite(movie.id) : false;

  return (
    <div>
      {/* Backdrop Section */}
      <div style={{ position: 'relative', width: '100%', height: '40vh', marginBottom: -100 }}>
        <Image
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          fill
          style={{ objectFit: 'cover', opacity: 0.5 }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--ant-color-bg-container), transparent)' }} />
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1, paddingBottom: 48 }}>
        <Row gutter={[48, 48]}>
          {/* Poster Section */}
          <Col xs={24} md={8} lg={6}>
            <Card
              hoverable
              styles={{ body: { padding: 0 } }}
              style={{ overflow: 'hidden', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
            >
              <div style={{ position: 'relative', aspectRatio: '2/3', width: '100%' }}>
                <Image
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </Card>
          </Col>

          {/* Details Section */}
          <Col xs={24} md={16} lg={18} style={{ paddingTop: 32 }}>
            <Title level={1} style={{ marginBottom: 8 }}>{movie.title}</Title>
            <Paragraph type="secondary" style={{ fontSize: 18, fontStyle: 'italic', marginBottom: 24 }}>
              {movie.tagline}
            </Paragraph>

            <div style={{ marginBottom: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {movie.genres.map((genre) => (
                <Tag key={genre.id} color="blue" style={{ fontSize: 14, padding: '4px 12px' }}>
                  {genre.name}
                </Tag>
              ))}
            </div>

            <Space size="large" align="center" style={{ marginBottom: 32, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Rate disabled allowHalf defaultValue={movie.vote_average / 2} />
                <Text strong style={{ fontSize: 16 }}>{movie.vote_average.toFixed(1)} / 10</Text>
              </div>
              <Text type="secondary">
                Runtime: <Text strong>{movie.runtime} min</Text>
              </Text>
              <Text type="secondary">
                Status: <Text strong>{movie.status}</Text>
              </Text>
            </Space>

            <Card title="Overview" style={{ marginBottom: 32 }}>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                {movie.overview}
              </Paragraph>
            </Card>

            <Space size="middle">
              <Button
                type={favorite ? 'primary' : 'default'}
                danger={favorite}
                icon={favorite ? <HeartFilled /> : <HeartOutlined />}
                size="large"
                onClick={() => toggleFavorite(movie)}
              >
                {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>

              <Link href="/">
                <Button size="large" icon={<ArrowLeftOutlined />}>
                  Back to Home
                </Button>
              </Link>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
}
