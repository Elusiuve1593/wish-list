import {
  Controller,
  Param,
  Post,
  Headers,
  UseGuards,
  Get,
  Delete,
} from '@nestjs/common';
import { CategoriesSqlService } from '../services/categories_sql.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller()
export class CategoriesSqlController {
  constructor(private readonly categoriesSqlService: CategoriesSqlService) {}

  @UseGuards(AuthGuard)
  @Post(':id/categories-sql/:category')
  createCategoryForWish(
    @Param('id') id: number,
    @Param('category') category: string,
    @Headers('Authorization') token: string,
  ): Promise<void> {
    return this.categoriesSqlService.createCategoryForWish(id, category, token);
  }

  @UseGuards(AuthGuard)
  @Get('categories-sql/:id')
  getCategory(
    @Param('id') id: number,
    @Headers('Authorization') token: string,
  ): Promise<string[]> {
    return this.categoriesSqlService.getCategory(id, token);
  }

  @UseGuards(AuthGuard)
  @Delete(':id/categories-sql/:category')
  deleteCategoryFromWish(
    @Param('id') id: number,
    @Param('category') category: string,
    @Headers('Authorization') token: string,
  ): Promise<void> {
    return this.categoriesSqlService.deleteCategoryFromWish(
      id,
      category,
      token,
    );
  }
}
