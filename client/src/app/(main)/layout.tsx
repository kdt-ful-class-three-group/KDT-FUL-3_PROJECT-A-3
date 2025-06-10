import { Header } from "@/components/common/menu/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {


    return (
    <div id="simulation" className="max-w-xl w-full mx-auto px-4 mt-[5%]">
      <Header />
      {children}
    </div>
  );
}