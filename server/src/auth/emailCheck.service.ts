import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {DbService} from '../database/db.service';
import {QueryResult} from "pg";
import {EmailCheckDto} from "./dto/emailCheck.dto";

@Injectable()
export class EmailCheckService {
    constructor(private readonly db: DbService) {}

    async emailCheck(dto: EmailCheckDto): Promise<any> {
        const query = `
      SELECT email FROM users WHERE email = $1;
    `;
        const values = [dto.email];

        try {
            const result: QueryResult<any> = await this.db.query(query, values);

            if (result.rows.length > 0) {
                // 이메일이 이미 존재할 때
                console.log('이미 존재하는 이메일입니다.');
                throw new BadRequestException('이미 존재하는 이메일입니다.');
            } else {
                console.log('사용 가능한 이메일입니다.');
                return {
                    message: '사용 가능한 이메일입니다.',
                };
            }
        } catch (err) {
            console.error('서버 오류', err);
            if (err instanceof BadRequestException) throw err;
            throw new InternalServerErrorException('서버 오류로 통신에 실패했습니다.');
        }
    }
}

