import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Switch,
  message,
  Popconfirm,
  Typography,
  Tag,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { planService, Plan, CreatePlanDto, UpdatePlanDto } from '../services/planService';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

const PlansPage: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const data = await planService.getAll();
      setPlans(data);
    } catch (error) {
      message.error('Failed to fetch plans');
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingPlan(null);
    form.resetFields();
    form.setFieldsValue({
      currency: 'USD',
      screensAllowed: 1,
      downloadsAllowed: true,
    });
    setModalVisible(true);
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    form.setFieldsValue({
      planName: plan.planName,
      priceCents: plan.priceCents,
      currency: plan.currency,
      resolution: plan.resolution,
      screensAllowed: plan.screensAllowed,
      downloadsAllowed: plan.downloadsAllowed,
    });
    setModalVisible(true);
  };

  const handleDelete = async (planId: number) => {
    try {
      await planService.delete(planId);
      message.success('Plan deleted successfully');
      fetchPlans();
    } catch (error) {
      message.error('Failed to delete plan');
      console.error('Error deleting plan:', error);
    }
  };

  const handleSubmit = async (values: CreatePlanDto | UpdatePlanDto) => {
    try {
      if (editingPlan) {
        await planService.update(editingPlan.planId, values);
        message.success('Plan updated successfully');
      } else {
        await planService.create(values as CreatePlanDto);
        message.success('Plan created successfully');
      }
      setModalVisible(false);
      fetchPlans();
    } catch (error) {
      message.error(editingPlan ? 'Failed to update plan' : 'Failed to create plan');
      console.error('Error saving plan:', error);
    }
  };

  const formatPrice = (priceCents: number, currency: string) => {
    const price = priceCents / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const columns: ColumnsType<Plan> = [
    {
      title: 'Plan ID',
      dataIndex: 'planId',
      key: 'planId',
      width: 100,
      sorter: (a, b) => a.planId - b.planId,
    },
    {
      title: 'Plan Name',
      dataIndex: 'planName',
      key: 'planName',
    },
    {
      title: 'Price',
      key: 'price',
      render: (_, record) => formatPrice(record.priceCents, record.currency),
      sorter: (a, b) => a.priceCents - b.priceCents,
    },
    {
      title: 'Resolution',
      dataIndex: 'resolution',
      key: 'resolution',
      render: (resolution) => <Tag color="blue">{resolution}</Tag>,
    },
    {
      title: 'Screens',
      dataIndex: 'screensAllowed',
      key: 'screensAllowed',
      width: 100,
    },
    {
      title: 'Downloads',
      dataIndex: 'downloadsAllowed',
      key: 'downloadsAllowed',
      width: 120,
      render: (allowed) => (
        <Tag color={allowed ? 'green' : 'red'}>
          {allowed ? 'Allowed' : 'Not Allowed'}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this plan?"
            onConfirm={() => handleDelete(record.planId)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2}>Subscription Plans</Title>
        <Space>
          <Button
            type="default"
            icon={<ReloadOutlined />}
            onClick={fetchPlans}
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
          >
            Add Plan
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={plans}
        rowKey="planId"
        loading={loading}
        pagination={{
          total: plans.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} plans`,
        }}
      />

      <Modal
        title={editingPlan ? 'Edit Plan' : 'Create Plan'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Plan Name"
            name="planName"
            rules={[
              { required: true, message: 'Please enter plan name' },
              { max: 60, message: 'Plan name must be less than 60 characters' },
            ]}
          >
            <Input placeholder="Enter plan name" />
          </Form.Item>

          <Form.Item
            label="Price (in cents)"
            name="priceCents"
            rules={[
              { required: true, message: 'Please enter price' },
              { type: 'number', min: 0, message: 'Price must be positive' },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="Enter price in cents (e.g., 999 for $9.99)"
              min={0}
            />
          </Form.Item>

          <Form.Item
            label="Currency"
            name="currency"
            rules={[
              { len: 3, message: 'Currency code must be exactly 3 characters' },
            ]}
          >
            <Input placeholder="Enter currency code (e.g., USD)" maxLength={3} />
          </Form.Item>

          <Form.Item
            label="Resolution"
            name="resolution"
            rules={[
              { required: true, message: 'Please enter resolution' },
              { max: 10, message: 'Resolution must be less than 10 characters' },
            ]}
          >
            <Input placeholder="Enter resolution (e.g., 1080p, 4K)" />
          </Form.Item>

          <Form.Item
            label="Screens Allowed"
            name="screensAllowed"
            rules={[
              { type: 'number', min: 1, message: 'At least 1 screen must be allowed' },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="Number of screens allowed"
              min={1}
            />
          </Form.Item>

          <Form.Item
            label="Downloads Allowed"
            name="downloadsAllowed"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingPlan ? 'Update' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PlansPage;