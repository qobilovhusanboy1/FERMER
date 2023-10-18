import { IsNotEmpty, IsString } from "class-validator";

export class CreateVaccineDto {
    @IsNotEmpty()
    @IsString()
    vaccine_type: string;

    @IsNotEmpty()
    @IsString()
    vaccine_name: string;
}