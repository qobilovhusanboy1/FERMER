import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';

import { WorkerBlockService } from './worker_block.service';
import { CreateWorkerBlockDto } from './dto/create-worker_block.dto';
import { UpdateWorkerBlockDto } from './dto/update-worker_block.dto';

@Controller('worker-block')
export class WorkerBlockController {
  constructor(private readonly workerBlockService: WorkerBlockService) {}

  @Post('create')
  create(@Body() createWorkerBlockDto: CreateWorkerBlockDto) {
    return this.workerBlockService.create(createWorkerBlockDto);
  }

  @Get('findall')
  findAll() {
    return this.workerBlockService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.workerBlockService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateWorkerBlockDto: UpdateWorkerBlockDto) {
    return this.workerBlockService.update(id, updateWorkerBlockDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.workerBlockService.remove(id);
  }
}
