import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Spin, Alert } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  CrownOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { userService } from '../services/userService';
import { contentService } from '../services/contentService';
import { planService } from '../services/planService';
import { subscriptionService } from '../services/subscriptionService';
import { mockUsers, mockContent, mockPlans, mockSubscriptions } from '../services/mockData';

const { Title } = Typography;

interface DashboardStats {
  totalUsers: number;
  totalContent: number;
  totalPlans: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalContent: 0,
    totalPlans: 0,
    totalSubscriptions: 0,
    activeSubscriptions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to fetch from API first, fallback to mock data
      let users, content, plans, subscriptions;
      
      try {
        [users, content, plans, subscriptions] = await Promise.all([
          userService.getAll(),
          contentService.getAll(),
          planService.getAll(),
          subscriptionService.getAll(),
        ]);
      } catch (apiError) {
        // Fallback to mock data if API is not available
        console.log('Backend not available, using mock data for demonstration');
        users = mockUsers;
        content = mockContent;
        plans = mockPlans;
        subscriptions = mockSubscriptions;
      }

      const activeSubscriptions = subscriptions.filter(
        sub => sub.status === 'active'
      ).length;

      setStats({
        totalUsers: users.length,
        totalContent: content.length,
        totalPlans: plans.length,
        totalSubscriptions: subscriptions.length,
        activeSubscriptions,
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ marginBottom: 16 }}
      />
    );
  }

  return (
    <div>
      <Title level={2}>Dashboard</Title>
      
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Content"
              value={stats.totalContent}
              prefix={<VideoCameraOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Subscription Plans"
              value={stats.totalPlans}
              prefix={<CrownOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Subscriptions"
              value={stats.activeSubscriptions}
              suffix={`/ ${stats.totalSubscriptions}`}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Recent Activity" style={{ height: '300px' }}>
            <p>No recent activity data available yet.</p>
            <p>This section will show recent user registrations, content uploads, and subscription changes.</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Quick Actions" style={{ height: '300px' }}>
            <p>Quick action buttons will be added here:</p>
            <ul>
              <li>Add New User</li>
              <li>Upload New Content</li>
              <li>Create Subscription Plan</li>
              <li>View Reports</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;