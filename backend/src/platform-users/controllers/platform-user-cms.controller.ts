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

@Controller()
export class PlatformUserController {
  constructor(private readonly platformUserService: PlatformUserService) {}

  // Regular routes (add authentication later if needed)
  @Post('platform-users')
  create(@Body() createPlatformUserDto: CreatePlatformUserDto) {
    return this.platformUserService.create(createPlatformUserDto);
  }

  @Get('platform-users')
  findAll(
    @Query('roleId') roleId?: string,
    @Query('status') status?: UserStatus,
  ) {
    const roleIdNumber = roleId ? parseInt(roleId, 10) : undefined;
    return this.platformUserService.findAll(roleIdNumber, status);
  }

  @Get('platform-users/:id')
  findOne(@Param('id') id: string) {
    return this.platformUserService.findOne(+id);
  }

  @Patch('platform-users/:id')
  update(@Param('id') id: string, @Body() updatePlatformUserDto: UpdatePlatformUserDto) {
    return this.platformUserService.updatePlatformUser(+id, updatePlatformUserDto);
  }

  @Delete('platform-users/:id')
  remove(@Param('id') id: string) {
    return this.platformUserService.remove(+id);
  }

  @Patch('platform-users/:id/suspend')
  suspend(@Param('id') id: string) {
    return this.platformUserService.suspend(+id);
  }

  @Patch('platform-users/:id/activate')
  activate(@Param('id') id: string) {
    return this.platformUserService.activate(+id);
  }

  @Post('platform-users/:id/reset-password')
  resetPassword(@Param('id') id: string) {
    return this.platformUserService.resetPassword(+id);
  }

  // CMS routes (no authentication)
  @Post('cms/platform-users')
  createCms(@Body() createPlatformUserDto: CreatePlatformUserDto) {
    return this.platformUserService.create(createPlatformUserDto);
  }

  @Get('cms/platform-users')
  findAllCms(
    @Query('roleId') roleId?: string,
    @Query('status') status?: UserStatus,
  ) {
    const roleIdNumber = roleId ? parseInt(roleId, 10) : undefined;
    return this.platformUserService.findAll(roleIdNumber, status);
  }

  @Get('cms/platform-users/:id')
  findOneCms(@Param('id') id: string) {
    return this.platformUserService.findOne(+id);
  }

  @Patch('cms/platform-users/:id')
  updateCms(@Param('id') id: string, @Body() updatePlatformUserDto: UpdatePlatformUserDto) {
    return this.platformUserService.updatePlatformUser(+id, updatePlatformUserDto);
  }

  @Delete('cms/platform-users/:id')
  removeCms(@Param('id') id: string) {
    return this.platformUserService.remove(+id);
  }

  @Patch('cms/platform-users/:id/suspend')
  suspendCms(@Param('id') id: string) {
    return this.platformUserService.suspend(+id);
  }

  @Patch('cms/platform-users/:id/activate')
  activateCms(@Param('id') id: string) {
    return this.platformUserService.activate(+id);
  }

  @Post('cms/platform-users/:id/reset-password')
  resetPasswordCms(@Param('id') id: string) {
    return this.platformUserService.resetPassword(+id);
  }
}
