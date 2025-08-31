import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider, ProviderStatus } from '../../entities/provider.entity';
import { CreateProviderDto, UpdateProviderDto } from '../dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}

  async create(createProviderDto: CreateProviderDto): Promise<Provider> {
    const provider = this.providerRepository.create(createProviderDto);
    return await this.providerRepository.save(provider);
  }

  async findAll(): Promise<Provider[]> {
    return await this.providerRepository.find({
      order: {
        sortOrder: 'ASC',
        providerName: 'ASC',
      },
      relations: ['contents'],
    });
  }

  async findAllActive(): Promise<Provider[]> {
    return await this.providerRepository.find({
      where: { status: ProviderStatus.ACTIVE },
      order: {
        sortOrder: 'ASC',
        providerName: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Provider> {
    const provider = await this.providerRepository.findOne({
      where: { providerId: id },
      relations: ['contents'],
    });

    if (!provider) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }

    return provider;
  }

  async update(id: number, updateProviderDto: UpdateProviderDto): Promise<Provider> {
    const provider = await this.findOne(id);
    Object.assign(provider, updateProviderDto);
    return await this.providerRepository.save(provider);
  }

  async remove(id: number): Promise<void> {
    const provider = await this.findOne(id);
    await this.providerRepository.remove(provider);
  }

  async updateContentCount(providerId: number): Promise<void> {
    const result = await this.providerRepository
      .createQueryBuilder('provider')
      .leftJoin('provider.contents', 'content')
      .select('COUNT(content.contentId)', 'contentCount')
      .where('provider.providerId = :providerId', { providerId })
      .getRawOne();

    await this.providerRepository.update(providerId, {
      contentCount: parseInt(result?.contentCount || '0'),
    });
  }

  async findByType(providerType: string): Promise<Provider[]> {
    return await this.providerRepository.find({
      where: { 
        providerType: providerType as any,
        status: ProviderStatus.ACTIVE 
      },
      order: {
        sortOrder: 'ASC',
        providerName: 'ASC',
      },
    });
  }

  async findFeatured(): Promise<Provider[]> {
    return await this.providerRepository.find({
      where: { 
        isFeatured: true,
        status: ProviderStatus.ACTIVE 
      },
      order: {
        sortOrder: 'ASC',
        providerName: 'ASC',
      },
    });
  }
}
