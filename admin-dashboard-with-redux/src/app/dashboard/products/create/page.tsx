'use client';

import { Card, Typography, App, Button } from 'antd';
import { ProductForm } from '@/components/forms/ProductForm';
import { useAddProductMutation } from '@/store/api/productsApi';
import { useRouter } from 'next/navigation';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function CreateProductPage() {
  const { message } = App.useApp();
  const [addProduct, { isLoading }] = useAddProductMutation();
  const router = useRouter();

  /**
   * Handles form submission to create a new product.
   * 
   * @param values - Form values from the ProductForm component
   */
  const handleFinish = async (values: any) => {
    try {
      await addProduct(values).unwrap();
      message.success('Product created successfully');
      router.push('/dashboard/products');
    } catch (error) {
      message.error('Failed to create product');
    }
  };

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
        <Title level={3}>Create Product</Title>
        <ProductForm onFinish={handleFinish} isLoading={isLoading} />
      </Card>
    </div>
  );
}
