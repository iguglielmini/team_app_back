import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Informativo } from './informativo.entity';

@Injectable()
export class InformativosService {
  constructor(
    @InjectRepository(Informativo)
    private readonly informativoRepository: Repository<Informativo>,
  ) {}

  async findAll(): Promise<Informativo[]> {
    return this.informativoRepository.find({ relations: ['visualizadoPor'] });
  }

  async findOne(id: number): Promise<Informativo> {
    const informativo = await this.informativoRepository.findOne({
      where: { id },
      relations: ['visualizadoPor'],
    });
    if (!informativo) {
      throw new NotFoundException(`Informativo com ID ${id} não encontrado.`);
    }
    return informativo;
  }

  async create(informativoData: Partial<Informativo>): Promise<Informativo> {
    const informativo = this.informativoRepository.create(informativoData);
    return this.informativoRepository.save(informativo);
  }

  async update(
    id: number,
    informativoData: Partial<Informativo>,
  ): Promise<Informativo> {
    await this.informativoRepository.update(id, informativoData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const result = await this.informativoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Informativo com ID ${id} não encontrado.`);
    }
  }
}
