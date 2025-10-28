import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformUser } from './entities/platform-user.entity';
import { PlatformUserService } from './services/platform-user.service';
import { PlatformUserController } from './controllers/platform-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlatformUser])],
  controllers: [PlatformUserController],
  providers: [PlatformUserService],
  exports: [PlatformUserService],
})
export class PlatformUsersModule {}
