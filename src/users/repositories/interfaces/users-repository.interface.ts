import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersEntity } from '../../entities/user.entity';
import { UpdateUserDto } from '../../dto/update-user.dto';

export interface IUsersRepository {
  create(data: CreateUserDto): Promise<UsersEntity>;

  update(data: UpdateUserDto, id: string): Promise<UsersEntity>;

  findByEmail(email: string): Promise<UsersEntity>;

  findById(id: string): Promise<UsersEntity>;

  delete(id: string);
}
