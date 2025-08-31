import React, { useEffect, useState } from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  message,
  Typography,
  Upload,
  ColorPicker,
  Switch,
  Space,
  Divider,
  Image,
  Row,
  Col,
  Tag,
  InputNumber,
} from 'antd';
import {
  SaveOutlined,
  ArrowLeftOutlined,
  UploadOutlined,
  EyeOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  genreService, 
  Genre, 
  CreateGenreDto, 
  UpdateGenreDto, 
  GenreStatus 
} from '../services/genreService';
import { usePermissions } from '../hooks/usePermissions';
import type { UploadFile } from 'antd/es/upload/interface';

const { Title, Text } = Typography;
const { TextArea } = Input;

const GenreCreateEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { canCreate, canEdit } = usePermissions();
  const isEditing = !!id;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState<Genre | null>(null);
  const [iconFileList, setIconFileList] = useState<UploadFile[]>([]);

  // Check permissions
  const hasPermission = isEditing ? canEdit('genres') : canCreate('genres');

  useEffect(() => {
    if (isEditing && id) {
      fetchGenre(id);
    }
  }, [id, isEditing]);

  const fetchGenre = async (genreId: string) => {
    try {
      setLoading(true);
      const data = await genreService.getById(Number(genreId));
      setGenre(data);
      
      // Populate form with existing data
      form.setFieldsValue({
        genreName: data.genreName,
        description: data.description,
        status: data.status,
        colorCode: data.colorCode,
        iconUrl: data.iconUrl,
        sortOrder: data.sortOrder,
        isFeatured: data.isFeatured,
      });

      // Set icon file list if exists
      if (data.iconUrl) {
        setIconFileList([{
          uid: '-1',
          name: 'icon.png',
          status: 'done',
          url: data.iconUrl,
        }]);
      }
    } catch (error) {
      message.error('Failed to fetch genre details');
      navigate('/genres');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      
      const genreData = {
        genreName: values.genreName,
        description: values.description,
        status: values.status,
        colorCode: values.colorCode,
        iconUrl: values.iconUrl || iconFileList[0]?.url || '',
        sortOrder: values.sortOrder || 0,
        isFeatured: values.isFeatured || false,
      };

      if (isEditing && id) {
        await genreService.update(Number(id), genreData as UpdateGenreDto);
        message.success('Genre updated successfully!');
      } else {
        await genreService.create(genreData as CreateGenreDto);
        message.success('Genre created successfully!');
      }
      
      navigate('/genres');
    } catch (error) {
      message.error(isEditing ? 'Failed to update genre' : 'Failed to create genre');
    } finally {
      setLoading(false);
    }
  };

  const handleIconUpload = (file: File) => {
    // In a real app, you would upload to your server/cloud storage
    const url = URL.createObjectURL(file);
    form.setFieldsValue({ iconUrl: url });
    setIconFileList([{
      uid: file.name,
      name: file.name,
      status: 'done',
      url: url,
    }]);
    return false; // Prevent default upload
  };

  const generateSlug = () => {
    const genreName = form.getFieldValue('genreName');
    // This is a utility function for slug generation
    // In the current Genre interface, we don't have slug field
    // so this function is not needed but kept for potential future use
  };

  if (!hasPermission) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <Title level={3}>Access Denied</Title>
        <Text>You don't have permission to {isEditing ? 'edit' : 'create'} genres.</Text>
        <br />
        <Button 
          type="primary" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/genres')}
          style={{ marginTop: 16 }}
        >
          Back to Genres
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Space>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/genres')}
            >
              Back
            </Button>
            <Title level={2} style={{ margin: 0 }}>
              {isEditing ? 'Edit Genre' : 'Create New Genre'}
            </Title>
          </Space>
        </Col>
      </Row>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: GenreStatus.ACTIVE,
            isFeatured: false,
            sortOrder: 0,
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Genre Name"
                name="genreName"
                rules={[
                  { required: true, message: 'Please enter genre name' },
                  { min: 2, message: 'Name must be at least 2 characters' },
                  { max: 50, message: 'Name must not exceed 50 characters' }
                ]}
              >
                <Input 
                  placeholder="Enter genre name" 
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { max: 500, message: 'Description must not exceed 500 characters' }
                ]}
              >
                <TextArea 
                  placeholder="Enter genre description"
                  rows={4}
                  showCount
                  maxLength={500}
                />
              </Form.Item>

              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select size="large">
                  <Select.Option value={GenreStatus.ACTIVE}>
                    <Tag color="green">Active</Tag>
                  </Select.Option>
                  <Select.Option value={GenreStatus.INACTIVE}>
                    <Tag color="red">Inactive</Tag>
                  </Select.Option>
                  <Select.Option value={GenreStatus.HIDDEN}>
                    <Tag color="gray">Hidden</Tag>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Genre Icon"
                name="iconUrl"
                extra="Upload an icon for this genre"
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Upload
                    listType="picture-card"
                    fileList={iconFileList}
                    beforeUpload={handleIconUpload}
                    onRemove={() => {
                      setIconFileList([]);
                      form.setFieldsValue({ iconUrl: '' });
                    }}
                    maxCount={1}
                    accept="image/*"
                  >
                    {iconFileList.length === 0 && (
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Upload Icon</div>
                      </div>
                    )}
                  </Upload>
                  
                  {iconFileList.length > 0 && (
                    <div style={{ textAlign: 'center' }}>
                      <EyeOutlined /> Preview
                    </div>
                  )}
                </Space>
              </Form.Item>

              <Form.Item
                label="Color Code"
                name="colorCode"
                extra="Brand color for this genre"
              >
                <ColorPicker
                  showText
                  size="large"
                  format="hex"
                  presets={[
                    { label: 'Red', colors: ['#ff4d4f', '#ff7875', '#ffadd6'] },
                    { label: 'Blue', colors: ['#1890ff', '#40a9ff', '#69c0ff'] },
                    { label: 'Green', colors: ['#52c41a', '#73d13d', '#95de64'] },
                    { label: 'Purple', colors: ['#722ed1', '#9254de', '#b37feb'] },
                    { label: 'Orange', colors: ['#fa8c16', '#ffa940', '#ffc069'] },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label="Sort Order"
                name="sortOrder"
                extra="Lower numbers appear first"
              >
                <InputNumber 
                  min={0} 
                  max={9999}
                  style={{ width: '100%' }}
                  size="large"
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label="Featured Genre"
                    name="isFeatured"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Divider />

          <Form.Item style={{ marginTop: 32 }}>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={<SaveOutlined />}
                size="large"
              >
                {isEditing ? 'Update Genre' : 'Create Genre'}
              </Button>
              <Button 
                onClick={() => navigate('/genres')}
                size="large"
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* Live Preview */}
      {form.getFieldsValue().genreName && (
        <Card 
          title="Live Preview" 
          style={{ marginTop: 24 }}
          extra={<EyeOutlined />}
        >
          <Row gutter={16} align="middle">
            <Col>
              {iconFileList.length > 0 ? (
                <Image
                  src={iconFileList[0].url}
                  alt="Genre Icon"
                  width={40}
                  height={40}
                  style={{ borderRadius: 8 }}
                  fallback="/placeholder-icon.png"
                />
              ) : (
                <div 
                  style={{ 
                    width: 40, 
                    height: 40, 
                    backgroundColor: form.getFieldValue('colorCode') || '#f0f0f0',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  {form.getFieldValue('genreName')?.charAt(0)?.toUpperCase() || '?'}
                </div>
              )}
            </Col>
            <Col flex={1}>
              <Space direction="vertical" size={0}>
                <Text strong style={{ fontSize: 16 }}>
                  {form.getFieldValue('genreName') || 'Genre Name'}
                </Text>
                <Text type="secondary">
                  {form.getFieldValue('description') || 'No description provided'}
                </Text>
                <Space>
                  <Tag color={form.getFieldValue('status') === GenreStatus.ACTIVE ? 'green' : 'red'}>
                    {form.getFieldValue('status') || GenreStatus.ACTIVE}
                  </Tag>
                  {form.getFieldValue('isFeatured') && (
                    <Tag color="purple">Featured</Tag>
                  )}
                </Space>
              </Space>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default GenreCreateEditPage;
