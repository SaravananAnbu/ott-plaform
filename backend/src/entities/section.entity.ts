import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { Page } from './page.entity';
import { ContentPlacement } from './content-placement.entity';
import { SectionLayout } from '../enums';

@Entity('sections')
@Unique(['page', 'name'])
export class Section {
  @PrimaryGeneratedColumn({ name: 'section_id' })
  sectionId: number;

  @ManyToOne(() => Page, (page) => page.sections, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'page_id' })
  page: Page;

  @Column({ type: 'varchar', length: 80 })
  name: string;

  @Column({
    name: 'display_name',
    type: 'varchar',
    length: 160,
    nullable: true,
  })
  displayName: string;

  @Column({
    name: 'layout_type',
    type: 'enum',
    enum: SectionLayout,
    default: SectionLayout.RAIL,
  })
  layoutType: SectionLayout;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(
    () => ContentPlacement,
    (contentPlacement) => contentPlacement.section,
  )
  contentPlacements: ContentPlacement[];
}
