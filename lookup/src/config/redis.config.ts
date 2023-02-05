import { CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
const localConfig = {
  store: redisStore,
  host: '127.0.0.1',
  port: 6379,
};

const prodConfig = {
  store: redisStore,
  host: '127.0.0.1',
  port: 6379,
};

export default CacheModule.register(
  process.env.NODE_ENV === 'production' ? prodConfig : localConfig,
);
