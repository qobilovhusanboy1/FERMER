import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Vaccine } from './schemas/vaccine.schema';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';

@Injectable()
export class VaccineService {
  constructor(@InjectModel(Vaccine.name) private readonly vaccineModel: Model<Vaccine>) {}

  create(createVaccineDto: CreateVaccineDto) {
    return this.vaccineModel.create(createVaccineDto);
  }

  findAll() {
    return this.vaccineModel.find();
  }

  findOne(id: string) {
    return this.vaccineModel.findById(id);
  }

  async update(id: string, updateVaccineDto: UpdateVaccineDto) {
    const updateVaccine = await this.vaccineModel.findByIdAndUpdate(id, updateVaccineDto, {new: true}).exec();

    if (!updateVaccine) throw new NotFoundException('VACCINE NOT FOUND')

    return updateVaccine;
  }

  remove(id: string) {
    return this.vaccineModel.findByIdAndDelete(id);
  }
}
