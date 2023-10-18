import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { AnimalTypeService } from './animal_type.service';
import { CreateAnimalTypeDto } from './dto/create-animal_type.dto';
import { UpdateAnimalTypeDto } from './dto/update-animal_type.dto';

@Controller('animal-type')
export class AnimalTypeController {
  constructor(private readonly animalTypeService: AnimalTypeService) {}

  @Post('create')
  create(@Body() createAnimalTypeDto: CreateAnimalTypeDto) {
    return this.animalTypeService.create(createAnimalTypeDto);
  }

  @Get('findall')
  findAll() {
    return this.animalTypeService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.animalTypeService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateAnimalTypeDto: UpdateAnimalTypeDto) {
    return this.animalTypeService.update(id, updateAnimalTypeDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.animalTypeService.remove(id);
  }
}
