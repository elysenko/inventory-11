import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export const DEFAULT_PAGE_SIZE = 25;
export const MAX_PAGE_SIZE = 200;

/**
 * Windowing shared by every list endpoint.
 *
 * `page` is 1-based. Out-of-range values are rejected with 400 rather than
 * clamped, so a negative SQL OFFSET is impossible and a caller never silently
 * gets a different page than it asked for.
 */
export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'page must be a whole number.' })
  @Min(1, { message: 'page starts at 1.' })
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'pageSize must be a whole number.' })
  @Min(1, { message: 'pageSize must be at least 1.' })
  @Max(MAX_PAGE_SIZE, { message: `pageSize cannot exceed ${MAX_PAGE_SIZE}.` })
  pageSize?: number;
}
