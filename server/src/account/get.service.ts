import { Injectable } from '@nestjs/common';
import { DbService } from '../database/db.service';


@Injectable()
export class GetService {
  constructor(private readonly db: DbService) {}


    async getAllAccount() {
    const result = await this.db.query(`
      SELECT * FROM account
      `);
      return result.rows;
  }
}