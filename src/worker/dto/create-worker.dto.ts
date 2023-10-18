import mongoose from "mongoose";
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateWorkerDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNumber()
    experience: number;

    @IsPhoneNumber('UZ')
    phone_number: string;

    
    @IsNotEmpty()
    @IsString()
    username: string;

    speciality_id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    description: string;
}
