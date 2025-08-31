import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  message,
  Popconfirm,
  Tag,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface CastCrewMember {
  id: number;
  name: string;
  role: string;
  type: 'cast' | 'crew';
  character?: string;
  department?: string;
  profileImage?: string;
}

interface CastCrewManagerProps {
  contentId?: number;
  members: CastCrewMember[];
  onUpdate: (members: CastCrewMember[]) => void;
}

const CastCrewManager: React.FC<CastCrewManagerProps> = ({
  contentId,
  members,
  onUpdate,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState<CastCrewMember | null>(null);
  const [activeTab, setActiveTab] = useState<'cast' | 'crew'>('cast');
  const [form] = Form.useForm();

  const handleAdd = (type: 'cast' | 'crew') => {
    setEditingMember(null);
    setActiveTab(type);
    form.resetFields();
    form.setFieldsValue({ type });
    setModalVisible(true);
  };

  const handleEdit = (member: CastCrewMember) => {
    setEditingMember(member);
    form.setFieldsValue(member);
    setModalVisible(true);
  };

  const handleDelete = (id: number) => {
    const updatedMembers = members.filter(member => member.id !== id);
    onUpdate(updatedMembers);
    message.success('Member removed successfully');
  };

  const handleSubmit = (values: any) => {
    let updatedMembers;
    
    if (editingMember) {
      updatedMembers = members.map(member =>
        member.id === editingMember.id ? { ...member, ...values } : member
      );
    } else {
      const newMember = {
        id: Date.now(),
        ...values,
      };
      updatedMembers = [...members, newMember];
    }

    onUpdate(updatedMembers);
    setModalVisible(false);
    form.resetFields();
    message.success(editingMember ? 'Member updated successfully' : 'Member added successfully');
  };

  const castColumns: ColumnsType<CastCrewMember> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Character',
      dataIndex: 'character',
      key: 'character',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to remove this member?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const crewColumns: ColumnsType<CastCrewMember> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <Tag color="green">{role}</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to remove this member?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const castMembers = members.filter(member => member.type === 'cast');
  const crewMembers = members.filter(member => member.type === 'crew');

  return (
    <div>
      <Card
        title="Cast"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleAdd('cast')}
          >
            Add Cast Member
          </Button>
        }
        style={{ marginBottom: 16 }}
      >
        <Table
          dataSource={castMembers}
          columns={castColumns}
          rowKey="id"
          size="small"
          pagination={false}
        />
      </Card>

      <Card
        title="Crew"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleAdd('crew')}
          >
            Add Crew Member
          </Button>
        }
      >
        <Table
          dataSource={crewMembers}
          columns={crewColumns}
          rowKey="id"
          size="small"
          pagination={false}
        />
      </Card>

      <Modal
        title={editingMember ? 'Edit Member' : `Add ${activeTab} Member`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please select type' }]}
          >
            <Select>
              <Select.Option value="cast">Cast</Select.Option>
              <Select.Option value="crew">Crew</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="Enter member name" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please enter role' }]}
          >
            <Input placeholder="e.g., Lead Actor, Director, Producer" />
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
          >
            {({ getFieldValue }) => {
              const type = getFieldValue('type');
              
              if (type === 'cast') {
                return (
                  <Form.Item
                    name="character"
                    label="Character"
                  >
                    <Input placeholder="Character name" />
                  </Form.Item>
                );
              }
              
              if (type === 'crew') {
                return (
                  <Form.Item
                    name="department"
                    label="Department"
                  >
                    <Select placeholder="Select department">
                      <Select.Option value="Direction">Direction</Select.Option>
                      <Select.Option value="Production">Production</Select.Option>
                      <Select.Option value="Writing">Writing</Select.Option>
                      <Select.Option value="Cinematography">Cinematography</Select.Option>
                      <Select.Option value="Editing">Editing</Select.Option>
                      <Select.Option value="Music">Music</Select.Option>
                      <Select.Option value="Sound">Sound</Select.Option>
                      <Select.Option value="Visual Effects">Visual Effects</Select.Option>
                      <Select.Option value="Art">Art</Select.Option>
                      <Select.Option value="Costume">Costume</Select.Option>
                      <Select.Option value="Makeup">Makeup</Select.Option>
                    </Select>
                  </Form.Item>
                );
              }
              
              return null;
            }}
          </Form.Item>

          <Form.Item
            name="profileImage"
            label="Profile Image URL"
          >
            <Input placeholder="Enter profile image URL" />
          </Form.Item>

          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={() => setModalVisible(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {editingMember ? 'Update' : 'Add'} Member
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
};

export default CastCrewManager;
