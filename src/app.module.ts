import { JwtAuthGuard } from './auth/guards/jwt-auth/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import config from './config/config';
import { validate } from './config/env.validation';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AccountValidationModule } from './account-validation/account-validation.module';

@Module({
  // ConfigModule deve ser sempre o primeiro modulo a ser importado para que todos os módulos tenha acesso as variáveis de configuração
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true, load: [config] }),
    UsersModule,
    MailModule,
    AuthModule,
    AccountValidationModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useFactory: (ref) => new JwtAuthGuard(ref),
      inject: [Reflector],
    },
  ],
})
export class AppModule {}
