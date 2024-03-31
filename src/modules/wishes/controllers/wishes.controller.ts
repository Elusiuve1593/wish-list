import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateWishDTO } from '../dto/create-wish.dto';
import { UpdateWishDTO } from '../dto/update-wish.dto';
import { Wish } from '../schema/wish.schema';
import { WishesService } from '../services/wishes.service';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(AuthGuard)
  @Post()
  createWish(
    @Body() createWish: CreateWishDTO,
    @Headers('Authorization') token: string,
  ): Promise<Wish> {
    return this.wishesService.createWish(createWish, token);
  }

  @UseGuards(AuthGuard)
  @Get()
  getWishes(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Headers('Authorization') token: string,
  ): Promise<{ docs: Wish[]; totalPages: number; totalDocs: number }> {
    return this.wishesService.getWishes(page, limit, token);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getWish(
    @Param('id') id: string,
    @Headers('Authorization') token: string,
  ): Promise<Wish> {
    return this.wishesService.getWish(id, token);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateWish(
    @Param('id') id: string,
    @Body() updateWish: UpdateWishDTO,
    @Headers('Authorization') token: string,
  ): Promise<Wish> {
    return this.wishesService.updateWish(id, updateWish, token);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteWish(@Param('id') id: string, @Headers('Authorization') token: string) {
    return this.wishesService.deleteWish(id, token);
  }
}
