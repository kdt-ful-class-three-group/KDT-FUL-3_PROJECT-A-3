import { Pool } from 'pg';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';


@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  onModuleInit(): void {
    this.pool = new Pool({
      host: String(process.env.DB_HOST),
      user: String(process.env.DB_USER),
      database: String(process.env.DB_NAME),
      password: String(process.env.DB_PASSWORD),
      port: Number(process.env.DB_PORT),
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }

  async query(text: string, params?: any[]) {
    return await this.pool.query(text, params);
  }
}
