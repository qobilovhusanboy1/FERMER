import mongoose from "mongoose";

export class CreateMilkProductionDto {

    milk_yield:number;

    shearing_schedule:number

    milk_quality:number

    animal_id:mongoose.Schema.Types.ObjectId


}
