import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';

import { VaccineService } from './vaccine.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';

@Controller('vaccine')
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  @Post('create')
  create(@Body() createVaccineDto: CreateVaccineDto) {
    return this.vaccineService.create(createVaccineDto);
  }

  @Get('findall')
  findAll() {
    return this.vaccineService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.vaccineService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateVaccineDto: UpdateVaccineDto) {
    return this.vaccineService.update(id, updateVaccineDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.vaccineService.remove(id);
  }
}
