import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Content } from './content.entity';
import { Season } from './season.entity';

@Entity('episodes')
@Unique(['season', 'episodeNumber'])
export class Episode {
  @PrimaryGeneratedColumn({ name: 'episode_id' })
  episodeId: number;

  @OneToOne(() => Content, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'content_id' })
  content: Content;

  @ManyToOne(() => Season, season => season.episodes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'season_id' })
  season: Season;

  @Column({ name: 'episode_number', type: 'integer' })
  episodeNumber: number;

  @Column({ name: 'title_override', type: 'varchar', length: 300, nullable: true })
  titleOverride: string;

  @Column({ name: 'release_date', type: 'date', nullable: true })
  releaseDate: Date;
}