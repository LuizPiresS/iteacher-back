import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConflictErrorInterceptor } from './common/errors/interceptors/conflict-error.interceptor';
import { DatabaseInterceptor } from './common/errors/interceptors/database-error.interceptor';
import { UserNotFoundErrorInterceptor } from './users/errors/interceptors/user-not-found-error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESCRIPTION)
    .setVersion(process.env.npm_package_version)
    .addTag('iTeacher')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Global pipes
  app.useGlobalPipes(new ValidationPipe());

  // Global interceptors
  app.useGlobalInterceptors(new ConflictErrorInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  app.useGlobalInterceptors(new UserNotFoundErrorInterceptor());

  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
