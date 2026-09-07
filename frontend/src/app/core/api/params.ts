import { HttpParams } from '@angular/common/http';
import { Paginated } from '../models';

/** Matches MAX_PAGE_SIZE in the backend's PaginationDto — a larger ask is a 400. */
export const MAX_PAGE_SIZE = 200;

type ParamValue = string | number | boolean | null | undefined;

/**
 * Builds a query string, dropping anything empty so an unset filter is absent
 * rather than sent as `''` — the DTOs coerce blank strings away, but an absent
 * key keeps the wire format honest and the URLs short.
 */
export function toParams(query: Record<string, ParamValue>): HttpParams {
  let params = new HttpParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined || value === '') continue;
    params = params.set(key, String(value));
  }
  return params;
}

/**
 * Drains a paginated endpoint into one array.
 *
 * The catalogue, location and filter-dropdown views all render totals and
 * client-side pages over the whole filtered set, so they need every row, not a
 * window. `total` from the envelope is the stop condition; the page ceiling is a
 * backstop so a server that always reports a larger total cannot spin forever.
 */
export async function collectAll<T>(
  fetchPage: (page: number, pageSize: number) => Promise<Paginated<T>>,
  pageSize: number = MAX_PAGE_SIZE,
): Promise<T[]> {
  const rows: T[] = [];
  const MAX_PAGES = 50;

  for (let page = 1; page <= MAX_PAGES; page++) {
    const chunk = await fetchPage(page, pageSize);
    rows.push(...chunk.data);
    if (chunk.data.length === 0 || rows.length >= chunk.total) break;
  }
  return rows;
}
