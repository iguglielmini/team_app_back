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
import { MaintenanceModule } from './maintenance/maintenance.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
    MaintenanceModule,
    CommentModule,
  ],
  // controllers: [ModelGunController],
})
export class AppModule {}
