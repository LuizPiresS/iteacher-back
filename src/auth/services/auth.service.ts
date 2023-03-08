import { UsersService } from '../../users/services/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenProps } from './../interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validadeUser(userEmail: string, userPassword: string) {
    const user = await this.usersService.findByEmail(userEmail);

    if (user) {
      const passwordTrue = await bcrypt.compare(userPassword, user.password);

      if (passwordTrue) {
        const { id, firstName, email } = user;
        return { id, firstName, email };
      }
    }

    return null;
  }

  public async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  public async refresh(token: string) {
    try {
      const tokenDecode = await this.jwtService.verifyAsync(token);
      const payload = {
        email: tokenDecode.email,
        sub: tokenDecode.sub,
      } as TokenProps;
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    }
  }
}
