import { Module } from '@nestjs/common';
import { CloudinaryProvider } from '../../config/cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { jwtConfig } from 'src/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.registerAsync(jwtConfig)],
  controllers: [CloudinaryController],
  providers: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
