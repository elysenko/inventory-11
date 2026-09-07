import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class CreateLocationDto {
  @Transform(trim)
  @IsString()
  @IsNotEmpty({ message: 'A location name is required.' })
  @MaxLength(120)
  name!: string;

  @Transform(trim)
  @IsString()
  @IsNotEmpty({ message: 'A zone is required.' })
  @MaxLength(120)
  zone!: string;
}
