import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';

import { BlocksService } from './blocks.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Post('create')
  create(@Body() createBlockDto: CreateBlockDto) {
    return this.blocksService.create(createBlockDto);
  }

  @Get('findall')
  findAll() {
    return this.blocksService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.blocksService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateBlockDto: UpdateBlockDto) {
    return this.blocksService.update(id, updateBlockDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.blocksService.remove(id);
  }
}
