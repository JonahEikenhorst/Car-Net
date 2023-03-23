//
import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { Token, UserCredentials } from '@car-net/interfaces';

import { AuthService } from './auth.service';
import { Identity } from './identity.schema';
import { User } from '../user/user.schema';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() credentials: Partial<Identity>) {
    try {
      await this.authService.registerUser(
        credentials.username,
        credentials.hash,
        credentials.email
      );

      return await this.authService.createUser(
        credentials.username,
        credentials.email
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('login')
  
  async login(@Body() credentials: Partial<Identity>) {
    try {
      return {
        token: await this.authService.generateToken(
          credentials.email,
          credentials.hash
        ),
      };
    } catch (e) {
      throw new HttpException('Invalid credentials', e);
      
    }
  }
}

