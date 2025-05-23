// src/users/users.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DbService } from 'src/database/db.service';

@Injectable()
export class UsersService {
	constructor(private readonly db: DbService) {}

  async getAllUsers() {
    const result = await this.db.query(`
      SELECT * FROM users
    `);
    return result.rows;
  }
}