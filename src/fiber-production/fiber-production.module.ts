import { Module } from '@nestjs/common';
import { FiberProductionService } from './fiber-production.service';
import { FiberProductionController } from './fiber-production.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FiberProduction, FiberSchema,  } from './schema/fiber-production.schema';
import { Animal, AnimalSchema } from '../animals/schemas/animal.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:FiberProduction.name,schema:FiberSchema},
      {name:Animal.name,schema:AnimalSchema}
    ])
  ],
  controllers: [FiberProductionController],
  providers: [FiberProductionService],
})
export class FiberProductionModule {}
