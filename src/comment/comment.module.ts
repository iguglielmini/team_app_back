import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Maintenance } from '../maintenance/maintenance.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Maintenance, User])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
