'use client'

import AccountInfo from "@/components/simulation/AccountInfo";
import StockTab from "@/components/simulation/StockTab";
import PageWrapper from "@/components/page/PageWrapper";

export default function Simulation() {

  

  return (
    <PageWrapper>
      <h2>시뮬레이션 페이지</h2>
      <AccountInfo />
      <StockTab />
    </PageWrapper>

  );
}
