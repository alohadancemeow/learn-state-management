'use client';

import { Suspense } from 'react';
import { Row, Col, Spin, Alert, Typography, Divider } from 'antd';
import CitySearch from '@/components/CitySearch';
import SelectedCities from '@/components/SelectedCities';
import FavoritesList from '@/components/FavoritesList';
import WeatherCard from '@/components/WeatherCard';
import CompareTable from '@/components/CompareTable';
import ForecastChart from '@/components/ForecastChart';
import TodayWeather from '@/components/TodayWeather';
import { useAtomValue } from 'jotai';
import { selectedCitiesAtom } from '@/atoms/weatherAtoms';

const { Title } = Typography;

// Wrapper component to map over selected cities and render WeatherCards
const WeatherCardsList = () => {
  const cities = useAtomValue(selectedCitiesAtom);

  if (cities.length === 0) {
    return (
      <Alert
        title="No cities selected"
        description="Search and add a city to view weather data."
        type="info"
        showIcon
        style={{ marginTop: 24 }}
      />
    );
  }

  return (
    <div>
      <Divider titlePlacement="start">Selected Cities</Divider>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {cities.map((city) => (
          <Col xs={24} sm={12} md={8} lg={6} key={city}>
            <WeatherCard city={city} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <Title level={2}>Weather Dashboard</Title>
        <CitySearch />
        <FavoritesList />
        <SelectedCities />
      </div>

      <TodayWeather />

      <WeatherCardsList />

      <Suspense fallback={<div style={{ textAlign: 'center', marginTop: 24 }}><Spin size="large" /></div>}>
        <CompareTable />
      </Suspense>

      <Suspense fallback={<div style={{ textAlign: 'center', marginTop: 24 }}><Spin size="large" /></div>}>
        <ForecastChart />
      </Suspense>
    </div>
  );
}
