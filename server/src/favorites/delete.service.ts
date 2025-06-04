// src/users/users.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DbService } from 'src/database/db.service';
import { FavoritesDto } from './dto/favorites.dto';

// * NestJS에서는 클래스 인스턴스를 생성할 때, 필요한 의존성을 컨테이너에서 찾아 주입.
// * 이를 위한 Injectable 데코레이터 선언.
@Injectable()

// * UserService 생성자 생성.
export class DeleteService {
  // * UserService 내에서 DbService를 사용하기 위한 선언.
  // * private => 생성자 내의 인스턴스 속성으로 뒤에 선언할 요소를 가져와서 생성하겠다 선언.
  // * readonly => 인스턴스 생성 후 변경 하지 않겠다 선언.
  // * db: DbService => 클래스 내에서 db라는 변수로 DbService를 가져와서 생성하겠다 선언.
	constructor(private readonly db: DbService) {}

  // * users테이블의 모든 유저 정보를 가져오는 함수.
  async delete(dto:FavoritesDto, req:FavoritesDto) {
    // * db는 this를 쓰지 않으면, 따로 db를 지정하지 않았기 때문에, undefined가 된다.
    // * this를 쓰면, 생성자에서 주입한 DbService 인스턴스를 사용하게 된다.
    const checkQuery = `
    SELECT * FROM favorites WHERE user_id = $1 AND symbol = $2
    `;
    const checkValue = [req.user_id, dto.symbol];
    
    const query = `
    DELETE FROM favorites WHERE user_id  = $1  AND symbol = $2
    `;
    const value = [req.user_id, dto.symbol];

    const check = await this.db.query(checkQuery, checkValue);

    if(check.rows.length === 0) {
      console.log(`${dto.symbol}이 관심종목에 등록되어 았지 않습니다.`)
      return {message: `${dto.symbol}이 관심종목에 등록되어 았지 않습니다.`}
    } else {
      const result = await this.db.query(query, value)
      console.log(`${dto.symbol} 관심종목 해제 완료`, result.rows[0])
      return {
        message: `${dto.symbol} 관심종목 해제 완료`
      }
    }
  }
}