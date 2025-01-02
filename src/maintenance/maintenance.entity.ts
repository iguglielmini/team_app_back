import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Item } from 'src/items/item.entity';
import { Comment } from '../comment/comment.entity';

@Entity('maintenances')
export class Maintenance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Item, { onDelete: 'CASCADE' })
  item: Item;

  @Column({ type: 'timestamp' })
  scheduled_date: Date;

  @Column({ default: 'pendente' })
  status: string;

  @Column({ type: 'text', nullable: true }) // Campo opcional
  description?: string;

  @Column({ type: 'timestamp', nullable: true })
  accepted_at: Date;

  @Column({ type: 'uuid', nullable: true })
  updated_by: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
