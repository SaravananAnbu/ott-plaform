import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import ProfilesPage from './pages/ProfilesPage';
import ContentPage from './pages/ContentPage';
import PlansPage from './pages/PlansPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import GenresPage from './pages/GenresPage';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="profiles" element={<ProfilesPage />} />
            <Route path="content" element={<ContentPage />} />
            <Route path="plans" element={<PlansPage />} />
            <Route path="subscriptions" element={<SubscriptionsPage />} />
            <Route path="genres" element={<GenresPage />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App
