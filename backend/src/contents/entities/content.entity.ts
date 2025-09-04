import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Player } from '../../entities/player.entity';
import { ContentCategory, MaturityRating, ContentStatus } from '../../enums';
import { Series } from '../../entities/series.entity';
import { Episode } from '../../entities/episode.entity';
import { Trailer } from '../../entities/trailer.entity';
import { Subtitle } from '../../entities/subtitle.entity';
import { AudioTrack } from '../../entities/audio-track.entity';
import { ContentGenre } from '../../entities/content-genre.entity';
import { ContentCast } from '../../entities/content-cast.entity';
import { ContentCrew } from '../../entities/content-crew.entity';
import { ExternalRating } from '../../entities/external-rating.entity';
import { MyList } from '../../entities/my-list.entity';
import { Rating } from '../../entities/rating.entity';
import { WatchHistory } from '../../entities/watch-history.entity';
import { Recommendation } from '../../entities/recommendation.entity';
import { ContentPlacement } from '../../entities/content-placement.entity';
import { Provider } from '../../entities/provider.entity';

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
    enum: ContentCategory,
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
    nullable: true,
  })
  maturityRating: MaturityRating;

  @Column({
    name: 'imdb_rating',
    type: 'decimal',
    precision: 3,
    scale: 1,
    nullable: true,
  })
  imdbRating: number;

  @Column({ name: 'poster_url', type: 'text', nullable: true })
  posterUrl: string;

  @Column({ name: 'banner_url', type: 'text', nullable: true })
  bannerUrl: string;

  @Column({ name: 'thumbnail_url', type: 'text', nullable: true })
  thumbnailUrl: string;

  @Column({ name: 'ad_url', type: 'text', nullable: true })
  adUrl: string;

  @Column({ name: 'video_url', type: 'text', nullable: true })
  videoUrl: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  director: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  producer: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  writer: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  studio: string;

  @Column({ name: 'country_of_origin', type: 'varchar', length: 100, nullable: true })
  countryOfOrigin: string;

  @Column({ type: 'text', nullable: true })
  tags: string; // JSON array of string tags

  @Column({ name: 'is_premium', type: 'boolean', default: false })
  isPremium: boolean;

  @Column({ name: 'is_featured', type: 'boolean', default: false })
  isFeatured: boolean;

  @Column({ name: 'view_count', type: 'bigint', default: 0 })
  viewCount: number;

  @Column({ name: 'like_count', type: 'integer', default: 0 })
  likeCount: number;

  @Column({ name: 'dislike_count', type: 'integer', default: 0 })
  dislikeCount: number;

  @Column({ name: 'age_restriction', type: 'integer', nullable: true })
  ageRestriction: number;

  @Column({ name: 'subtitle_languages', type: 'text', nullable: true })
  subtitleLanguages: string; // JSON array of language codes

  @Column({ name: 'audio_languages', type: 'text', nullable: true })
  audioLanguages: string; // JSON array of language codes

  @Column({ name: 'video_quality', type: 'varchar', length: 20, nullable: true })
  videoQuality: string; // HD, FHD, 4K, etc.

  @Column({ name: 'file_size_mb', type: 'integer', nullable: true })
  fileSizeMb: number;

  @Column({ name: 'content_warning', type: 'text', nullable: true })
  contentWarning: string;

  @Column({ name: 'scheduled_release_date', type: 'timestamp', nullable: true })
  scheduledReleaseDate: Date;

  @ManyToOne(() => Player, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @ManyToOne(() => Provider, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column({
    type: 'enum',
    enum: ContentStatus,
    default: ContentStatus.DRAFT,
  })
  status: ContentStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => Series, (series) => series.content)
  series: Series;

  @OneToOne(() => Episode, (episode) => episode.content)
  episode: Episode;

  @OneToMany(() => Trailer, (trailer) => trailer.content)
  trailers: Trailer[];

  @OneToMany(() => Subtitle, (subtitle) => subtitle.content)
  subtitles: Subtitle[];

  @OneToMany(() => AudioTrack, (audioTrack) => audioTrack.content)
  audioTracks: AudioTrack[];

  @OneToMany(() => ContentGenre, (contentGenre) => contentGenre.content)
  contentGenres: ContentGenre[];

  @OneToMany(() => ContentCast, (contentCast) => contentCast.content)
  contentCasts: ContentCast[];

  @OneToMany(() => ContentCrew, (contentCrew) => contentCrew.content)
  contentCrews: ContentCrew[];

  @OneToMany(() => ExternalRating, (externalRating) => externalRating.content)
  externalRatings: ExternalRating[];

  @OneToMany(() => MyList, (myList) => myList.content)
  myLists: MyList[];

  @OneToMany(() => Rating, (rating) => rating.content)
  ratings: Rating[];

  @OneToMany(() => WatchHistory, (watchHistory) => watchHistory.content)
  watchHistories: WatchHistory[];

  @OneToMany(() => Recommendation, (recommendation) => recommendation.content)
  recommendations: Recommendation[];

  @OneToMany(
    () => ContentPlacement,
    (contentPlacement) => contentPlacement.content,
  )
  contentPlacements: ContentPlacement[];
}
