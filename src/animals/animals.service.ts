import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal } from './schemas/animal.schema';
import { Model } from 'mongoose';
import { FilesService } from '../files/files.service';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectModel(Animal.name) private readonly animalModel: Model<Animal>,
    private readonly fileService: FilesService
  ) {}

  async create(createAnimalDto: CreateAnimalDto, image: any) {
    const fileName = await this.fileService.createFile(image);

    const animal = await this.animalModel.create({...createAnimalDto, photo: fileName})

    return animal;
  }

  findAll() {
    return this.animalModel.find().populate('animal_type_id');
  }

  findOne(id: string) {
    return this.animalModel.findById(id).populate('animal_type_id');;
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto, image: any) {
    const fileName = await this.fileService.createFile(image);

    const updateAnimal = await this.animalModel.findByIdAndUpdate(id, {...updateAnimalDto, photo: fileName}, {new: true}).exec();

    return updateAnimal;
  }

  remove(id: string) {
    return this.animalModel.findByIdAndDelete(id);
  }
}
