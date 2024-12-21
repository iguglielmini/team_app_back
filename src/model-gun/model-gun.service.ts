import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ModelGun } from './model-gun.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ModelGunService {
  constructor(
    @InjectRepository(ModelGun)
    private readonly modelGunRepository: Repository<ModelGun>,
  ) {}

  async findAll() {
    return this.modelGunRepository.find();
  }

  async findOne(id: string) {
    const brand = await this.modelGunRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`Marca com ID ${id} não encontrada`);
    }
    return brand;
  }

  async create(name: string) {
    // Verificar se o nome já existe
    const existingBrand = await this.modelGunRepository.findOne({
      where: { name },
    });
    if (existingBrand) {
      throw new ConflictException(`A marca com o nome '${name}' já existe.`);
    }

    // Criar nova marca
    const newBrand = this.modelGunRepository.create({ name });
    return this.modelGunRepository.save(newBrand);
  }

  async remove(id: string) {
    const brand = await this.findOne(id);
    await this.modelGunRepository.remove(brand);
  }
}
