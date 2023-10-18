import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordsOfFeedingDto } from './dto/create-records_of_feeding.dto';
import { UpdateRecordsOfFeedingDto } from './dto/update-records_of_feeding.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RecordsOfFeeding, RecordsOfFeedingDocument } from './schema/records_of_feeding.entity';
import { Feeding, FeedingDocument } from '../feeding/schemas/feeding.schema';
import { Model } from 'mongoose';

@Injectable()
export class RecordsOfFeedingService {
  constructor(
    @InjectModel(RecordsOfFeeding.name) private readonly recOfFedgModel: Model<RecordsOfFeedingDocument>,
    @InjectModel(Feeding.name) private readonly feedingModel:Model<FeedingDocument>
  ){}

  async create(createRecordsOfFeedingDto: CreateRecordsOfFeedingDto) {
    const {feeding_id } = createRecordsOfFeedingDto

    const feeding = await this.feedingModel.findById(feeding_id)
    

    if(!feeding){
      throw new NotFoundException("Feeding not found")
    }
    
    const records_of_feeding = await this.recOfFedgModel.create(createRecordsOfFeedingDto)

    return records_of_feeding
  }

  async findAll() {
    const records = await this.recOfFedgModel.find().populate('feeding_id')
    return records
  }

  async findOne(id: string) {
    const records_of_feeding = await this.recOfFedgModel.findById(id).populate('feeding_id')
    return records_of_feeding
  }

  async update(id: string, updateRecordsOfFeedingDto: UpdateRecordsOfFeedingDto) {
    const records_of_feeding = await this.recOfFedgModel.findById(id)

    if(!records_of_feeding){
      throw new NotFoundException("Records of Feeding not found")
    }

    const updated =  (await this.recOfFedgModel.findByIdAndUpdate(id,updateRecordsOfFeedingDto,{new:true}).exec()).populate('feeding_id')

    return updated

  }

  async remove(id: string) {
    return this.recOfFedgModel.findByIdAndDelete(id)
  }
}
