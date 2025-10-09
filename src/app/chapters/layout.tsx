"use client";

import { localStorageProvider } from "@/lib/storage";
import { SWRConfig } from "swr";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ provider: localStorageProvider }}>{children}</SWRConfig>
  );
}
