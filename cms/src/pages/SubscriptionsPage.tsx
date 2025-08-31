import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Select,
  DatePicker,
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
import {
  subscriptionService,
  Subscription,
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
  SubscriptionStatus,
} from '../services/subscriptionService';
import { userService, User } from '../services/userService';
import { planService, Plan } from '../services/planService';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

const SubscriptionsPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [subscriptionsData, usersData, plansData] = await Promise.all([
        subscriptionService.getAll(),
        userService.getAll(),
        planService.getAll(),
      ]);
      setSubscriptions(subscriptionsData);
      setUsers(usersData);
      setPlans(plansData);
    } catch (error) {
      message.error('Failed to fetch data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingSubscription(null);
    form.resetFields();
    form.setFieldsValue({
      status: SubscriptionStatus.ACTIVE,
      autoRenew: true,
      startDate: dayjs(),
    });
    setModalVisible(true);
  };

  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    form.setFieldsValue({
      userId: subscription.user.userId,
      planId: subscription.plan.planId,
      startDate: dayjs(subscription.startDate),
      endDate: subscription.endDate ? dayjs(subscription.endDate) : null,
      status: subscription.status,
      autoRenew: subscription.autoRenew,
    });
    setModalVisible(true);
  };

  const handleDelete = async (subscriptionId: number) => {
    try {
      await subscriptionService.delete(subscriptionId);
      message.success('Subscription deleted successfully');
      fetchData();
    } catch (error) {
      message.error('Failed to delete subscription');
      console.error('Error deleting subscription:', error);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const submitData = {
        ...values,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : undefined,
      };

      if (editingSubscription) {
        await subscriptionService.update(editingSubscription.subscriptionId, submitData);
        message.success('Subscription updated successfully');
      } else {
        await subscriptionService.create(submitData);
        message.success('Subscription created successfully');
      }
      setModalVisible(false);
      fetchData();
    } catch (error) {
      message.error(editingSubscription ? 'Failed to update subscription' : 'Failed to create subscription');
      console.error('Error saving subscription:', error);
    }
  };

  const getStatusColor = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return 'green';
      case SubscriptionStatus.PAUSED:
        return 'orange';
      case SubscriptionStatus.CANCELLED:
        return 'red';
      case SubscriptionStatus.EXPIRED:
        return 'gray';
      default:
        return 'default';
    }
  };

  const formatPrice = (priceCents: number) => {
    const price = priceCents / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const columns: ColumnsType<Subscription> = [
    {
      title: 'ID',
      dataIndex: 'subscriptionId',
      key: 'subscriptionId',
      width: 80,
      sorter: (a, b) => a.subscriptionId - b.subscriptionId,
    },
    {
      title: 'User',
      key: 'user',
      render: (_, record) => (
        <div>
          <div>ID: {record.user.userId}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.user.email || record.user.phoneNumber || 'No contact info'}
          </div>
        </div>
      ),
    },
    {
      title: 'Plan',
      key: 'plan',
      render: (_, record) => (
        <div>
          <div>{record.plan.planName}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {formatPrice(record.plan.priceCents)}
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date) => date ? new Date(date).toLocaleDateString() : '-',
    },
    {
      title: 'Auto Renew',
      dataIndex: 'autoRenew',
      key: 'autoRenew',
      render: (autoRenew) => (
        <Tag color={autoRenew ? 'green' : 'red'}>
          {autoRenew ? 'Yes' : 'No'}
        </Tag>
      ),
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
            title="Are you sure you want to delete this subscription?"
            onConfirm={() => handleDelete(record.subscriptionId)}
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: 20 }}>
        <Title level={2}>Subscriptions Management</Title>
        <Space>
          <Button
            type="default"
            icon={<ReloadOutlined />}
            onClick={fetchData}
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
          >
            Add Subscription
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={subscriptions}
        rowKey="subscriptionId"
        loading={loading}
        scroll={{ x: 1200 }}
        pagination={{
          total: subscriptions.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} subscriptions`,
        }}
      />

      <Modal
        title={editingSubscription ? 'Edit Subscription' : 'Create Subscription'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="User"
            name="userId"
            rules={[{ required: true, message: 'Please select a user' }]}
          >
            <Select
              placeholder="Select user"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => {
                const childrenStr = option?.children?.toString() || '';
                return childrenStr.toLowerCase().indexOf(input.toLowerCase()) >= 0;
              }}
            >
              {users.map(user => (
                <Option key={user.userId} value={user.userId}>
                  {user.userId} - {user.email || user.phoneNumber || 'No contact info'}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Plan"
            name="planId"
            rules={[{ required: true, message: 'Please select a plan' }]}
          >
            <Select placeholder="Select plan">
              {plans.map(plan => (
                <Option key={plan.planId} value={plan.planId}>
                  {plan.planName} - {formatPrice(plan.priceCents)}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Please select start date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
          >
            <Select placeholder="Select status">
              {Object.values(SubscriptionStatus).map(status => (
                <Option key={status} value={status}>{status.toUpperCase()}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Auto Renew"
            name="autoRenew"
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
                {editingSubscription ? 'Update' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubscriptionsPage;