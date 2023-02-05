import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const localConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'fns',
  autoLoadEntities: true,
  synchronize: true,
};

const prodConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'fns',
  autoLoadEntities: true,
  synchronize: true,
};

export default TypeOrmModule.forRoot(
  process.env.NODE_ENV === 'production' ? prodConfig : localConfig,
);
