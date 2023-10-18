import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';

import { VaccinationHistoryService } from './vaccination_history.service';
import { CreateVaccinationHistoryDto } from './dto/create-vaccination_history.dto';
import { UpdateVaccinationHistoryDto } from './dto/update-vaccination_history.dto';

@Controller('vaccination-history')
export class VaccinationHistoryController {
  constructor(private readonly vaccinationHistoryService: VaccinationHistoryService) {}

  @Post('create')
  create(@Body() createVaccinationHistoryDto: CreateVaccinationHistoryDto) {
    
    return this.vaccinationHistoryService.create(createVaccinationHistoryDto);
  }

  @Get('findall')
  findAll() {
    return this.vaccinationHistoryService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.vaccinationHistoryService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateVaccinationHistoryDto: UpdateVaccinationHistoryDto) {
    return this.vaccinationHistoryService.update(id, updateVaccinationHistoryDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.vaccinationHistoryService.remove(id);
  }
}
