'use client';

import { Card, Skeleton } from 'antd';

/**
 * Loading skeleton component for movie cards.
 * 
 * Displays a placeholder card with a shimmering effect while data is loading.
 * Matches the dimensions and layout of the actual MovieCard.
 */
export default function MovieSkeleton() {
  return (
    <Card
      cover={
        <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.05)' }}>
          <Skeleton.Image active />
        </div>
      }
    >
      <Skeleton active paragraph={{ rows: 1 }} title={{ width: '70%' }} />
    </Card>
  );
}
