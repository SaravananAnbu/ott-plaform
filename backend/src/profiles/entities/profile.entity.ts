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
import { User } from '../../users/entities/user.entity';
import { ProfileAgeRestriction } from '../../enums';
import { MyList } from '../../entities/my-list.entity';
import { Rating } from '../../entities/rating.entity';
import { WatchHistory } from '../../entities/watch-history.entity';
import { Recommendation } from '../../entities/recommendation.entity';

@Entity('profiles')
@Unique(['user', 'profileName'])
export class Profile {
  @PrimaryGeneratedColumn({ name: 'profile_id' })
  profileId: number;

  @ManyToOne(() => User, (user) => user.profiles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'profile_name', type: 'varchar', length: 100 })
  profileName: string;

  @Column({ name: 'pin_code', type: 'varchar', length: 6 })
  pinCode: string;

  @Column({
    name: 'age_restriction',
    type: 'enum',
    enum: ProfileAgeRestriction,
    default: ProfileAgeRestriction.ADULT,
  })
  ageRestriction: ProfileAgeRestriction;

  @Column({ name: 'avatar_url', type: 'text', nullable: true })
  avatarUrl: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => MyList, (myList) => myList.profile)
  myLists: MyList[];

  @OneToMany(() => Rating, (rating) => rating.profile)
  ratings: Rating[];

  @OneToMany(() => WatchHistory, (watchHistory) => watchHistory.profile)
  watchHistories: WatchHistory[];

  @OneToMany(() => Recommendation, (recommendation) => recommendation.profile)
  recommendations: Recommendation[];
}
