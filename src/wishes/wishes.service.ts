import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CreateWishDTO } from './dto/create-wish.dto';
import { UpdateWishDTO } from './dto/update-wish.dto';
import { Wish, WishDocument } from './schema/wish.schema';

@Injectable()
export class WishesService {
  constructor(
    @InjectModel(Wish.name)
    private readonly wishModel: PaginateModel<WishDocument>,
  ) {}

  async createWish(createWish: CreateWishDTO): Promise<Wish> {
    return await this.wishModel.create(createWish);
  }

  async getWishes(
    page: number,
    limit: number,
  ): Promise<{
    content: Wish[];
    totalPages: number;
    totalElements: number;
  }> {
    const options = {
      page,
      limit,
    };
    const { docs, totalPages, totalDocs } = await this.wishModel.paginate(
      {},
      options,
    );

    return {
      content: docs,
      totalPages,
      totalElements: totalDocs,
    };
  }

  async getWish(id: string): Promise<Wish> {
    return await this.wishModel.findById(id);
  }

  async updateWish(id: string, updateWish: UpdateWishDTO): Promise<Wish> {
    return await this.wishModel.findByIdAndUpdate(id, updateWish);
  }

  async deleteWish(id: string): Promise<Wish> {
    return await this.wishModel.findByIdAndDelete(id);
  }

  async getCategory(id: string): Promise<string[]> {
    const wish = await this.wishModel.findById(id);
    return wish.categories;
  }

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

  async deleteCategoryFromWish(id: string, category: string): Promise<void> {
    const wish = await this.wishModel.findById(id);
    const index = wish.categories.indexOf(category);
    if (index !== -1) {
      wish.categories.splice(index, 1);
      await wish.save();
    }
  }
}
