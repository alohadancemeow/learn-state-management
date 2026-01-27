'use client';

import React, { useEffect } from 'react';
import { Form, Input, Button, Card, App, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useLoginMutation } from '@/store/api/authApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

export default function LoginPage() {
  const { message } = App.useApp();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const onFinish = async (values: any) => {
    try {
      const user = await login(values).unwrap();
      dispatch(setCredentials({ user, token: user.token }));
      message.success('Login successful');
      router.push('/dashboard');
    } catch (err: any) {
      message.error(err.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>Admin Login</Title>
          <Typography.Text type="secondary">Use dummyjson credentials (e.g., emilys / emilyspass)</Typography.Text>
        </div>
        <Form
          name="login"
          initialValues={{ username: 'emilys', password: 'emilyspass' }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
