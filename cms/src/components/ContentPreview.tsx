import React from 'react';
import {
  Card,
  Descriptions,
  Image,
  Tag,
  Space,
  Typography,
  Row,
  Col,
  Button,
  Divider,
} from 'antd';
import {
  PlayCircleOutlined,
  StarOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  HeartOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

interface ContentPreviewProps {
  content: any;
  onClose: () => void;
}

const ContentPreview: React.FC<ContentPreviewProps> = ({ content, onClose }) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'green';
      case 'draft': return 'orange';
      case 'scheduled': return 'blue';
      case 'archived': return 'red';
      default: return 'default';
    }
  };

  return (
    <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <Card cover={
            <Image
              src={content.posterUrl || '/placeholder-poster.jpg'}
              alt={content.title}
              style={{ height: 400, objectFit: 'cover' }}
              fallback="/placeholder-poster.jpg"
            />
          }>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button 
                type="primary" 
                icon={<PlayCircleOutlined />} 
                size="large"
                block
              >
                Play Preview
              </Button>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Space>
                  <StarOutlined />
                  <Text strong>{content.imdbRating || 'N/A'}</Text>
                </Space>
                <Space>
                  <EyeOutlined />
                  <Text>{content.viewCount || 0}</Text>
                </Space>
                <Space>
                  <HeartOutlined />
                  <Text>{content.likeCount || 0}</Text>
                </Space>
              </Space>
            </Space>
          </Card>
        </Col>
        
        <Col span={16}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={2} style={{ margin: 0 }}>
                {content.title}
              </Title>
              <Space style={{ marginTop: 8 }}>
                <Tag color={getStatusColor(content.status)}>
                  {content.status?.toUpperCase()}
                </Tag>
                <Tag color="blue">{content.category?.toUpperCase()}</Tag>
                {content.isPremium && <Tag color="gold">PREMIUM</Tag>}
                {content.isFeatured && <Tag color="red">FEATURED</Tag>}
                {content.maturityRating && (
                  <Tag color="purple">{content.maturityRating}</Tag>
                )}
              </Space>
            </div>

            <Descriptions column={2} size="small">
              <Descriptions.Item label="Duration">
                <Space>
                  <ClockCircleOutlined />
                  {content.durationMinutes ? formatDuration(content.durationMinutes) : 'N/A'}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Release Date">
                <Space>
                  <CalendarOutlined />
                  {content.releaseDate || 'TBD'}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Language">
                {content.language?.toUpperCase() || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Video Quality">
                {content.videoQuality || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Director">
                {content.director || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Studio">
                {content.studio || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Country">
                {content.countryOfOrigin || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="File Size">
                {content.fileSizeMb ? `${content.fileSizeMb} MB` : 'N/A'}
              </Descriptions.Item>
            </Descriptions>

            {content.description && (
              <div>
                <Title level={4}>Description</Title>
                <Paragraph>{content.description}</Paragraph>
              </div>
            )}

            {content.about && (
              <div>
                <Title level={4}>About</Title>
                <Paragraph>{content.about}</Paragraph>
              </div>
            )}

            {content.contentWarning && (
              <div>
                <Title level={4}>Content Warning</Title>
                <Paragraph type="warning">{content.contentWarning}</Paragraph>
              </div>
            )}

            {content.tags && (
              <div>
                <Title level={4}>Tags</Title>
                <Space wrap>
                  {content.tags.split(',').map((tag: string, index: number) => (
                    <Tag key={index}>{tag.trim()}</Tag>
                  ))}
                </Space>
              </div>
            )}

            <Divider />
            
            <Space>
              <Button onClick={onClose}>Close</Button>
              <Button type="primary" href={content.videoUrl} target="_blank">
                Watch Content
              </Button>
            </Space>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default ContentPreview;
