import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateWishDTO } from './dto/create-wish.dto';
import { WishesService } from './wishes.service';
import { Wish } from './schema/wish.schema';
import { UpdateWishDTO } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}
  @Post()
  createWish(@Body() createWish: CreateWishDTO): Promise<Wish> {
    return this.wishesService.createWish(createWish);
  }

  @Get()
  getWishes(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{ content: Wish[]; totalPages: number; totalElements: number }> {
    return this.wishesService.getWishes(page, limit);
  }

  @Get(':id')
  getWish(@Param('id') id: string): Promise<Wish> {
    return this.wishesService.getWish(id);
  }

  @Put(':id')
  updateWish(
    @Param('id') id: string,
    @Body() updateWish: UpdateWishDTO,
  ): Promise<Wish> {
    return this.wishesService.updateWish(id, updateWish);
  }

  @Delete(':id')
  deleteWish(@Param('id') id: string) {
    return this.wishesService.deleteWish(id);
  }
}
