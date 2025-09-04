import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/entities/user.entity';
import { QrLogin } from './qr-login.entity';
import { Session } from './session.entity';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn({ name: 'device_id' })
  deviceId: number;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'device_type', type: 'varchar', length: 30 })
  deviceType: string;

  @Column({
    name: 'device_model',
    type: 'varchar',
    length: 120,
    nullable: true,
  })
  deviceModel: string;

  @Column({ name: 'os_version', type: 'varchar', length: 60, nullable: true })
  osVersion: string;

  @Column({ name: 'app_version', type: 'varchar', length: 40, nullable: true })
  appVersion: string;

  @CreateDateColumn({ name: 'registered_at', type: 'timestamp' })
  registeredAt: Date;

  @OneToMany(() => QrLogin, (qrLogin) => qrLogin.device)
  qrLogins: QrLogin[];

  @OneToMany(() => Session, (session) => session.device)
  sessions: Session[];
}
