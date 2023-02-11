import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersRepository } from './repositories/users.repository';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService, UsersRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('#defined', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('#create', () => {
    it('should create new user', async () => {
      const mockedPrismaCreate = (prismaService.user.create = jest
        .fn()
        .mockResolvedValue({
          id: '10f04e88-7b97-419f-9b8e-56c518cf5d8a',
          email: 'random@random.com',
          password:
            '$2b$13$evHEPYU9iFedWtkv7ktuqeu6uVILWYcdABPvc9Fc2zvI2JCaNTbpO',
          firstName: 'Random',
          lastName: 'Random',
          phone: null,
          dateOfBirth: null,
          photoUrl: null,
          addressStreet: null,
          addressCity: null,
          addressState: null,
          addressZip: null,
          addressCountry: null,
          isVerified: false,
          isActive: false,
          createdAt: '2023-02-11T15:29:54.874Z',
          updatedAt: '2023-02-11T15:29:54.874Z',
          deletedAt: null,
        }));

      // const usersRepository = new UsersRepository(prismaService);

      const result = await service.create({
        email: 'random@random.com',
        firstName: 'Random',
        lastName: 'Random',
        password: 'R@aNd0mP@ssw0rd',
      });

      console.log(result);
      expect(result).toEqual({
        id: '10f04e88-7b97-419f-9b8e-56c518cf5d8a',
        email: 'random@random.com',
        firstName: 'Random',
        lastName: 'Random',
      });
    });
  });
});
