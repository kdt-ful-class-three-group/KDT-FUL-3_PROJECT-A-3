import { Module } from "@nestjs/common";
import { DbModule } from "src/database/db.module";
import { UserPortfolioController } from "./userportfolio.controller";
import { TradeService } from "./userportfolio.service";
import { GetPortfolio } from "./getPortfolio.service";
import {HistoryPortfolio} from "./tradeHistory.service";


@Module({
    imports: [DbModule],
    controllers: [UserPortfolioController],
    providers: [TradeService, GetPortfolio, HistoryPortfolio],
})
export class UserPortfolioModule {}