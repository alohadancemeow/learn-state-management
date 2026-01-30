'use client';

import React from 'react';
import { Tag, Space } from 'antd';
import { useAtom } from 'jotai';
import { selectedCitiesAtom } from '@/atoms/weatherAtoms';

const SelectedCities: React.FC = () => {
  const [selectedCities, setSelectedCities] = useAtom(selectedCitiesAtom);

  const handleClose = (removedCity: string) => {
    setSelectedCities(selectedCities.filter(city => city !== removedCity));
  };

  if (selectedCities.length === 0) return null;

  return (
    <Space size={[0, 8]} wrap style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
      {selectedCities.map((city) => (
        <Tag
          key={city}
          closable
          variant='filled'
          color='blue'
          onClose={(e) => {
            e.preventDefault();
            handleClose(city);
          }}
          style={{ fontSize: '14px', padding: '4px 10px' }}
        >
          {city}
        </Tag>
      ))}
    </Space>
  );
};

export default SelectedCities;
