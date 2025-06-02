// 타입
import { TradeItem } from "@/types/tradeItem";
import { TradeType } from "@/types/tradeItem";

export const tradeItems: TradeItem[] = [
  {
    id: 1,
    account_number: 10123456,
    user_name: "홍길동",
    stock_name: "TSLA",
    price: 820.5,
    much: 10,
    buy_sale: TradeType.Buy,
    date: "2025-06-01T09:30:00Z"
  },
  {
    id: 2,
    account_number: 10123456,
    user_name: "홍길동",
    stock_name: "GOOGL",
    price: 2650.3,
    much: 5,
    buy_sale: TradeType.Sell,
    date: "2025-06-01T10:45:00Z"
  },
  {
    id: 3,
    account_number: 10123456,
    user_name: "홍길동",
    stock_name: "NVDA",
    price: 950.0,
    much: 3,
    buy_sale: TradeType.Buy,
    date: "2025-06-01T11:15:00Z"
  },
  {
    id: 4,
    account_number: 10123456,
    user_name: "홍길동",
    stock_name: "AAPL",
    price: 175.2,
    much: 15,
    buy_sale: TradeType.Sell,
    date: "2025-06-01T12:00:00Z"
  },
  {
    id: 5,
    account_number: 10123456,
    user_name: "홍길동",
    stock_name: "AMZN",
    price: 3300.1,
    much: 2,
    buy_sale: TradeType.Buy,
    date: "2025-06-01T13:20:00Z"
  },
  {
    id: 6,
    account_number: 10123456,
    user_name: "홍길동",
    stock_name: "NFLX",
    price: 500.6,
    much: 4,
    buy_sale: TradeType.Sell,
    date: "2025-06-01T14:05:00Z"
  },
  {
    id: 7,
    account_number: 10123456,
    user_name: "홍길동",
    stock_name: "META",
    price: 290.9,
    much: 8,
    buy_sale: TradeType.Buy,
    date: "2025-06-01T15:10:00Z"
  },
  {
    id: 8,
    account_number: 10123456,
    user_name: "홍길동",
    stock_name: "SBUX",
    price: 98.2,
    much: 12,
    buy_sale: TradeType.Sell,
    date: "2025-06-01T16:00:00Z"
  }
];