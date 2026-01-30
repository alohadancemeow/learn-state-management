'use client';

import { useEffect, useState } from 'react';
import { useSearchStore } from '@/store/useSearchStore';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

/**
 * Component for searching movies.
 * 
 * Features:
 * - Text input for search queries.
 * - Debounces user input by 500ms to avoid excessive API calls/store updates.
 * - Updates the global search store.
 */
export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    // Debounce the search query update
    const handler = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [localQuery, setSearchQuery]);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto 32px' }}>
      <Input
        size="large"
        placeholder="Search movies..."
        prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        allowClear
      />
    </div>
  );
}
