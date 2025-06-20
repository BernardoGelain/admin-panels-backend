import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Panel } from './entities/panel.entity';
import { CreatePanelDto } from './dto/create-panel.dto';
import { UpdatePanelDto } from './dto/update-panel.dto';
import { Location } from 'src/locations/entities/location.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PanelsService {
  constructor(
    @InjectRepository(Panel)
    private readonly panelRepository: Repository<Panel>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(dto: CreatePanelDto, user: User) {
    const location = await this.locationRepository.findOne({
      where: { id: dto.locationId },
    });

    if (!location) {
      throw new NotFoundException('Localização não encontrada');
    }

    const panel = this.panelRepository.create({
      name: dto.name,
      groupId: dto.groupId,
      tenantId: user.tenantId,
      location,
    });

    return this.panelRepository.save(panel);
  }

  async findAll(user: User, page = 1, pageSize = 10) {
    const where = user.isSuperuser ? {} : { tenantId: user.tenantId };

    const [items, total] = await this.panelRepository.findAndCount({
      where,
      relations: ['location'],
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { id: 'DESC' },
    });

    return {
      total,
      page,
      pageSize,
      data: items,
    };
  }

  async findOne(id: number, user: User) {
    const panel = await this.panelRepository.findOne({
      where: { id },
      relations: ['location'],
    });

    if (!panel) {
      throw new NotFoundException('Painel não encontrado');
    }

    if (!user.isSuperuser && panel.tenantId !== user.tenantId) {
      throw new ForbiddenException('Acesso negado ao painel');
    }

    return panel;
  }

  async update(id: number, dto: UpdatePanelDto, user: User) {
    const panel = await this.panelRepository.findOne({
      where: { id },
      relations: ['location'],
    });

    if (!panel) {
      throw new NotFoundException('Painel não encontrado');
    }

    if (!user.isSuperuser && panel.tenantId !== user.tenantId) {
      throw new ForbiddenException('Acesso negado ao painel');
    }

    if (dto.locationId) {
      const location = await this.locationRepository.findOneBy({
        id: dto.locationId,
      });

      if (!location) {
        throw new NotFoundException('Nova localização não encontrada');
      }

      panel.location = location;
    }

    Object.assign(panel, dto);
    return this.panelRepository.save(panel);
  }

  async remove(id: number, user: User) {
    const panel = await this.panelRepository.findOneBy({ id });

    if (!panel) {
      throw new NotFoundException('Painel não encontrado');
    }

    if (!user.isSuperuser && panel.tenantId !== user.tenantId) {
      throw new ForbiddenException('Acesso negado ao painel');
    }

    await this.panelRepository.remove(panel);
    return { message: 'Painel removido com sucesso' };
  }
  async getSummary(user: User) {
    const where = user.isSuperuser ? {} : { tenantId: user.tenantId };

    const [onlineCount, offlineCount, total] = await Promise.all([
      this.panelRepository.count({ where: { ...where, online: true } }),
      this.panelRepository.count({ where: { ...where, online: false } }),
      this.panelRepository.count({ where }),
    ]);

    return {
      online: onlineCount,
      offline: offlineCount,
      total,
    };
  }
}
