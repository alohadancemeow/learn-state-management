'use client';

import { Card, Col, Row, Statistic, Typography } from 'antd';
import { UserOutlined, ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/store/hooks';

const { Title } = Typography;

export default function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth);
  
  return (
    <div>
      <Title level={2}>Welcome back, {user?.firstName}!</Title>
      
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Products"
              value={100} 
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Users"
              value={30}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Orders"
              value={5}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <Card style={{ marginTop: 24 }}>
        <Title level={4}>About this Project</Title>
        <p>This is an admin dashboard built with Next.js, Redux Toolkit, and Ant Design.</p>
        <p>It demonstrates authentication, data fetching with RTK Query, global state management, and persistence.</p>
      </Card>
    </div>
  );
}
