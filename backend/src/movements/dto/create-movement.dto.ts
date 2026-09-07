import { MovementType } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

/** Postgres INTEGER ceiling — past this the column overflows mid-transaction. */
const INT4_MAX = 2_147_483_647;

/**
 * The movement form clears the unused location select to '' rather than
 * removing the key, so empty strings must read as "absent" — otherwise an IN
 * would arrive carrying `fromLocId: ''` and fail the shape check.
 */
const emptyToUndefined = ({ value }: { value: unknown }) => {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
};

export class CreateMovementDto {
  @IsEnum(MovementType, { message: 'Type must be one of IN, OUT or TRANSFER.' })
  type!: MovementType;

  @Transform(emptyToUndefined)
  @IsString()
  @IsNotEmpty({ message: 'Choose the item being moved.' })
  itemId!: string;

  /** Required for OUT and TRANSFER, forbidden for IN. */
  @IsOptional()
  @Transform(emptyToUndefined)
  @IsString()
  fromLocId?: string;

  /** Required for IN and TRANSFER, forbidden for OUT. */
  @IsOptional()
  @Transform(emptyToUndefined)
  @IsString()
  toLocId?: string;

  @Type(() => Number)
  @IsInt({ message: 'Quantity must be a whole number of at least 1.' })
  @Min(1, { message: 'Quantity must be a whole number of at least 1.' })
  @Max(INT4_MAX, { message: 'Quantity is too large.' })
  qty!: number;

  @IsOptional()
  @Transform(emptyToUndefined)
  @IsString()
  @MaxLength(500)
  note?: string;
}
