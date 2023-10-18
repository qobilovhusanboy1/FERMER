import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AnimalType } from './schemas/animal_type.schema';
import { CreateAnimalTypeDto } from './dto/create-animal_type.dto';
import { UpdateAnimalTypeDto } from './dto/update-animal_type.dto';

@Injectable()
export class AnimalTypeService {
  constructor(@InjectModel(AnimalType.name) private readonly animalTypeModel: Model<AnimalType>) {}

  create(createAnimalTypeDto: CreateAnimalTypeDto) {
    return this.animalTypeModel.create(createAnimalTypeDto);
  }

  findAll() {
    return this.animalTypeModel.find();
  }

  async findOne(id: string) {
    const animal_type = await this.animalTypeModel.findById(id);
    if(!animal_type) {
      return {message:"Animal type not found"}
    }
    return animal_type
  }

  async update(id: string, updateAnimalTypeDto: UpdateAnimalTypeDto) {
    const updateAnimalType = await this.animalTypeModel.findByIdAndUpdate(id, updateAnimalTypeDto, {new: true}).exec();
    console.log(updateAnimalType);
    

    if (!updateAnimalType) throw new NotFoundException('ANIMAL TYPE NOT FOUND');

    return updateAnimalType;
  }

  remove(id: string) {
    return this.animalTypeModel.findByIdAndDelete(id);
  }
}
