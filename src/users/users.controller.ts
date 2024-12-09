import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Login
   */
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(): string {
    return 'Perfil do usuário protegido por JWT';
  }

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

  // Endpoint para excluir um usuário
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
    await this.usersService.deleteUser(id);
    return { message: `Usuário com ID ${id} foi excluído com sucesso.` };
  }
}
