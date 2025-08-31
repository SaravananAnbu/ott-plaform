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
import * as entities from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'ott_platform',
      entities: Object.values(entities),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
