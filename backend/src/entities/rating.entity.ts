import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { Profile } from '../profiles/entities/profile.entity';
import { Content } from '../contents/entities/content.entity';
import { RatingScale } from '../enums';

@Entity('ratings')
@Unique(['profile', 'content'])
export class Rating {
  @PrimaryGeneratedColumn({ name: 'rating_id' })
  ratingId: number;

  @ManyToOne(() => Profile, (profile) => profile.ratings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @ManyToOne(() => Content, (content) => content.ratings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'content_id' })
  content: Content;

  @Column({
    type: 'enum',
    enum: RatingScale,
  })
  rating: RatingScale;

  @Column({ name: 'review_text', type: 'text', nullable: true })
  reviewText: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
