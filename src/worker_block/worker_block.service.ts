import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateWorkerBlockDto } from './dto/create-worker_block.dto';
import { UpdateWorkerBlockDto } from './dto/update-worker_block.dto';
import { Block, BlockDocument } from '../blocks/schemas/block.schema';
import { Worker, WorkerDocument } from '../worker/schemas/worker.schema';
import { WorkerBlock, WorkerBlockDocument } from './schemas/worker_schema.entity';

@Injectable()
export class WorkerBlockService {
  constructor(
    @InjectModel(WorkerBlock.name) private workerBlockModel: Model<WorkerBlockDocument>, 
    @InjectModel(Worker.name) private workerModel: Model<WorkerDocument>, 
    @InjectModel(Block.name) private blockModel: Model<BlockDocument>,
  ){}

  async create(createWorkerBlockDto: CreateWorkerBlockDto) {

    const {worker_id, block_id} = createWorkerBlockDto;

    const worker = await this.workerModel.findById(worker_id);
    if (!worker) throw new BadRequestException('worker not found');
  
    const block = await this.blockModel.findById(block_id);
    if (!block) throw new BadRequestException('block not found');
    
    const workerBlock = await this.workerBlockModel.create(createWorkerBlockDto);

    worker.workerBlocks.push(workerBlock);
    await worker.save();

    block.workerBlocks.push(workerBlock);
    await block.save();

    return workerBlock;
  }

  findAll() {
    return this.workerBlockModel.find().populate('worker_id').populate('block_id');
  }

  findOne(id: string) {
    return this.workerBlockModel.findById(id).populate('worker_id').populate('block_id');
  }

  async update(id: string, updateWorkerBlockDto: UpdateWorkerBlockDto) {
    const worker = await this.workerModel.findById(updateWorkerBlockDto.worker_id);
    if (!worker) throw new NotFoundException('WORKER NOT FOUND');

    const block = await this.blockModel.findById(updateWorkerBlockDto.block_id)
    if (!block) throw new NotFoundException('BLOCK NOT FOUND');

    const updateWorkerBlockID = await (await (await this.workerBlockModel.findByIdAndUpdate(id, updateWorkerBlockDto, {new: true}).exec()).populate('worker_id')).populate('block_id')
    if (!updateWorkerBlockDto) throw new NotFoundException('WORKER BLOCK NOT FOUND')

    return updateWorkerBlockDto;
  }

  remove(id: string) {
    return this.workerBlockModel.findByIdAndDelete(id);
  }
}
