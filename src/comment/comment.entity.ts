import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Maintenance } from '../maintenance/maintenance.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  author: User;

  @ManyToOne(() => Maintenance, (maintenance) => maintenance.comments, {
    onDelete: 'CASCADE',
  })
  maintenance: Maintenance;

  @CreateDateColumn()
  createdAt: Date;
}
