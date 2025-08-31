import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Content } from '../contents/entities/content.entity';
import { CrewPerson } from './crew-person.entity';

@Entity('content_crew')
export class ContentCrew {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'content_id' })
  contentId: number;

  @Column({ name: 'crew_id' })
  crewId: number;

  @ManyToOne(() => Content, (content) => content.contentCrews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'content_id' })
  content: Content;

  @ManyToOne(() => CrewPerson, (crewPerson) => crewPerson.contentCrews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'crew_id' })
  crewPerson: CrewPerson;

  @Column({ name: 'role_type', type: 'varchar', length: 80, nullable: true })
  roleType: string;
}
