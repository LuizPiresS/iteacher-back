import { AccountValidationService } from './../account-validation/services/account-validation.service';
import { AccountValidationRepository } from './../account-validation/repositories/account-validation.repository';
import { AccountValidationModule } from './../account-validation/account-validation.module';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UsersRepository } from './repositories/users.repository';
@Module({
  imports: [AccountValidationModule], // outros módulos que serão utilizados
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    UsersRepository,
    AccountValidationService,
    AccountValidationRepository,
  ],
})
export class UsersModule {}
