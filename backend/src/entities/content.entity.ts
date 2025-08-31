import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { Player } from './player.entity';
import { ContentCategory, MaturityRating, ContentStatus } from '../enums';
import { Series } from './series.entity';
import { Episode } from './episode.entity';
import { Trailer } from './trailer.entity';
import { Subtitle } from './subtitle.entity';
import { AudioTrack } from './audio-track.entity';
import { ContentGenre } from './content-genre.entity';
import { ContentCast } from './content-cast.entity';
import { ContentCrew } from './content-crew.entity';
import { ExternalRating } from './external-rating.entity';
import { MyList } from './my-list.entity';
import { Rating } from './rating.entity';
import { WatchHistory } from './watch-history.entity';
import { Recommendation } from './recommendation.entity';
import { ContentPlacement } from './content-placement.entity';

@Entity('content')
export class Content {
  @PrimaryGeneratedColumn({ name: 'content_id' })
  contentId: number;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  about: string;

  @Column({
    type: 'enum',
    enum: ContentCategory
  })
  category: ContentCategory;

  @Column({ name: 'release_date', type: 'date', nullable: true })
  releaseDate: Date;

  @Column({ name: 'duration_minutes', type: 'integer', nullable: true })
  durationMinutes: number;

  @Column({ type: 'varchar', length: 40, nullable: true })
  language: string;

  @Column({
    name: 'maturity_rating',
    type: 'enum',
    enum: MaturityRating,
    nullable: true
  })
  maturityRating: MaturityRating;

  @Column({ name: 'imdb_rating', type: 'decimal', precision: 3, scale: 1, nullable: true })
  imdbRating: number;

  @Column({ name: 'poster_url', type: 'text', nullable: true })
  posterUrl: string;

  @Column({ name: 'banner_url', type: 'text', nullable: true })
  bannerUrl: string;

  @Column({ name: 'thumbnail_url', type: 'text', nullable: true })
  thumbnailUrl: string;

  @Column({ name: 'ad_url', type: 'text', nullable: true })
  adUrl: string;

  @ManyToOne(() => Player, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @Column({
    type: 'enum',
    enum: ContentStatus,
    default: ContentStatus.DRAFT
  })
  status: ContentStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToOne(() => Series, series => series.content)
  series: Series;

  @OneToOne(() => Episode, episode => episode.content)
  episode: Episode;

  @OneToMany(() => Trailer, trailer => trailer.content)
  trailers: Trailer[];

  @OneToMany(() => Subtitle, subtitle => subtitle.content)
  subtitles: Subtitle[];

  @OneToMany(() => AudioTrack, audioTrack => audioTrack.content)
  audioTracks: AudioTrack[];

  @OneToMany(() => ContentGenre, contentGenre => contentGenre.content)
  contentGenres: ContentGenre[];

  @OneToMany(() => ContentCast, contentCast => contentCast.content)
  contentCasts: ContentCast[];

  @OneToMany(() => ContentCrew, contentCrew => contentCrew.content)
  contentCrews: ContentCrew[];

  @OneToMany(() => ExternalRating, externalRating => externalRating.content)
  externalRatings: ExternalRating[];

  @OneToMany(() => MyList, myList => myList.content)
  myLists: MyList[];

  @OneToMany(() => Rating, rating => rating.content)
  ratings: Rating[];

  @OneToMany(() => WatchHistory, watchHistory => watchHistory.content)
  watchHistories: WatchHistory[];

  @OneToMany(() => Recommendation, recommendation => recommendation.content)
  recommendations: Recommendation[];

  @OneToMany(() => ContentPlacement, contentPlacement => contentPlacement.content)
  contentPlacements: ContentPlacement[];
}