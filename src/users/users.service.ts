import { UserNotFoundError } from './../common/errors/types/user-not-found.error';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from './entities/user.entity';

export type CreateUserResult = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto): Promise<CreateUserResult> {
    const hashedPassword = await this.hashPassword(createUserDto.password);

    const user = await this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersEntityToCreateUserResult(user);
  }

  async findOne(id: string): Promise<UsersEntity> {
    const profile = await this.usersRepository.findById(id);
    if (!profile) {
      throw new UserNotFoundError('User not found');
    }
    return profile;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UsersEntity> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError('User not found');
    }

    return this.usersRepository.update(updateUserDto, id);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 13;
    return await bcrypt.hash(password, saltOrRounds);
  }

  public usersEntityToCreateUserResult(data: UsersEntity): CreateUserResult {
    return {
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    };
  }
}
