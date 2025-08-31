import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ContentGenre } from '../../entities/content-genre.entity';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn({ name: 'genre_id' })
  genreId: number;

  @Column({ type: 'varchar', length: 80, unique: true })
  name: string;

  @OneToMany(() => ContentGenre, (contentGenre) => contentGenre.genre)
  contentGenres: ContentGenre[];
}
