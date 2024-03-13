import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wish } from './schema/wish.schema';
import { Model } from 'mongoose';
import { CreateWishDTO } from './dto/create-wish.dto';
import { UpdateWishDTO } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectModel(Wish.name) private readonly wishModel: Model<Wish>,
  ) {}

  async createWish(createWish: CreateWishDTO): Promise<Wish> {
    return await this.wishModel.create(createWish);
  }

  async getWishes(): Promise<Wish[]> {
    return await this.wishModel.find();
  }

  async deleteWish(id: string): Promise<Wish> {
    return await this.wishModel.findByIdAndDelete(id);
  }

  async updateWish(id: string, updateWish: UpdateWishDTO): Promise<Wish> {
    return await this.wishModel.findByIdAndUpdate(id, updateWish);
  }

  async getWish(id: string): Promise<Wish> {
    return await this.wishModel.findById(id);
  }
}
