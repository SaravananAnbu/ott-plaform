import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ContentCast } from './content-cast.entity';

@Entity('cast_person')
export class CastPerson {
  @PrimaryGeneratedColumn({ name: 'cast_id' })
  castId: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ name: 'profile_pic', type: 'text', nullable: true })
  profilePic: string;

  @OneToMany(() => ContentCast, (contentCast) => contentCast.castPerson)
  contentCasts: ContentCast[];
}
