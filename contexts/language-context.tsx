"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "ru" | "uz" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru")

  // Загружаем сохраненный язык при инициализации
  useEffect(() => {
    const savedLanguage = localStorage.getItem("ecomobile-language") as Language
    if (savedLanguage && ["ru", "uz", "en"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Сохраняем язык в localStorage при изменении
  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("ecomobile-language", newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
