import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FiberProductionService } from './fiber-production.service';
import { CreateFiberProductionDto } from './dto/create-fiber-production.dto';
import { UpdateFiberProductionDto } from './dto/update-fiber-production.dto';

@Controller('fiber-production')
export class FiberProductionController {
  constructor(private readonly fiberProductionService: FiberProductionService) {}

  @Post('create')
  create(@Body() createFiberProductionDto: CreateFiberProductionDto) {
    return this.fiberProductionService.create(createFiberProductionDto);
  }

  @Get('findall')
  findAll() {
    return this.fiberProductionService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.fiberProductionService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateFiberProductionDto: UpdateFiberProductionDto) {
    return this.fiberProductionService.update(id, updateFiberProductionDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.fiberProductionService.remove(id);
  }
}
