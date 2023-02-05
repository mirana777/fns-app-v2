import { NameDto } from './../dto/name.dto';
import { PageList, PageDto } from './../dto/page.dto';
import { FnsRegistrarRegistered } from 'src/entity/fns.registrar.registered';
import { FnsService } from './fns.service';
import { Controller, Get, Query } from '@nestjs/common';
import { TransactionDto } from 'src/dto/transaction.dto';

@Controller('')
export class FnsController {
  constructor(private readonly fnsService: FnsService) {}

  @Get('registration/list')
  async registrationList(@Query() page: PageDto):Promise<PageList<FnsRegistrarRegistered>> {
    return await this.fnsService.getRegisteredByPage(page);
  }

  @Get('address/transactions')
  async addressTransactions(@Query() params: { address: string }):Promise<TransactionDto []> {
    return await this.fnsService.getTransactionsByAddress(params.address);
  }

  @Get('name/find')
  async findName(@Query() params: { address: string }): Promise<NameDto> {
    return await this.fnsService.findName(params.address)
  }
}
