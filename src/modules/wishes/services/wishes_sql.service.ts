import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { TokenService } from 'src/common/token/token.service';
import { Repository } from 'typeorm';
import { CreateWishDTO } from '../dto/create-wish.dto';
import { UpdateWishDTO } from '../dto/update-wish.dto';
import { Wish_orm } from '../entities/entity/wish.entity';

@Injectable()
export class WishesSqlService {
  constructor(
    @InjectRepository(Wish_orm)
    private readonly wishRepository: Repository<Wish_orm>,
    private readonly tokenService: TokenService,
  ) {}

  async createWish(
    createWish: CreateWishDTO,
    token: string,
  ): Promise<Wish_orm> {
    const decodedToken: { sub: string } =
      await this.tokenService.decoder(token);

    const wish = new Wish_orm({ ...createWish, owner: decodedToken.sub });
    const savedWish = this.wishRepository.save(wish);

    return plainToClass(Wish_orm, savedWish);
  }

  async getWishes(
    token: string,
    option: IPaginationOptions,
  ): Promise<Pagination<Wish_orm>> {
    const decodedToken: { sub: string } =
      await this.tokenService.decoder(token);

    return paginate<Wish_orm>(this.wishRepository, option, {
      where: { owner: decodedToken.sub },
    });
  }

  async getWish(token: string, id: number): Promise<Wish_orm> {
    const decodeToken: { sub: string } = await this.tokenService.decoder(token);
    const wish = this.wishRepository.findOne({
      where: { id, owner: decodeToken.sub },
    });
    return plainToClass(Wish_orm, wish);
  }

  async updateWish(id: number, updateWish: UpdateWishDTO, token: string) {
    const decodeToken: { sub: string } = await this.tokenService.decoder(token);
    this.wishRepository.update(
      { id },
      { ...updateWish, owner: decodeToken.sub },
    );
  }

  async deleteWish(id: number, token: string) {
    const decodeToken: { sub: string } = await this.tokenService.decoder(token);
    const getToken = this.wishRepository.findOne({
      where: { id, owner: decodeToken.sub },
    });
    if (getToken) {
      this.wishRepository.delete(id);
    }
  }
}
