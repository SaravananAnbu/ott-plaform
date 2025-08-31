import React from 'react';
import { Form, Select, Button, Card, Space, message, InputNumber, DatePicker, Switch } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import type { CreateSubscriptionDto } from '../../types';
import { SubscriptionStatus } from '../../types';
import { getValidationRules } from '../../utils/validation';

const { Option } = Select;

interface SubscriptionFormProps {
  initialValues?: Partial<CreateSubscriptionDto>;
  onSubmit: (values: CreateSubscriptionDto) => void;
  loading?: boolean;
}

export const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  initialValues,
  onSubmit,
  loading = false,
}) => {
  const [form] = Form.useForm<CreateSubscriptionDto>();

  const handleSubmit = async (values: CreateSubscriptionDto) => {
    try {
      // Convert dates to string format if they are moment objects
      const processedValues = {
        ...values,
        startDate: values.startDate ? values.startDate : '',
        endDate: values.endDate ? values.endDate : undefined,
      };
      
      await onSubmit(processedValues);
      message.success('Subscription saved successfully!');
      if (!initialValues) {
        form.resetFields();
      }
    } catch {
      message.error('Failed to save subscription. Please try again.');
    }
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Card title="Subscription Management" style={{ maxWidth: 600, margin: '0 auto' }}>
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
          label="Plan ID"
          name="planId"
          rules={getValidationRules('planId')}
        >
          <InputNumber
            placeholder="Enter plan ID"
            style={{ width: '100%' }}
            min={1}
          />
        </Form.Item>

        <Form.Item
          label="Start Date"
          name="startDate"
          rules={getValidationRules('startDate')}
        >
          <DatePicker
            style={{ width: '100%' }}
            placeholder="Select start date"
            suffixIcon={<CalendarOutlined />}
          />
        </Form.Item>

        <Form.Item
          label="End Date"
          name="endDate"
          tooltip="Leave blank for ongoing subscription"
        >
          <DatePicker
            style={{ width: '100%' }}
            placeholder="Select end date (optional)"
            suffixIcon={<CalendarOutlined />}
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
        >
          <Select placeholder="Select subscription status" allowClear>
            <Option value={SubscriptionStatus.ACTIVE}>Active</Option>
            <Option value={SubscriptionStatus.INACTIVE}>Inactive</Option>
            <Option value={SubscriptionStatus.EXPIRED}>Expired</Option>
            <Option value={SubscriptionStatus.CANCELLED}>Cancelled</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Auto Renew"
          name="autoRenew"
          valuePropName="checked"
          tooltip="Whether the subscription should automatically renew"
        >
          <Switch
            checkedChildren="Yes"
            unCheckedChildren="No"
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
              {initialValues ? 'Update Subscription' : 'Create Subscription'}
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