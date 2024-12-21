import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeGun } from './type-gun.entity';

@Injectable()
export class TypeGunService {
  constructor(
    @InjectRepository(TypeGun)
    private readonly typeGunRepository: Repository<TypeGun>,
  ) {}

  async findAll() {
    return this.typeGunRepository.find();
  }

  async findOne(id: string) {
    const typeGun = await this.typeGunRepository.findOne({ where: { id } });
    if (!typeGun) {
      throw new NotFoundException(`Tipo de arma com ID ${id} não encontrado`);
    }
    return typeGun;
  }

  async create(nome: string) {
    const existingTypeGun = await this.typeGunRepository.findOne({
      where: { nome },
    });
    if (existingTypeGun) {
      throw new ConflictException(
        `O tipo de arma com o nome '${nome}' já existe.`,
      );
    }

    const newTypeGun = this.typeGunRepository.create({ nome });
    return this.typeGunRepository.save(newTypeGun);
  }

  async remove(id: string) {
    const typeGun = await this.findOne(id);
    return this.typeGunRepository.remove(typeGun);
  }
}
