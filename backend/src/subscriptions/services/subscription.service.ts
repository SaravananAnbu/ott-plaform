import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { UpdateSubscriptionDto } from '../dto/update-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const subscription = this.subscriptionRepository.create(
      createSubscriptionDto,
    );
    return this.subscriptionRepository.save(subscription);
  }

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionRepository.find({
      relations: ['user', 'plan'],
    });
  }

  async findOne(id: number): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { subscriptionId: id },
      relations: ['user', 'plan'],
    });
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
    return subscription;
  }

  async update(
    id: number,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<Subscription> {
    await this.subscriptionRepository.update(id, updateSubscriptionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.subscriptionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
  }

  async findByUserId(userId: number): Promise<Subscription[]> {
    return this.subscriptionRepository.find({
      where: { user: { userId } },
      relations: ['user', 'plan'],
    });
  }
}
