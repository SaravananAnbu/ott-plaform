import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Content } from './content.entity';
import { Genre } from './genre.entity';

@Entity('content_genres')
export class ContentGenre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'content_id' })
  contentId: number;

  @Column({ name: 'genre_id' })
  genreId: number;

  @ManyToOne(() => Content, content => content.contentGenres, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'content_id' })
  content: Content;

  @ManyToOne(() => Genre, genre => genre.contentGenres, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'genre_id' })
  genre: Genre;
}