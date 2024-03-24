import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDTO } from './dto/registration.dto';
import { Auth } from './schema/auth.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async userRegistration(@Body() registration: RegistrationDTO): Promise<Auth> {
    const existMail: RegistrationDTO | null = await this.authService.existMail(
      registration.email,
    );

    if (existMail) {
      throw new HttpException(
        `The ${existMail.email} has already exist!`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.authService.userRegistration(registration);
  }
}
