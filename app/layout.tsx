import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ECOMOBILE — Battery-swap electric cars for Central Asia",
  description:
    "Электромобиль с технологией быстрой замены батареи. Инновационное решение для экологичной доставки и городских перевозок.",
  icons: {
    icon: "/images/logomark.svg",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
        <Toaster />
      </body>
    </html>
  )
}
