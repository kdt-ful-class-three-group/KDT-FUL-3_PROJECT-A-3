import { Module } from "@nestjs/common";
import { DbModule } from "src/database/db.module";
import { UserPortfolioController } from "./userportfolio.controller";
import { TradeService } from "./userportfolio.service";
import { GetPortfolio } from "./getPortfolio.service";


@Module({
    imports: [DbModule],
    controllers: [UserPortfolioController],
    providers: [TradeService, GetPortfolio],
})
export class UserPortfolioModule {}