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
  Tabs,
} from 'antd';
import {
  SaveOutlined,
  ArrowLeftOutlined,
  UploadOutlined,
  EyeOutlined,
  GlobalOutlined,
  CrownOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  providerService, 
  Provider, 
  CreateProviderDto, 
  UpdateProviderDto, 
  ProviderStatus,
  ProviderType 
} from '../services/providerService';
import { usePermissions } from '../hooks/usePermissions';
import type { UploadFile } from 'antd/es/upload/interface';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

const ProviderCreateEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { canCreate, canEdit } = usePermissions();
  const isEditing = !!id;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [iconFileList, setIconFileList] = useState<UploadFile[]>([]);
  const [logoFileList, setLogoFileList] = useState<UploadFile[]>([]);
  const [bannerFileList, setBannerFileList] = useState<UploadFile[]>([]);

  // Check permissions
  const hasPermission = isEditing ? canEdit('providers') : canCreate('providers');

  useEffect(() => {
    if (isEditing && id) {
      fetchProvider(id);
    }
  }, [id, isEditing]);

  const fetchProvider = async (providerId: string) => {
    try {
      setLoading(true);
      const data = await providerService.getById(Number(providerId));
      setProvider(data);
      
      // Populate form with existing data
      form.setFieldsValue({
        providerName: data.providerName,
        description: data.description,
        websiteUrl: data.websiteUrl,
        providerType: data.providerType,
        countryOfOrigin: data.countryOfOrigin,
        establishedYear: data.establishedYear,
        isPremium: data.isPremium,
        isFeatured: data.isFeatured,
        subscriptionRequired: data.subscriptionRequired,
        colorCode: data.colorCode,
        sortOrder: data.sortOrder,
        status: data.status,
        iconUrl: data.iconUrl,
        logoUrl: data.logoUrl,
        bannerUrl: data.bannerUrl,
        apiEndpoint: data.apiEndpoint,
        apiKey: data.apiKey,
        metadata: data.metadata ? JSON.stringify(data.metadata, null, 2) : '',
      });

      // Set file lists if exist
      if (data.iconUrl) {
        setIconFileList([{
          uid: '-1',
          name: 'icon.png',
          status: 'done',
          url: data.iconUrl,
        }]);
      }
      if (data.logoUrl) {
        setLogoFileList([{
          uid: '-1',
          name: 'logo.png',
          status: 'done',
          url: data.logoUrl,
        }]);
      }
      if (data.bannerUrl) {
        setBannerFileList([{
          uid: '-1',
          name: 'banner.png',
          status: 'done',
          url: data.bannerUrl,
        }]);
      }
    } catch (error) {
      message.error('Failed to fetch provider details');
      navigate('/providers');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      
      const providerData = {
        providerName: values.providerName,
        description: values.description,
        websiteUrl: values.websiteUrl,
        providerType: values.providerType,
        countryOfOrigin: values.countryOfOrigin,
        establishedYear: values.establishedYear,
        isPremium: values.isPremium || false,
        isFeatured: values.isFeatured || false,
        subscriptionRequired: values.subscriptionRequired !== false,
        colorCode: values.colorCode,
        sortOrder: values.sortOrder || 0,
        status: values.status,
        iconUrl: values.iconUrl || iconFileList[0]?.url || '',
        logoUrl: values.logoUrl || logoFileList[0]?.url || '',
        bannerUrl: values.bannerUrl || bannerFileList[0]?.url || '',
        apiEndpoint: values.apiEndpoint,
        apiKey: values.apiKey,
        metadata: values.metadata ? JSON.parse(values.metadata) : null,
      };

      if (isEditing && id) {
        await providerService.update(Number(id), providerData as UpdateProviderDto);
        message.success('Provider updated successfully!');
      } else {
        await providerService.create(providerData as CreateProviderDto);
        message.success('Provider created successfully!');
      }
      
      navigate('/providers');
    } catch (error) {
      message.error(isEditing ? 'Failed to update provider' : 'Failed to create provider');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (file: File, type: 'icon' | 'logo' | 'banner') => {
    // In a real app, you would upload to your server/cloud storage
    const url = URL.createObjectURL(file);
    const fileInfo = {
      uid: file.name,
      name: file.name,
      status: 'done' as const,
      url: url,
    };

    switch (type) {
      case 'icon':
        form.setFieldsValue({ iconUrl: url });
        setIconFileList([fileInfo]);
        break;
      case 'logo':
        form.setFieldsValue({ logoUrl: url });
        setLogoFileList([fileInfo]);
        break;
      case 'banner':
        form.setFieldsValue({ bannerUrl: url });
        setBannerFileList([fileInfo]);
        break;
    }
    return false; // Prevent default upload
  };

  if (!hasPermission) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <Title level={3}>Access Denied</Title>
        <Text>You don't have permission to {isEditing ? 'edit' : 'create'} providers.</Text>
        <br />
        <Button 
          type="primary" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/providers')}
          style={{ marginTop: 16 }}
        >
          Back to Providers
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
              onClick={() => navigate('/providers')}
            >
              Back
            </Button>
            <Title level={2} style={{ margin: 0 }}>
              {isEditing ? 'Edit Provider' : 'Create New Provider'}
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
            status: ProviderStatus.ACTIVE,
            providerType: ProviderType.STREAMING,
            isPremium: false,
            isFeatured: false,
            subscriptionRequired: true,
            sortOrder: 0,
          }}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Basic Information" key="1">
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Provider Name"
                    name="providerName"
                    rules={[
                      { required: true, message: 'Please enter provider name' },
                      { min: 2, message: 'Name must be at least 2 characters' },
                      { max: 100, message: 'Name must not exceed 100 characters' }
                    ]}
                  >
                    <Input placeholder="Enter provider name" size="large" />
                  </Form.Item>

                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      { max: 500, message: 'Description must not exceed 500 characters' }
                    ]}
                  >
                    <TextArea 
                      placeholder="Enter provider description"
                      rows={4}
                      showCount
                      maxLength={500}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Website URL"
                    name="websiteUrl"
                    rules={[
                      { type: 'url', message: 'Please enter a valid URL' }
                    ]}
                  >
                    <Input 
                      placeholder="https://example.com" 
                      size="large"
                      prefix={<GlobalOutlined />}
                    />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Provider Type"
                        name="providerType"
                        rules={[{ required: true, message: 'Please select provider type' }]}
                      >
                        <Select size="large">
                          <Select.Option value={ProviderType.STREAMING}>
                            <Tag color="blue">Streaming</Tag>
                          </Select.Option>
                          <Select.Option value={ProviderType.STUDIO}>
                            <Tag color="green">Studio</Tag>
                          </Select.Option>
                          <Select.Option value={ProviderType.DISTRIBUTOR}>
                            <Tag color="orange">Distributor</Tag>
                          </Select.Option>
                          <Select.Option value={ProviderType.NETWORK}>
                            <Tag color="purple">Network</Tag>
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please select status' }]}
                      >
                        <Select size="large">
                          <Select.Option value={ProviderStatus.ACTIVE}>
                            <Tag color="green">Active</Tag>
                          </Select.Option>
                          <Select.Option value={ProviderStatus.INACTIVE}>
                            <Tag color="red">Inactive</Tag>
                          </Select.Option>
                          <Select.Option value={ProviderStatus.MAINTENANCE}>
                            <Tag color="orange">Maintenance</Tag>
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Country of Origin"
                    name="countryOfOrigin"
                  >
                    <Input placeholder="Enter country" size="large" />
                  </Form.Item>

                  <Form.Item
                    label="Established Year"
                    name="establishedYear"
                  >
                    <InputNumber 
                      min={1900} 
                      max={new Date().getFullYear()}
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="e.g., 1997"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Brand Color"
                    name="colorCode"
                    extra="Brand color for this provider"
                  >
                    <ColorPicker
                      showText
                      size="large"
                      format="hex"
                      presets={[
                        { label: 'Netflix', colors: ['#E50914'] },
                        { label: 'Amazon Prime', colors: ['#00A8E1'] },
                        { label: 'Disney+', colors: ['#113CCF'] },
                        { label: 'Hulu', colors: ['#1CE783'] },
                        { label: 'HBO Max', colors: ['#B026FF'] },
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
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Media Assets" key="2">
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
                    label="Provider Icon"
                    name="iconUrl"
                    extra="Small square icon (recommended: 64x64px)"
                  >
                    <Upload
                      listType="picture-card"
                      fileList={iconFileList}
                      beforeUpload={(file) => handleFileUpload(file, 'icon')}
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
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Provider Logo"
                    name="logoUrl"
                    extra="Full logo (recommended: 300x100px)"
                  >
                    <Upload
                      listType="picture-card"
                      fileList={logoFileList}
                      beforeUpload={(file) => handleFileUpload(file, 'logo')}
                      onRemove={() => {
                        setLogoFileList([]);
                        form.setFieldsValue({ logoUrl: '' });
                      }}
                      maxCount={1}
                      accept="image/*"
                    >
                      {logoFileList.length === 0 && (
                        <div>
                          <UploadOutlined />
                          <div style={{ marginTop: 8 }}>Upload Logo</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Banner Image"
                    name="bannerUrl"
                    extra="Banner image (recommended: 1200x300px)"
                  >
                    <Upload
                      listType="picture-card"
                      fileList={bannerFileList}
                      beforeUpload={(file) => handleFileUpload(file, 'banner')}
                      onRemove={() => {
                        setBannerFileList([]);
                        form.setFieldsValue({ bannerUrl: '' });
                      }}
                      maxCount={1}
                      accept="image/*"
                    >
                      {bannerFileList.length === 0 && (
                        <div>
                          <UploadOutlined />
                          <div style={{ marginTop: 8 }}>Upload Banner</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Settings & Features" key="3">
              <Row gutter={24}>
                <Col span={12}>
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Form.Item
                      name="isPremium"
                      valuePropName="checked"
                    >
                      <Space>
                        <Switch />
                        <span>
                          <CrownOutlined style={{ color: '#faad14', marginRight: 8 }} />
                          Premium Provider
                        </span>
                      </Space>
                    </Form.Item>

                    <Form.Item
                      name="isFeatured"
                      valuePropName="checked"
                    >
                      <Space>
                        <Switch />
                        <span>
                          <StarOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                          Featured Provider
                        </span>
                      </Space>
                    </Form.Item>

                    <Form.Item
                      name="subscriptionRequired"
                      valuePropName="checked"
                    >
                      <Space>
                        <Switch />
                        <span>Subscription Required</span>
                      </Space>
                    </Form.Item>
                  </Space>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="API Endpoint"
                    name="apiEndpoint"
                    extra="External API endpoint for integration"
                  >
                    <Input placeholder="https://api.provider.com/v1" />
                  </Form.Item>

                  <Form.Item
                    label="API Key"
                    name="apiKey"
                    extra="API key for external integration"
                  >
                    <Input.Password placeholder="Enter API key" />
                  </Form.Item>

                  <Form.Item
                    label="Metadata (JSON)"
                    name="metadata"
                    extra="Additional metadata in JSON format"
                  >
                    <TextArea 
                      placeholder='{"region": "US", "languages": ["en", "es"]}'
                      rows={4}
                      style={{ fontFamily: 'monospace' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
          </Tabs>

          <Form.Item style={{ marginTop: 32 }}>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={<SaveOutlined />}
                size="large"
              >
                {isEditing ? 'Update Provider' : 'Create Provider'}
              </Button>
              <Button 
                onClick={() => navigate('/providers')}
                size="large"
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* Live Preview */}
      {form.getFieldsValue().providerName && (
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
                  alt="Provider Icon"
                  width={50}
                  height={50}
                  style={{ borderRadius: 8 }}
                  fallback="/placeholder-provider.png"
                />
              ) : (
                <div 
                  style={{ 
                    width: 50, 
                    height: 50, 
                    backgroundColor: form.getFieldValue('colorCode') || '#f0f0f0',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  {form.getFieldValue('providerName')?.charAt(0)?.toUpperCase() || '?'}
                </div>
              )}
            </Col>
            <Col flex={1}>
              <Space direction="vertical" size={0}>
                <Space>
                  <Text strong style={{ fontSize: 18 }}>
                    {form.getFieldValue('providerName') || 'Provider Name'}
                  </Text>
                  {form.getFieldValue('isPremium') && (
                    <CrownOutlined style={{ color: '#faad14' }} />
                  )}
                  {form.getFieldValue('isFeatured') && (
                    <StarOutlined style={{ color: '#1890ff' }} />
                  )}
                </Space>
                <Text type="secondary">
                  {form.getFieldValue('description') || 'No description provided'}
                </Text>
                <Space>
                  <Tag color={form.getFieldValue('status') === ProviderStatus.ACTIVE ? 'green' : 'red'}>
                    {form.getFieldValue('status') || ProviderStatus.ACTIVE}
                  </Tag>
                  <Tag color="blue">
                    {form.getFieldValue('providerType') || ProviderType.STREAMING}
                  </Tag>
                  {form.getFieldValue('countryOfOrigin') && (
                    <Tag>{form.getFieldValue('countryOfOrigin')}</Tag>
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

export default ProviderCreateEditPage;
