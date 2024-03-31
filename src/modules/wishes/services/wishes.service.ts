import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { TokenService } from 'src/common/token/token.service';
import { CreateWishDTO } from '../dto/create-wish.dto';
import { UpdateWishDTO } from '../dto/update-wish.dto';
import { Wish, WishDocument } from '../schema/wish.schema';

@Injectable()
export class WishesService {
  constructor(
    @InjectModel(Wish.name)
    private readonly wishModel: PaginateModel<WishDocument>,
    private readonly tokenService: TokenService,
  ) {}

  async createWish(createWish: CreateWishDTO, token: string): Promise<Wish> {
    const decodedToken: { sub: string } =
      await this.tokenService.decoder(token);
    
    const wish = await new this.wishModel({
      ...createWish,
      owner: decodedToken.sub,
    }).save();

    return await this.wishModel.findById(wish._id).select('-owner');
  }

  async getWishes(
    page: number,
    limit: number,
    token: string,
  ): Promise<{
    docs: Wish[];
    totalPages: number;
    totalDocs: number;
  }> {
    const decodedToken: { sub: string } =
      await this.tokenService.decoder(token);

    const { docs, totalPages, totalDocs } = await this.wishModel.paginate(
      { owner: decodedToken.sub },
      {
        page,
        limit,
      },
    );
    return {
      docs,
      totalPages,
      totalDocs,
    };
  }

  async getWish(id: string, token: string): Promise<Wish> {
    const decodedToken: { sub: string } =
      await this.tokenService.decoder(token);
    return await this.wishModel.findOne({ _id: id, owner: decodedToken.sub });
  }

  async updateWish(
    id: string,
    updateWish: UpdateWishDTO,
    token: string,
  ): Promise<Wish> {
    const decodedToken: { sub: string } =
      await this.tokenService.decoder(token);

    return await this.wishModel.findOneAndUpdate(
      {
        _id: id,
        owner: decodedToken.sub,
      },
      updateWish,
      { new: true },
    );
  }

  async deleteWish(id: string, token: string): Promise<Wish> {
    const decodedToken: { sub: string } =
      await this.tokenService.decoder(token);

    return await this.wishModel.findOneAndDelete({
      _id: id,
      owner: decodedToken.sub,
    });
  }
}
