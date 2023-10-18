import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Worker, WorkerSchema } from '../worker/schemas/worker.schema';
import { Animal, AnimalSchema } from '../animals/schemas/animal.schema';
import { VaccinationHistoryService } from './vaccination_history.service';
import { Vaccine, VaccineSchema } from '../vaccine/schemas/vaccine.schema';
import { VaccinationHistoryController } from './vaccination_history.controller';
import { VaccinationHistory, VaccinationHistorySchema } from './schemas/vaccination_history.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: VaccinationHistory.name, schema: VaccinationHistorySchema },
    {name: Animal.name, schema: AnimalSchema},
    {name: Vaccine.name, schema: VaccineSchema},
    {name: Worker.name, schema: WorkerSchema}
  ])],
  controllers: [VaccinationHistoryController],
  providers: [VaccinationHistoryService],
})
export class VaccinationHistoryModule {}