import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.entity';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Post()
  async create(
    @Body()
    data: {
      name: string;
      id_user: string;
      brand: string;
      type: string;
      model: string;
    },
  ) {
    return this.itemsService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    data: Partial<Item>,
  ) {
    return this.itemsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
