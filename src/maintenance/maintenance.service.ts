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
    description?: string; // Adicionado
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
      description: data.description || null,
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

  // Listar agendamentos de um mecanico
  async getByMechanic(mechanicId: string): Promise<Maintenance[]> {
    // Verificar se o usuário existe e se é um mecânico
    const mechanic = await this.userRepository.findOne({
      where: { id: mechanicId },
    });
    if (!mechanic) {
      throw new NotFoundException(
        `Usuário com ID ${mechanicId} não encontrado.`,
      );
    }

    if (mechanic.role !== 'mecanico') {
      throw new ForbiddenException(
        'Permissão negada. Apenas mecânicos podem acessar este recurso.',
      );
    }

    // Buscar manutenções vinculadas ao mecânico
    const maintenances = await this.maintenanceRepository.find({
      where: { updated_by: mechanicId },
      relations: ['user', 'item'], // Inclui informações relacionadas ao usuário e item
    });

    return maintenances;
  }

  // Alterar o status de um agendamento
  async updateStatus(
    id: string,
    status: MaintenanceStatus,
    userId: string,
  ): Promise<Maintenance> {
    // Verificar se o usuário existe e possui a role necessária
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado.`);
    }

    if (user.role !== 'admin' && user.role !== 'mecanico') {
      throw new ForbiddenException(
        'Permissão negada. Apenas Admin ou Mecânico podem alterar o status.',
      );
    }

    // Verificar se a manutenção existe
    const maintenance = await this.maintenanceRepository.findOne({
      where: { id },
    });
    if (!maintenance) {
      throw new NotFoundException(`Manutenção com ID ${id} não encontrada.`);
    }

    // Validar o status fornecido
    const validStatuses = [
      MaintenanceStatus.Pendente,
      MaintenanceStatus.Aceito,
      MaintenanceStatus.Recusado,
      MaintenanceStatus.EmAtuacao,
      MaintenanceStatus.Finalizado,
    ];
    if (!validStatuses.includes(status)) {
      throw new ForbiddenException(`Status inválido: ${status}`);
    }

    maintenance.status = status;

    if (status === MaintenanceStatus.Aceito) {
      maintenance.accepted_at = new Date(); // Define a data atual
    }

    maintenance.updated_by = userId;

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
