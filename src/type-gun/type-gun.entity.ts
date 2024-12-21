import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('type_guns')
export class TypeGun {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nome: string;
}
