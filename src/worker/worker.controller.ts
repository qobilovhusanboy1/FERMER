import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';

import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post('create')
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workerService.create(createWorkerDto);
  }

  @Get('findall')
  findAll() {
    return this.workerService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.workerService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workerService.update(id, updateWorkerDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.workerService.remove(id);
  }
}
