import {
  SiTesla,
  SiApple,
  SiNvidia,
  SiAmazon,
  SiStarbucks,
  SiNetflix,
  SiGoogle,
} from "react-icons/si";
import { FaMeta } from "react-icons/fa6";

export const iconMap: Record<string, () => JSX.Element> = {
  TSLA: () => <SiTesla className="text-[#cc0000]" />,
  AAPL: () => <SiApple className="text-[#a2aaad]" />,
  NVDA: () => <SiNvidia className="text-[#76b900]" />,
  AMZN: () => <SiAmazon className="text-[#ff9900]" />,
  SBUX: () => <SiStarbucks className="text-[#00704a]" />,
  NFLX: () => <SiNetflix className="text-[#e50914]" />,
  GOOGL: () => <SiGoogle className="text-[#4285f4]" />,
  META: () => <FaMeta className="text-[#0064e0]" />,
};