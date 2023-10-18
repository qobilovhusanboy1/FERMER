import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { RecordOfIlnessService } from './record-of-ilness.service';
import { CreateRecordOfIlnessDto } from './dto/create-record-of-ilness.dto';
import { UpdateRecordOfIlnessDto } from './dto/update-record-of-ilness.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('record-of-ilness')
export class RecordOfIlnessController {
  constructor(private readonly recordOfIlnessService: RecordOfIlnessService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('ilness_photo'))
  create(@Body() createRecordOfIlnessDto: CreateRecordOfIlnessDto,@UploadedFile() ilness_photo:any) {
    return this.recordOfIlnessService.create(createRecordOfIlnessDto,ilness_photo);
  }

  @Get('findall')
  findAll() {
    return this.recordOfIlnessService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.recordOfIlnessService.findOne(id);
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('ilness_photo'))
  update(@Param('id') id: string, @Body() updateRecordOfIlnessDto: UpdateRecordOfIlnessDto,@UploadedFile() ilness_photo:any) {
    return this.recordOfIlnessService.update(id, updateRecordOfIlnessDto,ilness_photo);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.recordOfIlnessService.remove(id);
  }
}
