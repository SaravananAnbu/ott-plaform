import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { PaymentStatus } from '../enums';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn({ name: 'payment_id' })
  paymentId: number;

  @ManyToOne(() => User, (user) => user.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Subscription, (subscription) => subscription.payments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;

  @Column({ name: 'amount_cents', type: 'integer' })
  amountCents: number;

  @Column({ type: 'char', length: 3, default: 'USD' })
  currency: string;

  @Column({ name: 'payment_method', type: 'varchar', length: 40 })
  paymentMethod: string;

  @Column({
    name: 'transaction_id',
    type: 'varchar',
    length: 120,
    unique: true,
    nullable: true,
  })
  transactionId: string;

  @Column({ name: 'payment_date', type: 'timestamptz', default: () => 'NOW()' })
  paymentDate: Date;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;
}
