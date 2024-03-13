import { Module } from '@nestjs/common';
import { WishesController } from './wishes.controller';
import { WishesService } from './wishes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wish, WishSchema } from './schema/wish.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wish.name, schema: WishSchema }]),
  ],
  controllers: [WishesController],
  providers: [WishesService],
})
export class WishesModule {}
