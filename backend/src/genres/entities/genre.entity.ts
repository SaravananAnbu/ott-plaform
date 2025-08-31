import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContentGenre } from '../../entities/content-genre.entity';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn({ name: 'genre_id' })
  genreId: number;

  @Column({ type: 'varchar', length: 80, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  slug: string;

  @Column({ name: 'image_url', type: 'text', nullable: true })
  imageUrl: string;

  @Column({ name: 'background_color', type: 'varchar', length: 7, nullable: true })
  backgroundColor: string; // Hex color code

  @Column({ name: 'text_color', type: 'varchar', length: 7, nullable: true })
  textColor: string; // Hex color code

  @Column({ name: 'is_featured', type: 'boolean', default: false })
  isFeatured: boolean;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'sort_order', type: 'smallint', default: 0 })
  sortOrder: number;

  @Column({ name: 'meta_keywords', type: 'text', nullable: true })
  metaKeywords: string;

  @Column({ name: 'meta_description', type: 'text', nullable: true })
  metaDescription: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => ContentGenre, (contentGenre) => contentGenre.genre)
  contentGenres: ContentGenre[];
}
