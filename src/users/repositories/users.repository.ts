import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUsersRepository } from '../interfaces/users-repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: CreateUserDto): Promise<UsersEntity> {
    const user = await this.prisma.user.create({
      data: data as any,
    });

    return user;
  }

  public async update(data: UpdateUserDto, id: string): Promise<UsersEntity> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  public async updateVerifiedStatusByEmail(email: string) {
    return this.prisma.user.update({
      where: { email: email },
      data: {
        verified: true,
        activated: true,
      },
    });
  }

  public async findByEmail(email: string): Promise<UsersEntity> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  public async findById(id: string): Promise<UsersEntity> {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }
}
