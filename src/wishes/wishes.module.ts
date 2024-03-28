import { Module } from '@nestjs/common';
import { WishesController } from './wishes.controller';
import { WishesService } from './wishes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wish, WishSchema } from './schema/wish.schema';
import { jwtConfig } from 'src/auth/jwt/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig),
    MongooseModule.forFeature([{ name: Wish.name, schema: WishSchema }]),
  ],
  controllers: [WishesController, CategoriesController],
  providers: [WishesService],
})
export class WishesModule {}
