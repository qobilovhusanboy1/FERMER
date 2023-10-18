import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Animal } from "../../animals/schemas/animal.schema";

export type AnimalTypeDocument = HydratedDocument<AnimalType>;

@Schema({ versionKey: false })
export class AnimalType {
    @Prop({ required: true })
    type_name: string;

    @Prop({ required: true })
    description: string;
}

export const AnimalTypeSchema = SchemaFactory.createForClass(AnimalType)