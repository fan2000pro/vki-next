import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  middleName!: string;

  @Column()
  contacts!: string;

  @Column()
  groupId!: number;

  @ManyToOne(() => {
    // Ленивая загрузка класса Group для избежания циклической зависимости
    const GroupEntity = require('./Group.entity');
    return GroupEntity.Group;
  }, (group: any) => group.students)
  @JoinColumn({ name: 'groupId' })
  group!: any;
}
