import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { WishesModule } from './wishes/wishes.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:password@localhost:27017/database?authSource=admin&authMechanism=SCRAM-SHA-256',
    ),
    WishesModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
