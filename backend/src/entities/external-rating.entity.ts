import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Content } from '../contents/entities/content.entity';

@Entity('external_ratings')
@Unique(['content', 'source'])
export class ExternalRating {
  @PrimaryGeneratedColumn({ name: 'ext_rating_id' })
  extRatingId: number;

  @ManyToOne(() => Content, (content) => content.externalRatings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'content_id' })
  content: Content;

  @Column({ type: 'varchar', length: 60 })
  source: string;

  @Column({ name: 'rating_value', type: 'varchar', length: 30 })
  ratingValue: string;

  @Column({ name: 'votes_count', type: 'integer', nullable: true })
  votesCount: number;

  @Column({
    name: 'last_synced_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastSyncedAt: Date;
}
