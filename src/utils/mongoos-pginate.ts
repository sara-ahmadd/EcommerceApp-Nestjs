import { Query } from 'mongoose';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

declare module 'mongoose' {
  interface Query<ResultType, DocType, THelpers = {}, RawDocType = unknown> {
    paginate(
      page?: number,
      limit?: number,
    ): Promise<PaginationResult<ResultType>>;
  }
}

Query.prototype.paginate = async function <T>(
  page = 1,
  limit = 10,
): Promise<PaginationResult<T>> {
  const skip = (page - 1) * limit;

  // Clone the query to avoid modifying the original one
  const queryClone = this.clone();

  // Get data and total count
  const [data, total] = await Promise.all([
    queryClone.skip(skip).limit(limit).exec(),
    this.model.countDocuments(this.getFilter()).exec(),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
