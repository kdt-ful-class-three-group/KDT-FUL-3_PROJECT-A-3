export interface StockValue {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface StockData {
  meta: {
    symbol: string;
    interval: string;
    currency: string;
    exchange_timezone: string;
    exchange: string;
    mic_code: string;
    type: string;
  };
  values: StockValue[];
}

export interface StockChartProps {
  data: StockValue[];
  symbol: string;
}

export interface StockInfoProps {
  symbol: StockData["meta"]["symbol"];
  price?: StockValue["close"]
}