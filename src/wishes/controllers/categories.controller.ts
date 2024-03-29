import {
  Controller,
  Delete,
  Param,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { WishesService } from '../services/wishes.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CategoriesService } from '../services/categories.service';

@Controller('wishes')
export class CategoriesController {
  constructor(
    private readonly wishesService: WishesService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @UseGuards(AuthGuard)
  @Post(':id/categories/:category')
  createCategoryForWish(
    @Param('id') id: string,
    @Param('category') category: string,
  ): Promise<void> {
    return this.categoriesService.createCategoryForWish(id, category);
  }

  @UseGuards(AuthGuard)
  @Get('categories/:id')
  getCategory(@Param('id') id: string): Promise<string[]> {
    return this.categoriesService.getCategory(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id/categories/:category')
  deleteCategoryFromWish(
    @Param('id') id: string,
    @Param('category') category: string,
  ): Promise<void> {
    return this.categoriesService.deleteCategoryFromWish(id, category);
  }
}
