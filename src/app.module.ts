import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OperationsModule } from './operations/operations.module';
import { AuthModule } from './auth/auth.module';
import { InformativosModule } from './informativos/informativos.module';
import { BrandsModule } from './brands/brands.module';
import { TypeGunModule } from './type-gun/type-gun.module';
import { ModelGunController } from './model-gun/model-gun.controller';
import { ModelGunModule } from './model-gun/model-gun.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Ou o IP do servidor, caso esteja remoto
      port: 5432, // Porta padrão do PostgreSQL
      username: 'postgres', // Usuário do banco
      password: '17a105314a', // Sua senha
      database: 'airsoftdb', // Nome do banco de dados
      autoLoadEntities: true, // Carrega automaticamente as entidades
      synchronize: true, // Atualiza o esquema automaticamente (não usar em produção)
    }),
    UsersModule,
    OperationsModule,
    AuthModule,
    InformativosModule,
    BrandsModule,
    TypeGunModule,
    ModelGunModule,
    ItemsModule,
  ],
  controllers: [ModelGunController],
})
export class AppModule {}
