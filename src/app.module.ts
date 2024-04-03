import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigureModule } from './config/config.module';
import { WishesModule } from './wishes/wishes.module';
import { CorsMiddleware } from './cors.middleware';

@Module({
  imports: [ConfigureModule, WishesModule, AuthModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
