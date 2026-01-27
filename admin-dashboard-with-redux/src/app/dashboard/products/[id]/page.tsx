'use client';

import React from 'react';
import { Card, Typography, Button, Spin, Descriptions, Image, Tag } from 'antd';
import { useGetProductByIdQuery } from '@/store/api/productsApi';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: product, isLoading } = useGetProductByIdQuery(id, {
    skip: !id,
  });

  if (isLoading) {
      return <div style={{ textAlign: 'center', marginTop: 50 }}><Spin size="large" /></div>;
  }

  if (!product) {
      return <div>Product not found</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => router.back()}
        >
            Back
        </Button>
        <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => router.push(`/dashboard/products/${id}/edit`)}
        >
            Edit Product
        </Button>
      </div>

      <Card>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div>
                <Image width={300} src={product.thumbnail} alt={product.title} />
                <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
                    {product.images?.map((img: string, index: number) => (
                        <Image key={index} width={50} src={img} alt="product" />
                    ))}
                </div>
            </div>
            <div style={{ flex: 1 }}>
                <Title level={2}>{product.title}</Title>
                <Tag color="blue">{product.category}</Tag>
                <Title level={3}>${product.price}</Title>
                <Descriptions column={1} bordered style={{ marginTop: 24 }}>
                    <Descriptions.Item label="Description">{product.description}</Descriptions.Item>
                    <Descriptions.Item label="Brand">{product.brand}</Descriptions.Item>
                    <Descriptions.Item label="Stock">{product.stock}</Descriptions.Item>
                    <Descriptions.Item label="Rating">{product.rating} / 5</Descriptions.Item>
                </Descriptions>
            </div>
        </div>
      </Card>
    </div>
  );
}
