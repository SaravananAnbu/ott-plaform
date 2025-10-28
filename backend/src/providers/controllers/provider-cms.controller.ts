import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ProvidersService } from '../services/providers.service';
import { CreateProviderDto } from '../dto/create-provider.dto';
import { UpdateProviderDto } from '../dto/update-provider.dto';

@Controller('cms/providers')
export class ProviderCmsController {
  constructor(private readonly providerService: ProvidersService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.create(createProviderDto);
  }

  @Get()
  findAll(@Query('active') activeOnly?: string) {
    if (activeOnly === 'true') {
      return this.providerService.findAllActive();
    }
    return this.providerService.findAll();
  }

  @Get('featured')
  findFeatured() {
    return this.providerService.findFeatured();
  }

  @Get('type/:type')
  findByType(@Param('type') type: string) {
    return this.providerService.findByType(type);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.providerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providerService.update(id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.providerService.remove(id);
  }

  @Patch(':id/update-content-count')
  updateContentCount(@Param('id', ParseIntPipe) id: number) {
    return this.providerService.updateContentCount(id);
  }
}
