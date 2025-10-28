import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // Regular routes (add authentication later if needed)
  @Post('roles')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get('roles')
  findAll() {
    return this.roleService.findAll();
  }

  @Get('roles/permissions')
  getPermissions() {
    return this.roleService.getPermissions();
  }

  @Get('roles/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findOne(id);
  }

  @Patch('roles/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete('roles/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.remove(id);
  }

  // CMS routes (no authentication)
  @Post('cms/roles')
  createCms(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get('cms/roles')
  findAllCms() {
    return this.roleService.findAll();
  }

  @Get('cms/roles/permissions')
  getPermissionsCms() {
    return this.roleService.getPermissions();
  }

  @Get('cms/roles/:id')
  findOneCms(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findOne(id);
  }

  @Patch('cms/roles/:id')
  updateCms(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete('cms/roles/:id')
  removeCms(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.remove(id);
  }
}
