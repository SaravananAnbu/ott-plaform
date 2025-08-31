import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Button,
  Row,
  Col,
  Upload,
  message,
  Divider,
  Tag,
  Typography,
  Space,
  Tabs,
  Table,
  Modal,
} from 'antd';
import {
  ArrowLeftOutlined,
  SaveOutlined,
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { providerService, Provider } from '../services/providerService';
import CastCrewManager from '../components/CastCrewManager';
import ContentPreview from '../components/ContentPreview';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

// Mock data - replace with actual API calls
const ContentCategory = {
  MOVIE: 'movie',
  SERIES: 'series',
  EPISODE: 'episode',
  LIVE: 'live',
  DOCUMENTARY: 'documentary',
  SHORT: 'short',
  TRAILER: 'trailer',
};

const MaturityRating = {
  G: 'G',
  PG: 'PG',
  PG_13: 'PG-13',
  SIXTEEN_PLUS: '16+',
  EIGHTEEN_PLUS: '18+',
  R: 'R',
  NC_17: 'NC-17',
};

const ContentStatus = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
};

const VideoQuality = ['HD', 'FHD', '4K', '8K'];
const Languages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'hi', 'ar'];

interface ContentFormData {
  title: string;
  description?: string;
  about?: string;
  category: string;
  releaseDate?: Date;
  durationMinutes?: number;
  language: string;
  maturityRating?: string;
  imdbRating?: number;
  posterUrl?: string;
  bannerUrl?: string;
  thumbnailUrl?: string;
  adUrl?: string;
  videoUrl?: string;
  director?: string;
  producer?: string;
  writer?: string;
  studio?: string;
  countryOfOrigin?: string;
  tags?: string[];
  isPremium: boolean;
  isFeatured: boolean;
  ageRestriction?: number;
  subtitleLanguages?: string[];
  audioLanguages?: string[];
  videoQuality?: string;
  fileSizeMb?: number;
  contentWarning?: string;
  scheduledReleaseDate?: Date;
  status: string;
}

const ContentCreateEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  
  const [form] = Form.useForm<ContentFormData>();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [castCrewMembers, setCastCrewMembers] = useState<any[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    fetchProviders();
    if (isEditing) {
      fetchContent(id);
    }
  }, [id, isEditing]);

  const fetchProviders = async () => {
    try {
      const data = await providerService.getAll(true); // Get only active providers
      setProviders(data);
    } catch (error) {
      console.error('Error fetching providers:', error);
      message.error('Failed to fetch providers');
    }
  };

  const fetchContent = async (contentId: string) => {
    setLoading(true);
    try {
      // Replace with actual API call
      // const response = await contentService.getById(contentId);
      // form.setFieldsValue(response.data);
      message.success('Content loaded successfully');
    } catch (error) {
      message.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: ContentFormData) => {
    setLoading(true);
    try {
      const formData = {
        ...values,
        tags: tags.join(','),
        subtitleLanguages: values.subtitleLanguages?.join(','),
        audioLanguages: values.audioLanguages?.join(','),
      };

      if (isEditing) {
        // await contentService.update(id, formData);
        message.success('Content updated successfully');
      } else {
        // await contentService.create(formData);
        message.success('Content created successfully');
      }
      navigate('/content');
    } catch (error) {
      message.error(isEditing ? 'Failed to update content' : 'Failed to create content');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handlePreview = () => {
    const currentValues = form.getFieldsValue();
    const previewData = {
      ...currentValues,
      tags: tags.join(','),
    };
    setPreviewVisible(true);
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    action: '/api/upload', // Replace with actual upload endpoint
    onChange(info: any) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Card>
        <Space style={{ marginBottom: '24px' }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/content')}
          >
            Back to Content List
          </Button>
          <Title level={2} style={{ margin: 0 }}>
            {isEditing ? 'Edit Content' : 'Create New Content'}
          </Title>
        </Space>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            isPremium: false,
            isFeatured: false,
            status: ContentStatus.DRAFT,
            language: 'en',
            videoQuality: 'HD',
          }}
        >
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Basic Information" key="basic">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter content title' }]}
                  >
                    <Input placeholder="Enter content title" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select category' }]}
                  >
                    <Select placeholder="Select category">
                      {Object.entries(ContentCategory).map(([key, value]) => (
                        <Select.Option key={value} value={value}>
                          {key.charAt(0) + key.slice(1).toLowerCase()}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Provider"
                    name="providerId"
                    extra="Content provider (Netflix, Amazon Prime, etc.)"
                  >
                    <Select 
                      placeholder="Select provider"
                      allowClear
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                      }
                    >
                      {providers.map((provider) => (
                        <Select.Option key={provider.providerId} value={provider.providerId}>
                          <Space>
                            {provider.iconUrl && (
                              <img 
                                src={provider.iconUrl} 
                                alt={provider.providerName}
                                style={{ width: 16, height: 16, borderRadius: 2 }}
                              />
                            )}
                            {provider.providerName}
                            <Tag color="blue">{provider.providerType}</Tag>
                          </Space>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Description" name="description">
                    <TextArea rows={4} placeholder="Enter content description" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="About" name="about">
                    <TextArea rows={6} placeholder="Detailed information about the content" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Release Date" name="releaseDate">
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Duration (minutes)" name="durationMinutes">
                    <InputNumber min={1} style={{ width: '100%' }} placeholder="Duration" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Status" name="status">
                    <Select>
                      {Object.entries(ContentStatus).map(([key, value]) => (
                        <Select.Option key={value} value={value}>
                          {key.charAt(0) + key.slice(1).toLowerCase()}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Media & Assets" key="media">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item label="Video URL" name="videoUrl">
                    <Input placeholder="Main video file URL" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Video Quality" name="videoQuality">
                    <Select>
                      {VideoQuality.map(quality => (
                        <Select.Option key={quality} value={quality}>
                          {quality}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Poster Image URL" name="posterUrl">
                    <Input placeholder="Poster image URL" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Banner Image URL" name="bannerUrl">
                    <Input placeholder="Banner image URL" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Thumbnail URL" name="thumbnailUrl">
                    <Input placeholder="Thumbnail image URL" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Ad URL" name="adUrl">
                    <Input placeholder="Advertisement video URL" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="File Size (MB)" name="fileSizeMb">
                    <InputNumber min={1} style={{ width: '100%' }} placeholder="File size in MB" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Card title="Upload Files" size="small">
                    <Row gutter={[16, 16]}>
                      <Col span={8}>
                        <Upload {...uploadProps}>
                          <Button icon={<UploadOutlined />}>Upload Video</Button>
                        </Upload>
                      </Col>
                      <Col span={8}>
                        <Upload {...uploadProps}>
                          <Button icon={<UploadOutlined />}>Upload Poster</Button>
                        </Upload>
                      </Col>
                      <Col span={8}>
                        <Upload {...uploadProps}>
                          <Button icon={<UploadOutlined />}>Upload Banner</Button>
                        </Upload>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Content Details" key="details">
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Director" name="director">
                    <Input placeholder="Director name" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Producer" name="producer">
                    <Input placeholder="Producer name" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Writer" name="writer">
                    <Input placeholder="Writer name" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Studio" name="studio">
                    <Input placeholder="Studio name" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Country of Origin" name="countryOfOrigin">
                    <Input placeholder="Country" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Primary Language" name="language">
                    <Select>
                      {Languages.map(lang => (
                        <Select.Option key={lang} value={lang}>
                          {lang.toUpperCase()}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Subtitle Languages" name="subtitleLanguages">
                    <Select mode="multiple" placeholder="Select subtitle languages">
                      {Languages.map(lang => (
                        <Select.Option key={lang} value={lang}>
                          {lang.toUpperCase()}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Audio Languages" name="audioLanguages">
                    <Select mode="multiple" placeholder="Select audio languages">
                      {Languages.map(lang => (
                        <Select.Option key={lang} value={lang}>
                          {lang.toUpperCase()}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Tags">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Space>
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add a tag"
                          onPressEnter={handleAddTag}
                        />
                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTag}>
                          Add Tag
                        </Button>
                      </Space>
                      <div>
                        {tags.map(tag => (
                          <Tag
                            key={tag}
                            closable
                            onClose={() => handleRemoveTag(tag)}
                            style={{ margin: '4px' }}
                          >
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Cast & Crew" key="cast-crew">
              <CastCrewManager
                contentId={isEditing ? parseInt(id) : undefined}
                members={castCrewMembers}
                onUpdate={setCastCrewMembers}
              />
            </TabPane>

            <TabPane tab="Ratings & Settings" key="ratings">
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Maturity Rating" name="maturityRating">
                    <Select placeholder="Select maturity rating">
                      {Object.entries(MaturityRating).map(([key, value]) => (
                        <Select.Option key={value} value={value}>
                          {value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="IMDB Rating" name="imdbRating">
                    <InputNumber min={0} max={10} step={0.1} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Age Restriction" name="ageRestriction">
                    <InputNumber min={0} max={18} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Content Warning" name="contentWarning">
                    <TextArea rows={3} placeholder="Content warnings or advisories" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Scheduled Release Date" name="scheduledReleaseDate">
                    <DatePicker showTime style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Form.Item name="isPremium" valuePropName="checked">
                      <Switch checkedChildren="Premium" unCheckedChildren="Free" />
                      <Text style={{ marginLeft: 8 }}>Premium Content</Text>
                    </Form.Item>
                    <Form.Item name="isFeatured" valuePropName="checked">
                      <Switch checkedChildren="Featured" unCheckedChildren="Regular" />
                      <Text style={{ marginLeft: 8 }}>Featured Content</Text>
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
            </TabPane>
          </Tabs>

          <Divider />
          
          <Space>
            <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
              {isEditing ? 'Update Content' : 'Create Content'}
            </Button>
            <Button onClick={() => navigate('/content')}>
              Cancel
            </Button>
            {isEditing && (
              <Button type="default" icon={<EyeOutlined />} onClick={handlePreview}>
                Preview
              </Button>
            )}
          </Space>
        </Form>

        <Modal
          title="Content Preview"
          open={previewVisible}
          onCancel={() => setPreviewVisible(false)}
          footer={null}
          width={1000}
        >
          <ContentPreview
            content={form.getFieldsValue()}
            onClose={() => setPreviewVisible(false)}
          />
        </Modal>
      </Card>
    </div>
  );
};

export default ContentCreateEditPage;
