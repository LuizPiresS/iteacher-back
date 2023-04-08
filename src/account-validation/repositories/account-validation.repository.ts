import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateEmailTokenInput } from '../services/account-validation.service';

@Injectable()
export class AccountValidationRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createEmailToken(createEmailTokenInput: CreateEmailTokenInput) {
    return this.prisma.emailToken.create({
      data: { ...createEmailTokenInput },
    });
  }

  public async updateStatus(id: number) {
    await this.prisma.emailToken.update({
      where: { id },
      data: {
        verified: true,
      },
    });
  }

  public async findByEmailToken(email: string, token: string) {
    return this.prisma.emailToken.findFirst({
      where: {
        email,
        token,
      },
    });
  }
}
