import { Module } from '@nestjs/common';
import { RecordOfIlnessService } from './record-of-ilness.service';
import { RecordOfIlnessController } from './record-of-ilness.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordOfIlness,RecorOfIlnessSchema } from './entities/record-of-ilness.entity';
import { Animal, AnimalSchema } from '../animals/schemas/animal.schema';
import { Worker, WorkerSchema } from '../worker/schemas/worker.schema';
import { FilesService } from '../files/files.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:RecordOfIlness.name,schema:RecorOfIlnessSchema},
      {name:Animal.name,schema:AnimalSchema},
      {name:Worker.name,schema:WorkerSchema}
    ])
  ],
  controllers: [RecordOfIlnessController],
  providers: [RecordOfIlnessService,FilesService],
})
export class RecordOfIlnessModule {}
