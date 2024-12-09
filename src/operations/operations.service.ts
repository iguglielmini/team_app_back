import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operation } from './operation.entity';
import { User } from '../users/user.entity';

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,
  ) {}

  async createOperation(operationData: Partial<Operation>): Promise<Operation> {
    const operation = this.operationRepository.create(operationData);
    return this.operationRepository.save(operation);
  }

  async listOperations(): Promise<Operation[]> {
    return this.operationRepository.find();
  }

  async getOperationDetails(id: number): Promise<Operation> {
    return this.operationRepository.findOne({
      where: { id },
      relations: ['participants'],
    });
  }

  async confirmParticipation(id: number, user: User): Promise<Operation> {
    const operation = await this.getOperationDetails(id);
    operation.participants = [...operation.participants, user];
    return this.operationRepository.save(operation);
  }
}
