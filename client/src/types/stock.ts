export interface StockValue {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface StockData {
    symbol: string;
    interval: string;
    currency: string;
    exchange_timezone: string;
    exchange: string;
    mic_code: string;
    type: string;
  values: StockValue[];
  datetime: string;
  close: string; //
}

// export interface StockChartProps {
//   data: StockValue[];
//   symbol: string;
// }

export interface StockInfoProps {
  symbol: StockData["symbol"];
  price?: StockValue["close"]
}


export interface StockChartProps {
  data: StockData[];
  symbol: string;
}