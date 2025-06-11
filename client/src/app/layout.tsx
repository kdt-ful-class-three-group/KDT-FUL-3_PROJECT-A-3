import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css'
import SessionWrapper from "@/components/session/SessionWrapper";
import { ReduxProvider } from "./provider";
import ClientLayout from "@/components/common/ClientLayout";

export const metadata: Metadata = {
  title: "주린이 공원",
  description: "주식에 갓 입문하는 주린이들을 위한 웹 사이트",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <SessionWrapper>
              <ClientLayout>
                {children}
              </ClientLayout>
          </SessionWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}