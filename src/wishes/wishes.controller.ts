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
  UseGuards,
} from '@nestjs/common';
import { CreateWishDTO } from './dto/create-wish.dto';
import { WishesService } from './wishes.service';
import { Wish } from './schema/wish.schema';
import { UpdateWishDTO } from './dto/update-wish.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(AuthGuard)
  @Post()
  createWish(@Body() createWish: CreateWishDTO): Promise<Wish> {
    return this.wishesService.createWish(createWish);
  }

  @UseGuards(AuthGuard)
  @Get()
  getWishes(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{ content: Wish[]; totalPages: number; totalElements: number }> {
    return this.wishesService.getWishes(page, limit);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getWish(@Param('id') id: string): Promise<Wish> {
    return this.wishesService.getWish(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateWish(
    @Param('id') id: string,
    @Body() updateWish: UpdateWishDTO,
  ): Promise<Wish> {
    return this.wishesService.updateWish(id, updateWish);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteWish(@Param('id') id: string) {
    return this.wishesService.deleteWish(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/categories/:category')
  createCategoryForWish(
    @Param('id') id: string,
    @Param('category') category: string,
  ): Promise<void> {
    return this.wishesService.createCategoryForWish(id, category);
  }

  @UseGuards(AuthGuard)
  @Get('categories/:id')
  getCategory(@Param('id') id: string): Promise<string[]> {
    return this.wishesService.getCategory(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id/categories/:category')
  deleteCategoryFromWish(
    @Param('id') id: string,
    @Param('category') category: string,
  ): Promise<void> {
    return this.wishesService.deleteCategoryFromWish(id, category);
  }
}
