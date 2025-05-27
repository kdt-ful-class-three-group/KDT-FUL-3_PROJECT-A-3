import { StockSection } from "@/components/home/StockSection"
import { NewsSection } from "@/components/home/NewsSection";

export default function Home() {

  return (
    <div>
      <div>
        <h1>홈페이지</h1>
      </div>

      <div>
        <StockSection />
      </div>

      <div>
        <NewsSection />
      </div>
    </div>
  )
}