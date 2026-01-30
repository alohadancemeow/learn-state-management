'use client';

import React from 'react';
import { FloatButton, Layout, Typography, theme } from 'antd';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { usePathname } from 'next/navigation';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

/**
 * Main application layout component.
 * 
 * Provides the common structure for pages, including:
 * - Header with navigation and theme toggle.
 * - Content area for page-specific content.
 * - Footer with copyright info.
 */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Title level={4} style={{ margin: 0, color: 'white' }}>MovieDiscovery</Title>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/" style={{ color: 'white', opacity: pathname === '/' ? 1 : 0.7 }}>
            Home
          </Link>
          <Link href="/favorites" style={{ color: 'white', opacity: pathname === '/favorites' ? 1 : 0.7 }}>
            Favorites
          </Link>
          <ThemeToggle />
        </div>
      </Header>
      <Content style={{ padding: '24px 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Movie Discovery App ©{new Date().getFullYear()} Created with Next.js & Ant Design
      </Footer>
      <FloatButton.BackTop />
    </Layout>
  );
}
