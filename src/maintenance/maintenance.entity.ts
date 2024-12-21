import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Item } from 'src/items/item.entity';

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

  @Column({ type: 'timestamp', nullable: true })
  accepted_at: Date;

  @Column({ type: 'uuid', nullable: true })
  updated_by: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
