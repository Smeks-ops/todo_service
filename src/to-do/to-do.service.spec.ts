import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../user/user.service';
import { Repository } from 'typeorm';
import { ToDo, TodoStatus } from './entities/to-do.entity';
import { ToDoService } from './to-do.service';
import { getRepositoryToken } from '@nestjs/typeorm';

const user = {
  id: '0a94525f-7130-4ba0-b5f6-e4f73d9e0930',
  email: 'Amelie.Mante@hotmail.com',
  username: 'Jamal',
} as any;

describe('ToDoService', () => {
  let service: ToDoService;
  let usersService: UsersService;
  let repo: Repository<ToDo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToDoService,
        {
          provide: getRepositoryToken(ToDo),
          useClass: Repository,
        },
        {
          provide: UsersService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ToDoService>(ToDoService);
    usersService = module.get<UsersService>(UsersService);
    repo = module.get<Repository<ToDo>>(getRepositoryToken(ToDo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTodoList', () => {
    it('should create a to-do list', async () => {
      const result = {
        id: 26,
        name: 'This',
        description: 'That',
        user: {
          id: '52f3ff67-b471-426b-a21f-d703b2750ee5',
          email: 'kaf@mail.com',
          createdAt: '2021-10-27T19:55:56.632Z',
          updatedAt: '2021-10-27T19:55:56.632Z',
        },
        dueDate: '2021-10-27T20:03:37.584Z',
        isDeleted: false,
        status: 'IN-PROGRESS',
        createdAt: '2021-10-27T20:03:51.179Z',
        updatedAt: '2021-10-27T20:03:51.179Z',
      } as any;

      jest.spyOn(usersService, 'findById').mockImplementation(async () => user);
      jest.spyOn(repo, 'save').mockImplementation(async () => result);

      jest.enableAutomock();

      const resultInfo = await service.createTodoList(
        {
          name: 'This',
          description: 'That',
          dueDate: '2021-10-27T20:03:37.584Z' as any,
        },
        user,
      );

      expect(resultInfo).toHaveProperty('id');
      expect(resultInfo).toHaveProperty('name');
      expect(resultInfo).toHaveProperty('description');
      expect(resultInfo).toHaveProperty('user');
      expect(resultInfo).toHaveProperty('dueDate');
      expect(resultInfo).toHaveProperty('isDeleted');
      expect(resultInfo).toHaveProperty('status');
      expect(resultInfo).toHaveProperty('createdAt');
      expect(resultInfo).toHaveProperty('updatedAt');
    });
  });

  describe('updateATodoList', () => {
    it('should update a to-do list', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      const id = 1;

      jest.spyOn(repo, 'update').mockImplementation(async () => result);

      jest.enableAutomock();

      const resultInfo = await service.updateATodoList(id, {
        name: 'This',
        status: TodoStatus.completed,
      });

      expect(resultInfo).toEqual(result);
    });
  });

  describe('removeATodoList', () => {
    it('should remove a to-do list', async () => {
      const result = 'List has been deleted';

      const id = 1;

      jest.spyOn(repo, 'update').mockImplementation(async () => null);

      jest.enableAutomock();

      const resultInfo = await service.removeATodoList(id);

      expect(resultInfo).toEqual(result);
    });
  });
});
