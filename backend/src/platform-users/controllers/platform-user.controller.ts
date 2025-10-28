import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PlatformUserService } from '../services/platform-user.service';
import { CreatePlatformUserDto } from '../dto/create-platform-user.dto';
import { UpdatePlatformUserDto } from '../dto/update-platform-user.dto';
import { UserStatus } from '../entities/platform-user.entity';

@Controller('platform-users')
export class PlatformUserController {
  constructor(private readonly platformUserService: PlatformUserService) {}

  @Post()
  create(@Body() createPlatformUserDto: CreatePlatformUserDto) {
    return this.platformUserService.create(createPlatformUserDto);
  }

  @Get()
  findAll(
    @Query('roleId') roleId?: string,
    @Query('status') status?: UserStatus,
  ) {
    const roleIdNumber = roleId ? parseInt(roleId, 10) : undefined;
    return this.platformUserService.findAll(roleIdNumber, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platformUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlatformUserDto: UpdatePlatformUserDto) {
    return this.platformUserService.updatePlatformUser(+id, updatePlatformUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platformUserService.remove(+id);
  }

  @Patch(':id/suspend')
  suspend(@Param('id') id: string) {
    return this.platformUserService.suspend(+id);
  }

  @Patch(':id/activate')
  activate(@Param('id') id: string) {
    return this.platformUserService.activate(+id);
  }

  @Post(':id/reset-password')
  resetPassword(@Param('id') id: string) {
    return this.platformUserService.resetPassword(+id);
  }
}
