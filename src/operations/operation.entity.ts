import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  location: string;

  @Column('text')
  details: string;

  @Column('text')
  map: string; // URL ou base64 do mapa

  @Column('text')
  objectives: string;

  @Column('text')
  rules: string;

  @Column('text')
  storyline: string;

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];
}
