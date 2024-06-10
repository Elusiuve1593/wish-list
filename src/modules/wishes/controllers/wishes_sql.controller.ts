import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WishesSqlService } from '../services/wishes_sql.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateWishDTO } from '../dto/create-wish.dto';
import { Wish_orm } from '../entities/entity/wish.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UpdateWishDTO } from '../dto/update-wish.dto';

@Controller('wishes-sql')
export class WishesSqlController {
  constructor(private readonly wishesSqlService: WishesSqlService) {}

  @UseGuards(AuthGuard)
  @Post()
  createWish(
    @Body() createWish: CreateWishDTO,
    @Headers('Authorization') token: string,
  ): Promise<Wish_orm> {
    return this.wishesSqlService.createWish(createWish, token);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getWishes(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Headers('Authorization') token: string,
  ): Promise<Pagination<Wish_orm>> {
    limit = limit > 100 ? 100 : limit;
    return this.wishesSqlService.getWishes(token, { page, limit });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getWish(
    @Param('id') id: number,
    @Headers('Authorization') token: string,
  ): Promise<Wish_orm> {
    return this.wishesSqlService.getWish(token, id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateWish(
    @Param('id') id: number,
    @Body() updateWish: UpdateWishDTO,
    @Headers('Authorization') token: string,
  ) {
    this.wishesSqlService.updateWish(id, updateWish, token);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteWish(@Param('id') id: number, @Headers('Authorization') token: string) {
    this.wishesSqlService.deleteWish(id, token);
  }
}
