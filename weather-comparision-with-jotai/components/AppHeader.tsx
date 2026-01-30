'use client';

import React from 'react';
import { Layout, Switch, Typography, theme as antTheme } from 'antd';
import { useAtom } from 'jotai';
import { themeAtom } from '@/atoms/themeAtom';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const AppHeader: React.FC = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const {
    token: { colorBgContainer },
  } = antTheme.useToken();

  const toggleTheme = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: colorBgContainer,
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 10,
      }}
    >
      <Title level={4} style={{ margin: 0 }}>
        🌦️ Weather Comparison
      </Title>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Switch
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
      </div>
    </Header>
  );
};

export default AppHeader;
