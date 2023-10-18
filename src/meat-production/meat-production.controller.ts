import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpdateMeatProductionDto } from './dto/update-meat-production.dto';
import { MeatProductionService } from './meat-production.service';
import { CreateMeatProductionDto } from './dto/create-meat-production.dto';

@Controller('meat-production')
export class MeatProductionController {
  constructor(private readonly meatProductionService: MeatProductionService) {}

  @Post('create')
  create(@Body() createFiberProductionDto: CreateMeatProductionDto) {
    return this.meatProductionService.create(createFiberProductionDto);
  }

  @Get('findall')
  findAll() {
    return this.meatProductionService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.meatProductionService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateFiberProductionDto: UpdateMeatProductionDto) {
    return this.meatProductionService.update(id, updateFiberProductionDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.meatProductionService.remove(id);
  }
}
