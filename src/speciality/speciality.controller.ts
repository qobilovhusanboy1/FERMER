import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';

import { SpecialityService } from './speciality.service';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';

@Controller('speciality')
export class SpecialityController {
  constructor(private readonly specialityService: SpecialityService) {}

  @Post('create')
  create(@Body() createSpecialityDto: CreateSpecialityDto) {
    return this.specialityService.create(createSpecialityDto);
  }

  @Get('findall')
  findAll() {
    return this.specialityService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.specialityService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateSpecialityDto: UpdateSpecialityDto) {
    return this.specialityService.update(id, updateSpecialityDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.specialityService.remove(id);
  }
}
