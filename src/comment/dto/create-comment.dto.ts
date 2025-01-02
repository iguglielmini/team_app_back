import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  maintenanceId: string; // ID da manutenção, validado como UUID

  @IsUUID()
  authorId: string; // ID do autor (usuário autenticado ou enviado no body)

  @IsString()
  @MinLength(1, { message: 'O comentário deve ter pelo menos 1 caractere.' })
  content: string;
}
