import type { Metadata } from "next";
import { Geist } from "next/font/google";
import SessionProvider from "@/components/shared/SessionProvider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Shop — ร้านค้าออนไลน์",
  description: "ร้านค้าออนไลน์ที่รวมสินค้าหลากหลาย ราคาดี คุณภาพเยี่ยม",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
