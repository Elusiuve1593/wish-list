import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Auth_orm } from '../entities/entity/auth.entity';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { RegistrationDTO } from '../dto/registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { AuthenticationDTO } from '../dto/authentication.dto';
import { TokensDTO } from '../dto/tokens.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthSqlService {
  constructor(
    @InjectRepository(Auth_orm)
    private readonly authRepository: Repository<Auth_orm>,
    private readonly bcrypt: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async userRegistration(registration: RegistrationDTO): Promise<Auth_orm> {
    const hashedPassword = await this.bcrypt.hashPassword(
      registration.password,
    );

    const userRegistration = new Auth_orm({
      ...registration,
      password: hashedPassword,
    });
    const savedUser = await this.authRepository.save(userRegistration);

    return plainToClass(Auth_orm, savedUser);
  }

  existMail(email: string): Promise<Auth_orm | null> {
    return this.authRepository.findOne({ where: { email } });
  }

  async authentication({
    email,
    password,
  }: AuthenticationDTO): Promise<TokensDTO | null> {
    const user = await this.authRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException(`User with ${email} is not found`);

    const comparePassword = await this.bcrypt.comparePassword(
      password,
      user.password,
    );
    if (!comparePassword) throw new UnauthorizedException('Incorrect password');

    const payload = { sub: user.id, userName: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '5d',
      }),
    };
  }

  async refresh({ refresh_token }: TokensDTO): Promise<TokensDTO> {
    try {
      const decodeRefreshToken: { sub: string } =
        await this.jwtService.verifyAsync(refresh_token);

      const user = await this.authRepository.findOne({
        where: { id: +decodeRefreshToken.sub },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const payload = { sub: user.id, userName: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
        }),
        refresh_token: await this.jwtService.signAsync(payload, {
          expiresIn: '5d',
        }),
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
