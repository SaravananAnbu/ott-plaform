import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, Unique } from 'typeorm';
import { Series } from './series.entity';
import { Episode } from './episode.entity';

@Entity('seasons')
@Unique(['series', 'seasonNumber'])
export class Season {
  @PrimaryGeneratedColumn({ name: 'season_id' })
  seasonId: number;

  @ManyToOne(() => Series, series => series.seasons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'series_id' })
  series: Series;

  @Column({ name: 'season_number', type: 'integer' })
  seasonNumber: number;

  @Column({ name: 'release_date', type: 'date', nullable: true })
  releaseDate: Date;

  @Column({ name: 'total_episodes', type: 'integer', nullable: true })
  totalEpisodes: number;

  @Column({ name: 'poster_url', type: 'text', nullable: true })
  posterUrl: string;

  @OneToMany(() => Episode, episode => episode.season)
  episodes: Episode[];
}