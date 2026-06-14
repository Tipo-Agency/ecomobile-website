"use client";
import type { ReactNode } from "react";
import { useLanguage } from "@/contexts/language-context";
import { T, L } from "@/components/eco-ui";

/* Bridges the global language switcher (useLanguage) into the page-content
   dictionary context (L) that all eco-ui sections read from. */
export default function I18nBridge({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const dict = (T as any)[language] || (T as any).en;
  return <L.Provider value={dict}>{children}</L.Provider>;
}
