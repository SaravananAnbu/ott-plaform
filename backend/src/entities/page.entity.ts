import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Section } from './section.entity';

@Entity('pages')
export class Page {
  @PrimaryGeneratedColumn({ name: 'page_id' })
  pageId: number;

  @Column({ type: 'varchar', length: 60, unique: true })
  name: string;

  @Column({ name: 'display_name', type: 'varchar', length: 120 })
  displayName: string;

  @Column({ type: 'varchar', length: 120, unique: true })
  slug: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => Section, section => section.page)
  sections: Section[];
}