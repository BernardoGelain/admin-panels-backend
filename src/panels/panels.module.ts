import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panel } from './entities/panel.entity';
import { Location } from '../locations/entities/location.entity';
import { PanelsService } from './panels.service';
import { PanelsController } from './panels.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Panel, Location])],
  controllers: [PanelsController],
  providers: [PanelsService],
})
export class PanelsModule {}
