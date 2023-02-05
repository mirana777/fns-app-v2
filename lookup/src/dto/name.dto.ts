import { IsNotEmpty } from 'class-validator';

export class NameDto {
  @IsNotEmpty()
  owner: string;

  @IsNotEmpty()
  name: string;
}
