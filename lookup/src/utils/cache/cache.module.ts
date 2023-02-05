import { Module } from '@nestjs/common';
import Cache from '../../config/redis.config';
import { CacheService } from './cache.service';

@Module({
  imports: [Cache],
  providers: [CacheService],
  exports: [Cache, CacheService],
})
export class CacheModule {}
