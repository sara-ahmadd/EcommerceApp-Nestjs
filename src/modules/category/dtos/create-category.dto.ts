import { IsNotEmpty, IsString } from 'class-validator';
import { IImage } from './../../../common/types/image.type';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  image: IImage;
}
