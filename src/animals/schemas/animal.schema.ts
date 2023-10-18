import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { AnimalType } from "../../animal_type/schemas/animal_type.schema";

export type AnimalDocument = HydratedDocument<Animal>;

@Schema({ versionKey: false })
export class Animal {
    @Prop({ required: true })
    photo: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'AnimalType'})
    animal_type_id: AnimalType;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal)