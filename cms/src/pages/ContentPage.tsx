import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  message,
  Popconfirm,
  Typography,
  Tag,
  Image,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
  contentService,
  Content,
  CreateContentDto,
  UpdateContentDto,
  ContentCategory,
  MaturityRating,
  ContentStatus,
} from '../services/contentService';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const ContentPage: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const data = await contentService.getAll();
      setContent(data);
    } catch (error) {
      message.error('Failed to fetch content');
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    navigate('/content/create');
  };

  const handleEdit = (content: Content) => {
    navigate(`/content/edit/${content.contentId}`);
  };

  const handleDelete = async (contentId: number) => {
    try {
      await contentService.delete(contentId);
      message.success('Content deleted successfully');
      fetchContent();
    } catch (error) {
      message.error('Failed to delete content');
      console.error('Error deleting content:', error);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const submitData = {
        ...values,
        releaseDate: values.releaseDate ? values.releaseDate.format('YYYY-MM-DD') : undefined,
      };

      if (editingContent) {
        await contentService.update(editingContent.contentId, submitData);
        message.success('Content updated successfully');
      } else {
        await contentService.create(submitData);
        message.success('Content created successfully');
      }
      setModalVisible(false);
      fetchContent();
    } catch (error) {
      message.error(editingContent ? 'Failed to update content' : 'Failed to create content');
      console.error('Error saving content:', error);
    }
  };

  const getStatusColor = (status: ContentStatus) => {
    switch (status) {
      case ContentStatus.PUBLISHED:
        return 'green';
      case ContentStatus.DRAFT:
        return 'orange';
      case ContentStatus.ARCHIVED:
        return 'red';
      default:
        return 'default';
    }
  };

  const columns: ColumnsType<Content> = [
    {
      title: 'ID',
      dataIndex: 'contentId',
      key: 'contentId',
      width: 80,
      sorter: (a, b) => a.contentId - b.contentId,
    },
    {
      title: 'Poster',
      dataIndex: 'posterUrl',
      key: 'posterUrl',
      width: 80,
      render: (url) => url ? (
        <Image
          width={50}
          height={75}
          src={url}
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
        />
      ) : '-',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag color="blue">{category.toUpperCase()}</Tag>
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
      title: 'Duration',
      dataIndex: 'durationMinutes',
      key: 'durationMinutes',
      render: (duration) => duration ? `${duration} min` : '-',
    },
    {
      title: 'Release Date',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
      render: (date) => date ? new Date(date).toLocaleDateString() : '-',
    },
    {
      title: 'IMDB Rating',
      dataIndex: 'imdbRating',
      key: 'imdbRating',
      render: (rating) => rating ? `${rating}/10` : '-',
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
            title="Are you sure you want to delete this content?"
            onConfirm={() => handleDelete(record.contentId)}
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
        <Title level={2}>Content Management</Title>
        <Space>
          <Button
            type="default"
            icon={<ReloadOutlined />}
            onClick={fetchContent}
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
          >
            Add Content
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={content}
        rowKey="contentId"
        loading={loading}
        scroll={{ x: 1200 }}
        pagination={{
          total: content.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} content items`,
        }}
      />

      <Modal
        title={editingContent ? 'Edit Content' : 'Create Content'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: 'Please enter title' },
              { max: 300, message: 'Title must be less than 300 characters' },
            ]}
          >
            <Input placeholder="Enter content title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <TextArea rows={3} placeholder="Enter content description" />
          </Form.Item>

          <Form.Item
            label="About"
            name="about"
          >
            <TextArea rows={3} placeholder="Enter about content" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select category' }]}
          >
            <Select placeholder="Select category">
              {Object.values(ContentCategory).map(cat => (
                <Option key={cat} value={cat}>{cat.toUpperCase()}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
          >
            <Select placeholder="Select status">
              {Object.values(ContentStatus).map(status => (
                <Option key={status} value={status}>{status.toUpperCase()}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Release Date"
            name="releaseDate"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Duration (minutes)"
            name="durationMinutes"
          >
            <InputNumber min={1} style={{ width: '100%' }} placeholder="Enter duration in minutes" />
          </Form.Item>

          <Form.Item
            label="Language"
            name="language"
            rules={[{ max: 40, message: 'Language must be less than 40 characters' }]}
          >
            <Input placeholder="Enter language" />
          </Form.Item>

          <Form.Item
            label="Maturity Rating"
            name="maturityRating"
          >
            <Select placeholder="Select maturity rating">
              {Object.values(MaturityRating).map(rating => (
                <Option key={rating} value={rating}>{rating}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="IMDB Rating"
            name="imdbRating"
          >
            <InputNumber min={0} max={10} step={0.1} style={{ width: '100%' }} placeholder="Enter IMDB rating" />
          </Form.Item>

          <Form.Item
            label="Poster URL"
            name="posterUrl"
            rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
          >
            <Input placeholder="Enter poster image URL" />
          </Form.Item>

          <Form.Item
            label="Banner URL"
            name="bannerUrl"
            rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
          >
            <Input placeholder="Enter banner image URL" />
          </Form.Item>

          <Form.Item
            label="Thumbnail URL"
            name="thumbnailUrl"
            rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
          >
            <Input placeholder="Enter thumbnail image URL" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingContent ? 'Update' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContentPage;