'use client';

import React, { useEffect } from 'react';
import { Result, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { clearCart } from '@/store/slices/cartSlice';

export default function SuccessPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <Result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button type="primary" key="dashboard" onClick={() => router.push('/dashboard')}>
          Go Dashboard
        </Button>,
        <Button key="buy" onClick={() => router.push('/dashboard/products')}>
          Buy Again
        </Button>,
      ]}
    />
  );
}
