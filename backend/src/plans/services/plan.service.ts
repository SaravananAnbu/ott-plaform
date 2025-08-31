import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../entities/plan.entity';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from '../dto/update-plan.dto';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    const plan = this.planRepository.create(createPlanDto);
    return this.planRepository.save(plan);
  }

  async findAll(): Promise<Plan[]> {
    return this.planRepository.find({
      relations: ['subscriptions'],
    });
  }

  async findOne(id: number): Promise<Plan> {
    const plan = await this.planRepository.findOne({
      where: { planId: id },
      relations: ['subscriptions'],
    });
    if (!plan) {
      throw new NotFoundException(`Plan with ID ${id} not found`);
    }
    return plan;
  }

  async update(id: number, updatePlanDto: UpdatePlanDto): Promise<Plan> {
    await this.planRepository.update(id, updatePlanDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.planRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Plan with ID ${id} not found`);
    }
  }

  async findByName(planName: string): Promise<Plan | null> {
    return this.planRepository.findOne({
      where: { planName },
      relations: ['subscriptions'],
    });
  }
}
