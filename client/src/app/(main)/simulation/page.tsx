import AccountInfo from "@/components/simulation/AccountInfo";
import StockTab from "@/components/simulation/StockTab";

export default function Simulation() {
  return (
    <div>
      <h1>시뮬레이션 페이지</h1>
      <p>여기 시뮬레이션 내용이 들어갑니다.</p>
      {/* 여기에 시뮬레이션 컴포넌트나 기능을 추가할 수 있습니다. */}
      <AccountInfo />
      <StockTab />
    </div>
  );
}
