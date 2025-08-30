import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ContentCrew } from './content-crew.entity';

@Entity('crew_person')
export class CrewPerson {
  @PrimaryGeneratedColumn({ name: 'crew_id' })
  crewId: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ name: 'profile_pic', type: 'text', nullable: true })
  profilePic: string;

  @OneToMany(() => ContentCrew, contentCrew => contentCrew.crewPerson)
  contentCrews: ContentCrew[];
}