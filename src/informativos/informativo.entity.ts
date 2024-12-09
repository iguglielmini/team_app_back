import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Informativo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column()
  criadoPor: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  imagem: string;

  @Column()
  expiraEm: Date;

  @ManyToMany(() => User)
  @JoinTable()
  visualizadoPor: User[];
}
