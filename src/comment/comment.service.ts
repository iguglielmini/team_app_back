import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Maintenance } from '../maintenance/maintenance.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { maintenanceId, authorId, content } = createCommentDto;

    // Buscar a manutenção
    const maintenance = await this.maintenanceRepository.findOne({
      where: { id: maintenanceId },
    });

    if (!maintenance) {
      throw new NotFoundException('Solicitação de manutenção não encontrada.');
    }

    // Buscar o autor
    const author = await this.userRepository.findOne({
      where: { id: authorId },
    });

    if (!author) {
      throw new NotFoundException('Autor do comentário não encontrado.');
    }

    // Criar o comentário
    const comment = this.commentRepository.create({
      content,
      maintenance,
      author,
    });

    return this.commentRepository.save(comment);
  }

  async findCommentsByMaintenance(maintenanceId: string): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { maintenance: { id: maintenanceId } },
      order: { createdAt: 'ASC' },
    });
  }

  async deleteComment(commentId: string, user: User): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['author'],
    });

    console.log('Comentário encontrado:', comment);

    if (!comment) {
      throw new NotFoundException('Comentário não encontrado.');
    }

    if (comment.author.id !== user.id) {
      throw new UnauthorizedException(
        'Você só pode excluir seus próprios comentários.',
      );
    }

    await this.commentRepository.remove(comment);
  }
}
