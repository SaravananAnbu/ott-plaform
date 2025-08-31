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
  Avatar,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  profileService,
  Profile,
  CreateProfileDto,
  UpdateProfileDto,
  ProfileAgeRestriction,
} from '../services/profileService';
import { userService, User } from '../services/userService';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;

const ProfilesPage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [profilesData, usersData] = await Promise.all([
        profileService.getAll(),
        userService.getAll(),
      ]);
      setProfiles(profilesData);
      setUsers(usersData);
    } catch (error) {
      message.error('Failed to fetch data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingProfile(null);
    form.resetFields();
    form.setFieldsValue({
      ageRestriction: ProfileAgeRestriction.NONE,
    });
    setModalVisible(true);
  };

  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
    form.setFieldsValue({
      userId: profile.user.userId,
      profileName: profile.profileName,
      profileImage: profile.profileImage,
      ageRestriction: profile.ageRestriction,
    });
    setModalVisible(true);
  };

  const handleDelete = async (profileId: number) => {
    try {
      await profileService.delete(profileId);
      message.success('Profile deleted successfully');
      fetchData();
    } catch (error) {
      message.error('Failed to delete profile');
      console.error('Error deleting profile:', error);
    }
  };

  const handleSubmit = async (values: CreateProfileDto | UpdateProfileDto) => {
    try {
      if (editingProfile) {
        await profileService.update(editingProfile.profileId, values);
        message.success('Profile updated successfully');
      } else {
        await profileService.create(values as CreateProfileDto);
        message.success('Profile created successfully');
      }
      setModalVisible(false);
      fetchData();
    } catch (error) {
      message.error(editingProfile ? 'Failed to update profile' : 'Failed to create profile');
      console.error('Error saving profile:', error);
    }
  };

  const getAgeRestrictionColor = (restriction: ProfileAgeRestriction) => {
    switch (restriction) {
      case ProfileAgeRestriction.KIDS:
        return 'green';
      case ProfileAgeRestriction.TEENS:
        return 'orange';
      case ProfileAgeRestriction.ADULTS:
        return 'red';
      default:
        return 'blue';
    }
  };

  const columns: ColumnsType<Profile> = [
    {
      title: 'Profile ID',
      dataIndex: 'profileId',
      key: 'profileId',
      width: 100,
      sorter: (a, b) => a.profileId - b.profileId,
    },
    {
      title: 'Avatar',
      dataIndex: 'profileImage',
      key: 'profileImage',
      width: 80,
      render: (image, record) => (
        <Avatar
          size={40}
          src={image}
          icon={<UserOutlined />}
          alt={record.profileName}
        />
      ),
    },
    {
      title: 'Profile Name',
      dataIndex: 'profileName',
      key: 'profileName',
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
      title: 'Age Restriction',
      dataIndex: 'ageRestriction',
      key: 'ageRestriction',
      render: (restriction) => (
        <Tag color={getAgeRestrictionColor(restriction)}>
          {restriction.toUpperCase()}
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
            title="Are you sure you want to delete this profile?"
            onConfirm={() => handleDelete(record.profileId)}
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
        <Title level={2}>Profiles Management</Title>
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
            Add Profile
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={profiles}
        rowKey="profileId"
        loading={loading}
        pagination={{
          total: profiles.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} profiles`,
        }}
      />

      <Modal
        title={editingProfile ? 'Edit Profile' : 'Create Profile'}
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
            label="Profile Name"
            name="profileName"
            rules={[
              { required: true, message: 'Please enter profile name' },
              { max: 50, message: 'Profile name must be less than 50 characters' },
            ]}
          >
            <Input placeholder="Enter profile name" />
          </Form.Item>

          <Form.Item
            label="Profile Image URL"
            name="profileImage"
            rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
          >
            <Input placeholder="Enter profile image URL" />
          </Form.Item>

          <Form.Item
            label="Age Restriction"
            name="ageRestriction"
          >
            <Select placeholder="Select age restriction">
              {Object.values(ProfileAgeRestriction).map(restriction => (
                <Option key={restriction} value={restriction}>
                  {restriction.toUpperCase()}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingProfile ? 'Update' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfilesPage;