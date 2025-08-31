import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

export enum PlanType {
  FREE = 'free',
  BASIC = 'basic',
  STANDARD = 'standard',
  PREMIUM = 'premium',
  FAMILY = 'family',
}

export enum PlanStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DEPRECATED = 'deprecated',
}

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn({ name: 'plan_id' })
  planId: number;

  @Column({ name: 'plan_name', type: 'varchar', length: 60, unique: true })
  planName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'price_cents', type: 'integer' })
  priceCents: number;

  @Column({ type: 'char', length: 3, default: 'USD' })
  currency: string;

  @Column({
    type: 'enum',
    enum: PlanType,
    default: PlanType.BASIC,
  })
  type: PlanType;

  @Column({ type: 'varchar', length: 10 })
  resolution: string; // HD, FHD, 4K

  @Column({ name: 'screens_allowed', type: 'smallint', default: 1 })
  screensAllowed: number;

  @Column({ name: 'downloads_allowed', type: 'boolean', default: true })
  downloadsAllowed: boolean;

  @Column({ name: 'ads_supported', type: 'boolean', default: true })
  adsSupported: boolean;

  @Column({ name: 'offline_viewing', type: 'boolean', default: false })
  offlineViewing: boolean;

  @Column({ name: 'max_download_quality', type: 'varchar', length: 10, nullable: true })
  maxDownloadQuality: string; // SD, HD, FHD

  @Column({ name: 'streaming_quality', type: 'varchar', length: 10 })
  streamingQuality: string; // HD, FHD, 4K

  @Column({ name: 'content_access_level', type: 'varchar', length: 20, default: 'basic' })
  contentAccessLevel: string; // basic, premium, all

  @Column({ name: 'simultaneous_streams', type: 'smallint', default: 1 })
  simultaneousStreams: number;

  @Column({ name: 'family_sharing', type: 'boolean', default: false })
  familySharing: boolean;

  @Column({ name: 'parental_controls', type: 'boolean', default: true })
  parentalControls: boolean;

  @Column({ name: 'billing_cycle_months', type: 'smallint', default: 1 })
  billingCycleMonths: number;

  @Column({ name: 'free_trial_days', type: 'smallint', default: 0 })
  freeTrialDays: number;

  @Column({
    type: 'enum',
    enum: PlanStatus,
    default: PlanStatus.ACTIVE,
  })
  status: PlanStatus;

  @Column({ name: 'is_popular', type: 'boolean', default: false })
  isPopular: boolean;

  @Column({ name: 'sort_order', type: 'smallint', default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Subscription, (subscription) => subscription.plan)
  subscriptions: Subscription[];
}
