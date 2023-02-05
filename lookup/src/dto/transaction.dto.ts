import { IsNotEmpty } from 'class-validator';

export class TransactionDto{
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  transactionHash: string;

  @IsNotEmpty()
  blockNumber: number;
}