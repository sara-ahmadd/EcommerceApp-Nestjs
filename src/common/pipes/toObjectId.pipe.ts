import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class TransformToObjectIdPipe
  implements PipeTransform<string, Types.ObjectId>
{
  transform(value: string): Types.ObjectId {
    try {
      return new Types.ObjectId(value);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
