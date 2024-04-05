import { Module } from '@nestjs/common';
import { WishesController } from './controllers/wishes.controller';
import { WishesService } from './services/wishes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wish, WishSchema } from './schema/wish.schema';
import { jwtConfig } from 'src/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { TokenService } from 'src/common/token/token.service';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig),
    MongooseModule.forFeature([{ name: Wish.name, schema: WishSchema }]),
  ],
  controllers: [WishesController, CategoriesController],
  providers: [WishesService, CategoriesService, TokenService],
})
export class WishesModule {}
