import { ConflictException, Injectable } from '@nestjs/common';
import { CategoryDocument } from './../../DB/models/category.model';
// import { CategoryDocument } from 'src/DB/models/category.model';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private _CategoryRepo: CategoryRepository) {}
  async createCategory(body: Partial<CategoryDocument>) {
    const checkCateg = await this._CategoryRepo.findOne({
      filter: { name: body.name },
    });
    if (checkCateg)
      throw new ConflictException('A category with tis name already exists');
    const category = await this._CategoryRepo.create({ data: body });
    return { messag: 'category is created successfully', category };
  }
}
