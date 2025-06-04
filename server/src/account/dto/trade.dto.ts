import {ApiProperty} from "@nestjs/swagger";

export enum TradeType {
  BUY = 'buy',
  SELL = 'sell',
}

export class TradeDto {
  @ApiProperty({ enum: TradeType })
  user_id: string;
  type: TradeType;
  price: number;
  asset: number;
}