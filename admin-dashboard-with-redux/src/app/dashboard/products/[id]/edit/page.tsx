'use client';

import React from 'react';
import { Card, Typography, App, Button, Spin } from 'antd';
import { ProductForm } from '@/components/forms/ProductForm';
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/store/api/productsApi';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function EditProductPage() {
  const { message } = App.useApp();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: product, isLoading: isFetching } = useGetProductByIdQuery(id, {
    skip: !id,
  });
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const handleFinish = async (values: any) => {
    try {
      await updateProduct({ id, ...values }).unwrap();
      message.success('Product updated successfully');
      router.push('/dashboard/products');
    } catch (error) {
      message.error('Failed to update product');
    }
  };

  if (isFetching) {
    return <div style={{ textAlign: 'center', marginTop: 50 }}><Spin size="large" /></div>;
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
        <Title level={3}>Edit Product</Title>
        <ProductForm
          initialValues={product}
          onFinish={handleFinish}
          isLoading={isUpdating}
        />
      </Card>
    </div>
  );
}
