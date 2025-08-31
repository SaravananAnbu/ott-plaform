import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { Profile } from '../profiles/entities/profile.entity';
import { Content } from '../contents/entities/content.entity';

@Entity('my_list')
@Unique(['profile', 'content'])
export class MyList {
  @PrimaryGeneratedColumn({ name: 'list_id' })
  listId: number;

  @ManyToOne(() => Profile, (profile) => profile.myLists, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @ManyToOne(() => Content, (content) => content.myLists, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'content_id' })
  content: Content;

  @CreateDateColumn({ name: 'added_at', type: 'timestamptz' })
  addedAt: Date;
}
