import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ProvidersService } from '../services';
import { CreateProviderDto, UpdateProviderDto } from '../dto';
import { Provider } from '../../entities/provider.entity';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  async create(@Body() createProviderDto: CreateProviderDto): Promise<Provider> {
    return await this.providersService.create(createProviderDto);
  }

  @Get()
  async findAll(@Query('active') activeOnly?: string): Promise<Provider[]> {
    if (activeOnly === 'true') {
      return await this.providersService.findAllActive();
    }
    return await this.providersService.findAll();
  }

  @Get('featured')
  async findFeatured(): Promise<Provider[]> {
    return await this.providersService.findFeatured();
  }

  @Get('type/:type')
  async findByType(@Param('type') type: string): Promise<Provider[]> {
    return await this.providersService.findByType(type);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Provider> {
    return await this.providersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProviderDto: UpdateProviderDto,
  ): Promise<Provider> {
    return await this.providersService.update(id, updateProviderDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.providersService.remove(id);
  }

  @Patch(':id/update-content-count')
  async updateContentCount(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.providersService.updateContentCount(id);
  }
}
