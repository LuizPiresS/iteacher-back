import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'randon2@randon.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'R@nd0mP@ssw0rd' })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'Random' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Random' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '53123456789' })
  @IsString()
  @IsPhoneNumber('BR')
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: '06/04/1981' })
  @IsString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiProperty({ example: 'https://teste.com/photo.png' })
  @IsString()
  @IsOptional()
  photoUrl?: string;

  @ApiProperty({ example: 'address street' })
  @IsString()
  @IsOptional()
  addressStreet?: string;

  @ApiProperty({ example: 'address city' })
  @IsString()
  @IsOptional()
  addressCity?: string;

  @ApiProperty({ example: 'address state' })
  @IsString()
  @IsOptional()
  addressState?: string;

  @ApiProperty({ example: '01001-100' })
  @IsString()
  @IsOptional()
  addressZip?: string;

  @ApiProperty({ example: 'Brasil' })
  @IsString()
  @IsOptional()
  addressCountry?: string;
}
