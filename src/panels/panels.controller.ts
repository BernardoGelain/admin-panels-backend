import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PanelsService } from './panels.service';
import { CreatePanelDto } from './dto/create-panel.dto';
import { UpdatePanelDto } from './dto/update-panel.dto';

@Controller('panels')
export class PanelsController {
  constructor(private readonly panelsService: PanelsService) {}

  @Post('create')
  create(@Body() createPanelDto: CreatePanelDto) {
    return this.panelsService.create(createPanelDto);
  }

  @Get('list')
  findAll() {
    return this.panelsService.findAll();
  }

  @Get('details/:id')
  findOne(@Param('id') id: string) {
    return this.panelsService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updatePanelDto: UpdatePanelDto) {
    return this.panelsService.update(+id, updatePanelDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.panelsService.remove(+id);
  }
}
