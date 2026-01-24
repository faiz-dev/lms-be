export class PaginationResultMapper {
  static toResult<T>(
    data: T[],
    totalItems: number,
    offset: number,
    limit: number,
  ) {
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = Math.floor(offset / limit) + 1;
    const itemCount = data.length;

    return {
      data,
      meta: {
        totalItems,
        itemCount,
        itemsPerPage: limit,
        totalPages,
        currentPage,
      },
    };
  }
}
