import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateFiberProductionDto } from './dto/update-fiber-production.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from '../animals/schemas/animal.schema';
import { Model } from 'mongoose';
import { CreateMilkProductionDto } from './dto/create-fiber-production.dto';
import { MilkDocument, MilkProduction } from './schema/milk-production.schema';


@Injectable()
export class MilkProductionService {
  constructor(
    @InjectModel(MilkProduction.name) private readonly meatModel:Model<MilkDocument>,
    @InjectModel(Animal.name) private readonly animalModel:Model<AnimalDocument>
  ){}

  async create(createFiberProductionDto: CreateMilkProductionDto) {
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

  async update(id: string, updateFiberProductionDto: UpdateFiberProductionDto) {
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
