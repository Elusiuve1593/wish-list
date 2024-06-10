import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { Auth, AuthSchema } from './entities/schema/auth.schema';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { jwtConfig } from 'src/config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth_orm } from './entities/entity/auth.entity';
import { AuthSqlController } from './controllers/auth_sql.controller';
import { AuthSqlService } from './services/auth_sql.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth_orm]),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [AuthController, AuthSqlController],
  providers: [AuthService, AuthSqlService, BcryptService, AuthGuard],
})
export class AuthModule {}
