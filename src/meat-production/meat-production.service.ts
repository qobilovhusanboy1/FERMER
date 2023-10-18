import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from '../animals/schemas/animal.schema';
import { Model } from 'mongoose';
import { MeatDocument, MeatProduction } from './schema/meat-production.entity';
import { CreateMeatProductionDto } from './dto/create-meat-production.dto';
import { UpdateMeatProductionDto } from './dto/update-meat-production.dto';


@Injectable()
export class MeatProductionService {
  constructor(
    @InjectModel(MeatProduction.name) private readonly meatModel:Model<MeatDocument>,
    @InjectModel(Animal.name) private readonly animalModel:Model<AnimalDocument>
  ){}

  async create(createFiberProductionDto: CreateMeatProductionDto) {
    const  {animal_id} = createFiberProductionDto

    const animal = await this.animalModel.findById(animal_id)

    if(!animal) {
      throw new NotFoundException("Animal not found")
    }

    const new_fiber = await this.meatModel.create(createFiberProductionDto)
    return new_fiber

  }

  async findAll() {
    return this.meatModel.find().populate('animal_id')
  }

  async findOne(id: string) {
    const find_fiber = await this.meatModel.findById(id).populate('animal_id')
    if(!find_fiber){
      throw new NotFoundException('Fiber Not Found')
    }

    return find_fiber
  }

  async update(id: string, updateFiberProductionDto: UpdateMeatProductionDto) {
    const {animal_id} = updateFiberProductionDto

    const find_fiber = await this.meatModel.findById(id).populate('animal_id');

    if(!find_fiber){
      throw new NotFoundException('Fiber Not Found')
    }

    const animal = await this.animalModel.findById(animal_id)

    if(!animal){
      throw new NotFoundException('Animal not Found')
    }

    const is_update = await this.meatModel.findByIdAndUpdate(id,updateFiberProductionDto,{new:true}).exec()

    const update = await this.meatModel.findById(id).populate('animal_id')

    return update
  }

  async remove(id: string) {
    return this.meatModel.findById(id)
  }
}
