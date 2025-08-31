import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Content } from '../contents/entities/content.entity';

@Entity('subtitles')
@Unique(['content', 'language'])
export class Subtitle {
  @PrimaryGeneratedColumn({ name: 'subtitle_id' })
  subtitleId: number;

  @ManyToOne(() => Content, (content) => content.subtitles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'content_id' })
  content: Content;

  @Column({ type: 'varchar', length: 40 })
  language: string;

  @Column({ name: 'subtitle_url', type: 'text' })
  subtitleUrl: string;
}
