import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  contacts!: string;

  @OneToMany(() => {
    // Ленивая загрузка класса Student для избежания циклической зависимости
    const StudentEntity = require('./Student.entity');
    return StudentEntity.Student;
  }, (student: any) => student.group)
  students!: any[];
}
