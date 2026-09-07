import { MovementType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsISO8601, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

const emptyToUndefined = ({ value }: { value: unknown }) => {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
};

/** Mirrors the audit log's URL state: `?itemId=&type=&from=&to=&page=`. */
export class QueryMovementsDto extends PaginationDto {
  @IsOptional()
  @Transform(emptyToUndefined)
  @IsString()
  itemId?: string;

  @IsOptional()
  @Transform(emptyToUndefined)
  @IsEnum(MovementType)
  type?: MovementType;

  /** `YYYY-MM-DD`, inclusive from the start of that UTC day. */
  @IsOptional()
  @Transform(emptyToUndefined)
  @IsISO8601({}, { message: 'Use a YYYY-MM-DD date.' })
  from?: string;

  /** `YYYY-MM-DD`, inclusive through the end of that UTC day. */
  @IsOptional()
  @Transform(emptyToUndefined)
  @IsISO8601({}, { message: 'Use a YYYY-MM-DD date.' })
  to?: string;
}
