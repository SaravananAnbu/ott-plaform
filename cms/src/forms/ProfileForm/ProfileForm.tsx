import React from 'react';
import { Form, Input, Select, Button, Card, Space, message, InputNumber } from 'antd';
import { UserOutlined, LockOutlined, PictureOutlined } from '@ant-design/icons';
import type { CreateProfileDto } from '../../types';
import { ProfileAgeRestriction } from '../../types';
import { getValidationRules } from '../../utils/validation';

const { Option } = Select;

interface ProfileFormProps {
  initialValues?: Partial<CreateProfileDto>;
  onSubmit: (values: CreateProfileDto) => void;
  loading?: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  initialValues,
  onSubmit,
  loading = false,
}) => {
  const [form] = Form.useForm<CreateProfileDto>();

  const handleSubmit = async (values: CreateProfileDto) => {
    try {
      await onSubmit(values);
      message.success('Profile saved successfully!');
      if (!initialValues) {
        form.resetFields();
      }
    } catch {
      message.error('Failed to save profile. Please try again.');
    }
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Card title="Profile Management" style={{ maxWidth: 600, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="User ID"
          name="userId"
          rules={getValidationRules('userId')}
        >
          <InputNumber
            placeholder="Enter user ID"
            style={{ width: '100%' }}
            min={1}
          />
        </Form.Item>

        <Form.Item
          label="Profile Name"
          name="profileName"
          rules={getValidationRules('profileName')}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Enter profile name"
            maxLength={100}
          />
        </Form.Item>

        <Form.Item
          label="PIN Code"
          name="pinCode"
          rules={getValidationRules('pinCode')}
          tooltip="6-digit numeric PIN for profile access"
        >
          <Input
            prefix={<LockOutlined />}
            placeholder="Enter 6-digit PIN"
            maxLength={6}
            onChange={(e) => {
              // Only allow numbers
              const value = e.target.value.replace(/\D/g, '');
              form.setFieldValue('pinCode', value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Age Restriction"
          name="ageRestriction"
          tooltip="Age-based content filtering for this profile"
        >
          <Select placeholder="Select age restriction" allowClear>
            <Option value={ProfileAgeRestriction.KIDS}>Kids</Option>
            <Option value={ProfileAgeRestriction.TEENS}>Teens</Option>
            <Option value={ProfileAgeRestriction.ADULTS}>Adults</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Avatar URL"
          name="avatarUrl"
          rules={getValidationRules('avatarUrl')}
        >
          <Input
            prefix={<PictureOutlined />}
            placeholder="Enter avatar image URL (optional)"
            type="url"
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
              {initialValues ? 'Update Profile' : 'Create Profile'}
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