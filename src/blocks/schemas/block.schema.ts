import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { WorkerBlock } from "../../worker_block/schemas/worker_schema.entity";

export type BlockDocument = HydratedDocument<Block>; 

@Schema()
export class Block {
    @Prop()
    number1: number;

    @Prop()
    description: string;

    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'WorkerBlock'}] })
    workerBlocks: WorkerBlock[]
}

export const BlockSchema = SchemaFactory.createForClass(Block);