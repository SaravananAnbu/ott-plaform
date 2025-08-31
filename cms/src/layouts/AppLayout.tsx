import React, { useState } from 'react';
import { Layout, Menu, theme, Button, Space, Dropdown } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    VideoCameraOutlined,
    CrownOutlined,
    FileTextOutlined,
    TagsOutlined,
    TeamOutlined,
    SafetyCertificateOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    LogoutOutlined,
    BellOutlined,
    GlobalOutlined,
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
            key: '/content',
            icon: <VideoCameraOutlined />,
            label: 'Content',
        },
        {
            key: '/providers',
            icon: <GlobalOutlined />,
            label: 'Providers',
        },
        {
            key: '/genres',
            icon: <TagsOutlined />,
            label: 'Genres',
        },
        {
            key: 'subscription-group',
            icon: <CrownOutlined />,
            label: 'Subscription',
            children: [
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
            ],
        },
        {
            key: 'user-group',
            icon: <UserOutlined />,
            label: 'User Management',
            children: [
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
                    key: '/platform-users',
                    icon: <TeamOutlined />,
                    label: 'Platform Users',
                },
                {
                    key: '/roles',
                    icon: <SafetyCertificateOutlined />,
                    label: 'Roles',
                },
            ],
        },
    ];

    const handleMenuClick = (item: { key: string }) => {
        navigate(item.key);
    };

    const userMenuItems = [
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings',
        },
        {
            type: 'divider' as const,
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            danger: true,
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider 
                trigger={null} 
                collapsible 
                collapsed={collapsed}
                width={200}
                collapsedWidth={80}
                style={{
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 1001,
                }}
            >
                <div className="cms-logo">
                    {collapsed ? 'OTT' : 'OTT CMS'}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={handleMenuClick}
                    style={{
                        borderRight: 0,
                        height: 'calc(100vh - 80px)',
                        fontFamily: "'Ubuntu', sans-serif",
                    }}
                />
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
                <Header
                    style={{
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        left: collapsed ? 80 : 200,
                        zIndex: 1000,
                        padding: '0 24px',
                        background: colorBgContainer,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid #f0f0f0',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                        transition: 'left 0.2s',
                    }}
                >
                    <Space align="center">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 48,
                                height: 48,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        />
                        <h1 style={{
                            margin: 0,
                            marginLeft: 16,
                            fontFamily: "'Ubuntu', sans-serif",
                            fontWeight: 500,
                            color: '#1f1f1f',
                            fontSize: 18,
                        }}>
                            Content Management System
                        </h1>
                    </Space>
                    
                    <Space size="middle">
                        <Button
                            type="text"
                            icon={<BellOutlined />}
                            size="large"
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                            }}
                        />
                        <Dropdown
                            menu={{
                                items: userMenuItems,
                            }}
                            placement="bottomRight"
                            arrow
                        >
                            <Button
                                type="text"
                                icon={<UserOutlined />}
                                size="large"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                Admin
                            </Button>
                        </Dropdown>
                    </Space>
                </Header>
                <Content
                    style={{
                        margin: '88px 24px 24px 24px',
                        padding: 0,
                        minHeight: 'calc(100vh - 112px)',
                        background: 'transparent',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;