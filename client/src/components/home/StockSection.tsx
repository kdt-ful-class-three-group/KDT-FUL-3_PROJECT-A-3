import { Button } from "../common/Button";
import { Section } from "../common/Section";

export function StockSection() {
  return (
    <Section
      title="주식"
      // description="주식 시장의 최신 동향과 정보를 확인하세요."
      children={
      <div>
        <Button variant="icon" icon="plus"/>
        <p>계좌 생성</p>
      </div>
    }
    />
  );
}