import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigureModule } from './config/config.module';
import { WishesModule } from './wishes/wishes.module';

@Module({
  imports: [ConfigureModule, WishesModule, AuthModule],
})
export class AppModule {}
