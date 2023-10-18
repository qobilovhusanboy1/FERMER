import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Speciality } from "../../speciality/schemas/speciality.schema";
import { WorkerBlock } from "../../worker_block/schemas/worker_schema.entity";

export type WorkerDocument = HydratedDocument<Worker>;

@Schema({ versionKey: false })
export class Worker {
    @Prop({ required: true })
    name: string;

    @Prop()
    experience: number;

    @Prop({ unique: true })
    phone_number: string;

    @Prop({ unique: true })
    username: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Speciality'})
    speciality_id: Speciality;

    @Prop()
    description: string;

    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'WorkerBlock'}] })
    workerBlocks: WorkerBlock[]
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);