import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenService } from 'src/common/token/token.service';
import { jwtConfig } from 'src/config/jwt.config';
import { CategoriesController } from './controllers/categories.controller';
import { WishesController } from './controllers/wishes.controller';
import { Wish, WishSchema } from './entities/schema/wish.schema';
import { CategoriesService } from './services/categories.service';
import { WishesService } from './services/wishes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish_orm } from './entities/entity/wish.entity';
import { WishesSqlController } from './controllers/wishes_sql.controller';
import { WishesSqlService } from './services/wishes_sql.service';
import { CategoriesSqlController } from './controllers/categories_sql.controller';
import { CategoriesSqlService } from './services/categories_sql.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wish_orm]),
    MongooseModule.forFeature([{ name: Wish.name, schema: WishSchema }]),
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [
    WishesController,
    CategoriesController,
    WishesSqlController,
    CategoriesSqlController,
  ],
  providers: [
    WishesService,
    CategoriesService,
    TokenService,
    WishesSqlService,
    CategoriesSqlService,
  ],
})
export class WishesModule {}
