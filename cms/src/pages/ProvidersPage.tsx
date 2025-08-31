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
  Image,
  Tooltip,
  Badge,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  GlobalOutlined,
  CrownOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { 
  providerService, 
  Provider, 
  ProviderStatus,
  ProviderType 
} from '../services/providerService';
import { usePermissions } from '../hooks/usePermissions';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

const ProvidersPage: React.FC = () => {
  const navigate = useNavigate();
  const { canCreate, canEdit, canDelete } = usePermissions();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const data = await providerService.getAll();
      setProviders(data);
    } catch (error) {
      message.error('Failed to fetch providers');
      console.error('Error fetching providers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    navigate('/providers/create');
  };

  const handleEdit = (provider: Provider) => {
    navigate(`/providers/edit/${provider.providerId}`);
  };

  const handleDelete = async (providerId: number) => {
    try {
      setLoading(true);
      await providerService.delete(providerId);
      message.success('Provider deleted successfully');
      fetchProviders();
    } catch (error) {
      message.error('Failed to delete provider');
      console.error('Error deleting provider:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<Provider> = [
    {
      title: 'Logo',
      dataIndex: 'iconUrl',
      key: 'iconUrl',
      width: 80,
      render: (iconUrl: string, record: Provider) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {iconUrl ? (
            <Image
              width={40}
              height={40}
              src={iconUrl}
              preview={false}
              style={{ borderRadius: '8px', objectFit: 'contain' }}
              fallback="/placeholder-provider.png"
            />
          ) : (
            <div 
              style={{ 
                width: 40, 
                height: 40, 
                backgroundColor: record.colorCode || '#f0f0f0',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              {record.providerName?.charAt(0)?.toUpperCase() || '?'}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Provider Name',
      dataIndex: 'providerName',
      key: 'providerName',
      sorter: (a, b) => a.providerName.localeCompare(b.providerName),
      render: (providerName: string, record: Provider) => (
        <Space direction="vertical" size={0}>
          <Space>
            <span style={{ fontWeight: 500, fontSize: '16px' }}>{providerName}</span>
            {record.isPremium && (
              <Tooltip title="Premium Provider">
                <CrownOutlined style={{ color: '#faad14' }} />
              </Tooltip>
            )}
            {record.isFeatured && (
              <Tooltip title="Featured Provider">
                <StarOutlined style={{ color: '#1890ff' }} />
              </Tooltip>
            )}
          </Space>
          {record.description && (
            <span style={{ fontSize: '12px', color: '#666' }}>
              {record.description.length > 60 
                ? `${record.description.substring(0, 60)}...` 
                : record.description}
            </span>
          )}
          {record.websiteUrl && (
            <a 
              href={record.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ fontSize: '12px' }}
            >
              <GlobalOutlined /> Visit Website
            </a>
          )}
        </Space>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'providerType',
      key: 'providerType',
      width: 120,
      filters: [
        { text: 'Streaming', value: ProviderType.STREAMING },
        { text: 'Studio', value: ProviderType.STUDIO },
        { text: 'Distributor', value: ProviderType.DISTRIBUTOR },
        { text: 'Network', value: ProviderType.NETWORK },
      ],
      onFilter: (value, record) => record.providerType === value,
      render: (type: ProviderType) => {
        const colorMap = {
          [ProviderType.STREAMING]: 'blue',
          [ProviderType.STUDIO]: 'green',
          [ProviderType.DISTRIBUTOR]: 'orange',
          [ProviderType.NETWORK]: 'purple',
        };
        return (
          <Tag color={colorMap[type]}>
            {type.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      filters: [
        { text: 'Active', value: ProviderStatus.ACTIVE },
        { text: 'Inactive', value: ProviderStatus.INACTIVE },
        { text: 'Maintenance', value: ProviderStatus.MAINTENANCE },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: ProviderStatus) => {
        const colorMap = {
          [ProviderStatus.ACTIVE]: 'green',
          [ProviderStatus.INACTIVE]: 'red',
          [ProviderStatus.MAINTENANCE]: 'orange',
        };
        return (
          <Tag color={colorMap[status]}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Content Count',
      dataIndex: 'contentCount',
      key: 'contentCount',
      width: 120,
      sorter: (a, b) => a.contentCount - b.contentCount,
      render: (contentCount: number) => (
        <Badge 
          count={contentCount} 
          style={{ backgroundColor: '#52c41a' }}
          overflowCount={999}
        />
      ),
    },
    {
      title: 'Country',
      dataIndex: 'countryOfOrigin',
      key: 'countryOfOrigin',
      width: 100,
      render: (country: string) => country || '-',
    },
    {
      title: 'Sort Order',
      dataIndex: 'sortOrder',
      key: 'sortOrder',
      width: 100,
      sorter: (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0),
      render: (sortOrder: number) => sortOrder || 0,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record: Provider) => (
        <Space size="small">
          {canEdit('providers') && (
            <Button
              type="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            >
              Edit
            </Button>
          )}
          {canDelete('providers') && (
            <Popconfirm
              title="Delete Provider"
              description="Are you sure you want to delete this provider?"
              onConfirm={() => handleDelete(record.providerId)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                size="small"
                icon={<DeleteOutlined />}
              >
                Delete
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2}>Content Providers</Title>
        </Col>
        <Col>
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={fetchProviders}
              loading={loading}
            >
              Refresh
            </Button>
            {canCreate('providers') && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreate}
              >
                Add Provider
              </Button>
            )}
          </Space>
        </Col>
      </Row>

      <Card>
        <Table
          columns={columns}
          dataSource={providers}
          rowKey="providerId"
          loading={loading}
          pagination={{
            total: providers.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} providers`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default ProvidersPage;
