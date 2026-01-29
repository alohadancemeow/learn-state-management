'use client';

import { useUIStore } from '@/store/useUIStore';
import { useEffect, useState } from 'react';
import { Switch } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: 44, height: 22 }} />; // Placeholder
  }

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={toggleTheme}
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<SunOutlined />}
    />
  );
}
