import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UsersRepository } from './repositories/users.repository';
@Module({
  imports: [], // outros módulos que serão utilizados
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersRepository],
})
export class UsersModule {}
