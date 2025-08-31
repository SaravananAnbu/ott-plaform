import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Unique } from 'typeorm';
import { Content } from './content.entity';
import { Section } from './section.entity';

@Entity('content_placement')
@Unique(['content', 'section'])
export class ContentPlacement {
  @PrimaryGeneratedColumn({ name: 'placement_id' })
  placementId: number;

  @ManyToOne(() => Content, content => content.contentPlacements, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'content_id' })
  content: Content;

  @ManyToOne(() => Section, section => section.contentPlacements, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'section_id' })
  section: Section;

  @Column({ type: 'integer', default: 100 })
  priority: number;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}