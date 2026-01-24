import { TanstackQueryDto } from 'src/shared/infrastructure/dtos/tanstack-query.dto';
import { FindManyOptions } from '../../domain/interfaces/find-many-options.interface';

export class QueryMapper {
  static toDomain(dto: TanstackQueryDto): FindManyOptions {
    const options: FindManyOptions = {
      pagination: {
        limit: dto.pageSize || 10,
        offset: (dto.pageIndex || 0) * (dto.pageSize || 10),
      },
      filters: [],
      sorting: [],
      globalSearch: dto.globalFilter,
    };

    // Map Column Filters
    if (dto.columnFilters) {
      dto.columnFilters.forEach((f) => {
        options.filters?.push({
          field: f.id,
          value: f.value,
          operator: f.operator || 'like',
        });
      });
    }

    console.log('filters mapped: ', options.filters);

    // Map Sorting
    if (dto.sorting) {
      dto.sorting.forEach((s) => {
        options.sorting?.push({
          field: s.id,
          direction: s.desc ? 'DESC' : 'ASC',
        });
      });
    }

    return options;
  }
}
