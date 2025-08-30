import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Profile } from './profile.entity';
import { OtpLogin } from './otp-login.entity';
import { QrLogin } from './qr-login.entity';
import { Subscription } from './subscription.entity';
import { Payment } from './payment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'phone_number', type: 'varchar', length: 20, unique: true, nullable: true })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  country: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Profile, profile => profile.user)
  profiles: Profile[];

  @OneToMany(() => OtpLogin, otpLogin => otpLogin.user)
  otpLogins: OtpLogin[];

  @OneToMany(() => QrLogin, qrLogin => qrLogin.user)
  qrLogins: QrLogin[];

  @OneToMany(() => Subscription, subscription => subscription.user)
  subscriptions: Subscription[];

  @OneToMany(() => Payment, payment => payment.user)
  payments: Payment[];
}