import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

/** Postgres INTEGER ceiling — past this the column overflows on write. */
const INT4_MAX = 2_147_483_647;

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class CreateItemDto {
  /** Stored uppercase-trimmed so "sku-001" and "SKU-001" collide as duplicates. */
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toUpperCase() : value))
  @IsString()
  @IsNotEmpty({ message: 'A SKU is required.' })
  @MaxLength(64)
  sku!: string;

  @Transform(trim)
  @IsString()
  @IsNotEmpty({ message: 'Give the item a name so the floor can identify it.' })
  @MaxLength(200)
  name!: string;

  /** The form always posts a string; empty means "no description". */
  @IsOptional()
  @Transform(trim)
  @IsString()
  @MaxLength(2000)
  description?: string;

  @Transform(trim)
  @IsString()
  @IsNotEmpty({ message: 'A unit is required.' })
  @MaxLength(32)
  unit!: string;

  @Type(() => Number)
  @IsInt({ message: 'The reorder point must be a whole number.' })
  @Min(0, { message: 'The reorder point cannot be negative.' })
  @Max(INT4_MAX, { message: 'The reorder point is too large.' })
  reorderAt!: number;
}
