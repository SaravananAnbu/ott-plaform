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
  Select,
  message,
  Popconfirm,
  Typography,
  Tag,
  Card,
  Row,
  Col,
  Divider,
  Descriptions,
  Badge,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  CrownOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { 
  planService, 
  Plan, 
  CreatePlanDto, 
  UpdatePlanDto, 
  PlanType, 
  PlanStatus 
} from '../services/planService';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { TextArea } = Input;

const PlansPageNew: React.FC = () => {
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
    setModalVisible(true);
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    form.setFieldsValue(plan);
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

  const getTypeColor = (type: PlanType) => {
    switch (type) {
      case PlanType.FREE: return 'green';
      case PlanType.BASIC: return 'blue';
      case PlanType.STANDARD: return 'orange';
      case PlanType.PREMIUM: return 'red';
      case PlanType.FAMILY: return 'purple';
      default: return 'default';
    }
  };

  const getStatusColor = (status: PlanStatus) => {
    switch (status) {
      case PlanStatus.ACTIVE: return 'green';
      case PlanStatus.INACTIVE: return 'orange';
      case PlanStatus.DEPRECATED: return 'red';
      default: return 'default';
    }
  };

  const columns: ColumnsType<Plan> = [
    {
      title: 'Plan Details',
      key: 'details',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Space>
            <CrownOutlined style={{ color: getTypeColor(record.type) }} />
            <span style={{ fontWeight: 500 }}>{record.planName}</span>
            {record.isPopular && <StarOutlined style={{ color: '#faad14' }} />}
          </Space>
          <Tag color={getTypeColor(record.type)}>{record.type.toUpperCase()}</Tag>
          {record.description && (
            <span style={{ color: '#666', fontSize: '12px' }}>
              {record.description.length > 50 
                ? `${record.description.substring(0, 50)}...` 
                : record.description}
            </span>
          )}
        </Space>
      ),
    },
    {
      title: 'Pricing',
      key: 'pricing',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
            {formatPrice(record.priceCents, record.currency)}
          </span>
          <span style={{ color: '#666', fontSize: '12px' }}>
            per {record.billingCycleMonths} month{record.billingCycleMonths > 1 ? 's' : ''}
          </span>
          {record.freeTrialDays > 0 && (
            <Tag color="blue">{record.freeTrialDays} days free trial</Tag>
          )}
        </Space>
      ),
      sorter: (a, b) => a.priceCents - b.priceCents,
    },
    {
      title: 'Features',
      key: 'features',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <span>{record.resolution} • {record.simultaneousStreams} streams</span>
          <Space wrap>
            {record.downloadsAllowed && <Tag color="green">Downloads</Tag>}
            {record.offlineViewing && <Tag color="blue">Offline</Tag>}
            {!record.adsSupported && <Tag color="gold">Ad-free</Tag>}
            {record.familySharing && <Tag color="purple">Family</Tag>}
          </Space>
        </Space>
      ),
    },
    {
      title: 'Access Level',
      dataIndex: 'contentAccessLevel',
      key: 'contentAccessLevel',
      render: (level: string) => (
        <Tag color={level === 'all' ? 'red' : level === 'premium' ? 'orange' : 'blue'}>
          {level.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: PlanStatus) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this plan?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record.planId)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              Subscription Plans
            </Title>
          </Col>
          <Col>
            <Space>
              <Button icon={<ReloadOutlined />} onClick={fetchPlans}>
                Refresh
              </Button>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                Create Plan
              </Button>
            </Space>
          </Col>
        </Row>

        <Table
          dataSource={plans}
          columns={columns}
          rowKey="planId"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} plans`,
          }}
        />
      </Card>

      {/* Create/Edit Plan Modal */}
      <Modal
        title={editingPlan ? 'Edit Plan' : 'Create New Plan'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            currency: 'USD',
            type: PlanType.BASIC,
            status: PlanStatus.ACTIVE,
            screensAllowed: 1,
            simultaneousStreams: 1,
            billingCycleMonths: 1,
            freeTrialDays: 0,
            downloadsAllowed: true,
            adsSupported: true,
            offlineViewing: false,
            familySharing: false,
            parentalControls: true,
            isPopular: false,
            sortOrder: 0,
            contentAccessLevel: 'basic',
            streamingQuality: 'HD',
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Plan Name"
                name="planName"
                rules={[{ required: true, message: 'Please enter plan name' }]}
              >
                <Input placeholder="Enter plan name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Plan Type"
                name="type"
                rules={[{ required: true, message: 'Please select plan type' }]}
              >
                <Select>
                  {Object.entries(PlanType).map(([key, value]) => (
                    <Select.Option key={value} value={value}>
                      {key.charAt(0) + key.slice(1).toLowerCase()}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Description" name="description">
                <TextArea rows={3} placeholder="Enter plan description" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Price (cents)"
                name="priceCents"
                rules={[{ required: true, message: 'Please enter price' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} placeholder="Price in cents" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Currency" name="currency">
                <Select>
                  <Select.Option value="USD">USD</Select.Option>
                  <Select.Option value="EUR">EUR</Select.Option>
                  <Select.Option value="GBP">GBP</Select.Option>
                  <Select.Option value="INR">INR</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Billing Cycle (months)" name="billingCycleMonths">
                <Select>
                  <Select.Option value={1}>Monthly</Select.Option>
                  <Select.Option value={3}>Quarterly</Select.Option>
                  <Select.Option value={6}>Semi-Annual</Select.Option>
                  <Select.Option value={12}>Annual</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Streaming Quality" name="streamingQuality">
                <Select>
                  <Select.Option value="SD">SD</Select.Option>
                  <Select.Option value="HD">HD</Select.Option>
                  <Select.Option value="FHD">FHD</Select.Option>
                  <Select.Option value="4K">4K</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Content Access Level" name="contentAccessLevel">
                <Select>
                  <Select.Option value="basic">Basic</Select.Option>
                  <Select.Option value="premium">Premium</Select.Option>
                  <Select.Option value="all">All Content</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Free Trial Days" name="freeTrialDays">
                <InputNumber min={0} max={30} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Simultaneous Streams" name="simultaneousStreams">
                <InputNumber min={1} max={10} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Screens Allowed" name="screensAllowed">
                <InputNumber min={1} max={10} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Max Download Quality" name="maxDownloadQuality">
                <Select>
                  <Select.Option value="SD">SD</Select.Option>
                  <Select.Option value="HD">HD</Select.Option>
                  <Select.Option value="FHD">FHD</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Divider>Plan Features</Divider>

            <Col span={8}>
              <Form.Item name="downloadsAllowed" valuePropName="checked">
                <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
                <span style={{ marginLeft: 8 }}>Downloads Allowed</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="offlineViewing" valuePropName="checked">
                <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
                <span style={{ marginLeft: 8 }}>Offline Viewing</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="adsSupported" valuePropName="checked">
                <Switch checkedChildren="With Ads" unCheckedChildren="Ad-free" />
                <span style={{ marginLeft: 8 }}>Ads Supported</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="familySharing" valuePropName="checked">
                <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
                <span style={{ marginLeft: 8 }}>Family Sharing</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="parentalControls" valuePropName="checked">
                <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
                <span style={{ marginLeft: 8 }}>Parental Controls</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="isPopular" valuePropName="checked">
                <Switch checkedChildren="Popular" unCheckedChildren="Regular" />
                <span style={{ marginLeft: 8 }}>Popular Plan</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Status" name="status">
                <Select>
                  {Object.entries(PlanStatus).map(([key, value]) => (
                    <Select.Option key={value} value={value}>
                      {key.charAt(0) + key.slice(1).toLowerCase()}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Sort Order" name="sortOrder">
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Space style={{ width: '100%', justifyContent: 'flex-end', marginTop: 16 }}>
            <Button onClick={() => setModalVisible(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {editingPlan ? 'Update' : 'Create'} Plan
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
};

export default PlansPageNew;
