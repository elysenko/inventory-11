import { DEFAULT_PAGE_SIZE, type PaginationDto } from './dto/pagination.dto';

/**
 * The envelope every list endpoint returns. `total` is the size of the whole
 * filtered set, not of `data`, so a client can render page controls without a
 * second request.
 */
export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

/** Resolved window for a request, with defaults applied. */
export interface PageWindow {
  page: number;
  pageSize: number;
  skip: number;
  take: number;
}

export function resolveWindow(query: PaginationDto): PageWindow {
  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? DEFAULT_PAGE_SIZE;
  return { page, pageSize, skip: (page - 1) * pageSize, take: pageSize };
}

/**
 * Windows an already-materialised array. Used where the filter is a predicate
 * over an aggregate (low-stock, on-hand totals) that SQL cannot express against
 * the base table alone, so the rows have to exist before they can be counted.
 */
export function paginateArray<T>(rows: T[], query: PaginationDto): Paginated<T> {
  const { page, pageSize, skip, take } = resolveWindow(query);
  return {
    data: rows.slice(skip, skip + take),
    total: rows.length,
    page,
    pageSize,
  };
}
