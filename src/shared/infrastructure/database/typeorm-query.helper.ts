import { FindManyOptions } from 'src/shared/domain/interfaces/find-many-options.interface';
import { Brackets, ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export class TypeOrmQueryHelper {
  static applyOptions<T extends ObjectLiteral>(
    query: SelectQueryBuilder<T>,
    options: FindManyOptions,
    fieldMapping: Record<string, string>,
    searchableFields: string[] = [],
  ): SelectQueryBuilder<T> {
    // 1. Global Search
    if (options.globalSearch && searchableFields.length > 0) {
      let check = '';
      query.andWhere(
        new Brackets((qb) => {
          searchableFields.forEach((field, index) => {
            const dbField = fieldMapping[field] || field;
            const condition = `LOWER(${dbField}) LIKE :search`;
            check += condition;
            if (index === 0) {
              qb.where(condition, {
                search: `%${options.globalSearch?.toLocaleLowerCase()}%`,
              });
            } else {
              qb.orWhere(condition, {
                search: `%${options.globalSearch?.toLocaleLowerCase()}%`,
              });
            }
          });
        }),
      );
      console.log('Global Search Condition:', check);
    }

    // 2. Filters
    if (options.filters) {
      options.filters.forEach((filter) => {
        const dbField = fieldMapping[filter.field];
        if (dbField) {
          const paramName = `filter_${filter.field.replace('.', '_')}`;
          if (filter.operator == 'eq') {
            console.log(
              'Applying EQ filter on ',
              dbField,
              ' with value ',
              filter.value,
              `${dbField} = :${paramName}`,
            );
            query.andWhere(`${dbField} = :${paramName}`, {
              [paramName]: filter.value,
            });
          } else {
            query.andWhere(`LOWER(${dbField}) LIKE :${paramName}`, {
              [paramName]: `%${filter.value.toLocaleLowerCase()}%`,
            });
          }
        }
      });
    }

    // 3. Sorting
    if (options.sorting && options.sorting.length > 0) {
      options.sorting.forEach((sort) => {
        const dbField = fieldMapping[sort.field];
        if (dbField) {
          query.addOrderBy(dbField, sort.direction);
        }
      });
    }

    // 4. Pagination
    if (options.pagination) {
      query.skip(options.pagination.offset).take(options.pagination.limit);
    }

    return query;
  }
}
