import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecordsOfFeedingService } from './records_of_feeding.service';
import { CreateRecordsOfFeedingDto } from './dto/create-records_of_feeding.dto';
import { UpdateRecordsOfFeedingDto } from './dto/update-records_of_feeding.dto';

@Controller('records-of-feeding')
export class RecordsOfFeedingController {
  constructor(private readonly recordsOfFeedingService: RecordsOfFeedingService) {}

  @Post('create')
  create(@Body() createRecordsOfFeedingDto: CreateRecordsOfFeedingDto) {
    return this.recordsOfFeedingService.create(createRecordsOfFeedingDto);
  }

  @Get('findall')
  findAll() {
    return this.recordsOfFeedingService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.recordsOfFeedingService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateRecordsOfFeedingDto: UpdateRecordsOfFeedingDto) {
    return this.recordsOfFeedingService.update(id, updateRecordsOfFeedingDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.recordsOfFeedingService.remove(id);
  }
}
