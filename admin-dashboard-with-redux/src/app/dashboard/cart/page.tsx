'use client';

import React, { useState } from 'react';
import { Table, Button, InputNumber, Typography, Card, Popconfirm, App } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const { Title } = Typography;

export default function CartPage() {
  const { message } = App.useApp();
  const dispatch = useAppDispatch();
  const { items, totalAmount, totalQuantity } = useAppSelector((state) => state.cart);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      message.error('Stripe Publishable Key is missing in environment variables');
      return;
    }
    setIsCheckingOut(true);
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Checkout failed');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image
            src={record.thumbnail}
            alt={text}
            width={50}
            height={50}
            style={{ objectFit: 'cover' }}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number, record: any) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => {
            if (value) {
              dispatch(updateQuantity({ id: record.id, quantity: value }));
            }
          }}
        />
      ),
    },
    {
      title: 'Total',
      key: 'total',
      render: (_: any, record: any) => `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => dispatch(removeFromCart(record.id))}
        />
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Shopping Cart</Title>
      <Table
        columns={columns}
        dataSource={items}
        rowKey="id"
        pagination={false}
      />

      <Card style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={4}>Total Quantity: {totalQuantity}</Title>
            <Title level={3}>Total Amount: ${totalAmount.toFixed(2)}</Title>
          </div>
          <div>
            <Popconfirm
              title="Clear cart"
              description="Are you sure to clear the cart?"
              onConfirm={() => dispatch(clearCart())}
            >
              <Button danger size="large">Clear Cart</Button>
            </Popconfirm>
            <Button
              type="primary"
              size="large"
              style={{ marginLeft: 16 }}
              onClick={handleCheckout}
              loading={isCheckingOut}
              disabled={items.length === 0}
            >
              Checkout
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
