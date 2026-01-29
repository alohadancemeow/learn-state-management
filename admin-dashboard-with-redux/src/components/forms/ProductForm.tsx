'use client';

import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';

interface ProductFormProps {
  /** Initial values for the form fields, used when editing an existing product */
  initialValues?: any;
  /** Callback function triggered when the form is successfully submitted */
  onFinish: (values: any) => void;
  /** Flag to indicate if the form submission is in progress */
  isLoading: boolean;
}

/**
 * A form component for creating or editing a product.
 * 
 * It uses Ant Design's Form component and includes validation rules.
 * If 'initialValues' are provided, the form fields are populated, suitable for "Edit" mode.
 * 
 * @param props - Component props including initialValues, onFinish callback, and loading state
 */
export const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onFinish, isLoading }) => {
  const [form] = Form.useForm();

  // Populate form fields when initialValues change (e.g., when data is fetched for editing)
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
