'use client';

import React, { useState } from 'react';
import { Table, Button, Space, Input, App, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { useGetProductsQuery, useDeleteProductMutation } from '@/store/api/productsApi';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';

const { Search } = Input;

export default function ProductsPage() {
  const { message } = App.useApp();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data, isLoading, isFetching } = useGetProductsQuery({
    limit: pageSize,
    skip: (page - 1) * pageSize,
    q: searchTerm,
  });

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id).unwrap();
      message.success('Product deleted successfully');
    } catch (error) {
      message.error('Failed to delete product');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text: string) => <img src={text} alt="product" style={{ width: 50, height: 50, objectFit: 'cover' }} />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price}`,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => router.push(`/dashboard/products/${record.id}`)} 
          />
           <Button 
            type="default"
            onClick={() => {
                dispatch(addToCart({
                    id: record.id,
                    title: record.title,
                    price: record.price,
                    thumbnail: record.thumbnail,
                    quantity: 1
                }));
                message.success('Added to cart');
            }}
          >
            Add to Cart
          </Button>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => router.push(`/dashboard/products/${record.id}/edit`)}
          />
          <Popconfirm
            title="Delete the product"
            description="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Search
          placeholder="Search products"
          onSearch={(value) => {
            setSearchTerm(value);
            setPage(1);
          }}
          onChange={(e) => {
            if (e.target.value === '') {
                setSearchTerm('');
            }
          }}
          style={{ width: 300 }}
          allowClear
        />
        <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => router.push('/dashboard/products/create')}
        >
          Add Product
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data?.products}
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
