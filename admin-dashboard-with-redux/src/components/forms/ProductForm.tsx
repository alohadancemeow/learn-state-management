'use client';

import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';

interface ProductFormProps {
  initialValues?: any;
  onFinish: (values: any) => void;
  isLoading: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onFinish, isLoading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please enter title' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: 'Please enter price' }]}
      >
        <InputNumber style={{ width: '100%' }} prefix="$" stringMode />
      </Form.Item>
      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: 'Please enter category' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Save Product
        </Button>
      </Form.Item>
    </Form>
  );
};
