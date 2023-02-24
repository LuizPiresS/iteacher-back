import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email that will be used to login',
    example: 'random@random.com',
  })
  @IsString()
  @IsEmail()
  public readonly email: string;

  @ApiProperty({
    description:
      'The password must contain at least one uppercase letter, one special character and one number and be made up of at least 8 characters.',
    example: 'R@nd0mP@ssw0rd',
  })
  @IsString()
  @IsNotEmpty()
  public password: string;

  @ApiProperty({ description: 'First name', example: 'Random' })
  @IsString()
  public readonly firstName: string;

  @ApiProperty({ description: 'Last name', example: 'Random' })
  @IsString()
  public readonly lastName: string;

  @ApiProperty({
    description: 'roles to new user',
    example: { roles: ['aluno'] },
  })
  public readonly roles: Prisma.JsonValue;

  @IsString()
  @IsOptional()
  public readonly token: string;
}
