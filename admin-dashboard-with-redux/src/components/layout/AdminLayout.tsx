'use client';

import React, { useEffect } from 'react';
import { Layout, Menu, Button, theme as antTheme, Avatar, Dropdown } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  BulbOutlined,
  BulbFilled
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { toggleCollapsed, toggleTheme } from '@/store/slices/uiSlice';
import Link from 'next/link';

const { Header, Sider, Content } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { collapsed, theme } = useAppSelector((state) => state.ui);
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = antTheme.useToken();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; 
  }

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const userMenu = {
    items: [
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Logout',
        onClick: handleLogout,
      },
    ],
  };

  // Determine selected key based on pathname
  // /dashboard -> dashboard
  // /dashboard/products -> products
  // /dashboard/users -> users
  const pathSegments = pathname.split('/');
  const selectedKey = pathSegments[2] || 'dashboard';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" style={{ height: 64, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', fontSize: 18 }}>
          {collapsed ? 'AD' : 'Admin Dash'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={[
            {
              key: 'dashboard',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
              onClick: () => router.push('/dashboard'),
            },
            {
              key: 'products',
              icon: <ShoppingOutlined />,
              label: 'Products',
              onClick: () => router.push('/dashboard/products'),
            },
            {
              key: 'users',
              icon: <UserOutlined />,
              label: 'Users',
              onClick: () => router.push('/dashboard/users'),
            },
             {
              key: 'cart',
              icon: <ShoppingCartOutlined />,
              label: 'Cart',
              onClick: () => router.push('/dashboard/cart'),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 24 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => dispatch(toggleCollapsed())}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
             <Button 
              type="text" 
              icon={theme === 'dark' ? <BulbFilled /> : <BulbOutlined />} 
              onClick={() => dispatch(toggleTheme())}
            />
            <Dropdown menu={userMenu}>
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar src={user?.image} icon={<UserOutlined />} />
                <span>{user?.firstName} {user?.lastName}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto', 
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
