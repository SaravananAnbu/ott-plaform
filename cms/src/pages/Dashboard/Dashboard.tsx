import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
  UserOutlined,
  ProfileOutlined,
  VideoCameraOutlined,
  DollarOutlined,
  ScheduleOutlined,
  TagOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import {
  UserForm,
  ProfileForm,
  ContentForm,
  PlanForm,
  SubscriptionForm,
  GenreForm,
} from '../../forms';
import type { 
  CreateUserDto,
  CreateProfileDto,
  CreateContentDto,
  CreatePlanDto,
  CreateSubscriptionDto,
  CreateGenreDto,
} from '../../types';

const { Header, Sider, Content } = Layout;

type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: string;
};

const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: 'users',
    icon: <UserOutlined />,
    label: 'Users',
  },
  {
    key: 'profiles',
    icon: <ProfileOutlined />,
    label: 'Profiles',
  },
  {
    key: 'content',
    icon: <VideoCameraOutlined />,
    label: 'Content',
  },
  {
    key: 'plans',
    icon: <DollarOutlined />,
    label: 'Plans',
  },
  {
    key: 'subscriptions',
    icon: <ScheduleOutlined />,
    label: 'Subscriptions',
  },
  {
    key: 'genres',
    icon: <TagOutlined />,
    label: 'Genres',
  },
];

export const Dashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [loading, setLoading] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Mock submission handlers - in a real app, these would make API calls
  const handleUserSubmit = async (values: CreateUserDto) => {
    setLoading(true);
    console.log('User form submitted:', values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleProfileSubmit = async (values: CreateProfileDto) => {
    setLoading(true);
    console.log('Profile form submitted:', values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleContentSubmit = async (values: CreateContentDto) => {
    setLoading(true);
    console.log('Content form submitted:', values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handlePlanSubmit = async (values: CreatePlanDto) => {
    setLoading(true);
    console.log('Plan form submitted:', values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleSubscriptionSubmit = async (values: CreateSubscriptionDto) => {
    setLoading(true);
    console.log('Subscription form submitted:', values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleGenreSubmit = async (values: CreateGenreDto) => {
    setLoading(true);
    console.log('Genre form submitted:', values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'users':
        return <UserForm onSubmit={handleUserSubmit} loading={loading} />;
      case 'profiles':
        return <ProfileForm onSubmit={handleProfileSubmit} loading={loading} />;
      case 'content':
        return <ContentForm onSubmit={handleContentSubmit} loading={loading} />;
      case 'plans':
        return <PlanForm onSubmit={handlePlanSubmit} loading={loading} />;
      case 'subscriptions':
        return <SubscriptionForm onSubmit={handleSubscriptionSubmit} loading={loading} />;
      case 'genres':
        return <GenreForm onSubmit={handleGenreSubmit} loading={loading} />;
      default:
        return (
          <div style={{ 
            textAlign: 'center', 
            padding: '50px',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            margin: '24px',
          }}>
            <h1>OTT Platform CMS</h1>
            <p>Welcome to the Content Management System for the OTT Platform.</p>
            <p>Use the navigation menu to manage users, profiles, content, plans, subscriptions, and genres.</p>
            <div style={{ marginTop: '30px' }}>
              <h3>Features:</h3>
              <ul style={{ textAlign: 'left', display: 'inline-block' }}>
                <li>✅ Form validation using Ant Design's useForm hook</li>
                <li>✅ Schema validation based on backend DTOs</li>
                <li>✅ Comprehensive error handling and user feedback</li>
                <li>✅ Responsive design for all forms</li>
                <li>✅ Type-safe TypeScript implementation</li>
                <li>✅ Consistent validation patterns across all forms</li>
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={false}>
        <div style={{ 
          height: 32, 
          margin: 16, 
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}>
          OTT CMS
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={menuItems}
          onClick={({ key }) => setSelectedMenu(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: 0, 
          background: colorBgContainer,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '16px',
        }}>
          <h2 style={{ margin: 0 }}>
            {menuItems.find(item => item.key === selectedMenu)?.label || 'Dashboard'}
          </h2>
        </Header>
        <Content style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};