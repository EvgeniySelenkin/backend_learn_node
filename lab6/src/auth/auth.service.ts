import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/user/create-user.dto';
import { ResponseSignUpDto } from './dto/response-signup.dto';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';
import { ResponseLoginDto } from './dto/response-login.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService,
    private jwtService: JwtService) {}


  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userService.getOneUser(username);
    if (user) {
      const isCorrectPass = await bcrypt.compare(pass, user.password);
      return isCorrectPass ? user : null;
    }
    return null;
  }

  async login(username: string, pass: string): Promise<ResponseLoginDto> {
    const user = await this.validateUser(username, pass);
    if (user) {
      const payload = { username: user.username, sub: user.id };
      return {
        jwtToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async registration(dto: CreateUserDto): Promise<ResponseSignUpDto> {
    const candidate = await this.userService.getOneUser(dto.username);
    if (candidate) {
      throw new BadRequestException(
        `this username is already taken`,
      );
    }

    const newUser = await this.userService.createUser(dto);
    const { jwtToken } = await this.login(newUser.username, newUser.password);

    return {
      jwtToken,
      user: plainToInstance(User, newUser),
    };
  }

}
