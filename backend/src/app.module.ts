import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ProfileModule } from './profiles/profiles.module';
import { ContentModule } from './contents/contents.module';
import { PlanModule } from './plans/plans.module';
import { SubscriptionModule } from './subscriptions/subscriptions.module';
import { GenreModule } from './genres/genres.module';
import { AuthModule } from './auth/auth.module';
import { PlatformUsersModule } from './platform-users/platform-users.module';
import { RoleModule } from './roles/roles.module';
import { ProvidersModule } from './providers/providers.module';
import {
  User,
  Profile,
  OtpLogin,
  Device,
  QrLogin,
  Session,
  Plan,
  Subscription,
  Payment,
  Player,
  Content,
  Series,
  Season,
  Episode,
  Trailer,
  Subtitle,
  AudioTrack,
  Genre,
  ContentGenre,
  CastPerson,
  CrewPerson,
  ContentCast,
  ContentCrew,
  ExternalRating,
  MyList,
  Rating,
  WatchHistory,
  Recommendation,
  Page,
  Section,
  ContentPlacement,
  Provider,
} from './entities';
import { PlatformUser } from './platform-users/entities/platform-user.entity';
import { Role } from './roles/entities/role.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'ott_platform',
      entities: [
        User,
        Profile,
        OtpLogin,
        Device,
        QrLogin,
        Session,
        Plan,
        Subscription,
        Payment,
        Player,
        Content,
        Series,
        Season,
        Episode,
        Trailer,
        Subtitle,
        AudioTrack,
        Genre,
        ContentGenre,
        CastPerson,
        CrewPerson,
        ContentCast,
        ContentCrew,
        ExternalRating,
        MyList,
        Rating,
        WatchHistory,
        Recommendation,
        Page,
        Section,
        ContentPlacement,
        Provider,
        PlatformUser,
        Role,
      ],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV === 'development',
    }),
    UserModule,
    ProfileModule,
    ContentModule,
    PlanModule,
    SubscriptionModule,
    GenreModule,
    AuthModule,
    PlatformUsersModule,
    RoleModule,
    ProvidersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
