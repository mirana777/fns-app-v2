
import { Module } from '@nestjs/common';
import { CacheModule } from 'src/utils/cache/cache.module';
import { HttpModule } from '@nestjs/axios';
import { FnsController } from './fns.controller';
import { FnsService } from './fns.service';
import { FnsTasksService } from 'src/schedule/fns.schedule';
import { FnsRegistrarRegistered } from 'src/entity/fns.registrar.registered';
import { FnsRegistryTransfer } from 'src/entity/fns.registry.transfer';
import { FnsRegistryResolver } from 'src/entity/fns.registry.resolver';
import { FnsPublicResolverAddressChanged } from './../entity/fns.public.resolver.address.changed';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [CacheModule, HttpModule, TypeOrmModule.forFeature([FnsRegistrarRegistered, FnsRegistryTransfer, FnsRegistryResolver, FnsPublicResolverAddressChanged]),],
  controllers: [FnsController],
  providers: [FnsService, FnsTasksService],
  exports: [],
})
export class FnsModule {}
