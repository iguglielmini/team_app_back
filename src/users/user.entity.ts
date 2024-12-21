import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
} from 'class-validator';
import { Role } from 'src/enum/role';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Item } from 'src/items/item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @Column()
  @IsNotEmpty({ message: 'O sobrenome é obrigatório.' })
  surname: string;

  @Column()
  @IsDateString({}, { message: 'Data de nascimento inválida.' })
  dateOfBirth: Date;

  @Column()
  @IsMobilePhone('pt-BR', {}, { message: 'Telefone inválido.' })
  phone: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string;

  @Column()
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password: string;

  @Column()
  @IsEnum(Role, { message: 'Perfil inválido.' })
  role: Role;

  @OneToMany(() => Item, (item) => item.user, { cascade: true })
  items: Item[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
