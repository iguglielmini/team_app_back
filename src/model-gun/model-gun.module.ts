import { Module } from '@nestjs/common';
import { ModelGunService } from './model-gun.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelGun } from './model-gun.entity';
import { ModelGunController } from './model-gun.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ModelGun])],
  controllers: [ModelGunController],
  providers: [ModelGunService],
  exports: [ModelGunService],
})
export class ModelGunModule {}
