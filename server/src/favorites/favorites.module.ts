import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DbModule } from '../database/db.module';
import { DeleteService } from './delete.service';
import { FavoritesCheckService } from './check.service';
import { FavoritesUserService } from './user.service';

// * Module 데코레이터를 사용하여 UsersModule을 정의.
@Module({
  // * imports 속성에 DbModule을 추가하여 UsersModule에서 DbService를 사용할 수 있도록 한다.
  imports: [DbModule],
  // * controllers 속성에 UsersController를 추가하여 이 모듈에서 사용할 컨트롤러를 정의한다.
  controllers: [FavoritesController],
  // * providers 속성에 UsersService를 추가하여 이 모듈에서 사용할 서비스를 정의한다.
  providers: [FavoritesService, DeleteService, FavoritesCheckService, FavoritesUserService],
})
export class FavoritesModule {}
