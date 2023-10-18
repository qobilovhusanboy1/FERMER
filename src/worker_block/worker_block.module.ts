import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WorkerBlockService } from './worker_block.service';
import { WorkerBlockController } from './worker_block.controller';
import { Block, BlockSchema } from '../blocks/schemas/block.schema';
import { WorkerSchema , Worker} from '../worker/schemas/worker.schema';
import { WorkerBlock, WorkerBlockSchema } from './schemas/worker_schema.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: WorkerBlock.name, schema: WorkerBlockSchema},
      {name: Worker.name, schema: WorkerSchema},
      {name: Block.name, schema: BlockSchema}
    ])
  ],
  controllers: [WorkerBlockController],
  providers: [WorkerBlockService],
})
export class WorkerBlockModule {}
