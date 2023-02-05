import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { REDIS_PREFIX, DEFAULT_CACHE_TIME } from 'src/config/constant';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async set(key: string, value: any, time ?: number): Promise<any> {
    return await this.cacheManager.set<any>(`${REDIS_PREFIX}${key}`, value, {
      ttl: time || DEFAULT_CACHE_TIME
    });
  }

  async get(key: string): Promise<any> {
    const data: any = await this.cacheManager.get(`${REDIS_PREFIX}${key}`);
    if (data) {
      return data;
    } else {
      return null;
    }
  }

  async del(key: string): Promise<any> {
    return await this.cacheManager.del(key);
  }
}
