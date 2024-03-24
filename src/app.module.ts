import { Module } from '@nestjs/common';
import { ConfigureModule } from './config/config.module';
import { WishesModule } from './wishes/wishes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigureModule, WishesModule, AuthModule],
})
export class AppModule {}
