import { Module } from "@nestjs/common";
import { DbModule } from "src/database/db.module";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { CheckService } from "./check.service";
import { GetService } from "./get.service";


@Module({
    imports: [DbModule],
    controllers: [AccountController],
    providers: [AccountService, CheckService, GetService],
})
export class AccountModule {}