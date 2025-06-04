import { Module } from "@nestjs/common";
import { DbModule } from "src/database/db.module";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { GetService } from "./get.service";
import { InsertService } from "./account.insert";
import { CheckService } from "./check.service";
import { TradeResultService } from "./tradeResult.service";


@Module({
    imports: [DbModule],
    controllers: [AccountController],
    providers: [AccountService, CheckService, InsertService, GetService, TradeResultService],
})
export class AccountModule {}