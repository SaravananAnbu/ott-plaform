import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Content } from './content.entity';

@Entity('audio_tracks')
@Unique(['content', 'language'])
export class AudioTrack {
  @PrimaryGeneratedColumn({ name: 'audio_id' })
  audioId: number;

  @ManyToOne(() => Content, content => content.audioTracks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'content_id' })
  content: Content;

  @Column({ type: 'varchar', length: 40 })
  language: string;

  @Column({ name: 'audio_url', type: 'text' })
  audioUrl: string;
}