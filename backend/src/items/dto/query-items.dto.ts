import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

/** Mirrors the item list's URL state: `?q=&lowStock=&page=`. */
export class QueryItemsDto extends PaginationDto {
  /** Case-insensitive substring match against sku OR name. */
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  q?: string;

  /**
   * `readBoolean` on the client emits 'true' / '1'. Only the recognised tokens
   * are coerced — anything else is passed through unchanged so @IsBoolean
   * rejects it with a 400 rather than silently meaning `false`.
   */
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (value === 'true' || value === '1') return true;
    if (value === 'false' || value === '0') return false;
    return value;
  })
  @IsBoolean({ message: 'lowStock must be true or false.' })
  lowStock?: boolean;
}
