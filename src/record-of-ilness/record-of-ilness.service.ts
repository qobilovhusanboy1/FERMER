import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordOfIlnessDto } from './dto/create-record-of-ilness.dto';
import { UpdateRecordOfIlnessDto } from './dto/update-record-of-ilness.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ROIDocument, RecordOfIlness } from './entities/record-of-ilness.entity';
import { Model } from 'mongoose';
import { Animal, AnimalDocument } from '../animals/schemas/animal.schema';
import { Worker, WorkerDocument } from '../worker/schemas/worker.schema';
import { FilesService } from '../files/files.service';

@Injectable()
export class RecordOfIlnessService {

  constructor(
    @InjectModel(RecordOfIlness.name) private readonly roiModel:Model<ROIDocument>,
    @InjectModel(Animal.name) private readonly animalModel:Model<AnimalDocument>,
    @InjectModel(Worker.name) private readonly workerModel:Model<WorkerDocument>,
    private readonly fileService:FilesService
  ){}

  async create(createRecordOfIlnessDto: CreateRecordOfIlnessDto,ilness_photo:any) {
    const {animal_id,worker_id} = createRecordOfIlnessDto

    const animal = await this.animalModel.findById(animal_id)
    if(!animal) throw new NotFoundException("Animal not found")

    const worker = await this.workerModel.findById(worker_id)
    if(!worker) throw new NotFoundException("Worker not found")

    const file = await this.fileService.createFile(ilness_photo)

    const news = await this.roiModel.create({...createRecordOfIlnessDto,ilness_photo:file})

    const send =  await this.roiModel.findById(news._id).populate('animal_id').populate('worker_id')

    return send
  }

  async findAll() {
    return this.roiModel.find().populate('animal_id').populate('worker_id')
  }

  async findOne(id: string) {
    const is_RIO = await this.roiModel.findById(id).populate('animal_id').populate('worker_id')

    if(!is_RIO) throw new NotFoundException('Not found')
    return is_RIO
  }

  async update(id: string, updateRecordOfIlnessDto: UpdateRecordOfIlnessDto,ilness_photo:any) {
    
    const {animal_id,worker_id} = updateRecordOfIlnessDto

    const animal = await this.animalModel.findById(animal_id)
    if(!animal) throw new NotFoundException("Animal not found")

    const worker = await this.workerModel.findById(worker_id)
    if(!worker) throw new NotFoundException("Worker not found")

    const file = await this.fileService.createFile(ilness_photo)

    const news = await this.roiModel.findByIdAndUpdate(id,{...updateRecordOfIlnessDto,ilness_photo:file},{new:true}).exec()


    const send =  await this.roiModel.findById(id).populate('animal_id').populate('worker_id')

    return send
  }

  async remove(id: string) {
    const is_RIO = await this.roiModel.findById(id)
    if(!is_RIO) throw new NotFoundException("Worker not");

    return is_RIO
  }
}
