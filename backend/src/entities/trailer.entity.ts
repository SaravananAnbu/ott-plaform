import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Content } from '../contents/entities/content.entity';

@Entity('trailers')
export class Trailer {
  @PrimaryGeneratedColumn({ name: 'trailer_id' })
  trailerId: number;

  @ManyToOne(() => Content, (content) => content.trailers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'content_id' })
  content: Content;

  @Column({ name: 'trailer_url', type: 'text' })
  trailerUrl: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  quality: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  language: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
