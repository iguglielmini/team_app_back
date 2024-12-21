import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { TypeGunService } from './type-gun.service';

@Controller('type-guns')
export class TypeGunController {
  constructor(private readonly typeGunService: TypeGunService) {}

  @Get()
  findAll() {
    return this.typeGunService.findAll();
  }

  @Post()
  create(@Body('nome') nome: string) {
    if (!nome) {
      throw new Error('O campo "nome" é obrigatório.');
    }
    return this.typeGunService.create(nome);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeGunService.remove(id);
  }
}
