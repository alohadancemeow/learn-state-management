'use client';

import { Card, Skeleton } from 'antd';

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
