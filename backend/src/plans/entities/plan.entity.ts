import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn({ name: 'plan_id' })
  planId: number;

  @Column({ name: 'plan_name', type: 'varchar', length: 60, unique: true })
  planName: string;

  @Column({ name: 'price_cents', type: 'integer' })
  priceCents: number;

  @Column({ type: 'char', length: 3, default: 'USD' })
  currency: string;

  @Column({ type: 'varchar', length: 10 })
  resolution: string;

  @Column({ name: 'screens_allowed', type: 'smallint', default: 1 })
  screensAllowed: number;

  @Column({ name: 'downloads_allowed', type: 'boolean', default: true })
  downloadsAllowed: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => Subscription, (subscription) => subscription.plan)
  subscriptions: Subscription[];
}
