'use client';

import { Card, Typography, Button, Spin, Descriptions, Avatar } from 'antd';
import { useGetUserByIdQuery } from '@/store/api/usersApi';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: user, isLoading } = useGetUserByIdQuery(id, {
    skip: !id,
  });

  if (isLoading) {
    return <div style={{ textAlign: 'center', marginTop: 50 }}><Spin size="large" /></div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.back()}
        style={{ marginBottom: 16 }}
      >
        Back
      </Button>

      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
          <Avatar size={100} src={user.image} icon={<UserOutlined />} />
          <div>
            <Title level={2}>{user.firstName} {user.lastName}</Title>
            <Title level={4} type="secondary">@{user.username}</Title>
          </div>
        </div>

        <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
          <Descriptions.Item label="Age">{user.age}</Descriptions.Item>
          <Descriptions.Item label="Gender">{user.gender}</Descriptions.Item>
          <Descriptions.Item label="Birth Date">{user.birthDate}</Descriptions.Item>
          <Descriptions.Item label="Blood Group">{user.bloodGroup}</Descriptions.Item>
          <Descriptions.Item label="Height">{user.height} cm</Descriptions.Item>
          <Descriptions.Item label="Weight">{user.weight} kg</Descriptions.Item>
          <Descriptions.Item label="Address">
            {user.address?.address}, {user.address?.city}, {user.address?.state}
          </Descriptions.Item>
          <Descriptions.Item label="Company">
            {user.company?.title} at {user.company?.name}
          </Descriptions.Item>
          <Descriptions.Item label="University">{user.university}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
