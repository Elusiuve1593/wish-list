import { Injectable } from '@nestjs/common';
import { Wish_orm } from '../entities/entity/wish.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenService } from 'src/common/token/token.service';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesSqlService {
  constructor(
    @InjectRepository(Wish_orm)
    private readonly wishRepository: Repository<Wish_orm>,
    private readonly tokenService: TokenService,
  ) {}

  async createCategoryForWish(
    id: number,
    category: string,
    token: string,
  ): Promise<void> {
    const decodeToken: { sub: string } = await this.tokenService.decoder(token);
    const wish = await this.wishRepository.findOne({
      where: { id, owner: decodeToken.sub },
    });
    if (wish) {
      wish.categories.push(category);
      await this.wishRepository.save(wish);
    }
  }

  async getCategory(id: number, token: string): Promise<string[]> {
    const decodedToken: { sub: string } =
      await this.tokenService.decoder(token);

    const wish = await this.wishRepository.findOne({
      where: { id, owner: decodedToken.sub },
    });

    if (wish) return wish.categories;
  }

  async deleteCategoryFromWish(
    id: number,
    category: string,
    token: string,
  ): Promise<void> {
    const decodedToken: { sub: string } =
      await this.tokenService.decoder(token);

    const wish = await this.wishRepository.findOne({
      where: { id, owner: decodedToken.sub },
    });

    const index = wish.categories.indexOf(category);
    if (index !== -1) {
      wish.categories.splice(index, 1);
      await this.wishRepository.save(wish);
    }
  }
}
