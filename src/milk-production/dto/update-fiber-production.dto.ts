import { PartialType } from '@nestjs/mapped-types';
import { CreateMilkProductionDto } from './create-fiber-production.dto';

export class UpdateFiberProductionDto extends PartialType(CreateMilkProductionDto) {}
