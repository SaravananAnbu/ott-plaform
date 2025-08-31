import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userData = { ...createUserDto };

    // Hash password if provided
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['profiles'],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { userId: id },
      relations: ['profiles'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['profiles'],
    });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { phoneNumber },
      relations: ['profiles'],
    });
  }
}
