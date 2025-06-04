// app/(main)/layout.tsx
import { Header } from "@/components/common/menu/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}