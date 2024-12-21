import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeGun } from './type-gun.entity';
import { TypeGunController } from './type-gun.controller';
import { TypeGunService } from './type-gun.service';

@Module({
  imports: [TypeOrmModule.forFeature([TypeGun])],
  controllers: [TypeGunController],
  providers: [TypeGunService],
})
export class TypeGunModule {}
