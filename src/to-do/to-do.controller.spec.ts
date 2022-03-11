import { Test, TestingModule } from '@nestjs/testing';
import { TodoStatus } from './entities/to-do.entity';
import { ToDoController } from './to-do.controller';
import { ToDoService } from './to-do.service';

describe('ToDoController', () => {
  let controller: ToDoController;
  let service: ToDoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToDoController],
      providers: [
        {
          provide: ToDoService,
          useValue: {
            createTodoList: jest.fn(),
            getTodoList: jest.fn(),
            updateATodoList: jest.fn(),
            removeATodoList: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ToDoController>(ToDoController);
    service = module.get<ToDoService>(ToDoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTodoList', () => {
    it('should create a to-do list', async () => {
      const user = '123456';
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

      const payload = {
        name: 'This',
        description: 'That',
        dueDate: '2021-10-27T20:03:37.584Z' as any,
      };

      jest
        .spyOn(service, 'createTodoList')
        .mockImplementation(async () => result);

      jest.enableAutomock();

      expect(await controller.createTodoList(user, payload)).toEqual(result);
    });
  });

  describe('getTodoLists', () => {
    it('should get all to-do lists', async () => {
      const result = [
        {
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
        },
      ] as any;

      jest.spyOn(service, 'getTodoList').mockImplementation(async () => result);

      jest.enableAutomock();

      expect(await controller.getTodoLists({ offset: 0, limit: 10 })).toEqual(
        result,
      );
    });
  });

  describe('updateATodoList', () => {
    it('should edit a given to-do list', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };
      const id = 1;

      const updatePayload = {
        name: 'string',
        status: TodoStatus.completed,
      };

      jest
        .spyOn(service, 'updateATodoList')
        .mockImplementation(async () => result);

      jest.enableAutomock();

      expect(await controller.updateATodoList(id, updatePayload)).toEqual(
        result,
      );
    });
  });

  describe('removeATodoList', () => {
    it('should delete a to-do list', async () => {
      const result = 'List has been deleted';
      const id = 1;

      jest
        .spyOn(service, 'removeATodoList')
        .mockImplementation(async () => result);

      jest.enableAutomock();

      expect(await controller.removeATodoList(id)).toEqual(result);
    });
  });
});
