import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Profile } from '../profiles/entities/profile.entity';
import { Content } from '../contents/entities/content.entity';

@Entity('recommendations')
@Unique(['profile', 'content'])
export class Recommendation {
  @PrimaryGeneratedColumn({ name: 'recommendation_id' })
  recommendationId: number;

  @ManyToOne(() => Profile, (profile) => profile.recommendations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @ManyToOne(() => Content, (content) => content.recommendations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'content_id' })
  content: Content;

  @Column({ type: 'decimal', precision: 6, scale: 4 })
  score: number;

  @Column({ name: 'generated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  generatedAt: Date;
}
