import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { ToDoModule } from './../src/to-do/to-do.module';
import { ToDo } from '../src/to-do/entities/to-do.entity';
import { User } from '../src/user/entities/users.entity';
import { UsersService } from '../src/user/user.service';
import { JwtService } from '@nestjs/jwt';

describe('ToDoController (e2e)', () => {
  let app: INestApplication;
  const jwtToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5ZjY0MTcxLWViMTMtNDVjOC04ZjQ3LTFiYWYwM2IxOTAxZSIsImVtYWlsIjoidXNlcnVzZXJAbWFpbC5jb20iLCJpYXQiOjE2MzU2ODIxNzl9.Ul1yN_mmwvj2sfII_TpcfhV4wNrdH9MlDGwLHEKA7Rk';

  const createToDoPayload = new ToDo();
  createToDoPayload.name = 'Test Todo';
  createToDoPayload.description = 'Test Todo';
  createToDoPayload.dueDate = '2021-10-31T12:40:05.747Z' as any;

  const todoData = createToDoPayload;

  const todoRepository = {
    save: jest.fn().mockResolvedValue(todoData),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ToDoModule,
        // Use the e2e_test database to run the tests
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'ec2-34-250-16-127.eu-west-1.compute.amazonaws.com',
          port: 5432,
          username: 'vnmgochwutdvaf',
          password:
            '2fbc40dddd33de3e7de974de920a44fe63f9d83d2c9c8668e013decaa9149198',
          database: 'd7h80jn20udks',
          autoLoadEntities: true,
          entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
          synchronize: true,
          ssl: true,
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
        }),
      ],
      providers: [
        UsersService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: todoRepository,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  describe('When creating a TODO task with token', () => {
    it('should save a todo and return an object', () => {
      return request(app.getHttpServer())
        .post('/to-do')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(todoData)
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          expect(response.status).toBe(201);
          expect(response.body).toHaveProperty('id');
          expect(response.body).toHaveProperty('name');
          expect(response.body).toHaveProperty('description');
          expect(response.body).toHaveProperty('user');
          expect(response.body).toHaveProperty('dueDate');
          expect(response.body).toHaveProperty('isDeleted');
          expect(response.body).toHaveProperty('status');
          expect(response.body).toHaveProperty('createdAt');
          expect(response.body).toHaveProperty('updatedAt');
        });
    });
  });

  describe('When creating a TODO task without token', () => {
    it('should throw an error if no token is passed', () => {
      return request(app.getHttpServer())
        .post('/to-do')
        .expect('Content-Type', /json/)
        .expect(401)
        .then((response) => {
          expect(response.status).toBe(401);
        });
    });
  });

  describe('Get all todo tasks', () => {
    it('return all todo tasks', () => {
      return request(app.getHttpServer())
        .get('/to-do')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body[0]).toHaveProperty('id');
          expect(response.body[0]).toHaveProperty('name');
          expect(response.body[0]).toHaveProperty('description');
          expect(response.body[0]).toHaveProperty('user');
          expect(response.body[0]).toHaveProperty('dueDate');
          expect(response.body[0]).toHaveProperty('isDeleted');
          expect(response.body[0]).toHaveProperty('status');
          expect(response.body[0]).toHaveProperty('createdAt');
          expect(response.body[0]).toHaveProperty('updatedAt');
        });
    });
  });
});
