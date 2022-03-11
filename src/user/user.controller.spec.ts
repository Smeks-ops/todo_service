import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user and return a token', async () => {
      const result = {
        access_token: 'eyJhbGciOiJIUzI',
      };

      const payload = {
        email: 'test@mail.com',
        password: 'test_password',
      };

      jest.spyOn(service, 'createUser').mockImplementation(async () => result);

      jest.enableAutomock();

      expect(await controller.createUser(payload)).toEqual(result);
    });
  });
});
