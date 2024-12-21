import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceController } from './maintenance.controller';
import { Maintenance } from './maintenance.entity';
import { User } from '../users/user.entity';
import { Item } from '../items/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Maintenance, User, Item]), // Registra o repositório Maintenance no TypeORM
  ],
  providers: [MaintenanceService], // Registra o service
  controllers: [MaintenanceController], // Registra o controller
})
export class MaintenanceModule {}
