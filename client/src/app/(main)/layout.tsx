// app/(main)/layout.tsx
import { Header } from "@/components/common/menu/Header";
import startIntro from "./utils/startIntro";

export default function MainLayout({ children }: { children: React.ReactNode }) {


    return (
    <div id="simulation" className="max-w-xl w-full mx-auto px-4 mt-[5%]">
      <Header />
      {children}
    </div>
  );
}