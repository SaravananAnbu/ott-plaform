import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Switch,
  message,
  Popconfirm,
  Typography,
  Tag,
  Card,
  Row,
  Col,
  Transfer,
  Divider,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  roleService,
  Role,
  CreateRoleDto,
  UpdateRoleDto,
  PlatformPermission,
} from '../services/roleService';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { TextArea } = Input;

const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const data = await roleService.getAll();
      setRoles(data);
    } catch (error) {
      message.error('Failed to fetch roles');
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingRole(null);
    form.resetFields();
    setSelectedPermissions([]);
    setModalVisible(true);
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    form.setFieldsValue(role);
    setSelectedPermissions(role.permissions || []);
    setModalVisible(true);
  };

  const handleDelete = async (roleId: number) => {
    try {
      await roleService.delete(roleId);
      message.success('Role deleted successfully');
      fetchRoles();
    } catch (error) {
      message.error('Failed to delete role');
      console.error('Error deleting role:', error);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const submitData = {
        ...values,
        permissions: selectedPermissions,
      };

      if (editingRole) {
        await roleService.update(editingRole.roleId, submitData);
        message.success('Role updated successfully');
      } else {
        await roleService.create(submitData);
        message.success('Role created successfully');
      }
      
      setModalVisible(false);
      fetchRoles();
    } catch (error) {
      message.error(editingRole ? 'Failed to update role' : 'Failed to create role');
      console.error('Error submitting role:', error);
    }
  };

  const handlePermissionManage = (role: Role) => {
    setEditingRole(role);
    setSelectedPermissions(role.permissions || []);
    setPermissionModalVisible(true);
  };

  const handlePermissionUpdate = async () => {
    if (!editingRole) return;
    
    try {
      await roleService.update(editingRole.roleId, {
        permissions: selectedPermissions,
      });
      message.success('Permissions updated successfully');
      setPermissionModalVisible(false);
      fetchRoles();
    } catch (error) {
      message.error('Failed to update permissions');
    }
  };

  const permissionGroups = {
    'Content Management': [
      PlatformPermission.CONTENT_CREATE,
      PlatformPermission.CONTENT_READ,
      PlatformPermission.CONTENT_UPDATE,
      PlatformPermission.CONTENT_DELETE,
      PlatformPermission.CONTENT_PUBLISH,
    ],
    'User Management': [
      PlatformPermission.USER_CREATE,
      PlatformPermission.USER_READ,
      PlatformPermission.USER_UPDATE,
      PlatformPermission.USER_DELETE,
      PlatformPermission.USER_SUSPEND,
    ],
    'Plan Management': [
      PlatformPermission.PLAN_CREATE,
      PlatformPermission.PLAN_READ,
      PlatformPermission.PLAN_UPDATE,
      PlatformPermission.PLAN_DELETE,
    ],
    'Analytics': [
      PlatformPermission.ANALYTICS_READ,
      PlatformPermission.ANALYTICS_EXPORT,
    ],
    'System Administration': [
      PlatformPermission.SYSTEM_ADMIN,
      PlatformPermission.ROLE_MANAGE,
      PlatformPermission.SETTINGS_MANAGE,
    ],
  };

  const columns: ColumnsType<Role> = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <UserOutlined />
          <span style={{ fontWeight: record.isSystemRole ? 'bold' : 'normal' }}>
            {text}
          </span>
          {record.isSystemRole && <Tag color="red">System</Tag>}
        </Space>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions: string[]) => (
        <Space wrap>
          {permissions?.slice(0, 3).map(permission => (
            <Tag key={permission} color="blue">
              {permission.split(':')[1]}
            </Tag>
          ))}
          {permissions?.length > 3 && (
            <Tag color="default">+{permissions.length - 3} more</Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Inactive'}
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
            icon={<SettingOutlined />}
            onClick={() => handlePermissionManage(record)}
          >
            Permissions
          </Button>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            disabled={record.isSystemRole}
          />
          <Popconfirm
            title="Are you sure you want to delete this role?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record.roleId)}
            okText="Yes"
            cancelText="No"
            disabled={record.isSystemRole}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              disabled={record.isSystemRole}
            />
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
              Role Management
            </Title>
          </Col>
          <Col>
            <Space>
              <Button icon={<ReloadOutlined />} onClick={fetchRoles}>
                Refresh
              </Button>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                Create Role
              </Button>
            </Space>
          </Col>
        </Row>

        <Table
          dataSource={roles}
          columns={columns}
          rowKey="roleId"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} roles`,
          }}
        />
      </Card>

      {/* Create/Edit Role Modal */}
      <Modal
        title={editingRole ? 'Edit Role' : 'Create New Role'}
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
            label="Role Name"
            name="name"
            rules={[{ required: true, message: 'Please enter role name' }]}
          >
            <Input placeholder="Enter role name" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <TextArea rows={3} placeholder="Enter role description" />
          </Form.Item>

          <Form.Item name="isActive" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            <span style={{ marginLeft: 8 }}>Role Status</span>
          </Form.Item>

          <Divider />
          
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={() => setModalVisible(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {editingRole ? 'Update' : 'Create'} Role
            </Button>
          </Space>
        </Form>
      </Modal>

      {/* Permissions Management Modal */}
      <Modal
        title={`Manage Permissions - ${editingRole?.name}`}
        open={permissionModalVisible}
        onCancel={() => setPermissionModalVisible(false)}
        onOk={handlePermissionUpdate}
        width={800}
      >
        <div style={{ marginBottom: 16 }}>
          <Title level={4}>Select Permissions</Title>
          <p>Choose the permissions for this role. Users with this role will be able to perform these actions.</p>
        </div>

        {Object.entries(permissionGroups).map(([groupName, permissions]) => (
          <Card key={groupName} title={groupName} size="small" style={{ marginBottom: 16 }}>
            <Row gutter={[16, 8]}>
              {permissions.map(permission => (
                <Col span={12} key={permission}>
                  <Space>
                    <Switch
                      checked={selectedPermissions.includes(permission)}
                      onChange={(checked) => {
                        if (checked) {
                          setSelectedPermissions([...selectedPermissions, permission]);
                        } else {
                          setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
                        }
                      }}
                    />
                    <span>{permission.replace(':', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                  </Space>
                </Col>
              ))}
            </Row>
          </Card>
        ))}
      </Modal>
    </div>
  );
};

export default RolesPage;
