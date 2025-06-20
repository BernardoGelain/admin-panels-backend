import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PanelsService } from './panels.service';
import { CreatePanelDto } from './dto/create-panel.dto';
import { UpdatePanelDto } from './dto/update-panel.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('panels')
export class PanelsController {
  constructor(private readonly panelsService: PanelsService) {}

  @Post('create')
  create(@Body() dto: CreatePanelDto, @Request() req: { user: User }) {
    return this.panelsService.create(dto, req.user);
  }

  @Get('')
  findAll(
    @Request() req: { user: User },
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ) {
    return this.panelsService.findAll(req.user, +page, +pageSize);
  }

  @Get('details/:id')
  findOne(@Param('id') id: string, @Request() req: { user: User }) {
    return this.panelsService.findOne(+id, req.user);
  }
  @Get('summary')
  getSummary(
    @Request() req: { user: User },
  ): Promise<{ online: number; offline: number; total: number }> {
    return this.panelsService.getSummary(req.user);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePanelDto,
    @Request() req: { user: User },
  ) {
    return this.panelsService.update(+id, dto, req.user);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string, @Request() req: { user: User }) {
    return this.panelsService.remove(+id, req.user);
  }
}
