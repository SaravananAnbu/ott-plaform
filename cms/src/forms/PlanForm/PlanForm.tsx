import React from 'react';
import { Form, Input, Button, Card, Space, message, InputNumber, Switch } from 'antd';
import { DollarOutlined, DesktopOutlined } from '@ant-design/icons';
import type { CreatePlanDto } from '../../types';
import { getValidationRules } from '../../utils/validation';

interface PlanFormProps {
  initialValues?: Partial<CreatePlanDto>;
  onSubmit: (values: CreatePlanDto) => void;
  loading?: boolean;
}

export const PlanForm: React.FC<PlanFormProps> = ({
  initialValues,
  onSubmit,
  loading = false,
}) => {
  const [form] = Form.useForm<CreatePlanDto>();

  const handleSubmit = async (values: CreatePlanDto) => {
    try {
      await onSubmit(values);
      message.success('Plan saved successfully!');
      if (!initialValues) {
        form.resetFields();
      }
    } catch {
      message.error('Failed to save plan. Please try again.');
    }
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Card title="Subscription Plan Management" style={{ maxWidth: 600, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Plan Name"
          name="planName"
          rules={getValidationRules('planName')}
        >
          <Input
            placeholder="Enter plan name (e.g., Basic, Premium)"
            maxLength={60}
          />
        </Form.Item>

        <Form.Item
          label="Price (in cents)"
          name="priceCents"
          rules={getValidationRules('priceCents')}
          tooltip="Enter price in cents (e.g., 999 for $9.99)"
        >
          <InputNumber
            prefix={<DollarOutlined />}
            placeholder="Enter price in cents"
            style={{ width: '100%' }}
            min={0}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => {
              const parsed = parseInt(value!.replace(/\$\s?|(,*)/g, ''), 10);
              return (parsed || 0) as any;
            }}
          />
        </Form.Item>

        <Form.Item
          label="Currency"
          name="currency"
          rules={getValidationRules('currency')}
          tooltip="3-letter currency code (e.g., USD, EUR)"
        >
          <Input
            placeholder="Enter currency code (e.g., USD)"
            maxLength={3}
            style={{ textTransform: 'uppercase' }}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();
              form.setFieldValue('currency', value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Resolution"
          name="resolution"
          rules={getValidationRules('resolution')}
        >
          <Input
            prefix={<DesktopOutlined />}
            placeholder="Enter resolution (e.g., HD, 4K, FHD)"
            maxLength={10}
          />
        </Form.Item>

        <Form.Item
          label="Screens Allowed"
          name="screensAllowed"
          rules={getValidationRules('screensAllowed')}
          tooltip="Number of simultaneous screens allowed"
        >
          <InputNumber
            placeholder="Enter number of screens allowed"
            style={{ width: '100%' }}
            min={1}
            max={10}
          />
        </Form.Item>

        <Form.Item
          label="Downloads Allowed"
          name="downloadsAllowed"
          valuePropName="checked"
          tooltip="Whether users can download content for offline viewing"
        >
          <Switch
            checkedChildren="Yes"
            unCheckedChildren="No"
            defaultChecked={false}
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
              {initialValues ? 'Update Plan' : 'Create Plan'}
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