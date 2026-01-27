'use client';

import React from 'react';
import { Table, Button, InputNumber, Typography, Card, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';

const { Title, Text } = Typography;

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items, totalAmount, totalQuantity } = useAppSelector((state) => state.cart);

  const columns = [
    {
      title: 'Product',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={record.thumbnail} alt={text} style={{ width: 50, height: 50, objectFit: 'cover' }} />
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
            <Button type="primary" size="large" style={{ marginLeft: 16 }}>Checkout</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
