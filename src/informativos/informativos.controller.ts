import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { InformativosService } from './informativos.service';
import { Informativo } from './informativo.entity';

@Controller('informativos')
export class InformativosController {
  constructor(private readonly informativosService: InformativosService) {}

  @Get()
  findAll(): Promise<Informativo[]> {
    return this.informativosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Informativo> {
    return this.informativosService.findOne(id);
  }

  @Post()
  create(@Body() informativoData: Partial<Informativo>): Promise<Informativo> {
    return this.informativosService.create(informativoData);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() informativoData: Partial<Informativo>,
  ): Promise<Informativo> {
    return this.informativosService.update(id, informativoData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.informativosService.delete(id);
  }
}
