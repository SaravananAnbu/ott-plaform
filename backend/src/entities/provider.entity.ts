import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Content } from '../contents/entities/content.entity';

export enum ProviderStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance',
}

export enum ProviderType {
  STREAMING = 'streaming',
  STUDIO = 'studio',
  DISTRIBUTOR = 'distributor',
  NETWORK = 'network',
}

@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn({ name: 'provider_id' })
  providerId: number;

  @Column({ name: 'provider_name', type: 'varchar', length: 100 })
  providerName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'icon_url', type: 'text', nullable: true })
  iconUrl: string;

  @Column({ name: 'logo_url', type: 'text', nullable: true })
  logoUrl: string;

  @Column({ name: 'banner_url', type: 'text', nullable: true })
  bannerUrl: string;

  @Column({ name: 'website_url', type: 'varchar', length: 255, nullable: true })
  websiteUrl: string;

  @Column({
    name: 'provider_type',
    type: 'enum',
    enum: ProviderType,
    default: ProviderType.STREAMING,
  })
  providerType: ProviderType;

  @Column({ name: 'country_of_origin', type: 'varchar', length: 100, nullable: true })
  countryOfOrigin: string;

  @Column({ name: 'established_year', type: 'integer', nullable: true })
  establishedYear: number;

  @Column({ name: 'is_premium', type: 'boolean', default: false })
  isPremium: boolean;

  @Column({ name: 'is_featured', type: 'boolean', default: false })
  isFeatured: boolean;

  @Column({ name: 'subscription_required', type: 'boolean', default: true })
  subscriptionRequired: boolean;

  @Column({ name: 'color_code', type: 'varchar', length: 7, nullable: true })
  colorCode: string; // Hex color for branding

  @Column({ name: 'sort_order', type: 'integer', default: 0 })
  sortOrder: number;

  @Column({
    type: 'enum',
    enum: ProviderStatus,
    default: ProviderStatus.ACTIVE,
  })
  status: ProviderStatus;

  @Column({ name: 'content_count', type: 'integer', default: 0 })
  contentCount: number;

  @Column({ name: 'api_endpoint', type: 'text', nullable: true })
  apiEndpoint: string; // For external API integration

  @Column({ name: 'api_key', type: 'text', nullable: true })
  apiKey: string; // For external API authentication

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>; // Additional provider-specific data

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  // Relationships
  @OneToMany(() => Content, (content) => content.provider)
  contents: Content[];
}
