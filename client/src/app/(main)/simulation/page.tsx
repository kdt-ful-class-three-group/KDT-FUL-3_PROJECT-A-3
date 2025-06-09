'use client'

import AccountInfo from "@/components/simulation/AccountInfo";
import StockTab from "@/components/simulation/StockTab";

export default function Simulation() {

  return (
    <div className="max-w-xl w-full mx-auto px-4 mt-[5%]">
      <AccountInfo />
      <StockTab />
    </div>
  );
}
