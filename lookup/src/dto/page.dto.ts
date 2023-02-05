import { IsNotEmpty } from 'class-validator';

export class PageDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  pageSize: number;
}

export class PageList<T> {
  @IsNotEmpty()
  total: number

  list: T[] | any[]
}