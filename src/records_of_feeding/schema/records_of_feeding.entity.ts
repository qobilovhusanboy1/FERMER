import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Feeding } from "../../feeding/schemas/feeding.schema";
import mongoose, { HydratedDocument } from "mongoose";

export type RecordsOfFeedingDocument = HydratedDocument<RecordsOfFeeding>;

@Schema({ versionKey: false })
export class RecordsOfFeeding {

    @Prop({required: true})
    date: Date;

    @Prop({required: true})
    consumption: string;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Feeding'})
    feeding_id: Feeding;
}
export const RecordsOfFeedingSchema = SchemaFactory.createForClass(RecordsOfFeeding);