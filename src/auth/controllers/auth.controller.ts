import { AuthDto } from './../dtos/auth.dto';
import { LocalAuthGuard } from '../guards/local-auth/local-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../services/auth.service';
import { Controller, Post, UseGuards, Request, Query } from '@nestjs/common';
import { AllowAny } from '../decorators/allow-any.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @AllowAny()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthDto) {
    return this.authService.login(req);
  }

  @Post('refresh')
  @AllowAny()
  async refreshToken(@Query('token') token: string) {
    const tokenToRefresh = token;
    return this.authService.refresh(tokenToRefresh);
  }
}
