import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsService } from './brands.services';
import { BrandsController } from './brands.controller';
import { Brand } from './brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])], // Registro da entidade Brand
  controllers: [BrandsController], // Controlador para gerenciar as rotas
  providers: [BrandsService], // Serviço que contém a lógica de negócios
  exports: [BrandsService], // Exportar o serviço para uso em outros módulos (se necessário)
})
export class BrandsModule {}
