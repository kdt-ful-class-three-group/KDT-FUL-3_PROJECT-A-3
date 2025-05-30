import { Module } from "@nestjs/common";
import { DbModule } from "src/database/db.module";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { CheckService } from "./check.service";
import { InsertService } from "./account.insert";


@Module({
    imports: [DbModule],
    controllers: [AccountController],
    providers: [AccountService, CheckService, InsertService],
})
export class AccountModule {}