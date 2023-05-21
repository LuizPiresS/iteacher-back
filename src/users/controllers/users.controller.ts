import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllowAny } from 'src/auth/decorators/allow-any.decorator';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth('JWT')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 409,
    description: 'Conflict - email already exists',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - unfilled fields',
  })
  @ApiResponse({
    status: 201,
    description: 'User created',
  })
  @AllowAny()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @ApiResponse({
  //   status: 404,
  //   description: 'Usuário não encontrado',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Lista os dados do usuário',
  // })
  // @Get(':id')
  // profile(@Param('id') id: string) {
  //   return this.usersService.profile(id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
