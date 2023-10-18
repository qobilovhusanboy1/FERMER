import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feeding, FeedingDocument } from './schemas/feeding.schema';
import { Animal, AnimalDocument } from '../animals/schemas/animal.schema';
import { Worker, WorkerDocument } from '../worker/schemas/worker.schema';

@Injectable()
export class FeedingService {
  constructor(
    @InjectModel(Feeding.name) private readonly feedingModel:Model<FeedingDocument>,
    @InjectModel(Animal.name) private readonly animalModel:Model<AnimalDocument>,
    @InjectModel(Worker.name) private readonly workerModel:Model<WorkerDocument>
  ){}

  async create(createFeedingDto: CreateFeedingDto) {
    const {animal_id,worker_id} =  createFeedingDto

    const animal = await this.animalModel.findById(animal_id)

    if(!animal) {
      throw new BadRequestException("Animal not found")
    }

    const worker = await this.workerModel.findById(worker_id)

    if(!worker) {
      throw new BadRequestException("Worker not found")
    }
    const feeding = await this.feedingModel.create(createFeedingDto)

    return feeding
    
  }

  async findAll() {
    const feeding = await this.feedingModel.find().populate('animal_id').populate('worker_id');
    
    if (!feeding) throw new NotFoundException('FEEDINGS NOT FOUND');

    return feeding
  }

  async findOne(id: string) {
    const feeding_one = await this.feedingModel.findById(id).populate('animal_id').populate('worker_id')

    if(!feeding_one){
      throw new NotFoundException('FEEDING NOT FOUND')
    }

    return feeding_one

  }

  

  async update(id: string, updateFeedingDto: UpdateFeedingDto) {
    const is_feeding = await this.feedingModel.findById(id).populate('animal_id').populate('worker_id')

    if(!is_feeding){
      throw new NotFoundException('FEEDING NOT FOUND')
    }

    const updated = await this.feedingModel.findByIdAndUpdate(id,updateFeedingDto,{new:true}).exec()

    const send = await this.feedingModel.findById(id).populate('animal_id').populate('worker_id')

    return send

  }

  async remove(id: string) {
    return this.feedingModel.findByIdAndDelete(id)
  }
}
