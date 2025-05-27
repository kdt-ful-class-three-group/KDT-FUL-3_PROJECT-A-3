import { Header } from "@/components/common/menu/Header";
import { StockSection } from "@/components/home/StockSection"
import { NewsSection } from "@/components/home/NewsSection";

export default function Home() {

  return (
    <div>
      <div>
        <StockSection />
      </div>

      <div>
        <NewsSection />
      </div>
    </div>
  )
}