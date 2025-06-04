'use client'

import AccountInfo from "@/components/simulation/AccountInfo";
import StockTab from "@/components/simulation/StockTab";
import styles from './SimulationStyles.module.css'

export default function Simulation() {

  

  return (
    <div className={styles.simulation}>
      <h2>시뮬레이션 페이지</h2>
      <AccountInfo />
      <StockTab />
    </div>
  );
}
