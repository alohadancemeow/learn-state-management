'use client';

import React from 'react';
import { Card, Typography, theme } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAtomValue } from 'jotai';
import { allForecastAtom } from '@/atoms/weatherAtoms';

const { Title } = Typography;

const ForecastChart: React.FC = () => {
  const forecasts = useAtomValue(allForecastAtom);
  const { token } = theme.useToken();

  if (forecasts.length === 0) return null;

  // Transform data for Recharts
  // We assume all cities have the same dates for simplicity
  // Base the dates on the first city
  const baseDates = forecasts[0].list.map(item => item.date);

  const data = baseDates.map((date, index) => {
    const entry: any = { name: date };
    forecasts.forEach(forecast => {
      // Find the reading for this date (or just take index if aligned)
      const point = forecast.list.find(p => p.date === date) || forecast.list[index];
      if (point) {
        entry[forecast.city] = point.temp;
      }
    });
    return entry;
  });

  // Generate colors for lines
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe', '#00C49F'];

  return (
    <Card style={{ marginTop: 24 }}>
      <Title level={4}>5-Day Temperature Forecast</Title>
      <div style={{ height: 400, width: '100%' }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: token.colorBgContainer, borderColor: token.colorBorder }}
              itemStyle={{ color: token.colorText }}
            />
            <Legend />
            {forecasts.map((forecast, index) => (
              <Line
                key={forecast.city}
                type="monotone"
                dataKey={forecast.city}
                stroke={colors[index % colors.length]}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ForecastChart;
