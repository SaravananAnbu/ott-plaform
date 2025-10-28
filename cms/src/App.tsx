import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import ProfilesPage from './pages/ProfilesPage';
import ContentPage from './pages/ContentPage';
import ContentCreateEditPage from './pages/ContentCreateEditPage';
import PlansPage from './pages/PlansPage';
import PlanCreateEditPage from './pages/PlanCreateEditPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import GenresPage from './pages/GenresPage';
import GenreCreateEditPage from './pages/GenreCreateEditPage';
import ProvidersPage from './pages/ProvidersPage';
import ProviderCreateEditPage from './pages/ProviderCreateEditPage';
import RolesPage from './pages/RolesPage';
import PlatformUsersPage from './pages/PlatformUsersPage';
import PlatformUserCreateEditPage from './pages/PlatformUserCreateEditPage';
import './App.css';

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#1890ff',
                    colorSuccess: '#52c41a',
                    colorWarning: '#faad14',
                    colorError: '#ff4d4f',
                    fontFamily: "'Ubuntu', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                    fontSize: 14,
                    fontSizeLG: 16,
                    fontSizeXL: 20,
                    borderRadius: 8,
                    borderRadiusLG: 12,
                    colorBgBase: '#ffffff',
                    colorBgContainer: '#ffffff',
                    colorBgElevated: '#ffffff',
                    colorBgLayout: '#f5f5f5',
                    colorTextBase: '#1f1f1f',
                    colorTextSecondary: '#666666',
                    colorTextTertiary: '#999999',
                    colorBorder: '#e6e6e6',
                    colorBorderSecondary: '#f0f0f0',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                    boxShadowSecondary: '0 1px 4px rgba(0, 0, 0, 0.04)',
                },
                components: {
                    Layout: {
                        siderBg: '#001529',
                        headerBg: '#ffffff',
                        headerHeight: 64,
                        headerPadding: '0 16px',
                    },
                    Menu: {
                        darkItemBg: 'transparent',
                        darkItemSelectedBg: '#1890ff',
                        darkItemHoverBg: 'rgba(255, 255, 255, 0.1)',
                        itemPaddingInline: 24,
                        itemHeight: 40,
                        iconSize: 16,
                    },
                    Button: {
                        borderRadius: 6,
                        fontWeight: 500,
                    },
                    Card: {
                        borderRadius: 12,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                    },
                    Table: {
                        borderRadius: 8,
                        headerBg: '#fafafa',
                    },
                },
            }}
        >
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<AppLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="users" element={<UsersPage />} />
                            {/* <Route path="profiles" element={<ProfilesPage />} /> */}
                            <Route path="content" element={<ContentPage />} />
                            <Route path="content/create" element={<ContentCreateEditPage />} />
                            <Route path="content/edit/:id" element={<ContentCreateEditPage />} />
                            <Route path="plans" element={<PlansPage />} />
                            <Route path="plans/create" element={<PlanCreateEditPage />} />
                            <Route path="plans/edit/:id" element={<PlanCreateEditPage />} />
                            <Route path="subscriptions" element={<SubscriptionsPage />} />
                            <Route path="genres" element={<GenresPage />} />
                            <Route path="genres/create" element={<GenreCreateEditPage />} />
                            <Route path="genres/edit/:id" element={<GenreCreateEditPage />} />
                            <Route path="providers" element={<ProvidersPage />} />
                            <Route path="providers/create" element={<ProviderCreateEditPage />} />
                            <Route path="providers/edit/:id" element={<ProviderCreateEditPage />} />
                            <Route path="roles" element={<RolesPage />} />
                            <Route path="platform-users" element={<PlatformUsersPage />} />
                            <Route path="platform-users/create" element={<PlatformUserCreateEditPage />} />
                            <Route path="platform-users/edit/:id" element={<PlatformUserCreateEditPage />} />
                        </Route>
                    </Routes>
                </Router>
            </div>
        </ConfigProvider>
    );
}

export default App;
