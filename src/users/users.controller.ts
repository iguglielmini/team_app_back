import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Lista todos os usuários
   */
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   * Registra um novo usuário
   * @param userData Dados do usuário
   */
  @Post('register')
  async register(@Body() userData: Partial<User>): Promise<User> {
    try {
      return await this.usersService.create(userData);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Erro ao registrar o usuário.');
    }
  }
}
