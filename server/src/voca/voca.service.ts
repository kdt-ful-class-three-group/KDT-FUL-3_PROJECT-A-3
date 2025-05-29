import { Injectable } from "@nestjs/common";
import { DbService } from "src/database/db.service";
// * NestJS에서는 클래스 인스턴스를 생성할 때, 필요한 의존성을 컨테이너에서 찾아 주입.
// * 이를 위한 Injectable 데코레이터 선언.
@Injectable()

//* 생성자 생성
export class VocaService{
  // * DbService를 사용하기 위한 선언
  constructor(private readonly db: DbService){}

  // * voca테이블의 모든 정보를 가져오흔 함수
  async getAllVoca(){
    const result = await this.db.query(`
      SELECT * FROM voca  
    `)
    return result.rows;
  }
}