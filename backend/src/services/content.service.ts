import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../entities/content.entity';
import { CreateContentDto } from '../dto/create-content.dto';
import { UpdateContentDto } from '../dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  async create(createContentDto: CreateContentDto): Promise<Content> {
    const content = this.contentRepository.create(createContentDto);
    return this.contentRepository.save(content);
  }

  async findAll(): Promise<Content[]> {
    return this.contentRepository.find({
      relations: ['player', 'series', 'episode', 'trailers', 'subtitles', 'audioTracks', 'contentGenres', 'contentGenres.genre'],
    });
  }

  async findOne(id: number): Promise<Content> {
    const content = await this.contentRepository.findOne({
      where: { contentId: id },
      relations: ['player', 'series', 'episode', 'trailers', 'subtitles', 'audioTracks', 'contentGenres', 'contentGenres.genre'],
    });
    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    return content;
  }

  async update(id: number, updateContentDto: UpdateContentDto): Promise<Content> {
    await this.contentRepository.update(id, updateContentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.contentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
  }

  async findByCategory(category: string): Promise<Content[]> {
    return this.contentRepository.find({
      where: { category: category as any },
      relations: ['player', 'contentGenres', 'contentGenres.genre'],
    });
  }

  async findByStatus(status: string): Promise<Content[]> {
    return this.contentRepository.find({
      where: { status: status as any },
      relations: ['player', 'contentGenres', 'contentGenres.genre'],
    });
  }
}