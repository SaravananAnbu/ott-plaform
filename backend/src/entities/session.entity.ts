import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Device } from './device.entity';
import { SessionStatus } from '../enums';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn({ name: 'session_id' })
  sessionId: number;

  @ManyToOne(() => Device, (device) => device.sessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @Column({ name: 'ip_address', type: 'varchar', length: 45, nullable: true })
  ipAddress: string;

  @Column({ name: 'login_time', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  loginTime: Date;

  @Column({ name: 'logout_time', type: 'timestamp', nullable: true })
  logoutTime: Date;

  @Column({
    type: 'enum',
    enum: SessionStatus,
    default: SessionStatus.ACTIVE,
  })
  status: SessionStatus;
}
