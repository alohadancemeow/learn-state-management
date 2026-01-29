'use client';

import React, { useState } from 'react';
import { Table, Avatar, Button, Space } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useGetUsersQuery } from '@/store/api/usersApi';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();

  /**
   * Fetches users from the API based on current pagination.
   * 
   * @param limit - Number of items per page
   * @param skip - Number of items to skip (calculated from page number)
   */
  const { data, isLoading, isFetching } = useGetUsersQuery({
    limit: pageSize,
    skip: (page - 1) * pageSize,
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Avatar',
      dataIndex: 'image',
      key: 'image',
      render: (src: string) => <Avatar src={src} />,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => router.push(`/dashboard/users/${record.id}`)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data?.users}
        loading={isLoading || isFetching}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: pageSize,
          total: data?.total,
          onChange: (p, ps) => {
            setPage(p);
            setPageSize(ps);
          },
        }}
      />
    </div>
  );
}
