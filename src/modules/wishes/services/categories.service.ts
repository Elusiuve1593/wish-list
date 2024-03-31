import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wish, WishDocument } from '../schema/wish.schema';
import { PaginateModel } from 'mongoose';
import { TokenService } from 'src/common/token/token.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Wish.name)
    private readonly wishModel: PaginateModel<WishDocument>,
    private readonly tokenService: TokenService,
  ) {}

  async createCategoryForWish(
    id: string,
    category: string,
    token: string,
  ): Promise<void> {
    const decodedToken: { sub: string } =
      await this.tokenService.decoder(token);

    await this.wishModel.updateOne(
      { _id: id, owner: decodedToken.sub },
      {
        $push: {
          categories: category,
        },
      },
    );
  }

  async getCategory(id: string, token): Promise<string[]> {
    const decodedToken: { sub: string } =
      await this.tokenService.decoder(token);

    const wish = await this.wishModel.findOne({
      _id: id,
      owner: decodedToken.sub,
    });
    return wish.categories;
  }

  async deleteCategoryFromWish(
    id: string,
    category: string,
    token: string,
  ): Promise<void> {
    const decodedToken: { sub: string } =
      await this.tokenService.decoder(token);

    const wish = await this.wishModel.findOne({
      _id: id,
      owner: decodedToken.sub,
    });
    const index = wish.categories.indexOf(category);
    if (index !== -1) {
      wish.categories.splice(index, 1);
      await wish.save();
    }
  }
}
