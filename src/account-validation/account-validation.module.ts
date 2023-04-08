import { Module } from '@nestjs/common';
import { AccountValidationService } from './services/account-validation.service';
import { AccountValidationController } from './controllers/account-validation.controller';
import { AccountValidationRepository } from './repositories/account-validation.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from 'src/users/repositories/users.repository';

@Module({
  providers: [
    AccountValidationService,
    AccountValidationRepository,
    PrismaService,
    UsersRepository,
  ],
  controllers: [AccountValidationController],
  exports: [AccountValidationService, AccountValidationRepository],
})
export class AccountValidationModule {}
