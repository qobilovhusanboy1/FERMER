import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

import { VaccinationHistory } from './schemas/vaccination_history.schema';
import { CreateVaccinationHistoryDto } from './dto/create-vaccination_history.dto';
import { UpdateVaccinationHistoryDto } from './dto/update-vaccination_history.dto';

@Injectable()
export class VaccinationHistoryService {
  constructor(@InjectModel(VaccinationHistory.name) private readonly vaccinationHistoryModel: Model<VaccinationHistory>) {}

  create(createVaccinationHistoryDto: CreateVaccinationHistoryDto) {
    return this.vaccinationHistoryModel.create(createVaccinationHistoryDto);
  }

  findAll() {
    return this.vaccinationHistoryModel.find().populate('animal_id').populate('vaccine_id').populate('worker_id');
  }

  findOne(id: string) {
    return this.vaccinationHistoryModel.findById(id).populate('animal_id').populate('vaccine_id').populate('worker_id');
  }

  async update(id: string, updateVaccinationHistoryDto: UpdateVaccinationHistoryDto) {
    const updateData = await (await (await (await this.vaccinationHistoryModel.findByIdAndUpdate(id, updateVaccinationHistoryDto, {new: true}).exec()).populate('animal_id')).populate('vaccine_id')).populate('worker_id');

    if (!updateData) throw new NotFoundException('Vacctionation history not found');

    return updateData;
  }

  remove(id: string) {
    return this.vaccinationHistoryModel.findByIdAndDelete(id);
  }
}
