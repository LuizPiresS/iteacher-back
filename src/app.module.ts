import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import config from './config/config';
import { validate } from './config/env.validation';
import { MailModule } from './mail/mail.module';
@Module({
  // ConfigModule deve ser sempre o primeiro modulo a ser importado para que todos os módulos tenha acesso as variáveis de configuração
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true, load: [config] }),
    UsersModule,
    MailModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
