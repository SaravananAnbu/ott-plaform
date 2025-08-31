import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  VideoCameraOutlined,
  CrownOutlined,
  FileTextOutlined,
  TagsOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: 'Users',
    },
    {
      key: '/profiles',
      icon: <UserOutlined />,
      label: 'Profiles',
    },
    {
      key: '/content',
      icon: <VideoCameraOutlined />,
      label: 'Content',
    },
    {
      key: '/plans',
      icon: <CrownOutlined />,
      label: 'Plans',
    },
    {
      key: '/subscriptions',
      icon: <FileTextOutlined />,
      label: 'Subscriptions',
    },
    {
      key: '/genres',
      icon: <TagsOutlined />,
      label: 'Genres',
    },
  ];

  const handleMenuClick = (item: { key: string }) => {
    navigate(item.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ 
          height: 32, 
          margin: 16, 
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: borderRadiusLG,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          {collapsed ? 'OTT' : 'OTT CMS'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: 0, 
          background: colorBgContainer,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 16
        }}>
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
            }}
          >
            {collapsed ? '>>>' : '<<<'}
          </button>
          <h2 style={{ margin: 0, marginLeft: 16 }}>OTT Platform Content Management System</h2>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;