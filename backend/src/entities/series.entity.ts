import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Content } from './content.entity';
import { Season } from './season.entity';

@Entity('series')
export class Series {
  @PrimaryGeneratedColumn({ name: 'series_id' })
  seriesId: number;

  @OneToOne(() => Content, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'content_id' })
  content: Content;

  @Column({ name: 'total_seasons', type: 'integer', nullable: true })
  totalSeasons: number;

  @Column({ type: 'varchar', length: 30, nullable: true })
  status: string;

  @OneToMany(() => Season, season => season.series)
  seasons: Season[];
}