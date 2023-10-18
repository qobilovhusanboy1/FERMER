import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Block } from "../../blocks/schemas/block.schema";
import { Animal } from "../../animals/schemas/animal.schema";

export type InfoDocument = HydratedDocument<Info>;

@Schema({ versionKey: false })
export class Info {

    @Prop({required: true})
    weight: number;

    @Prop({required: true})
    height: number;

    @Prop({required: true})
    color: string;


    @Prop({required: true})
    breed: string;

    @Prop({required: true})
    gender: string;

    @Prop({required: true})
    birth_or_acquisition:Date

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Block'})
    block_id: Block;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Animal'})
    animal_id: Animal;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Animal'})
    parent_id: Animal;



}
export const InfoSchema = SchemaFactory.createForClass(Info);