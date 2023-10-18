import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AnimalTypeService } from './animal_type.service';
import { AnimalTypeController } from './animal_type.controller';
import { AnimalType, AnimalTypeSchema } from './schemas/animal_type.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: AnimalType.name, schema: AnimalTypeSchema }])],
  controllers: [AnimalTypeController],
  providers: [AnimalTypeService],
})
export class AnimalTypeModule {}
