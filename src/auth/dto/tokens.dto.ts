import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TokensDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  access_token: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  refresh_token: string;
}
