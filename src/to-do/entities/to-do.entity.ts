import { User } from '../../user/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TodoStatus {
  in_progress = 'IN-PROGRESS',
  completed = 'COMPLETED',
}

@Entity('to_do')
export class ToDo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 300, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: Object.values(TodoStatus),
    default: TodoStatus.in_progress,
  })
  status: TodoStatus;

  @Column({ type: 'boolean', nullable: true, default: false })
  isDeleted?: boolean;

  @ManyToOne(() => User, (user) => user.todo, {})
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
