'use client';

import React, { useState } from 'react';
import { Input, App } from 'antd';
import { useAtom } from 'jotai';
import { selectedCitiesAtom } from '@/atoms/weatherAtoms';
import { SearchOutlined } from '@ant-design/icons';

const CitySearch: React.FC = () => {
  const [selectedCities, setSelectedCities] = useAtom(selectedCitiesAtom);
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();

  const onSearch = async (value: string) => {
    if (!value.trim()) return;
    
    const city = value.trim(); // Capitalization handled by API or normalized
    
    // Check duplicates (case-insensitive check for better UX)
    if (selectedCities.some(c => c.toLowerCase() === city.toLowerCase())) {
      message.warning(`${city} is already selected`);
      return;
    }

    setLoading(true);
    // Ideally, we might validate existence here, but for now we just add it.
    // The weather card will handle the "City not found" error.
    // However, the prompt says "Prevent duplicate cities" which we did.
    // "UI components must not fetch data directly" -> implying search shouldn't fetch weather?
    // But how do we know if city is valid?
    // We can add it, and if it fails to load, the user can remove it.
    // OR we can hit a lightweight validation endpoint. 
    // Given the constraints "UI components must not fetch data directly" probably refers to weather data.
    // I'll just add it to the list.
    
    setSelectedCities((prev) => [...prev, city]);
    setLoading(false);
  };

  return (
    <Input.Search
      placeholder="Enter city name..."
      allowClear
      enterButton={<><SearchOutlined /> Add City</>}
      size="large"
      onSearch={onSearch}
      loading={loading}
      style={{ maxWidth: 400, width: '100%' }}
    />
  );
};

export default CitySearch;
