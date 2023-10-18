import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { Worker, WorkerDocument } from './schemas/worker.schema';
import { Speciality, SpecialityDocument } from '../speciality/schemas/speciality.schema';

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker.name) private readonly workerModel: Model<WorkerDocument>,
    @InjectModel(Speciality.name) private readonly specModel: Model<SpecialityDocument>
  ) {}

  async create(createWorkerDto: CreateWorkerDto) {
    const { speciality_id } = createWorkerDto;

    const spec = await this.specModel.findById(speciality_id);
    if (!spec) throw new BadRequestException('Bunday mutaxassis yo\'q');

    const worker = await this.workerModel.create(createWorkerDto)
    spec.workers.push(worker);
    await spec.save();
    return worker;
  }

  async findAll() {
    const workers = await this.workerModel.find().populate('speciality_id').populate('workerBlocks');

    if (!workers) throw new NotFoundException('WORKERS NOT FOUND');

    return workers;
  }

  findOne(id: string) {
    return this.workerModel.findById(id).populate('speciality_id').populate('workerBlocks');
  }

  async update(id: string, updateWorkerDto: UpdateWorkerDto) {
    const existingWorker = await (await (await this.workerModel.findByIdAndUpdate(id, updateWorkerDto, {new: true}).exec()).populate('speciality_id')).populate('workerBlocks');

    if (!existingWorker) throw new NotFoundException('WORKER NOT FOUND')

    return existingWorker;
  }

  remove(id: string) {
    return this.workerModel.findByIdAndDelete(id);
  }
}
