import { Injectable } from '@nestjs/common';
import { DbService } from '../database/db.service';
import { RegisterDto } from './dto/register.dto';
import { hash } from 'bcrypt';
import { QueryResult } from "pg";

@Injectable()
export class AuthService {
  constructor(private readonly db: DbService) {}


    async register(dto: RegisterDto): Promise<any>{
    const hashedPassword: string = await hash(dto.password, 10);
    const query = `
      INSERT INTO users (name, user_id, age, email, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [
      dto.name,
      dto.user_id,
      dto.age,
      dto.email,
      hashedPassword,
    ];


    try{
    const result: QueryResult<any> = await this.db.query(query, values);
    console.log('가입성공', result.rows[0]);
    return result.rows[0];
    } catch(err){
        console.error('가입실패', err);
    }

  }

}
