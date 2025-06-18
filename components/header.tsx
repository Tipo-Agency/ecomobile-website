"use client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Menu, ChevronDown } from "lucide-react"
import { useMobile } from '@/hooks/use-mobile'
import { useState } from "react"
import { getAllModels } from "@/lib/models-data"

export default function Header() {
  const pathname = usePathname()
  const { language, setLanguage } = useLanguage()
  const [isModelsOpen, setIsModelsOpen] = useState(false)
  const isMobile = useMobile()

  const modelsData = getAllModels()

  const translations = {
    ru: {
      nav: {
        home: "Главная",
        about: "О нас",
        investors: "Инвесторам",
        contacts: "Контакты",
        models: {
          title: "Модели",
          ecotruck: "EcoTruck",
          pony: "Pony",
          brumby: "Brumby",
        },
      },
      contact: "Связаться",
    },
    uz: {
      nav: {
        home: "Bosh sahifa",
        about: "Biz haqimizda",
        investors: "Investorlar uchun",
        contacts: "Kontaktlar",
        models: {
          title: "Modellar",
          ecotruck: "EcoTruck",
          pony: "Pony",
          brumby: "Brumby",
        },
      },
      contact: "Bog'lanish",
    },
    en: {
      nav: {
        home: "Home",
        about: "About",
        investors: "For Investors",
        contacts: "Contacts",
        models: {
          title: "Models",
          ecotruck: "EcoTruck",
          pony: "Pony",
          brumby: "Brumby",
        },
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

        {isMobile ? (
          // Mobile menu and Language Toggle (visible on small screens)
          <div className="flex items-center gap-2">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ru">RU</SelectItem>
                <SelectItem value="uz">UZ</SelectItem>
                <SelectItem value="en">EN</SelectItem>
              </SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm">
                <SheetHeader>
                  <SheetTitle className="sr-only">Мобильное меню</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 pt-8">
                  <Link
                    href="/"
                    className={`transition-colors text-lg ${isActive("/") ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"
                      }`}
                  >
                    {t.nav.home}
                  </Link>
                  <div className="flex flex-col space-y-2">
                    <div
                      onClick={() => setIsModelsOpen(!isModelsOpen)}
                      className={`transition-colors text-lg cursor-pointer flex items-center justify-between ${pathname.startsWith("/models") ? "text-green-600 font-medium" : "text-gray-700"
                        }`}
                    >
                      {t.nav.models.title}
                      <ChevronDown className={`h-5 w-5 transition-transform ${isModelsOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {isModelsOpen && (
                      <div className="pl-4 space-y-2">
                        {modelsData.map((model) => (
                          <Link
                            key={model.id}
                            href={`/models#${model.id}`}
                            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                          >
                            <Image src={model.image} alt={model.translations[language as keyof typeof model.translations].name} width={40} height={40} className="rounded-md" />
                            <span>{model.translations[language as keyof typeof model.translations].name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  <Link
                    href="/about"
                    className={`transition-colors text-lg ${isActive("/about") ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"
                      }`}
                  >
                    {t.nav.about}
                  </Link>
                  <Link
                    href="/investors"
                    className={`transition-colors text-lg ${isActive("/investors") ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"
                      }`}
                  >
                    {t.nav.investors}
                  </Link>
                  <Link
                    href="/contacts"
                    className={`transition-colors text-lg ${isActive("/contacts") ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"
                      }`}
                  >
                    {t.nav.contacts}
                  </Link>
                  <Button className="bg-green-600 w-full mt-4" asChild>
                    <Link href="/contacts">{t.contact}</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          // Desktop navigation and Language Toggle (hidden on small screens)
          <>
            <nav className="flex items-center space-x-4">
              <Link
                href="/"
                className={`transition-colors ${isActive("/") ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"
                  }`}
              >
                {t.nav.home}
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className={`transition-colors flex items-center gap-1 ${pathname.startsWith("/models") ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600 border-o"}`}
                  >
                    {t.nav.models.title}
                    <ChevronDown className="h-4 w-4" />
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 p-2 ">
                  {modelsData.map((model) => (
                    <DropdownMenuItem key={model.id} asChild>
                      <Link href={`/models#${model.id}`} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                        <Image src={model.image} alt={model.translations[language as keyof typeof model.translations].name} width={40} height={40} className="rounded-md" />
                        <span>{model.translations[language as keyof typeof model.translations].name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                href="/about"
                className={`transition-colors ${isActive("/about") ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"
                  }`}
              >
                {t.nav.about}
              </Link>
              <Link
                href="/investors"
                className={`transition-colors ${isActive("/investors") ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"
                  }`}
              >
                {t.nav.investors}
              </Link>
              <Link
                href="/contacts"
                className={`transition-colors ${isActive("/contacts") ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"
                  }`}
              >
                {t.nav.contacts}
              </Link>
            </nav>

            <div className="flex items-center space-x-2">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ru">RU</SelectItem>
                  <SelectItem value="uz">UZ</SelectItem>
                  <SelectItem value="en">EN</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-green-600" asChild>
                <Link href="/contacts">{t.contact}</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}