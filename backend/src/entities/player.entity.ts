import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('player')
export class Player {
  @PrimaryGeneratedColumn({ name: 'player_id' })
  playerId: number;

  @Column({ name: 'provider_name', type: 'varchar', length: 80 })
  providerName: string;

  @Column({ name: 'config_json', type: 'jsonb', default: '{}' })
  configJson: object;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
