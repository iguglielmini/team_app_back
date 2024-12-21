import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ModelGunService } from './model-gun.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ModelGun } from './model-gun.entity';

@Controller('model-gun')
export class ModelGunController {
  constructor(private readonly modelGunService: ModelGunService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os modelos de armas' })
  @ApiResponse({
    status: 200,
    description: 'Lista retornada com sucesso.',
    type: [ModelGun],
  })
  findAll() {
    return this.modelGunService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo modelo de arma' })
  @ApiResponse({
    status: 201,
    description: 'Modelo de arma criado com sucesso.',
    type: ModelGun,
  })
  create(@Body('name') name: string) {
    if (!name) {
      throw new Error('O campo "name" é obrigatório.');
    }
    return this.modelGunService.create(name);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um modelo de arma pelo ID' })
  @ApiResponse({
    status: 204,
    description: 'Tipo de arma deletado com sucesso.',
  })
  remove(@Param('id') id: string) {
    return this.modelGunService.remove(id);
  }
}
