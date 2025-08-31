import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Typography,
  Tag,
  Card,
  Row,
  Col,
  Avatar,
  Badge,
  Switch,
  Tooltip,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  UserOutlined,
  LockOutlined,
  UnlockOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
  platformUserService,
  PlatformUser,
  CreatePlatformUserDto,
  UpdatePlatformUserDto,
  UserStatus,
} from '../services/platformUserService';
import { roleService, Role } from '../services/roleService';
import { usePermissions, Permission } from '../hooks/usePermissions';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

const PlatformUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<PlatformUser[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const { canCreate, canEdit, canDelete } = usePermissions();

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await platformUserService.getAll();
      setUsers(data);
    } catch (error) {
      message.error('Failed to fetch platform users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const data = await roleService.getAll();
      setRoles(data);
    } catch (error) {
      message.error('Failed to fetch roles');
      console.error('Error fetching roles:', error);
    }
  };

  const handleCreate = () => {
    navigate('/platform-users/create');
  };

  const handleEdit = (user: PlatformUser) => {
    navigate(`/platform-users/edit/${user.userId}`);
  };

  const handleDelete = async (userId: number) => {
    try {
      await platformUserService.delete(userId);
      message.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      message.error('Failed to delete user');
      console.error('Error deleting user:', error);
    }
  };

  const handleStatusToggle = async (user: PlatformUser) => {
    try {
      const newStatus = user.status === UserStatus.ACTIVE ? UserStatus.INACTIVE : UserStatus.ACTIVE;
      await platformUserService.update(user.userId, { status: newStatus });
      message.success(`User ${newStatus === UserStatus.ACTIVE ? 'activated' : 'deactivated'} successfully`);
      fetchUsers();
    } catch (error) {
      message.error('Failed to update user status');
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case UserStatus.ACTIVE: return 'green';
      case UserStatus.INACTIVE: return 'orange';
      case UserStatus.SUSPENDED: return 'red';
      case UserStatus.PENDING: return 'blue';
      default: return 'default';
    }
  };

  const columns: ColumnsType<PlatformUser> = [
    {
      title: 'User',
      key: 'user',
      render: (_, record) => (
        <Space>
          <Avatar 
            size={40}
            src={record.profilePictureUrl}
            icon={<UserOutlined />}
          />
          <Space direction="vertical" size="small">
            <span style={{ fontWeight: 500 }}>
              {`${record.firstName} ${record.lastName}`.trim() || 'N/A'}
            </span>
            <Space>
              <MailOutlined style={{ fontSize: '12px', color: '#666' }} />
              <span style={{ fontSize: '12px', color: '#666' }}>{record.email}</span>
            </Space>
            {record.phoneNumber && (
              <Space>
                <PhoneOutlined style={{ fontSize: '12px', color: '#666' }} />
                <span style={{ fontSize: '12px', color: '#666' }}>{record.phoneNumber}</span>
              </Space>
            )}
          </Space>
        </Space>
      ),
    },
    {
      title: 'Role & Department',
      key: 'role',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Space>
            <SafetyCertificateOutlined />
            <span style={{ fontWeight: 500 }}>{record.role.name}</span>
            {record.role.permissions.includes('system:admin') && (
              <Tag color="red">Admin</Tag>
            )}
          </Space>
          {record.department && (
            <Tag color="blue">{record.department}</Tag>
          )}
        </Space>
      ),
      filters: roles.map(role => ({
        text: role.name,
        value: role.roleId,
      })),
      onFilter: (value, record) => record.role.roleId === value,
    },
    {
      title: 'Status & Security',
      key: 'status',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Tag color={getStatusColor(record.status)}>
            {record.status.toUpperCase()}
          </Tag>
          <Space>
            {record.emailVerified ? (
              <Badge status="success" text="Email Verified" />
            ) : (
              <Badge status="error" text="Email Unverified" />
            )}
          </Space>
          <Space>
            {record.twoFactorEnabled ? (
              <Badge status="success" text="2FA Enabled" />
            ) : (
              <Badge status="default" text="2FA Disabled" />
            )}
          </Space>
        </Space>
      ),
      filters: Object.entries(UserStatus).map(([key, value]) => ({
        text: key.charAt(0) + key.slice(1).toLowerCase(),
        value,
      })),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLoginAt',
      key: 'lastLoginAt',
      render: (date) => date ? new Date(date).toLocaleDateString() : 'Never',
      sorter: (a, b) => {
        if (!a.lastLoginAt && !b.lastLoginAt) return 0;
        if (!a.lastLoginAt) return 1;
        if (!b.lastLoginAt) return -1;
        return new Date(a.lastLoginAt).getTime() - new Date(b.lastLoginAt).getTime();
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {canEdit('platform-users') && (
            <Tooltip title="Edit User">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
              />
            </Tooltip>
          )}
          
          {canEdit('platform-users') && (
            <Tooltip title={record.status === UserStatus.ACTIVE ? 'Deactivate' : 'Activate'}>
              <Button
                type="text"
                icon={record.status === UserStatus.ACTIVE ? <LockOutlined /> : <UnlockOutlined />}
                onClick={() => handleStatusToggle(record)}
              />
            </Tooltip>
          )}
          
          {canDelete('platform-users') && (
            <Popconfirm
              title="Are you sure you want to delete this user?"
              description="This action cannot be undone."
              onConfirm={() => handleDelete(record.userId)}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Delete User">
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Tooltip>
            </Popconfirm>
          )}
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
              Platform Users
            </Title>
          </Col>
          <Col>
            <Space>
              <Button icon={<ReloadOutlined />} onClick={fetchUsers}>
                Refresh
              </Button>
              {canCreate('platform-users') && (
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                  Create User
                </Button>
              )}
            </Space>
          </Col>
        </Row>

        <Table
          dataSource={users}
          columns={columns}
          rowKey="userId"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} users`,
          }}
        />
      </Card>
    </div>
  );
};

export default PlatformUsersPage;
