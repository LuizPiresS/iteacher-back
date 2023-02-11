import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersRepository } from './repositories/users.repository';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService, UsersRepository],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('#defined', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('#create', () => {
    test('Should create a new user', async () => {
      const mockedUsersService = (usersService.create = jest
        .fn()
        .mockResolvedValue({
          id: '10f04e88-7b97-419f-9b8e-56c518cf5d8a',
          email: 'random@random.com',
          firstName: 'Random',
          lastName: 'Random',
        }));
      //act

      const result = await controller.create({
        email: 'random@random.com',
        firstName: 'Random',
        lastName: 'Random',
        password: 'R@aNd0mP@ssw0rd',
      });

      console.log(result);

      //assert
      expect(result).toEqual({
        id: '10f04e88-7b97-419f-9b8e-56c518cf5d8a',
        email: 'random@random.com',
        firstName: 'Random',
        lastName: 'Random',
      });
    });
  });
});
