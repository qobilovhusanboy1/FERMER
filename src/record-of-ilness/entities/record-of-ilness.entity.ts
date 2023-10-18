import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Animal } from "../../animals/schemas/animal.schema";
import { Worker } from "../../worker/schemas/worker.schema";


export type ROIDocument = HydratedDocument<RecordOfIlness>;


@Schema({ versionKey: false })
export class RecordOfIlness {

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Animal"})
    animal_id:Animal

    @Prop({required: true})
    ilness_type:string

    @Prop({required: true})
    data_diease:Date

    @Prop({required: true})
    medicines:string

    @Prop({required: true})
    data_treatment:Date

    @Prop({required: true})
    ilness_photo:string

    
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Worker"})
    worker_id:Worker
}
export const RecorOfIlnessSchema = SchemaFactory.createForClass(RecordOfIlness)