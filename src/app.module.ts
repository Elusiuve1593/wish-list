import { Module } from '@nestjs/common';
import { ConfigureModule } from './config/config.module';
import { WishesModule } from './wishes/wishes.module';

@Module({
  imports: [ConfigureModule, WishesModule],
})
export class AppModule {}
