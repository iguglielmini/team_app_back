import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maintenance } from './maintenance.entity';
import { User } from '../users/user.entity';
import { Item } from '../items/item.entity';
import { MaintenanceStatus } from '../enum/MaintenanceStatus';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  // Criar um novo agendamento
  async create(data: {
    id_user: string;
    id_item: string;
    scheduled_date: Date;
  }): Promise<Maintenance> {
    // Verificar se o usuário existe
    const user = await this.userRepository.findOne({
      where: { id: data.id_user },
    });
    if (!user) {
      throw new NotFoundException(
        `Usuário com ID ${data.id_user} não encontrado`,
      );
    }

    // Verificar se o item existe
    const item = await this.itemRepository.findOne({
      where: { id: data.id_item },
    });
    if (!item) {
      throw new NotFoundException(
        `Equipamento com ID ${data.id_item} não encontrado`,
      );
    }

    // Criar o agendamento
    const maintenance = this.maintenanceRepository.create({
      user,
      item,
      scheduled_date: data.scheduled_date,
      status: MaintenanceStatus.Pendente,
    });

    return this.maintenanceRepository.save(maintenance);
  }

  // Listar agendamentos de um usuário
  async findByUser(userId: string): Promise<Maintenance[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }

    return this.maintenanceRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'item'],
    });
  }

  // Alterar o status de um agendamento
  async updateStatus(
    id: string,
    status: MaintenanceStatus,
    userId: string,
    userRole: string,
  ): Promise<Maintenance> {
    const maintenance = await this.maintenanceRepository.findOne({
      where: { id },
      relations: ['user', 'item'],
    });

    if (!maintenance) {
      throw new NotFoundException(`Agendamento com ID ${id} não encontrado`);
    }

    // Verificar se o status é válido
    if (!Object.values(MaintenanceStatus).includes(status)) {
      throw new ForbiddenException(`Status inválido: ${status}`);
    }

    // Verificar se o usuário tem permissão para alterar o status
    if (userRole !== 'admin' && userRole !== 'mecanico') {
      throw new ForbiddenException(
        'Apenas usuários com papel Admin ou Mecânico podem alterar o status.',
      );
    }

    // Atualizar o status e registrar quem fez a alteração
    maintenance.status = status;
    maintenance.updated_by = userId;

    // Se o status for "aceito", registrar a data de aceitação
    if (status === MaintenanceStatus.Aceito) {
      maintenance.accepted_at = new Date();
    }

    return this.maintenanceRepository.save(maintenance);
  }

  // Remover um agendamento
  async remove(id: string): Promise<void> {
    const maintenance = await this.maintenanceRepository.findOne({
      where: { id },
    });

    if (!maintenance) {
      throw new NotFoundException(`Agendamento com ID ${id} não encontrado`);
    }

    await this.maintenanceRepository.remove(maintenance);
  }
}
