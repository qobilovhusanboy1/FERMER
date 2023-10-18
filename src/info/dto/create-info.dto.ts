import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import mongoose from "mongoose"

export class CreateInfoDto {

    @IsNotEmpty()
    @IsNumber()
    weight: number

    @IsNotEmpty()
    @IsNumber()
    height: number

    @IsNotEmpty()
    @IsString()
    color: string

    @IsNotEmpty()
    @IsString()
    breed: string

    @IsNotEmpty()
    @IsString()
    gender: string

    @IsNotEmpty()
    birth_or_acquisition:Date

    @IsNotEmpty()
    block_id:mongoose.Schema.Types.ObjectId

    @IsNotEmpty()
    animal_id:mongoose.Schema.Types.ObjectId

    @IsNotEmpty()
    parent_id:mongoose.Schema.Types.ObjectId

}
