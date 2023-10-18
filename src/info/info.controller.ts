import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InfoService } from './info.service';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';

@Controller('info')
export class InfoController {
  constructor(
    private readonly infoService: InfoService
  ) {}

  @Post('create')
  create(@Body() createInfoDto: CreateInfoDto) {
    return this.infoService.create(createInfoDto);
  }

  @Get('findall')
  findAll() {
    return this.infoService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.infoService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateInfoDto: UpdateInfoDto) {
    return this.infoService.update(id, updateInfoDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.infoService.remove(id);
  }
}
