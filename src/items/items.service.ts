import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.itemRepository.find({ relations: ['user'] });
  }

  async findOne(id: string) {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['user'], // Inclui o relacionamento
    });

    if (!item) {
      throw new NotFoundException(`Item com ID ${id} não encontrado`);
    }

    return item;
  }

  async create(data: {
    name: string;
    id_user: string;
    brand: string;
    type: string;
    model: string;
  }) {
    // Verificar se o usuário existe
    const user = await this.userRepository.findOne({
      where: { id: data.id_user }, // UUID é string
    });

    if (!user) {
      throw new NotFoundException(
        `Usuário com ID ${data.id_user} não encontrado`,
      );
    }

    // Criar e salvar o item associado ao usuário
    const newItem = this.itemRepository.create({
      ...data,
      user,
    });

    return this.itemRepository.save(newItem);
  }

  async update(id: string, data: Partial<Item>) {
    const item = await this.findOne(id);

    // Atualiza as propriedades do item
    Object.assign(item, data);
    return this.itemRepository.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    return this.itemRepository.remove(item);
  }
}
