import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, validateSync, IsString } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  // APP CONFIG
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  APP_PORT: number;

  @IsString()
  BASE_URL: string;

  // SWAGGER CONFIG
  @IsString()
  SWAGGER_TITLE: string;

  @IsString()
  SWAGGER_DESCRIPTION: string;

  // E-MAIL CONFIG
  @IsString()
  MAIL_HOST: string;

  @IsNumber()
  MAIL_PORT: number;

  @IsString()
  MAIL_USER: string;

  @IsString()
  MAIL_PASSWORD: string;

  // DATABASE CONFIG
  @IsString()
  DATABASE_URL: string;

  // JWT CONFIG
  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRES_IN: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
