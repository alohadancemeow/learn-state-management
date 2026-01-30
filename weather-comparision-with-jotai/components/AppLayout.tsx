'use client';

import React from 'react';
import { Layout, App } from 'antd';
import AppHeader from '@/components/AppHeader';

const { Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <App>
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader />
        <Content style={{ padding: "24px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          {children}
        </Content>
      </Layout>
    </App>
  );
}
