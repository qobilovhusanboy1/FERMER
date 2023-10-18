import { IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateFeedingDto {
    @IsNotEmpty()
    animal_id: mongoose.Schema.Types.ObjectId;
    
    @IsNotEmpty()
    @IsString()
    feeding_schedules: string;

    @IsString()
    @IsNotEmpty()
    feed_type: string;

    @IsString()
    @IsNotEmpty()
    dietary: string;

    @IsNotEmpty()
    worker_id: mongoose.Schema.Types.ObjectId;
}
