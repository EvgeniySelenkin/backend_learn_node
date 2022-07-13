import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/create-user.dto';

import { ResponseLoginDto } from './dto/response-login.dto';
import { ResponseSignUpDto } from './dto/response-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signIn')
  async login(@Body() body): Promise<ResponseLoginDto> {
    return this.authService.login(body.username, body.password);
  }

  @Post('signUp')
  async registration(@Body() dto: CreateUserDto): Promise<ResponseSignUpDto> {
    return this.authService.registration(dto);
  }
}
