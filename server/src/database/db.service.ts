import {Pool, QueryResult, QueryResultRow} from 'pg';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';


@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  async onModuleInit(): Promise<void> {
    this.pool = new Pool({
      connectionString: process.env.DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    console.log('DB_URL:', process.env.DB_URL?.slice(0, 50) + '...');

    const result = await this.pool.query('SELECT NOW()');
    console.log('✅ Database connected at:', result.rows[0].now);
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }

  async query<T extends QueryResultRow>(text: string, params?: any[]): Promise<QueryResult<T>> {
    return this.pool.query<T>(text, params);
  }
}
