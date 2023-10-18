import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VaccineService } from './vaccine.service';
import { VaccineController } from './vaccine.controller';
import { Vaccine, VaccineSchema } from './schemas/vaccine.schema';

@Module({
  imports: [MongooseModule.forFeature([ {name: Vaccine.name, schema: VaccineSchema} ])],
  controllers: [VaccineController],
  providers: [VaccineService],
})
export class VaccineModule {}
