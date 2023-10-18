import { Module } from '@nestjs/common';
import { MeatProductionService } from './meat-production.service';
import { MeatProductionController } from './meat-production.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MeatProduction, MeatSchema } from './schema/meat-production.entity';
import { Animal, AnimalSchema } from '../animals/schemas/animal.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:MeatProduction.name,schema:MeatSchema},
      {name:Animal.name,schema:AnimalSchema}
    ])
  ],
  controllers: [MeatProductionController],
  providers: [MeatProductionService],
})
export class MeatProductionModule {}
