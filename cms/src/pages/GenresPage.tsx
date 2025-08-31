import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Typography,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { genreService, Genre, CreateGenreDto, UpdateGenreDto } from '../services/genreService';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { TextArea } = Input;

const GenresPage: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingGenre, setEditingGenre] = useState<Genre | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      setLoading(true);
      const data = await genreService.getAll();
      setGenres(data);
    } catch (error) {
      message.error('Failed to fetch genres');
      console.error('Error fetching genres:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingGenre(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (genre: Genre) => {
    setEditingGenre(genre);
    form.setFieldsValue({
      name: genre.name,
      description: genre.description,
    });
    setModalVisible(true);
  };

  const handleDelete = async (genreId: number) => {
    try {
      await genreService.delete(genreId);
      message.success('Genre deleted successfully');
      fetchGenres();
    } catch (error) {
      message.error('Failed to delete genre');
      console.error('Error deleting genre:', error);
    }
  };

  const handleSubmit = async (values: CreateGenreDto | UpdateGenreDto) => {
    try {
      if (editingGenre) {
        await genreService.update(editingGenre.genreId, values);
        message.success('Genre updated successfully');
      } else {
        await genreService.create(values as CreateGenreDto);
        message.success('Genre created successfully');
      }
      setModalVisible(false);
      fetchGenres();
    } catch (error) {
      message.error(editingGenre ? 'Failed to update genre' : 'Failed to create genre');
      console.error('Error saving genre:', error);
    }
  };

  const columns: ColumnsType<Genre> = [
    {
      title: 'Genre ID',
      dataIndex: 'genreId',
      key: 'genreId',
      width: 100,
      sorter: (a, b) => a.genreId - b.genreId,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (description) => description || '-',
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
            title="Are you sure you want to delete this genre?"
            onConfirm={() => handleDelete(record.genreId)}
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
        <Title level={2}>Genres Management</Title>
        <Space>
          <Button
            type="default"
            icon={<ReloadOutlined />}
            onClick={fetchGenres}
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
          >
            Add Genre
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={genres}
        rowKey="genreId"
        loading={loading}
        pagination={{
          total: genres.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} genres`,
        }}
      />

      <Modal
        title={editingGenre ? 'Edit Genre' : 'Create Genre'}
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
            label="Genre Name"
            name="name"
            rules={[
              { required: true, message: 'Please enter genre name' },
              { max: 100, message: 'Genre name must be less than 100 characters' },
            ]}
          >
            <Input placeholder="Enter genre name" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <TextArea
              rows={4}
              placeholder="Enter genre description"
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingGenre ? 'Update' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GenresPage;