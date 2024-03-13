import { CreateWishDTO } from './create-wish.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateWishDTO extends PartialType(CreateWishDTO) {}
