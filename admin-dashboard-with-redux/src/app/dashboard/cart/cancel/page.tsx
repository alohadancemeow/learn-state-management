'use client';

import { Result, Button } from 'antd';
import { useRouter } from 'next/navigation';

export default function CancelPage() {
  const router = useRouter();

  return (
    <Result
      status="error"
      title="Payment Failed"
      subTitle="Please check and modify your information before resubmitting."
      extra={[
        <Button type="primary" key="console" onClick={() => router.push('/dashboard/cart')}>
          Return to Cart
        </Button>,
        <Button key="buy" onClick={() => router.push('/dashboard')}>
          Go Dashboard
        </Button>,
      ]}
    >
    </Result>
  );
}
