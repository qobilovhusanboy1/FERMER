import { IsString } from "class-validator";

export class CreateSpecialityDto {
    @IsString()
    title: string;

    @IsString()
    description: string;
}
