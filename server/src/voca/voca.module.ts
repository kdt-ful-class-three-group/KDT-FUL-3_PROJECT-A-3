import { Module } from "@nestjs/common";
import { VocaService } from "./voca.service";
import { VocaController } from "./voca.controller";
import { DbModule } from "src/database/db.module";
import { UsersController } from "src/users/users.controller";

//* VocModule 정의
@Module({
  // * DbService 사용
  imports:[DbModule],
  //* 컨트롤러 정의
  controllers:[VocaController],
  // *서비스 정의
  providers:[VocaService]
})

export class VocaModule{}