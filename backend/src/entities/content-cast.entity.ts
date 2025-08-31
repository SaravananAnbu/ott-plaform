import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Content } from './content.entity';
import { CastPerson } from './cast-person.entity';

@Entity('content_cast')
export class ContentCast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'content_id' })
  contentId: number;

  @Column({ name: 'cast_id' })
  castId: number;

  @ManyToOne(() => Content, content => content.contentCasts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'content_id' })
  content: Content;

  @ManyToOne(() => CastPerson, castPerson => castPerson.contentCasts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cast_id' })
  castPerson: CastPerson;

  @Column({ name: 'role_type', type: 'varchar', length: 80, nullable: true })
  roleType: string;

  @Column({ name: 'role_name', type: 'varchar', length: 160, nullable: true })
  roleName: string;
}