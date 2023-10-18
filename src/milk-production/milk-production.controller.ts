import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpdateFiberProductionDto } from './dto/update-fiber-production.dto';
import { MilkProductionService } from './milk-production.service';
import { CreateMilkProductionDto } from './dto/create-fiber-production.dto';

@Controller('milk-production')
export class MilkProductionController {
  constructor(private readonly milkProductionService: MilkProductionService) {}

  @Post('create')
  create(@Body() createFiberProductionDto: CreateMilkProductionDto) {
    return this.milkProductionService.create(createFiberProductionDto);
  }

  @Get('findall')
  findAll() {
    return this.milkProductionService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.milkProductionService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateFiberProductionDto: UpdateFiberProductionDto) {
    return this.milkProductionService.update(id, updateFiberProductionDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.milkProductionService.remove(id);
  }
}
