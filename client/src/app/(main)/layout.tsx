import { Header } from "@/components/common/menu/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main>
      {children}
      </main>
    </div>
  );
}