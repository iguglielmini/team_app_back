import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Busca todos os usuários
   */
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Registra um novo usuário
   * @param userData Dados do usuário
   * @returns Usuário criado
   */
  async create(userData: Partial<User>): Promise<User> {
    // Verifica se o e-mail já existe no banco
    const existingUser = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new BadRequestException('E-mail já registrado.');
    }

    // Criptografa a senha antes de salvar
    const salt = await bcrypt.genSalt();
    userData.password = await bcrypt.hash(userData.password, salt);

    // Cria e salva o usuário
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }
}
