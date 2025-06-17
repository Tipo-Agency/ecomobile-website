"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { language } = useLanguage()

  const translations = {
    ru: {
      description: "Инновационные решения для экологичного транспорта",
      product: "Продукт",
      technology: "Технология",
      advantages: "Преимущества",
      applications: "Применение",
      company: "Компания",
      about: "О нас",
      investors: "Инвесторам",
      contacts: "Контакты",
      contactsSection: "Контакты",
      email: "info@ecomobile.world",
      phone: "+998 99 096 99 69",
      address: "Ташкент, Узбекистан",
      rights: "© 2025 EcoMobile. Все права защищены.",
    },
    uz: {
      description: "Ekologik transport uchun innovatsion yechimlar",
      product: "Mahsulot",
      technology: "Texnologiya",
      advantages: "Afzalliklar",
      applications: "Qo'llash",
      company: "Kompaniya",
      about: "Biz haqimizda",
      investors: "Investorlar",
      contacts: "Kontaktlar",
      contactsSection: "Kontaktlar",
      email: "info@ecomobile.world",
      phone: "+998 99 096 99 69",
      address: "Toshkent, O'zbekiston",
      rights: "© 2025 EcoMobile. Barcha huquqlar himoyalangan.",
    },
    en: {
      description: "Innovative solutions for eco-friendly transport",
      product: "Product",
      technology: "Technology",
      advantages: "Advantages",
      applications: "Applications",
      company: "Company",
      about: "About",
      investors: "Investors",
      contacts: "Contacts",
      contactsSection: "Contacts",
      email: "info@ecomobile.world",
      phone: "+998 99 096 99 69",
      address: "Tashkent, Uzbekistan",
      rights: "© 2025 EcoMobile. All rights reserved.",
    },
  }

  const t = translations[language as keyof typeof translations] || translations.ru

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/logo-white.png" alt="EcoMobile" width={120} height={32} className="h-8 w-auto" />
            </div>
            <p className="text-gray-400">{t.description}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t.product}</h3>
            <div className="space-y-2 text-gray-400">
              <Link href="/technology" className="block hover:text-white transition-colors">
                {t.technology}
              </Link>
              <Link href="/advantages" className="block hover:text-white transition-colors">
                {t.advantages}
              </Link>
              <Link href="/applications" className="block hover:text-white transition-colors">
                {t.applications}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t.company}</h3>
            <div className="space-y-2 text-gray-400">
              <Link href="/about" className="block hover:text-white transition-colors">
                {t.about}
              </Link>
              <Link href="/investors" className="block hover:text-white transition-colors">
                {t.investors}
              </Link>
              <Link href="/contacts" className="block hover:text-white transition-colors">
                {t.contacts}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t.contactsSection}</h3>
            <div className="space-y-2 text-gray-400">
              <p><a href={`mailto:${t.email}`}>{t.email}</a><br /></p>
              <p><a href={`tel:${t.phone}`}>{t.phone}</a></p>
              <p>{t.address}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>{t.rights}</p>
        </div>
      </div>
    </footer>
  )
}
