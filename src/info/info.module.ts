import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal, AnimalSchema } from '../animals/schemas/animal.schema';
import { Block, BlockSchema } from '../blocks/schemas/block.schema';
import { Info, InfoSchema } from './schema/info.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:Info.name,schema:InfoSchema},
      {name:Animal.name,schema:AnimalSchema},
      {name:Block.name,schema:BlockSchema},
    ])
  ],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
