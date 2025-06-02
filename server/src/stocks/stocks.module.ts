import {Module} from "@nestjs/common";
import {StocksController} from "./stocks.controller";
import {StocksService} from "./stocks.service";
import {DbModule} from"../database/db.module";

@Module({
    imports: [DbModule],
    controllers: [StocksController],
    providers: [StocksService],
})
export class StocksModule {}