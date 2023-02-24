import { MailService } from './../mail/mail.service';
import { UserNotFoundError } from '../common/errors/types/user-not-found.error';
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

export type UpdateUserResult = {
  email: string;
  firstName: string;
  lastName: string;
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

export type ProfileResult = {
  email: string;
  firstName: string;
  lastName: string;
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
    private readonly usersRepository: UsersRepository,
    private readonly mailService: MailService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<CreateUserResult> {
    const token = this.generateToken();
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const user = await this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      token,
    });

    this.mailService.sendUserConfirmation({
      email: user.email,
      name: user.lastName,
      token,
    });
    return this.usersEntityToCreateUserResult(user);
  }

  public async emailConfirmation(email: string, token: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (user.token === token) {
      await this.usersRepository.updateVerifiedStatusByEmail(email);
    }
  }
  async profile(id: string): Promise<ProfileResult> {
    const profile = await this.usersRepository.findById(id);
    if (!profile) {
      throw new UserNotFoundError('User not found');
    }
    return this.usersEntityToProfileResult(profile);
  }

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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 13;
    return await bcrypt.hash(password, saltOrRounds);
  }

  private generateToken(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
  private usersEntityToCreateUserResult(data: UsersEntity): CreateUserResult {
    return {
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    };
  }

  private usersEntityToUpdateUserResult(data: UsersEntity): UpdateUserResult {
    return {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      photoUrl: data.photoUrl,
      addressStreet: data.addressStreet,
      addressCity: data.addressCity,
      addressState: data.addressState,
      addressZip: data.addressZip,
      addressCountry: data.addressCountry,
      verified: data.verified,
      activated: data.activated,
    };
  }

  private async usersEntityToProfileResult(
    data: UsersEntity,
  ): Promise<ProfileResult> {
    return {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      photoUrl: data.photoUrl,
      addressStreet: data.addressStreet,
      addressCity: data.addressCity,
      addressState: data.addressState,
      addressZip: data.addressZip,
      addressCountry: data.addressCountry,
      verified: data.verified,
      activated: data.activated,
    };
  }
}
