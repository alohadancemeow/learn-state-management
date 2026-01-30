'use client';

import React from 'react';
import { Button, Space, Typography, Tooltip } from 'antd';
import { useAtom, useAtomValue } from 'jotai';
import { favoriteCitiesAtom, selectedCitiesAtom } from '@/atoms/weatherAtoms';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

const FavoritesList: React.FC = () => {
  const [favorites, setFavorites] = useAtom(favoriteCitiesAtom);
  const [selectedCities, setSelectedCities] = useAtom(selectedCitiesAtom);
  
  // Prevent hydration mismatch for atomWithStorage
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (favorites.length === 0) return null;

  const addToComparison = (city: string) => {
    if (!selectedCities.includes(city)) {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const removeFavorite = (city: string) => {
    setFavorites(favorites.filter(c => c !== city));
  };

  return (
    <div style={{ marginTop: 16 }}>
      <Text type="secondary" style={{ marginRight: 8 }}>Favorites:</Text>
      <Space wrap>
        {favorites.map(city => (
          <Space.Compact key={city}>
            <Button onClick={() => addToComparison(city)}>
              {city} <PlusOutlined />
            </Button>
            <Tooltip title="Remove from favorites">
              <Button danger onClick={() => removeFavorite(city)} icon={<DeleteOutlined />} />
            </Tooltip>
          </Space.Compact>
        ))}
      </Space>
    </div>
  );
};

export default FavoritesList;
