import {ApiProperty} from "@nestjs/swagger";

export enum TradeType {
  BUY = 'buy',
  SELL = 'sell',
}

export class UserPortfolioDto {
  @ApiProperty({ enum: TradeType })
  type: TradeType;
  user_id:string;
  symbol:string;
  price:number;
  much:number;
}
