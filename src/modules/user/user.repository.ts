import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractDBRepository } from '../../DB/db.repository';
import { UserDocument, UserModelName } from '../../DB/models/user.model';

@Injectable()
export class UserRepository extends AbstractDBRepository<UserDocument> {
  constructor(
    @InjectModel(UserModelName) private UserModel: Model<UserDocument>,
  ) {
    super(UserModel);
  }

  async updateManyUsers({ filter = {}, updatedFields = {} }) {
    await this.UserModel.updateMany(filter, updatedFields);
  }
}
