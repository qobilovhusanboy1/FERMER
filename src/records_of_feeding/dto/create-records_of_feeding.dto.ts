import { IsDate, IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateRecordsOfFeedingDto {

    @IsNotEmpty()
    date: Date;

    @IsString()
    @IsNotEmpty()
    consumption: string;

    @IsNotEmpty()
    feeding_id: mongoose.Schema.Types.ObjectId;

}
