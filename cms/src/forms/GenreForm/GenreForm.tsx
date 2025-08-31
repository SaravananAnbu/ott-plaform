import React from 'react';
import { Form, Input, Button, Card, Space, message } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import type { CreateGenreDto } from '../../types';
import { getValidationRules } from '../../utils/validation';

interface GenreFormProps {
  initialValues?: Partial<CreateGenreDto>;
  onSubmit: (values: CreateGenreDto) => void;
  loading?: boolean;
}

export const GenreForm: React.FC<GenreFormProps> = ({
  initialValues,
  onSubmit,
  loading = false,
}) => {
  const [form] = Form.useForm<CreateGenreDto>();

  const handleSubmit = async (values: CreateGenreDto) => {
    try {
      await onSubmit(values);
      message.success('Genre saved successfully!');
      if (!initialValues) {
        form.resetFields();
      }
    } catch {
      message.error('Failed to save genre. Please try again.');
    }
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Card title="Genre Management" style={{ maxWidth: 500, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Genre Name"
          name="name"
          rules={getValidationRules('genreName')}
        >
          <Input
            prefix={<TagOutlined />}
            placeholder="Enter genre name (e.g., Action, Comedy, Drama)"
            maxLength={80}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
            >
              {initialValues ? 'Update Genre' : 'Create Genre'}
            </Button>
            <Button
              onClick={handleReset}
              size="large"
              disabled={loading}
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};