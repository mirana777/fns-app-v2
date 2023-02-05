import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FnsService } from 'src/router/fns.service';
let eventLock = false
let domainLock = false
@Injectable()
export class FnsTasksService {
  constructor(private readonly fnsService: FnsService) {}
  @Cron(CronExpression.EVERY_SECOND)
  async handleEvents() {
    if (!eventLock) {
      eventLock = true
      await this.fnsService.asyncFnsEvents();
      eventLock = false
    }
  }

  @Cron(CronExpression.EVERY_SECOND)
  async handleDomains() {
    if (!domainLock) {
      domainLock = true
      await this.fnsService.asyncFnsNames();
      domainLock = false
    }
  }
}