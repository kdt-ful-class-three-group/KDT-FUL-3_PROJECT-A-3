import { Section } from "../common/Section";

export function StockSection() {
  return (
    <Section
      title="주식"
      description="주식 시장의 최신 동향과 정보를 확인하세요."
      children={<p>주식 섹션 내용이 여기에 들어갑니다.</p>}
    />
  );
}