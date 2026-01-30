'use client';

import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import WeatherCard from './WeatherCard';

const { Title, Text } = Typography;

const ZONES = [
  { zone: 'Asia', city: 'Bangkok' },
  { zone: 'Europe', city: 'London' },
  { zone: 'North America', city: 'New York' },
  { zone: 'Australia', city: 'Sydney' },
];

const TodayWeather: React.FC = () => {
  return (
    <div style={{ marginBottom: 32 }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>Global Highlights</Title>
      <Row gutter={[16, 16]} justify="center">
        {ZONES.map(({ zone, city }) => (
          <Col xs={24} sm={12} md={12} lg={6} key={city}>
            <div style={{ marginBottom: 8, textAlign: 'center' }}>
              <Text type="secondary" strong>{zone}</Text>
            </div>
            <WeatherCard city={city} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TodayWeather;
