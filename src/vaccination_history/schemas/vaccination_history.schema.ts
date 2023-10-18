import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Worker } from "../../worker/schemas/worker.schema";
import { Animal } from "../../animals/schemas/animal.schema";
import { Vaccine } from "../../vaccine/schemas/vaccine.schema";

export type VaccinationHistoryDocument = HydratedDocument<VaccinationHistory>;

@Schema({ versionKey: false })
export class VaccinationHistory {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal'})
    animal_id: Animal;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vaccine'})
    vaccine_id: Vaccine;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' })
    worker_id: Worker

    @Prop({ required: true })
    vaccinate_date: Date;

    @Prop({ required: true })
    next_vaccinate_date: Date;
}

export const VaccinationHistorySchema = SchemaFactory.createForClass(VaccinationHistory)