import { useContext } from "react";
import { LanguageContext, LanguageContextType } from "@/contexts/language-context";

export function useTranslation(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used within LanguageProvider");
  return ctx;
}
