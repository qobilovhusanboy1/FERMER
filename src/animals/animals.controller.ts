import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, Put, Patch } from '@nestjs/common';

import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createAnimalDto: CreateAnimalDto, @UploadedFile() image: any) {
    return this.animalsService.create(createAnimalDto, image);
  }

  @Get('findall')
  findAll() {
    return this.animalsService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.animalsService.findOne(id);
  } 

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto, @UploadedFile() image: any) {
    return this.animalsService.update(id, updateAnimalDto, image);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.animalsService.remove(id);
  }
}
