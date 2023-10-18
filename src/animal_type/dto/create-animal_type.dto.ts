import { IsNotEmpty, IsString } from "class-validator";

export class CreateAnimalTypeDto {
    @IsNotEmpty()
    @IsString()
    type_name: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}