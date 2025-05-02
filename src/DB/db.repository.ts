import { FilterQuery, Model } from 'mongoose';

export abstract class AbstractDBRepository<TDoc> {
  constructor(private readonly model: Model<TDoc>) {}

  async create({ data }: { data: Partial<TDoc> }) {
    return this.model.create({ ...data });
  }
  //page & limit for paginate method
  async findAll({
    filter,
    populate,
    select,
    page = 1,
    limit = 5,
    sort = 1,
  }: {
    filter: FilterQuery<TDoc>;
    populate?: any;
    select?: string;
    page?: number;
    limit?: number;
    sort?: 1 | -1;
  }) {
    let query = this.model.find(filter);
    if (populate) query = query.populate(populate);
    if (select) query = query.select(select);
    if (page && limit) {
      const paginationResult = await query.paginate(page, limit);
      return paginationResult;
    }
    if (select) query = query.select(select);
    if (sort) query = query.sort({ createdAt: sort });

    const data = await query.exec();
    return { data };
  }

  async findOne({
    filter = {},
    populate,
    select,
  }: {
    filter: FilterQuery<TDoc>;
    populate?: any;
    select?: string;
  }) {
    let query = this.model.findOne(filter);
    if (populate) query = query.populate(populate);
    if (select) query = query.select(select);

    const data = await query.exec();
    return data;
  }

  async updateOne({ filter = {}, updatedFields = {} }) {
    return this.model.findOneAndUpdate(filter, updatedFields, {
      new: true,
      runValidators: true,
    });
  }

  async removeOne({ filter = {} }) {
    return this.model.deleteOne(filter);
  }
}
