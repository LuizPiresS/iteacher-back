import { AccountValidationService } from './../../account-validation/services/account-validation.service';
import { MailService } from '../../mail/services/mail.service';
import { UserNotFoundError } from '../../common/errors/types/user-not-found.error';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '../entities/user.entity';

export type CreateUserResult = {
  id: string;
  email: string;
  fullName: string;
};

export type UpdateUserResult = {
  email: string;
  fullName: string;
  verified: boolean;
  activated: boolean;
};

export type ProfileResult = {
  email: string;
  fullName: string;
  phone: string;
  dateOfBirth: string;
  photoUrl: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  addressCountry: string;
  verified: boolean;
  activated: boolean;
};
@Injectable()
export class UsersService {
  constructor(
    // @Inject('IUserRepository')
    private readonly usersRepository: UsersRepository,

    private readonly accountValidationService: AccountValidationService,

    private readonly mailService: MailService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<CreateUserResult> {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const user = await this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const token = await this.accountValidationService.createEmailToken({
      email: user.email,
      token: '',
      userId: user.id,
    });

    await this.mailService.sendUserConfirmation({
      email: user.email,
      name: user.fullName,
      token: token.token,
    });
    return this.usersEntityToCreateUserResult(user);
  }

  // async profile(id: string): Promise<ProfileResult> {
  //   const profile = await this.usersRepository.findById(id);
  //   if (!profile) {
  //     throw new UserNotFoundError('User not found');
  //   }
  //   return this.usersEntityToProfileResult(profile);
  // }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResult> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError('User not found');
    }

    const hashedPassword = await this.hashPassword(updateUserDto.password);

    const updatedUser = await this.usersRepository.update(
      { ...updateUserDto, password: hashedPassword },
      id,
    );

    return this.usersEntityToUpdateUserResult(updatedUser);
  }

  public async remove(id: string) {
    return this.usersRepository.delete(id);
  }

  public async findByEmail(email: string): Promise<UsersEntity> {
    return this.usersRepository.findByEmail(email);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 13;
    return await bcrypt.hash(password, saltOrRounds);
  }

  private usersEntityToCreateUserResult(data: UsersEntity): CreateUserResult {
    return {
      id: data.id,
      email: data.email,
      fullName: data.fullName,
    };
  }

  private usersEntityToUpdateUserResult(data: UsersEntity): UpdateUserResult {
    return {
      email: data.email,
      fullName: data.fullName,
      verified: data.verified,
      activated: data.activated,
    };
  }

  // private async usersEntityToProfileResult(
  //   data: UsersEntity,
  // ): Promise<ProfileResult> {
  //   return {
  //     email: data.email,
  //     fullName: data.fullName,
  //     verified: data.verified,
  //     activated: data.activated,
  //   };
  // }
}
