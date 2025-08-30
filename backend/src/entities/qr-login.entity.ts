import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Device } from './device.entity';

@Entity('qr_login')
export class QrLogin {
  @PrimaryGeneratedColumn({ name: 'qr_id' })
  qrId: number;

  @ManyToOne(() => User, user => user.qrLogins, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'qr_token', type: 'varchar', length: 128, unique: true })
  qrToken: string;

  @ManyToOne(() => Device, device => device.qrLogins, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt: Date;

  @Column({ name: 'is_used', type: 'boolean', default: false })
  isUsed: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}