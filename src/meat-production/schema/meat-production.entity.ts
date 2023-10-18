import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Animal } from "../../animals/schemas/animal.schema";

export type MeatDocument = HydratedDocument<MeatProduction>;

@Schema({ versionKey: false })
export class MeatProduction {

    @Prop({required: true})
    meat_yield:number

    @Prop({required: true})
    slaughter_date:Date

    @Prop({required: true})
    shearing_schedule:number

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Animal"})
    animal_id:Animal

}
export const MeatSchema = SchemaFactory.createForClass(MeatProduction)