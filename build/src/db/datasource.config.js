"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDataSource = void 0;
require("dotenv/config");
const typeorm_1 = require("typeorm");
exports.ClientDataSource = new typeorm_1.DataSource({
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
    maxQueryExecutionTime: 2000,
    // legacySpatialSupport: false
});
