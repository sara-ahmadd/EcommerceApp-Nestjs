import { IsNotEmpty } from 'class-validator';
import { IImage } from './../../../common/types/image.type';

export class DeleteProdImageDto {
  @IsNotEmpty()
  image: IImage;
}
