import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Animal } from "../../animals/schemas/animal.schema";

export type MilkDocument = HydratedDocument<MilkProduction>;

@Schema({ versionKey: false })
export class MilkProduction {
    @Prop({required: true})
    milk_yield:number

    @Prop({required: true})
    shearing_schedule:number

    @Prop({required: true})
    milk_quality:number

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Animal"})
    animal_id:Animal

}
export const MilkSchema = SchemaFactory.createForClass(MilkProduction)