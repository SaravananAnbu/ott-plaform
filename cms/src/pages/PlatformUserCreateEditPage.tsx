import React, { useEffect, useState } from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  Switch,
  Button,
  Space,
  Row,
  Col,
  Typography,
  message,
  Tabs,
  Alert,
  Tag,
  Avatar,
  Upload,
  DatePicker,
  Divider,
} from 'antd';
import {
  SaveOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  UploadOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  platformUserService, 
  PlatformUser, 
  CreatePlatformUserDto, 
  UpdatePlatformUserDto, 
  UserStatus 
} from '../services/platformUserService';
import { roleService, Role } from '../services/roleService';
import { usePermissions, Permission } from '../hooks/usePermissions';
import type { UploadFile } from 'antd/es/upload/interface';

const { Title, Text } = Typography;
const { TextArea } = Input;

const PlatformUserCreateEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { canCreate, canEdit } = usePermissions();
  
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [platformUser, setPlatformUser] = useState<PlatformUser | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [activeTab, setActiveTab] = useState('basic');
  const [avatarFileList, setAvatarFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    fetchRoles();
    if (isEdit && id) {
      fetchPlatformUser(parseInt(id));
    } else {
      // Set default values for new user
      form.setFieldsValue({
        status: UserStatus.ACTIVE,
        emailVerified: false,
        twoFactorEnabled: false,
        loginAttempts: 0,
        isOnline: false,
      });
    }
  }, [id, isEdit, form]);

  const fetchRoles = async () => {
    try {
      const data = await roleService.getAll();
      setRoles(data);
    } catch (error) {
      message.error('Failed to fetch roles');
      console.error('Error fetching roles:', error);
    }
  };

  const fetchPlatformUser = async (userId: number) => {
    try {
      setLoading(true);
      const data = await platformUserService.getById(userId);
      setPlatformUser(data);
      form.setFieldsValue(data);
      
      // Set avatar file list
      if (data.profilePictureUrl) {
        setAvatarFileList([{
          uid: '-1',
          name: 'avatar.jpg',
          status: 'done',
          url: data.profilePictureUrl,
        }]);
      }
    } catch (error) {
      message.error('Failed to fetch user details');
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: CreatePlatformUserDto | UpdatePlatformUserDto) => {
    try {
      setLoading(true);
      if (isEdit && id) {
        await platformUserService.update(parseInt(id), values);
        message.success('User updated successfully');
      } else {
        await platformUserService.create(values as CreatePlatformUserDto);
        message.success('User created successfully');
      }
      navigate('/platform-users');
    } catch (error) {
      message.error(isEdit ? 'Failed to update user' : 'Failed to create user');
      console.error('Error saving user:', error);
    } finally {
      setLoading(false);
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

  // Check permissions
  if (!canCreate('platform-users') && !isEdit) {
    return (
      <Card>
        <Alert
          message="Access Denied"
          description="You don't have permission to create platform users."
          type="error"
          showIcon
        />
      </Card>
    );
  }

  if (!canEdit('platform-users') && isEdit) {
    return (
      <Card>
        <Alert
          message="Access Denied"
          description="You don't have permission to edit platform users."
          type="error"
          showIcon
        />
      </Card>
    );
  }

  const basicInfoTab = (
    <Row gutter={16}>
      <Col span={24} style={{ textAlign: 'center', marginBottom: 16 }}>
        <Form.Item label="Profile Avatar" name="profilePictureUrl">
          <Upload
            listType="picture-circle"
            fileList={avatarFileList}
            onChange={({ fileList }) => setAvatarFileList(fileList)}
            beforeUpload={() => false}
            maxCount={1}
          >
            {avatarFileList.length < 1 && (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter username' }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter valid email' }
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="First Name" name="firstName">
          <Input placeholder="Enter first name" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Last Name" name="lastName">
          <Input placeholder="Enter last name" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Phone Number" name="phoneNumber">
          <Input placeholder="Enter phone number" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Department" name="department">
          <Input placeholder="Enter department" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Bio" name="bio">
          <TextArea rows={3} placeholder="Enter user bio" />
        </Form.Item>
      </Col>
    </Row>
  );

  const roleSecurityTab = (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Role"
          name="roleId"
          rules={[{ required: true, message: 'Please select a role' }]}
        >
          <Select placeholder="Select user role">
            {roles.map(role => (
              <Select.Option key={role.roleId} value={role.roleId}>
                <Space>
                  <SafetyCertificateOutlined />
                  {role.name}
                  {role.isSystemRole && <Tag color="red">System</Tag>}
                </Space>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Status" name="status">
          <Select>
            {Object.entries(UserStatus).map(([key, value]) => (
              <Select.Option key={value} value={value}>
                {key.charAt(0) + key.slice(1).toLowerCase()}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="emailVerified" valuePropName="checked">
          <Switch checkedChildren="Verified" unCheckedChildren="Unverified" />
          <span style={{ marginLeft: 8 }}>Email Verified</span>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="twoFactorEnabled" valuePropName="checked">
          <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
          <span style={{ marginLeft: 8 }}>Two-Factor Auth</span>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="isOnline" valuePropName="checked">
          <Switch checkedChildren="Online" unCheckedChildren="Offline" />
          <span style={{ marginLeft: 8 }}>Online Status</span>
        </Form.Item>
      </Col>
    </Row>
  );

  const settingsTab = (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Timezone" name="timezone">
          <Select placeholder="Select timezone" showSearch>
            <Select.Option value="UTC">UTC</Select.Option>
            <Select.Option value="America/New_York">Eastern Time</Select.Option>
            <Select.Option value="America/Chicago">Central Time</Select.Option>
            <Select.Option value="America/Denver">Mountain Time</Select.Option>
            <Select.Option value="America/Los_Angeles">Pacific Time</Select.Option>
            <Select.Option value="Europe/London">London</Select.Option>
            <Select.Option value="Europe/Paris">Paris</Select.Option>
            <Select.Option value="Asia/Tokyo">Tokyo</Select.Option>
            <Select.Option value="Asia/Shanghai">Shanghai</Select.Option>
            <Select.Option value="Asia/Kolkata">India</Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Language Preference" name="preferredLanguage">
          <Select placeholder="Select language">
            <Select.Option value="en">English</Select.Option>
            <Select.Option value="es">Spanish</Select.Option>
            <Select.Option value="fr">French</Select.Option>
            <Select.Option value="de">German</Select.Option>
            <Select.Option value="zh">Chinese</Select.Option>
            <Select.Option value="ja">Japanese</Select.Option>
            <Select.Option value="hi">Hindi</Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Notes" name="notes">
          <TextArea rows={4} placeholder="Internal notes about this user" />
        </Form.Item>
      </Col>
    </Row>
  );

  const userPreview = () => {
    const values = form.getFieldsValue();
    const selectedRole = roles.find(role => role.roleId === values.roleId);
    
    return (
      <Card title="User Preview" style={{ marginTop: 16 }}>
        <Row gutter={16}>
          <Col span={24}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <Avatar size={64} icon={<UserOutlined />} src={values.profilePictureUrl} />
                <Title level={3} style={{ margin: '8px 0' }}>
                  {values.firstName || values.lastName 
                    ? `${values.firstName || ''} ${values.lastName || ''}`.trim()
                    : values.username || 'New User'}
                </Title>
                <Text type="secondary">{values.email}</Text>
                <div style={{ marginTop: 8 }}>
                  <Tag color={getStatusColor(values.status)}>
                    {values.status?.toUpperCase() || 'ACTIVE'}
                  </Tag>
                </div>
              </div>
              
              <Divider />

              <div>
                <Title level={5}>Role & Permissions:</Title>
                {selectedRole && (
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Space>
                      <SafetyCertificateOutlined />
                      <Text strong>{selectedRole.name}</Text>
                      {selectedRole.isSystemRole && <Tag color="red">System Role</Tag>}
                    </Space>
                    <Text type="secondary">{selectedRole.description}</Text>
                    <div>
                      <Text strong>Permissions: </Text>
                      <Space wrap>
                        {selectedRole.permissions.slice(0, 5).map((permission, index) => (
                          <Tag key={index}>{permission}</Tag>
                        ))}
                        {selectedRole.permissions.length > 5 && (
                          <Tag>+{selectedRole.permissions.length - 5} more</Tag>
                        )}
                      </Space>
                    </div>
                  </Space>
                )}
              </div>

              <div>
                <Title level={5}>Security Settings:</Title>
                <Space direction="vertical">
                  <div>
                    <MailOutlined style={{ marginRight: 8 }} />
                    Email Verified: {values.emailVerified ? '✅ Yes' : '❌ No'}
                  </div>
                  <div>
                    <SafetyCertificateOutlined style={{ marginRight: 8 }} />
                    Two-Factor Auth: {values.twoFactorEnabled ? '✅ Enabled' : '❌ Disabled'}
                  </div>
                  <div>
                    <UserOutlined style={{ marginRight: 8 }} />
                    Status: {values.isOnline ? '🟢 Online' : '⚫ Offline'}
                  </div>
                </Space>
              </div>
            </Space>
          </Col>
        </Row>
      </Card>
    );
  };

  const tabItems = [
    {
      key: 'basic',
      label: (
        <Space>
          <UserOutlined />
          Basic Info
        </Space>
      ),
      children: basicInfoTab,
    },
    {
      key: 'role',
      label: (
        <Space>
          <SafetyCertificateOutlined />
          Role & Security
        </Space>
      ),
      children: roleSecurityTab,
    },
    {
      key: 'settings',
      label: (
        <Space>
          <SettingOutlined />
          Settings
        </Space>
      ),
      children: settingsTab,
    },
    {
      key: 'preview',
      label: (
        <Space>
          <EyeOutlined />
          Preview
        </Space>
      ),
      children: userPreview(),
    },
  ];

  return (
    <div>
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
          <Col>
            <Space>
              <Button 
                icon={<ArrowLeftOutlined />} 
                onClick={() => navigate('/platform-users')}
              >
                Back to Users
              </Button>
              <Title level={2} style={{ margin: 0 }}>
                {isEdit ? 'Edit Platform User' : 'Create New Platform User'}
              </Title>
            </Space>
          </Col>
          <Col>
            <Space>
              <Button onClick={() => navigate('/platform-users')}>
                Cancel
              </Button>
              <Button 
                type="primary" 
                icon={<SaveOutlined />}
                onClick={() => form.submit()}
                loading={loading}
              >
                {isEdit ? 'Update User' : 'Create User'}
              </Button>
            </Space>
          </Col>
        </Row>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          size="large"
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            size="large"
          />
        </Form>
      </Card>
    </div>
  );
};

export default PlatformUserCreateEditPage;
