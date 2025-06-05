// src/users/users.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DbService } from 'src/database/db.service';
import { FavoritesDto } from './dto/favorites.dto';

// * NestJS에서는 클래스 인스턴스를 생성할 때, 필요한 의존성을 컨테이너에서 찾아 주입.
// * 이를 위한 Injectable 데코레이터 선언.
@Injectable()

// * UserService 생성자 생성.
export class FavoritesUserService {
  // * UserService 내에서 DbService를 사용하기 위한 선언.
  // * private => 생성자 내의 인스턴스 속성으로 뒤에 선언할 요소를 가져와서 생성하겠다 선언.
  // * readonly => 인스턴스 생성 후 변경 하지 않겠다 선언.
  // * db: DbService => 클래스 내에서 db라는 변수로 DbService를 가져와서 생성하겠다 선언.
	constructor(private readonly db: DbService) {}

  // * users테이블의 모든 유저 정보를 가져오는 함수.
  async user(req:FavoritesDto) {
    // * db는 this를 쓰지 않으면, 따로 db를 지정하지 않았기 때문에, undefined가 된다.
    // * this를 쓰면, 생성자에서 주입한 DbService 인스턴스를 사용하게 된다.
    const query = `
    SELECT * FROM favorites WHERE user_id = $1
    `;
    const value = [req.user_id];
    

    const check = await this.db.query(query, value);

    console.log(check.rows);
    return check.rows
  }
}