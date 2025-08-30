import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn, Unique } from 'typeorm';
import { Profile } from './profile.entity';
import { Content } from './content.entity';
import { Episode } from './episode.entity';

@Entity('watch_history')
@Unique(['profile', 'content', 'episode'])
export class WatchHistory {
  @PrimaryGeneratedColumn({ name: 'history_id' })
  historyId: number;

  @ManyToOne(() => Profile, profile => profile.watchHistories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @ManyToOne(() => Content, content => content.watchHistories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'content_id' })
  content: Content;

  @ManyToOne(() => Episode, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'episode_id' })
  episode: Episode;

  @Column({ name: 'last_watched_position_s', type: 'integer', default: 0 })
  lastWatchedPositionS: number;

  @Column({ name: 'watched_percentage', type: 'decimal', precision: 5, scale: 2, nullable: true })
  watchedPercentage: number;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}