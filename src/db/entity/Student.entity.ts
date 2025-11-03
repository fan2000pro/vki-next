import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Group } from './Group.entity';

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

  @ManyToOne(() => Group, (group) => group.students)
  @JoinColumn({ name: 'groupId' })
  group!: Group;
}
