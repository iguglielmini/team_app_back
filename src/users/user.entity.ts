import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
} from 'class-validator';
import { Role } from 'src/enum/role';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
