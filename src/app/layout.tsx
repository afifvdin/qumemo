import type { Metadata } from "next";
import { Nunito, Noto_Naskh_Arabic } from "next/font/google";
import "../styles/globals.css";
import { ReactQueryProvider } from "@/components/react-query-provider";
import { Toaster } from "@/components/ui/sonner";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const notoArab = Noto_Naskh_Arabic({
  variable: "--font-noto-arab",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Qumemo",
  description: "Quran Memorize",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/qumemo.png" type="image/png" sizes="any" />
      <body className={`${nunito.variable} ${notoArab.variable} antialiased`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
