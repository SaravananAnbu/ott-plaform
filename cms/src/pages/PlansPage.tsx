import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Space,
  message,
  Popconfirm,
  Typography,
  Tag,
  Card,
  Row,
  Col,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  CrownOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { 
  planService, 
  Plan, 
  PlanType, 
  PlanStatus 
} from '../services/planService';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

const PlansPage: React.FC = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);

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
    navigate('/plans/create');
  };

  const handleEdit = (plan: Plan) => {
    navigate(`/plans/edit/${plan.planId}`);
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
    <div style={{ padding: '24px' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
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

      <Card>
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
    </div>
  );
};

export default PlansPage;