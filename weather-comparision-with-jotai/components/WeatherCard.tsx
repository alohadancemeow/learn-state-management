'use client';

import React from 'react';
import { Card, Statistic, Row, Col, Typography, Button, Spin, Alert } from 'antd';
import { useAtomValue, useAtom } from 'jotai';
import { weatherFamilyLoadable, favoriteCitiesAtom } from '@/atoms/weatherAtoms';
import { HeartOutlined, HeartFilled, ReloadOutlined } from '@ant-design/icons';

const { Title } = Typography;

/**
 * Props for the WeatherCard component.
 * 
 * @interface WeatherCardProps
 * @property {string} city - The name of the city to display weather for.
 */
interface WeatherCardProps {
  city: string;
}

/**
 * WeatherCard Component
 * 
 * Displays current weather information for a specific city.
 * 
 * Features:
 * - Uses `useAtomValue` with `weatherFamilyLoadable` to fetch and subscribe to weather data.
 * - Handles loading, error, and success states internally.
 * - Allows toggling the city as a "favorite" (persisted via `favoriteCitiesAtom`).
 * 
 */
const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
  // Subscribe to the loadable atom for this specific city
  const weatherLoadable = useAtomValue(weatherFamilyLoadable(city));
  
  // Access and update the list of favorite cities
  const [favorites, setFavorites] = useAtom(favoriteCitiesAtom);

  const isFavorite = favorites.includes(city);

  /**
   * Toggles the current city in the favorites list.
   */
  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter(c => c !== city));
    } else {
      setFavorites([...favorites, city]);
    }
  };

  // Render Loading State
  if (weatherLoadable.state === 'loading') {
    return (
      <Card style={{ width: '100%', marginBottom: 16, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin tip={`Loading ${city}...`}>
            <div />
        </Spin>
      </Card>
    );
  }

  // Render Error State
  if (weatherLoadable.state === 'hasError') {
    return (
      <Card style={{ width: '100%', marginBottom: 16 }}>
        <Alert
          title="Error"
          description={`Failed to load weather for ${city}.`}
          type="error"
          showIcon
          action={
            <Button size="small" icon={<ReloadOutlined />} onClick={() => window.location.reload()}>
              Retry
            </Button>
          }
        />
      </Card>
    );
  }

  // Render Success State
  const weather = weatherLoadable.data;
  if (!weather) return null;

  return (
    <Card 
      title={<Title level={4} style={{ margin: 0 }}>{weather.city}</Title>}
      extra={
        <Button 
          type="text" 
          icon={isFavorite ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />} 
          onClick={toggleFavorite}
        />
      }
      style={{ width: '100%', marginBottom: 16 }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Temperature" value={weather.temp} precision={1} suffix="°C" />
        </Col>
        <Col span={12}>
          <Statistic title="Condition" value={weather.condition} />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Statistic title="Humidity" value={weather.humidity} suffix="%" />
        </Col>
        <Col span={12}>
          <Statistic title="Wind" value={weather.windSpeed} suffix="m/s" />
        </Col>
      </Row>
    </Card>
  );
};

export default WeatherCard;
