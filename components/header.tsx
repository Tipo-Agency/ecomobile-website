"use client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

export default function Header() {
  const pathname = usePathname()
  const { language, setLanguage } = useLanguage()

  const translations = {
    ru: {
      nav: {
        home: "Главная",
        about: "О нас",
        investors: "Инвесторам",
        contacts: "Контакты",
        buy: "Купить",
      },
      contact: "Связаться",
    },
    uz: {
      nav: {
        home: "Bosh sahifa",
        about: "Biz haqimizda",
        investors: "Investorlar uchun",
        contacts: "Kontaktlar",
        buy: "Sotib olish",
      },
      contact: "Bog'lanish",
    },
    en: {
      nav: {
        home: "Home",
        about: "About",
        investors: "For Investors",
        contacts: "Contacts",
        buy: "Buy",
      },
      contact: "Contact",
    },
  }

  const t = translations[language as keyof typeof translations] || translations.ru

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="border-b border-b-[0.25px] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo-main.png" alt="EcoMobile" width={150} height={40} className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`transition-colors ${
              isActive("/") ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"
            }`}
          >
            {t.nav.home}
          </Link>
          <Link
            href="/about"
            className={`transition-colors ${
              isActive("/about") ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"
            }`}
          >
            {t.nav.about}
          </Link>
          <Link
            href="/investors"
            className={`transition-colors ${
              isActive("/investors") ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"
            }`}
          >
            {t.nav.investors}
          </Link>
          <Link
            href="/buy"
            className={`transition-colors ${
              isActive("/buy") ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"
            }`}
          >
            {t.nav.buy}
          </Link>
          <Link
            href="/contacts"
            className={`transition-colors ${
              isActive("/contacts") ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"
            }`}
          >
            {t.nav.contacts}
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Select  value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ru">RU</SelectItem>
              <SelectItem value="uz">UZ</SelectItem>
              <SelectItem value="en">EN</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild>
            <Link href="/contacts">{t.contact}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
