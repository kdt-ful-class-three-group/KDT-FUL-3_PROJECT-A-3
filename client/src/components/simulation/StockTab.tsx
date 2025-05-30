import StockShow from "./StockShow"
export default function StockTab(){
  return(
    <div>
      {/* 버튼 - 구매 종목, 관심 종목, 실시간 순위*/}
      {/* 버튼에 따라 보여줄 화면 */}
      <StockShow /> 
    </div>
  )
}