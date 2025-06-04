import {Controller, Get, Param, Query} from '@nestjs/common';
import { StocksService } from './stocks.service';
import {DbService} from "../database/db.service";

@Controller ('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService, private readonly db: DbService) {}


  // @Get(':symbol')
  // getStock(@Param('symbol') symbol: string) {
  //   return this.stocksService.getStocksData(symbol);
  // }
  //
  //


  @Get(':symbol')
  getStockData(@Param('symbol') symbol: string, @Query('from')fromKSTString?: string, @Query('to') toKSTString?: string) {
    return this.stocksService.getStockData(symbol, fromKSTString, toKSTString);
  }

}
