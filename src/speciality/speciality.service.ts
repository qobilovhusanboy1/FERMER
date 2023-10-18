import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { Speciality, SpecialityDocument } from './schemas/speciality.schema';

@Injectable()
export class SpecialityService {
  constructor(@InjectModel(Speciality.name) private readonly specModel: Model<SpecialityDocument>) {}

  create(createSpecialityDto: CreateSpecialityDto) {
    return this.specModel.create(createSpecialityDto);
  }

  findAll() {
    return this.specModel.find().populate('workers');
  }

  findOne(id: string) {
    return this.specModel.findById(id).populate('workers');
  }

  async update(id: string, updateSpecialityDto: UpdateSpecialityDto) {
    const existingSpeciality = await (await this.specModel.findByIdAndUpdate(id, updateSpecialityDto, {new: true}).exec()).populate('workers')
    
    if(!existingSpeciality) throw new NotFoundException('SPECIALITY NOT FOUND');

    return existingSpeciality;
  }

  remove(id: string) {
    return this.specModel.findByIdAndDelete(id);
  }
}
