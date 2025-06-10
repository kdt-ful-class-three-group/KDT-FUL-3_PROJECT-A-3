import React from 'react';

type SummaryProps = {
  totalValue: number;
  investedAmount: number;
};

export const Summary: React.FC<SummaryProps> = ({ totalValue, investedAmount }) => {
  const profit = totalValue - investedAmount;
  const profitRate = investedAmount === 0 ? '0.00' : ((profit / investedAmount) * 100).toFixed(2);

  return (
      <div className="w-full max-w-md mx-auto p-4 font-bold space-y-4">
        <SummaryRow label="총 자산" value={`${totalValue.toLocaleString()}풀`} />
        <SummaryRow label="투자금액" value={`${investedAmount.toLocaleString()}풀`} />
        <SummaryRow
            label="평가손익"
            value={
              <span className={profit >= 0 ? 'text-red-500' : 'text-blue-500'}>
            {profit.toLocaleString()}원
          </span>
            }
        />
        <SummaryRow
            label="수익률"
            value={
              <span className={profit >= 0 ? 'text-red-500' : 'text-blue-500'}>
                ({profitRate}%)</span>
            }
        />
        </div>

  );
};

type SummaryRowProps = {
  label: string;
  value: React.ReactNode;
};

const SummaryRow: React.FC<SummaryRowProps> = ({ label, value }) => (
    <div className="flex justify-between w-full">
      <h3>{label}</h3>
      <div className="text-right">{value}</div>
    </div>
);