import { UsersRepository } from '../../users/repositories/users.repository';
import { AccountValidationRepository } from '../repositories/account-validation.repository';
import { Injectable } from '@nestjs/common';

export type CreateEmailTokenInput = {
  token: string;
  email: string;
  userId: string;
};

@Injectable()
export class AccountValidationService {
  constructor(
    private readonly accountValidationRepository: AccountValidationRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async createEmailToken(createEmailTokenInput: CreateEmailTokenInput) {
    const token = this.generateToken();
    return this.accountValidationRepository.createEmailToken({
      ...createEmailTokenInput,
      token,
    });
  }

  public async emailConfirmation(email: string, token: string) {
    const emailToken = await this.accountValidationRepository.findByEmailToken(
      email,
      token,
    );

    if (emailToken.token === token) {
      await this.usersRepository.updateVerifiedStatusByEmail(email);
      await this.accountValidationRepository.updateStatus(emailToken.id);
    }

    return null;
  }

  private generateToken(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
}
