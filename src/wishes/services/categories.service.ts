import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wish, WishDocument } from '../schema/wish.schema';
import { PaginateModel } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Wish.name)
    private readonly wishModel: PaginateModel<WishDocument>,
  ) {}

  async createCategoryForWish(id: string, category: string): Promise<void> {
    await this.wishModel.updateOne(
      { _id: id },
      {
        $push: {
          categories: category,
        },
      },
    );
  }

  async getCategory(id: string): Promise<string[]> {
    const wish = await this.wishModel.findById(id);
    return wish.categories;
  }

  async deleteCategoryFromWish(id: string, category: string): Promise<void> {
    const wish = await this.wishModel.findById(id);
    const index = wish.categories.indexOf(category);
    if (index !== -1) {
      wish.categories.splice(index, 1);
      await wish.save();
    }
  }
}
