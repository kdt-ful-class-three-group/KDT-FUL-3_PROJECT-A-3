import { Section } from "../common/Section";

export function NewsSection() {
  return (
    <Section
      title="뉴스"
      description="최신 뉴스와 업데이트를 확인하세요."
      children={<p>뉴스 섹션 내용이 여기에 들어갑니다.</p>}
    />
  )
}