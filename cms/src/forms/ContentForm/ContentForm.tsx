import React from 'react';
import { 
  Form, 
  Input, 
  Select, 
  Button, 
  Card, 
  Space, 
  message, 
  InputNumber, 
  DatePicker 
} from 'antd';
import {
  FileTextOutlined,
  VideoCameraOutlined,
  PictureOutlined,
  CalendarOutlined,
  StarOutlined
} from '@ant-design/icons';
import type { CreateContentDto } from '../../types';
import { ContentCategory, MaturityRating, ContentStatus } from '../../types';
import { getValidationRules } from '../../utils/validation';

const { Option } = Select;
const { TextArea } = Input;

interface ContentFormProps {
  initialValues?: Partial<CreateContentDto>;
  onSubmit: (values: CreateContentDto) => void;
  loading?: boolean;
}

export const ContentForm: React.FC<ContentFormProps> = ({
  initialValues,
  onSubmit,
  loading = false,
}) => {
  const [form] = Form.useForm<CreateContentDto>();

  const handleSubmit = async (values: CreateContentDto) => {
    try {
      // Convert date to string if it's a moment object
      const processedValues = {
        ...values,
        releaseDate: values.releaseDate ? values.releaseDate : undefined,
      };
      
      await onSubmit(processedValues);
      message.success('Content saved successfully!');
      if (!initialValues) {
        form.resetFields();
      }
    } catch {
      message.error('Failed to save content. Please try again.');
    }
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Card title="Content Management" style={{ maxWidth: 800, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={getValidationRules('title')}
        >
          <Input
            prefix={<FileTextOutlined />}
            placeholder="Enter content title"
            maxLength={300}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea
            rows={3}
            placeholder="Enter content description"
            maxLength={1000}
          />
        </Form.Item>

        <Form.Item
          label="About"
          name="about"
        >
          <TextArea
            rows={4}
            placeholder="Enter detailed information about the content"
            maxLength={2000}
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={getValidationRules('category')}
        >
          <Select placeholder="Select content category">
            <Option value={ContentCategory.MOVIE}>Movie</Option>
            <Option value={ContentCategory.SERIES}>Series</Option>
            <Option value={ContentCategory.DOCUMENTARY}>Documentary</Option>
            <Option value={ContentCategory.SPORTS}>Sports</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Release Date"
          name="releaseDate"
        >
          <DatePicker
            style={{ width: '100%' }}
            placeholder="Select release date"
            suffixIcon={<CalendarOutlined />}
          />
        </Form.Item>

        <Form.Item
          label="Duration (Minutes)"
          name="durationMinutes"
          rules={getValidationRules('durationMinutes')}
        >
          <InputNumber
            prefix={<VideoCameraOutlined />}
            placeholder="Enter duration in minutes"
            style={{ width: '100%' }}
            min={1}
          />
        </Form.Item>

        <Form.Item
          label="Language"
          name="language"
          rules={getValidationRules('language')}
        >
          <Input
            placeholder="Enter content language (e.g., English, Spanish)"
            maxLength={40}
          />
        </Form.Item>

        <Form.Item
          label="Maturity Rating"
          name="maturityRating"
        >
          <Select placeholder="Select maturity rating" allowClear>
            <Option value={MaturityRating.G}>G - General Audiences</Option>
            <Option value={MaturityRating.PG}>PG - Parental Guidance</Option>
            <Option value={MaturityRating.PG13}>PG-13 - Parents Strongly Cautioned</Option>
            <Option value={MaturityRating.R}>R - Restricted</Option>
            <Option value={MaturityRating.NC17}>NC-17 - Adults Only</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="IMDB Rating"
          name="imdbRating"
          rules={getValidationRules('imdbRating')}
        >
          <InputNumber
            prefix={<StarOutlined />}
            placeholder="Enter IMDB rating (0-10)"
            style={{ width: '100%' }}
            min={0}
            max={10}
            step={0.1}
          />
        </Form.Item>

        <Form.Item
          label="Poster URL"
          name="posterUrl"
          rules={getValidationRules('posterUrl')}
        >
          <Input
            prefix={<PictureOutlined />}
            placeholder="Enter poster image URL"
            type="url"
          />
        </Form.Item>

        <Form.Item
          label="Banner URL"
          name="bannerUrl"
          rules={getValidationRules('bannerUrl')}
        >
          <Input
            prefix={<PictureOutlined />}
            placeholder="Enter banner image URL"
            type="url"
          />
        </Form.Item>

        <Form.Item
          label="Thumbnail URL"
          name="thumbnailUrl"
          rules={getValidationRules('thumbnailUrl')}
        >
          <Input
            prefix={<PictureOutlined />}
            placeholder="Enter thumbnail image URL"
            type="url"
          />
        </Form.Item>

        <Form.Item
          label="Ad URL"
          name="adUrl"
          rules={getValidationRules('adUrl')}
        >
          <Input
            prefix={<PictureOutlined />}
            placeholder="Enter advertisement URL (optional)"
            type="url"
          />
        </Form.Item>

        <Form.Item
          label="Player ID"
          name="playerId"
        >
          <InputNumber
            placeholder="Enter player ID (optional)"
            style={{ width: '100%' }}
            min={1}
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
        >
          <Select placeholder="Select content status" allowClear>
            <Option value={ContentStatus.DRAFT}>Draft</Option>
            <Option value={ContentStatus.PUBLISHED}>Published</Option>
            <Option value={ContentStatus.ARCHIVED}>Archived</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
            >
              {initialValues ? 'Update Content' : 'Create Content'}
            </Button>
            <Button
              onClick={handleReset}
              size="large"
              disabled={loading}
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};