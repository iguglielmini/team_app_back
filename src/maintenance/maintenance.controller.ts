import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { Maintenance } from './maintenance.entity';
import { MaintenanceStatus } from '../enum/MaintenanceStatus';

@Controller('maintenances')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  // Criar um novo agendamento de manutenção
  @Post()
  async create(
    @Body()
    data: {
      id_user: string;
      id_item: string;
      scheduled_date: Date;
      description?: string;
    },
  ): Promise<Maintenance> {
    return this.maintenanceService.create(data);
  }

  // Listar agendamentos por usuário
  @Get()
  async findByUser(@Query('user_id') userId: string): Promise<Maintenance[]> {
    return this.maintenanceService.findByUser(userId);
  }

  // Listar agendamentos por mecanico
  @Get('mechanic/:id')
  async getByMechanic(@Param('id') mechanicId: string) {
    return this.maintenanceService.getByMechanic(mechanicId);
  }

  // Alterar o status de um agendamento
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body()
    body: {
      status: MaintenanceStatus; // Enum para garantir valores válidos
      userId: string; // Apenas o ID do usuário que está alterando o status
    },
  ): Promise<Maintenance> {
    const { status, userId } = body;
    return this.maintenanceService.updateStatus(id, status, userId);
  }

  // Deletar um agendamento
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.maintenanceService.remove(id);
  }
}
