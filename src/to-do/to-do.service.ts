import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { ToDo, TodoStatus } from './entities/to-do.entity';
import { UsersService } from '../user/user.service';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDo)
    private todoRepository: Repository<ToDo>,
    private usersService: UsersService,
  ) {}

  async createTodoList(
    createToDoDto: CreateToDoDto,
    user: string,
  ): Promise<ToDo> {
    const userInfo = await this.usersService.findById(user);
    const todoObject = {
      ...createToDoDto,
      user: userInfo,
    };
    return this.todoRepository.save(todoObject);
  }

  async getTodoList(offset: number, limit: number, sort: TodoStatus) {
    const query = await this.todoRepository
      .createQueryBuilder('todo')
      .where('todo.isDeleted is false')
      .leftJoinAndSelect('todo.user', 'user')
      .skip(offset)
      .take(limit);

    if (sort) {
      query.andWhere('todo.status =:status', { status: sort });
    }
    return query.getMany();
  }

  async updateATodoList(id: number, updateToDoDto: UpdateToDoDto) {
    return this.todoRepository.update(id, {
      name: updateToDoDto.name,
      status: updateToDoDto.status,
    });
  }

  async removeATodoList(id: number) {
    await this.todoRepository.update(id, {
      isDeleted: true,
    });
    return 'List has been deleted';
  }
}
