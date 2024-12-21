import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async findAll() {
    return this.brandRepository.find();
  }

  async findOne(id: string) {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`Marca com ID ${id} não encontrada`);
    }
    return brand;
  }

  async create(name: string) {
    // Verificar se o nome já existe
    const existingBrand = await this.brandRepository.findOne({
      where: { name },
    });
    if (existingBrand) {
      throw new ConflictException(`A marca com o nome '${name}' já existe.`);
    }

    // Criar nova marca
    const newBrand = this.brandRepository.create({ name });
    return this.brandRepository.save(newBrand);
  }

  async remove(id: string) {
    const brand = await this.findOne(id);
    await this.brandRepository.remove(brand);
  }
}
