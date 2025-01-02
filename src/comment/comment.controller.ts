import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  Delete,
  Req,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('maintenance/:maintenanceId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async addComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @Get()
  async getComments(@Param('maintenanceId') maintenanceId: string) {
    return this.commentService.findCommentsByMaintenance(maintenanceId);
  }

  @Delete(':commentId')
  @UseGuards(AuthGuard('jwt')) // Certifica-se de que apenas usuários autenticados podem acessar
  async deleteComment(
    @Param('commentId') commentId: string,
    @Req() req: Request,
  ) {
    const user = req.user; // Usuário autenticado deve ser adicionado aqui pelo middleware de autenticação
    console.log('Usuário autenticado:', user); // Adicione este log para depuração
    return this.commentService.deleteComment(commentId, user);
  }
}
