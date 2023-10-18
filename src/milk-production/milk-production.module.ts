import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal, AnimalSchema } from '../animals/schemas/animal.schema';
import { MilkProductionController } from './milk-production.controller';
import { MilkProductionService } from './milk-production.service';
import { MilkProduction, MilkSchema } from './schema/milk-production.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:MilkProduction.name,schema:MilkSchema},
      {name:Animal.name,schema:AnimalSchema}
    ])
  ],
  controllers: [MilkProductionController],
  providers: [MilkProductionService],
})
export class MilkProductionModule {}
