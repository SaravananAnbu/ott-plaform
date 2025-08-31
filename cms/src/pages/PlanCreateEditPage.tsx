import React, { useEffect, useState } from 'react';
import {
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  Space,
  Row,
  Col,
  Divider,
  Typography,
  message,
  Tabs,
  Alert,
  Tag,
} from 'antd';
import {
  SaveOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
  CrownOutlined,
  DollarOutlined,
  SettingOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  planService, 
  Plan, 
  CreatePlanDto, 
  UpdatePlanDto, 
  PlanType, 
  PlanStatus 
} from '../services/planService';
import { usePermissions, Permission } from '../hooks/usePermissions';

const { Title, Text } = Typography;
const { TextArea } = Input;

const PlanCreateEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { canCreate, canEdit } = usePermissions();
  
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (isEdit && id) {
      fetchPlan(parseInt(id));
    } else {
      // Set default values for new plan
      form.setFieldsValue({
        currency: 'USD',
        type: PlanType.BASIC,
        status: PlanStatus.ACTIVE,
        screensAllowed: 1,
        simultaneousStreams: 1,
        billingCycleMonths: 1,
        freeTrialDays: 0,
        downloadsAllowed: true,
        adsSupported: true,
        offlineViewing: false,
        familySharing: false,
        parentalControls: true,
        isPopular: false,
        sortOrder: 0,
        contentAccessLevel: 'basic',
        streamingQuality: 'HD',
      });
    }
  }, [id, isEdit, form]);

  const fetchPlan = async (planId: number) => {
    try {
      setLoading(true);
      const data = await planService.getById(planId);
      setPlan(data);
      form.setFieldsValue(data);
    } catch (error) {
      message.error('Failed to fetch plan details');
      console.error('Error fetching plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: CreatePlanDto | UpdatePlanDto) => {
    try {
      setLoading(true);
      if (isEdit && id) {
        await planService.update(parseInt(id), values);
        message.success('Plan updated successfully');
      } else {
        await planService.create(values as CreatePlanDto);
        message.success('Plan created successfully');
      }
      navigate('/plans');
    } catch (error) {
      message.error(isEdit ? 'Failed to update plan' : 'Failed to create plan');
      console.error('Error saving plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (priceCents: number, currency: string) => {
    if (!priceCents) return 'Free';
    const price = priceCents / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(price);
  };

  const getTypeColor = (type: PlanType) => {
    switch (type) {
      case PlanType.FREE: return 'green';
      case PlanType.BASIC: return 'blue';
      case PlanType.STANDARD: return 'orange';
      case PlanType.PREMIUM: return 'red';
      case PlanType.FAMILY: return 'purple';
      default: return 'default';
    }
  };

  // Check permissions
  if (!canCreate('plans') && !isEdit) {
    return (
      <Card>
        <Alert
          message="Access Denied"
          description="You don't have permission to create plans."
          type="error"
          showIcon
        />
      </Card>
    );
  }

  if (!canEdit('plans') && isEdit) {
    return (
      <Card>
        <Alert
          message="Access Denied"
          description="You don't have permission to edit plans."
          type="error"
          showIcon
        />
      </Card>
    );
  }

  const basicInfoTab = (
    <Form.Item name="basic" style={{ marginBottom: 0 }}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Plan Name"
            name="planName"
            rules={[{ required: true, message: 'Please enter plan name' }]}
          >
            <Input placeholder="Enter plan name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Plan Type"
            name="type"
            rules={[{ required: true, message: 'Please select plan type' }]}
          >
            <Select>
              {Object.entries(PlanType).map(([key, value]) => (
                <Select.Option key={value} value={value}>
                  {key.charAt(0) + key.slice(1).toLowerCase()}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} placeholder="Enter plan description" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Status" name="status">
            <Select>
              {Object.entries(PlanStatus).map(([key, value]) => (
                <Select.Option key={value} value={value}>
                  {key.charAt(0) + key.slice(1).toLowerCase()}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Sort Order" name="sortOrder">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="isPopular" valuePropName="checked">
            <Switch checkedChildren="Popular" unCheckedChildren="Regular" />
            <span style={{ marginLeft: 8 }}>Popular Plan</span>
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );

  const pricingTab = (
    <Row gutter={16}>
      <Col span={8}>
        <Form.Item
          label="Price (cents)"
          name="priceCents"
          rules={[{ required: true, message: 'Please enter price' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} placeholder="Price in cents" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Currency" name="currency">
          <Select>
            <Select.Option value="USD">USD</Select.Option>
            <Select.Option value="EUR">EUR</Select.Option>
            <Select.Option value="GBP">GBP</Select.Option>
            <Select.Option value="INR">INR</Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Billing Cycle (months)" name="billingCycleMonths">
          <Select>
            <Select.Option value={1}>Monthly</Select.Option>
            <Select.Option value={3}>Quarterly</Select.Option>
            <Select.Option value={6}>Semi-Annual</Select.Option>
            <Select.Option value={12}>Annual</Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Free Trial Days" name="freeTrialDays">
          <InputNumber min={0} max={30} style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Content Access Level" name="contentAccessLevel">
          <Select>
            <Select.Option value="basic">Basic</Select.Option>
            <Select.Option value="premium">Premium</Select.Option>
            <Select.Option value="all">All Content</Select.Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
  );

  const streamingTab = (
    <Row gutter={16}>
      <Col span={8}>
        <Form.Item label="Streaming Quality" name="streamingQuality">
          <Select>
            <Select.Option value="SD">SD</Select.Option>
            <Select.Option value="HD">HD</Select.Option>
            <Select.Option value="FHD">FHD</Select.Option>
            <Select.Option value="4K">4K</Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Simultaneous Streams" name="simultaneousStreams">
          <InputNumber min={1} max={10} style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Screens Allowed" name="screensAllowed">
          <InputNumber min={1} max={10} style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Max Download Quality" name="maxDownloadQuality">
          <Select>
            <Select.Option value="SD">SD</Select.Option>
            <Select.Option value="HD">HD</Select.Option>
            <Select.Option value="FHD">FHD</Select.Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
  );

  const featuresTab = (
    <Row gutter={16}>
      <Col span={8}>
        <Form.Item name="downloadsAllowed" valuePropName="checked">
          <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
          <span style={{ marginLeft: 8 }}>Downloads Allowed</span>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="offlineViewing" valuePropName="checked">
          <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
          <span style={{ marginLeft: 8 }}>Offline Viewing</span>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="adsSupported" valuePropName="checked">
          <Switch checkedChildren="With Ads" unCheckedChildren="Ad-free" />
          <span style={{ marginLeft: 8 }}>Ads Supported</span>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="familySharing" valuePropName="checked">
          <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
          <span style={{ marginLeft: 8 }}>Family Sharing</span>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="parentalControls" valuePropName="checked">
          <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
          <span style={{ marginLeft: 8 }}>Parental Controls</span>
        </Form.Item>
      </Col>
    </Row>
  );

  const planPreview = () => {
    const values = form.getFieldsValue();
    return (
      <Card title="Plan Preview" style={{ marginTop: 16 }}>
        <Row gutter={16}>
          <Col span={24}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <CrownOutlined style={{ fontSize: '24px', color: getTypeColor(values.type) }} />
                <Title level={3} style={{ margin: '8px 0' }}>{values.planName || 'Plan Name'}</Title>
                <Tag color={getTypeColor(values.type)}>{values.type?.toUpperCase() || 'BASIC'}</Tag>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <Text style={{ fontSize: '32px', fontWeight: 'bold' }}>
                  {formatPrice(values.priceCents || 0, values.currency || 'USD')}
                </Text>
                <div style={{ color: '#666' }}>
                  per {values.billingCycleMonths || 1} month{(values.billingCycleMonths || 1) > 1 ? 's' : ''}
                </div>
                {values.freeTrialDays > 0 && (
                  <Tag color="blue" style={{ marginTop: 8 }}>
                    {values.freeTrialDays} days free trial
                  </Tag>
                )}
              </div>

              <Divider />

              <div>
                <Title level={5}>Features:</Title>
                <Row gutter={16}>
                  <Col span={12}>
                    <Space direction="vertical">
                      <div><CheckCircleOutlined style={{ color: '#52c41a' }} /> {values.streamingQuality || 'HD'} Quality</div>
                      <div><CheckCircleOutlined style={{ color: '#52c41a' }} /> {values.simultaneousStreams || 1} Simultaneous Streams</div>
                      <div><CheckCircleOutlined style={{ color: '#52c41a' }} /> {values.screensAllowed || 1} Screens</div>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space direction="vertical">
                      {values.downloadsAllowed && <div><CheckCircleOutlined style={{ color: '#52c41a' }} /> Downloads Allowed</div>}
                      {values.offlineViewing && <div><CheckCircleOutlined style={{ color: '#52c41a' }} /> Offline Viewing</div>}
                      {!values.adsSupported && <div><CheckCircleOutlined style={{ color: '#52c41a' }} /> Ad-free Experience</div>}
                      {values.familySharing && <div><CheckCircleOutlined style={{ color: '#52c41a' }} /> Family Sharing</div>}
                      {values.parentalControls && <div><CheckCircleOutlined style={{ color: '#52c41a' }} /> Parental Controls</div>}
                    </Space>
                  </Col>
                </Row>
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
          <CrownOutlined />
          Basic Info
        </Space>
      ),
      children: basicInfoTab,
    },
    {
      key: 'pricing',
      label: (
        <Space>
          <DollarOutlined />
          Pricing
        </Space>
      ),
      children: pricingTab,
    },
    {
      key: 'streaming',
      label: (
        <Space>
          <SettingOutlined />
          Streaming
        </Space>
      ),
      children: streamingTab,
    },
    {
      key: 'features',
      label: (
        <Space>
          <CheckCircleOutlined />
          Features
        </Space>
      ),
      children: featuresTab,
    },
    {
      key: 'preview',
      label: (
        <Space>
          <EyeOutlined />
          Preview
        </Space>
      ),
      children: planPreview(),
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
                onClick={() => navigate('/plans')}
              >
                Back to Plans
              </Button>
              <Title level={2} style={{ margin: 0 }}>
                {isEdit ? 'Edit Plan' : 'Create New Plan'}
              </Title>
            </Space>
          </Col>
          <Col>
            <Space>
              <Button onClick={() => navigate('/plans')}>
                Cancel
              </Button>
              <Button 
                type="primary" 
                icon={<SaveOutlined />}
                onClick={() => form.submit()}
                loading={loading}
              >
                {isEdit ? 'Update Plan' : 'Create Plan'}
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

export default PlanCreateEditPage;
