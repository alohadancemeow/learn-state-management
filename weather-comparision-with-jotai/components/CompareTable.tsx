'use client';

import React from 'react';
import { Table, Typography } from 'antd';
import { useAtomValue } from 'jotai';
import { allWeatherAtom } from '@/atoms/weatherAtoms';
import { WeatherData } from '@/types/weather';

const { Title } = Typography;

const columns = [
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
    render: (text: string) => <Text strong>{text}</Text>,
  },
  {
    title: 'Temperature (°C)',
    dataIndex: 'temp',
    key: 'temp',
    render: (val: number) => val.toFixed(1),
    sorter: (a: WeatherData, b: WeatherData) => a.temp - b.temp,
  },
  {
    title: 'Condition',
    dataIndex: 'condition',
    key: 'condition',
  },
  {
    title: 'Humidity (%)',
    dataIndex: 'humidity',
    key: 'humidity',
    sorter: (a: WeatherData, b: WeatherData) => a.humidity - b.humidity,
  },
  {
    title: 'Wind (m/s)',
    dataIndex: 'windSpeed',
    key: 'windSpeed',
    sorter: (a: WeatherData, b: WeatherData) => a.windSpeed - b.windSpeed,
  },
];

const { Text } = Typography;

const CompareTable: React.FC = () => {
  const weatherList = useAtomValue(allWeatherAtom);

  if (weatherList.length === 0) return null;

  return (
    <div style={{ marginTop: 24 }}>
      <Title level={4}>Comparison</Title>
      <Table 
        dataSource={weatherList} 
        columns={columns} 
        rowKey="city" 
        pagination={false}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default CompareTable;
