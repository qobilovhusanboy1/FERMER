import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import mongoose from "mongoose"

export class CreateRecordOfIlnessDto {
    @IsNotEmpty()
    animal_id:mongoose.Schema.Types.ObjectId

    @IsString()
    @IsNotEmpty()
    ilness_type:string

    @IsNotEmpty()
    data_diease:Date

    @IsString()
    @IsNotEmpty()
    medicines:string

    @IsNotEmpty()
    data_treatment:Date

    @IsNotEmpty()
    worker_id:mongoose.Schema.Types.ObjectId

}
