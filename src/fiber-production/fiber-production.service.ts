import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFiberProductionDto } from './dto/create-fiber-production.dto';
import { UpdateFiberProductionDto } from './dto/update-fiber-production.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from '../animals/schemas/animal.schema';
import { Model } from 'mongoose';
import { FiberDocument, FiberProduction } from './schema/fiber-production.schema';


@Injectable()
export class FiberProductionService {
  constructor(
    @InjectModel(FiberProduction.name) private readonly fiberModel:Model<FiberDocument>,
    @InjectModel(Animal.name) private readonly animalModel:Model<AnimalDocument>
  ){}

  async create(createFiberProductionDto: CreateFiberProductionDto) {
    const  {animal_id} = createFiberProductionDto

    const animal = await this.animalModel.findById(animal_id)

    if(!animal) {
      throw new NotFoundException("Animal not found")
    }

    const new_fiber = await this.fiberModel.create(createFiberProductionDto)
    return new_fiber

  }

  async findAll() {
    return this.fiberModel.find().populate('animal_id')
  }

  async findOne(id: string) {
    const find_fiber = await this.fiberModel.findById(id).populate('animal_id')
    if(!find_fiber){
      throw new NotFoundException('Fiber Not Found')
    }

    return find_fiber
  }

  async update(id: string, updateFiberProductionDto: UpdateFiberProductionDto) {
    const {animal_id} = updateFiberProductionDto

    const find_fiber = await this.fiberModel.findById(id).populate('animal_id');

    if(!find_fiber){
      throw new NotFoundException('Fiber Not Found')
    }

    const animal = await this.animalModel.findById(animal_id)

    if(!animal){
      throw new NotFoundException('Animal not Found')
    }

    const is_update = await this.fiberModel.findByIdAndUpdate(id,updateFiberProductionDto,{new:true}).exec()

    const update = await this.fiberModel.findById(id).populate('animal_id')

    return update
  }

  async remove(id: string) {
    return this.fiberModel.findById(id)
  }
}
