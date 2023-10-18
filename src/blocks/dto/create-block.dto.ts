import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBlockDto {
    @IsNumber()
    number1: number;

    @IsNotEmpty()
    @IsString()
    description: string;
}