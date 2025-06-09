// 타입
import { Input } from "../common/Input"
import { Select } from "../common/Select"
import { Button } from "../common/Button"

// 전달받은 props 타입 설정
type Props = {
  stock : string[];
  selectedStock : string;
  selectedType : string;
  startDate:string;
  endDate:string;
  setSelectedStock : (val:string)=>void
  setSelectedType: (val:string)=>void
  setStartDate : (val:string)=>void
  setEndDate : (val:string)=>void
  resetBtn : ()=>void
}

export default function TradeFilter({
  stock, selectedStock, selectedType, startDate, endDate, setSelectedStock, setSelectedType, setStartDate, setEndDate, resetBtn
}: Props) {

  // 전체 추가
  const stockOption = [{ name: '전체', value: 'all' }]
  stock.forEach(i => {
    stockOption.push({ name: i, value: i })
  })

  return (
    <div className="bg-white px-4 py-3 rounded-lg shadow-sm mb-4 space-y-3">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 flex-1">
          <label className="w-16 text-sm text-gray-600 text-left">거래유형</label>
          <Select
            option={[
              { name: "전체", value: "all" },
              { name: "구매", value: "구매" },
              { name: "판매", value: "판매" },
            ]}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 flex-1">
          <label className="w-16 text-sm text-gray-600 text-left">종목</label>
          <Select
            option={stockOption}
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 flex-1">
          <label className="w-16 text-sm text-gray-600 text-left">시작일</label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 flex-1">
          <label className="w-16 text-sm text-gray-600 text-left">종료일</label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          name="초기화"
          onClick={resetBtn}
          className="bg-gray-100 hover:bg-gray-200 text-sm px-4 py-2 rounded"
        />
      </div>
    </div>
  )
}