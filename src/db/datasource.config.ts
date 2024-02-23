import 'dotenv/config';
import { DataSource } from 'typeorm';

export const ClientDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: process.env.NODE_ENV === 'local' ? "all" : ["query"],
  entities: [__dirname + '/entities/*{.ts,.js}'],
  subscribers: [],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  maxQueryExecutionTime: 2_000,
  // legacySpatialSupport: false
});