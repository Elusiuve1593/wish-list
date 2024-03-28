import {
  Controller,
  Delete,
  Param,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('wishes')
export class CategoriesController {
  constructor(private readonly wishesService: WishesService) {}

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
