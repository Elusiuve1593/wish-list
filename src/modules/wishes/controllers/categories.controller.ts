import {
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CategoriesService } from '../services/categories.service';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard)
  @Post(':id/categories/:category')
  createCategoryForWish(
    @Param('id') id: string,
    @Param('category') category: string,
    @Headers('Authorization') token: string,
  ): Promise<void> {
    return this.categoriesService.createCategoryForWish(id, category, token);
  }

  @UseGuards(AuthGuard)
  @Get('categories/:id')
  getCategory(
    @Param('id') id: string,
    @Headers('Authorization') token: string,
  ): Promise<string[]> {
    return this.categoriesService.getCategory(id, token);
  }

  @UseGuards(AuthGuard)
  @Delete(':id/categories/:category')
  deleteCategoryFromWish(
    @Param('id') id: string,
    @Param('category') category: string,
    @Headers('Authorization') token: string,
  ): Promise<void> {
    return this.categoriesService.deleteCategoryFromWish(id, category, token);
  }
}
