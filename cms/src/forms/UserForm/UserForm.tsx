import React from 'react';
import { Form, Input, Switch, Button, Card, Space, message } from 'antd';
import { UserOutlined, MailOutlined, GlobalOutlined } from '@ant-design/icons';
import type { CreateUserDto } from '../../types';
import { getValidationRules } from '../../utils/validation';

interface UserFormProps {
  initialValues?: Partial<CreateUserDto>;
  onSubmit: (values: CreateUserDto) => void;
  loading?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  onSubmit,
  loading = false,
}) => {
  const [form] = Form.useForm<CreateUserDto>();

  const handleSubmit = async (values: CreateUserDto) => {
    try {
      await onSubmit(values);
      message.success('User saved successfully!');
      if (!initialValues) {
        form.resetFields();
      }
    } catch {
      message.error('Failed to save user. Please try again.');
    }
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Card title="User Management" style={{ maxWidth: 600, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={getValidationRules('phoneNumber')}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Enter phone number"
            maxLength={20}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={getValidationRules('email')}
        >
          <Input
            prefix={<MailOutlined />}
            type="email"
            placeholder="Enter email address"
            maxLength={255}
          />
        </Form.Item>

        <Form.Item
          label="Country Code"
          name="country"
          rules={getValidationRules('country')}
        >
          <Input
            prefix={<GlobalOutlined />}
            placeholder="Enter 2-letter country code (e.g., US)"
            maxLength={2}
            style={{ textTransform: 'uppercase' }}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();
              form.setFieldValue('country', value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Active Status"
          name="isActive"
          valuePropName="checked"
          tooltip="Whether the user account is active"
        >
          <Switch
            checkedChildren="Active"
            unCheckedChildren="Inactive"
            defaultChecked={true}
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
              {initialValues ? 'Update User' : 'Create User'}
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