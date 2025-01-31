/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Searching
  // search(searchAbleFields: string[]) {
  //   const searchTerm = this?.query?.searchTerm;
  //   if (searchTerm) {
  //     this.modelQuery = this.modelQuery.find({
  //       $or: searchAbleFields.map(
  //         (field) =>
  //           ({
  //             [field]: { $regex: searchTerm, $options: 'i' },
  //           }) as FilterQuery<T>,
  //       ),
  //     });
  //   }
  //   return this;
  // }
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  // Filtering
  filter() {
    const queryObj = { ...this.query };
    const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeField.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  // Sortng
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  // Pagination
  pagination() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // Fields
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  // Meta Data Count
  countTotal() {
    const filterQuery = this.modelQuery.getFilter();
  }
}

export default QueryBuilder;
