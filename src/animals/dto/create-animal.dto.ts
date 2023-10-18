import { IsString } from "class-validator";

export class CreateAnimalDto {
    @IsString()
    animal_type_id: string;
}