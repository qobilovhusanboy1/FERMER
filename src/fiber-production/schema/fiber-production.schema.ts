import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Animal } from "../../animals/schemas/animal.schema";

export type FiberDocument = HydratedDocument<FiberProduction>;

@Schema({ versionKey: false })
export class FiberProduction {
    @Prop({required: true})
    fiber_yield:number

    @Prop({required: true})
    shearing_schedule:number

    @Prop({required: true})
    fiber_quality:number

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Animal"})
    animal_id:Animal

}
export const FiberSchema = SchemaFactory.createForClass(FiberProduction)