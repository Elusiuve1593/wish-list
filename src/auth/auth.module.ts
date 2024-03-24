import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schema/auth.schema';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService],
})
export class AuthModule {}
