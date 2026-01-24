import { plainToInstance, Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class ColumnFilters {
  @IsString()
  id: string;

  @IsString()
  value: string;

  @IsOptional()
  operator?: 'like' | 'eq';
}

export class Sorting {
  @IsString()
  id: string;

  @IsOptional()
  @IsBoolean()
  desc: boolean;
}

export class TanstackQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  pageIndex?: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number = 10;

  @IsOptional()
  @Type(() => String)
  globalFilter?: string;

  @IsOptional()
  @Transform(({ value }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const parsed = JSON.parse(value) as Sorting[];
      return plainToInstance(Sorting, parsed);
    } catch {
      return [];
    }
  })
  @ValidateNested({ each: true })
  @Type(() => Sorting)
  sorting?: Sorting[];

  @IsOptional()
  @Transform(({ value }) => {
    try {
      // console.log('test');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const parsed = JSON.parse(value) as ColumnFilters[];
      // console.log(parsed);
      return plainToInstance(ColumnFilters, parsed);
    } catch {
      return [];
    }
  })
  @ValidateNested({ each: true })
  @Type(() => ColumnFilters)
  columnFilters?: ColumnFilters[];
}
