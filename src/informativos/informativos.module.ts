import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformativosService } from './informativos.service';
import { InformativosController } from './informativos.controller';
import { Informativo } from './informativo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Informativo])],
  providers: [InformativosService],
  controllers: [InformativosController],
})
export class InformativosModule {}
