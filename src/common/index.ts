import { QueryOptions } from 'mongoose';
import { MongoQueryModel } from 'nest-mongo-query-parser';

export type MongoQueryFilter = Required<Pick<MongoQueryModel, 'filter'>> &
  Partial<Omit<MongoQueryModel, 'filter'>>;
export const defaultMongooseCursor: QueryOptions = {
  limit: 30,
  skip: 0,
  sort: { createdAt: -1 },
};
