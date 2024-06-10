import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateWishDTO {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(64)
  @IsString()
  title: string;

  @MinLength(0)
  @MaxLength(256)
  @IsString()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  urlLinks?: string[];

  @IsNotEmpty()
  @Min(1)
  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  categories: string[];

  @IsString()
  image?: string;
}
