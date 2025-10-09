import { Noto_Naskh_Arabic, Nunito } from "next/font/google";
import "../styles/globals.css";
import type { AppProps } from "next/app";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const notoArab = Noto_Naskh_Arabic({
  variable: "--font-noto-arab",
  subsets: ["arabic"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${nunito.variable} ${notoArab.variable} max-h-screen overflow-hidden antialiased`}
    >
      <Component {...pageProps} />;
    </main>
  );
}
