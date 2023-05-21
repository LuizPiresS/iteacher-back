import { ConfigService } from '@nestjs/config';
import { UserConfirmationDTO } from '../dtos/user-confirmation.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly config: ConfigService,
  ) {}

  public async sendUserConfirmation(data: UserConfirmationDTO) {
    const url = `${this.config.get<string>(
      'BASE_URL',
    )}/account-validation/confirm-email/${data.token}/${data.email}`;

    await this.mailerService.sendMail({
      to: data.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Seja bem vindo! iTeacher -  Confirme seu e-mail',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: data.name,
        url,
      },
    });
  }
}
