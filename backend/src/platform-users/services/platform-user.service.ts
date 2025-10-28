import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatformUser, UserStatus } from '../entities/platform-user.entity';
import { CreatePlatformUserDto } from '../dto/create-platform-user.dto';
import { UpdatePlatformUserDto } from '../dto/update-platform-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PlatformUserService {
  constructor(
    @InjectRepository(PlatformUser)
    private platformUserRepository: Repository<PlatformUser>,
  ) {}

  async create(createPlatformUserDto: CreatePlatformUserDto): Promise<PlatformUser> {
    // Hash password
    const passwordHash = await bcrypt.hash(createPlatformUserDto.password, 10);

    // Create entity data without password
    const { password, ...userData } = createPlatformUserDto;
    const entityData = {
      ...userData,
      passwordHash,
    };

    const user = this.platformUserRepository.create(entityData);
    return this.platformUserRepository.save(user);
  }

  async findAll(roleId?: number, status?: UserStatus): Promise<PlatformUser[]> {
    const queryBuilder = this.platformUserRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role');

    if (roleId) {
      queryBuilder.andWhere('user.roleId = :roleId', { roleId });
    }

    if (status) {
      queryBuilder.andWhere('user.status = :status', { status });
    }

    return queryBuilder.orderBy('user.lastName', 'ASC').getMany();
  }

  async findOne(id: number): Promise<PlatformUser> {
    const user = await this.platformUserRepository.findOne({
      where: { userId: id },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException(`Platform user with ID ${id} not found`);
    }
    return user;
  }

  async updatePlatformUser(id: number, updateData: any): Promise<PlatformUser> {
    if (updateData.password) {
      updateData.passwordHash = await bcrypt.hash(updateData.password, 10);
      delete updateData.password;
    }
    
    await this.platformUserRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.platformUserRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Platform user with ID ${id} not found`);
    }
  }

  async suspend(id: number): Promise<PlatformUser> {
    await this.platformUserRepository.update(id, { status: UserStatus.SUSPENDED });
    return this.findOne(id);
  }

  async activate(id: number): Promise<PlatformUser> {
    await this.platformUserRepository.update(id, { status: UserStatus.ACTIVE });
    return this.findOne(id);
  }

  async resetPassword(id: number): Promise<void> {
    // Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    
    await this.platformUserRepository.update(id, { passwordHash: hashedPassword });
    
    // In a real application, you would send an email here
    console.log(`Temporary password for user ${id}: ${tempPassword}`);
  }
}
