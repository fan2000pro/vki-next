import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Student } from './Student.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  contacts!: string;

  @OneToMany(() => Student, (student) => student.group)
  students!: Student[];
}
