import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Info, InfoDocument } from './schema/info.schema';
import { Model } from 'mongoose';
import { Animal, AnimalDocument } from '../animals/schemas/animal.schema';
import { Block, BlockDocument } from '../blocks/schemas/block.schema';

@Injectable()
export class InfoService {

  constructor(
    @InjectModel(Info.name) private readonly infoModel:Model<InfoDocument>,
    @InjectModel(Animal.name) private readonly animalModel:Model<AnimalDocument>,
    @InjectModel(Block.name) private readonly blockModel:Model<BlockDocument>
  ){}

  async create(createInfoDto: CreateInfoDto) {
    const {animal_id,block_id,parent_id} = createInfoDto

    if(animal_id == parent_id){
      throw new BadRequestException("Animal ID and Parend ID are same ")
    }
    const animal = await this.animalModel.findById(animal_id)
    if(!animal){
      throw new NotFoundException('Animal not found')
    }

    const parent = await this.animalModel.findById(parent_id)
    if(!parent){
      throw new NotFoundException('Parent Animal not found')
    }

    const block = await this.blockModel.findById(block_id)
    if(!block){
      throw new NotFoundException('Block not found')
    }

    const info = await this.infoModel.create(createInfoDto)

    return info;
    
  }

  async findAll() {
    const info = await this.infoModel.find().populate('animal_id').populate('parent_id').populate('block_id')
    return info
  }

  async findOne(id: string) {
    const info = await this.infoModel.findById(id).populate('animal_id').populate('parent_id').populate('block_id')
    return info
  }

  async update(id: string, updateInfoDto: UpdateInfoDto) {
    const is_info = await this.infoModel.findById(id)
    if(!is_info){
      throw new NotFoundException('Info not found')
    }

    const info  = await this.infoModel.findByIdAndUpdate(id,updateInfoDto,{new:true}).populate('animal_id').populate('parent_id').populate('block_id')
    return info
  }

  async remove(id: string) {
    const is_info = await this.infoModel.findById(id)
    if(!is_info){
      throw new NotFoundException('Info not found')
    }

    const info  =  await this.infoModel.findByIdAndDelete(id)

    return info

  }
}
