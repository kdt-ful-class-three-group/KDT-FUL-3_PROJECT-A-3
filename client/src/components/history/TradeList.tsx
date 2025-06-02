import { tradeItems } from "../portfolio/mocks/tradeItem";
import TradeFilter from "./TradeFilter";
import TradeTable from "./TradeTable";

export default function TradeList(){
  return(
    <div>
      <TradeFilter />
      <TradeTable trades={tradeItems}/>
    </div>
  )
}
