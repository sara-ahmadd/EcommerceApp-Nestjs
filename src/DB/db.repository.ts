import { Model } from 'mongoose';

export abstract class AbstractDBRepository<TDoc> {
  constructor(private readonly model: Model<TDoc>) {}

  async create({ data }: { data: Partial<TDoc> }) {
    return this.model.create({ ...data });
  }
  //page & limit for paginate method
  async findAll({
    filter = {},
    populate = '',
    select = '',
    page = 1,
    limit = 5,
    sort = 0,
  }) {
    let query = this.model.find(filter);
    if (populate) query = query.populate(populate);
    if (select) query = query.select(select);
    if (page && limit) {
      const paginationResult = await query.paginate(page, limit);
      return paginationResult;
    }
    if (select) query = query.select(select);

    const data = await query.exec();
    return { data };
  }

  async findOne({
    filter = {},
    populate,
    select,
  }: {
    filter: Partial<TDoc>;
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
    return this.model.findOneAndUpdate(filter, updatedFields, { new: true });
  }

  async removeOne({ filter = {} }) {
    return this.model.deleteOne(filter);
  }
}
