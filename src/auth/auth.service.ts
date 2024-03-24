import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schema/auth.schema';
import { Model } from 'mongoose';
import { RegistrationDTO } from './dto/registration.dto';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
    private readonly bcrypt: BcryptService,
  ) {}

  async userRegistration(registration: RegistrationDTO): Promise<Auth> {
    const hashedPassword = await this.bcrypt.hashPassword(
      registration.password,
    );
    return await this.authModel.create({
      ...registration,
      password: hashedPassword,
    });
  }

  async existMail(email: string): Promise<RegistrationDTO | null> {
    return this.authModel.findOne({ email });
  }
}
