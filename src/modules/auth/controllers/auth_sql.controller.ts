import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegistrationDTO } from '../dto/registration.dto';
import { Auth_orm } from '../entities/entity/auth.entity';
import { AuthSqlService } from '../services/auth_sql.service';
import { AuthenticationDTO } from '../dto/authentication.dto';
import { TokensDTO } from '../dto/tokens.dto';

@Controller('auth-sql')
export class AuthSqlController {
  constructor(private readonly authSqlService: AuthSqlService) {}

  @Post('registration-sql')
  async userRegistration(
    @Body() registration: RegistrationDTO,
  ): Promise<Auth_orm> {
    const existMail: Auth_orm | null = await this.authSqlService.existMail(
      registration.email,
    );
    if (existMail) {
      throw new HttpException(
        `The ${existMail.email} has already exist!`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.authSqlService.userRegistration(registration);
  }

  @Post('authentication-sql')
  authentication(
    @Body() authentication: AuthenticationDTO,
  ): Promise<TokensDTO | null> {
    return this.authSqlService.authentication(authentication);
  }

  @Post('refresh-sql')
  refresh(@Body() refresh: TokensDTO): Promise<TokensDTO> {
    return this.authSqlService.refresh(refresh);
  }
}
