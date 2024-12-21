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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST, // Ou o IP do servidor, caso esteja remoto
      port: parseInt(process.env.DB_PORT, 10), // Porta padrão do PostgreSQL
      username: process.env.DB_USERNAME, // Usuário do banco
      password: process.env.DB_PASSWORD, // Senha do banco
      database: process.env.DB_NAME, // Nome do banco
      autoLoadEntities: true,
      synchronize: true,
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
