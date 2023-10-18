import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AnimalsService } from './animals.service';
import { FilesModule } from '../files/files.module';
import { AnimalsController } from './animals.controller';
import { Animal, AnimalSchema } from './schemas/animal.schema';
import { AnimalType, AnimalTypeSchema } from '../animal_type/schemas/animal_type.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Animal.name, schema: AnimalSchema},
    {name: AnimalType.name, schema: AnimalTypeSchema},
  ]),
    FilesModule
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
