import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { BrandsService } from './brands.services';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @Post()
  create(@Body('name') name: string) {
    if (!name) {
      throw new Error('O campo "name" é obrigatório');
    }
    return this.brandsService.create(name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(id);
  }
}
