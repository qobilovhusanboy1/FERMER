import { PartialType } from '@nestjs/mapped-types';
import { CreateRecordOfIlnessDto } from './create-record-of-ilness.dto';

export class UpdateRecordOfIlnessDto extends PartialType(CreateRecordOfIlnessDto) {}
