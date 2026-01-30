'use client';

import { useUIStore } from '@/store/useUIStore';
import { useEffect, useState } from 'react';
import { Switch } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

/**
 * Component for toggling between light and dark themes.
 * 
 * Features:
 * - Switches between light and dark modes using the global UI store.
 * - Handles hydration mismatch by waiting for the component to mount.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Avoid hydration mismatch by only rendering after mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: 44, height: 22 }} />; // Placeholder to prevent layout shift
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
