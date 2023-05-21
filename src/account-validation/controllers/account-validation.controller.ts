import { AccountValidationService } from './../services/account-validation.service';
import { Controller, Get, Param } from '@nestjs/common';
import { AllowAny } from 'src/auth/decorators/allow-any.decorator';

@Controller('account-validation')
export class AccountValidationController {
  constructor(
    private readonly accountValidationService: AccountValidationService,
  ) {}

  @AllowAny()
  @Get('confirm-email/:token/:email')
  public async emailConfirmation(
    @Param('email') email: string,
    @Param('token') token: string,
  ) {
    await this.accountValidationService.emailConfirmation(email, token);
  }
}
