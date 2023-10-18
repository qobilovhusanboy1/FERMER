import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { Block, BlockDocument } from './schemas/block.schema';

@Injectable()
export class BlocksService {
  constructor( @InjectModel(Block.name) private blockModel: Model<BlockDocument> ) {}

  async create(createBlockDto: CreateBlockDto) {
    const block = await this.blockModel.findOne({number1: createBlockDto.number1});

    if (block) throw new BadRequestException('BLOCK NUMBER ALEARDY EXISTS');

    const newBlock = await this.blockModel.create(createBlockDto);

    return newBlock;
  }

  findAll() {
    const blocks =  this.blockModel.find().populate('workerBlocks');

    if (!blocks) throw new BadRequestException('BLOCKS NOT FOUND');

    return blocks
  }

  async findOne(id: string) {
    try {
      const block = await this.blockModel.findById(id).populate('workerBlocks');
    
      return block;
    } catch (error) {
      throw new BadRequestException('BLOCK NOT FOUND');
    }
  }

  async update(id: string, updateBlockDto: UpdateBlockDto) {
    const existingBlock = await this.blockModel.findByIdAndUpdate(id, updateBlockDto, {new: true}).exec();

    if (!existingBlock) throw new NotFoundException('BLOCK NOT FOUND');

    return existingBlock;
  }

  remove(id: string) {
    return this.blockModel.findByIdAndDelete(id);
  }
}
