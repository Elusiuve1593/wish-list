import { Module } from '@nestjs/common';
import { DatabaseConfigureModule } from './config/database_config.module';
import { AuthModule } from './modules/auth/auth.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { WishesModule } from './modules/wishes/wishes.module';

@Module({
  imports: [
    DatabaseConfigureModule,
    WishesModule,
    AuthModule,
    CloudinaryModule,
  ]
})
export class AppModule {}
