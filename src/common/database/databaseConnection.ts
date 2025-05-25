import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  // logging: true,
  synchronize: true,
  entities: [__dirname + '/../entities/*.entity.{ts,js}'],
});
