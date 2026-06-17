"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

const FT: Record<string, any> = {
  en: {
    rights: "© 2026 ECOMOBILE", privacy: "Privacy", terms: "Terms",
    cols: [
      ["Vehicles", [["BARLAS", "/barlas"], ["NAYMAN", "/nayman"]]],
      ["Network", [["Battery Swap", "/swap"], ["Find a station", "/swap"]]],
      ["Company", [["News", "/news"], ["Investors", "/investors"], ["About", "/about"]]],
      ["Support", [["FAQ", "/faq"], ["Contacts", "/contacts"]]],
    ],
  },
  ru: {
    rights: "© 2026 ECOMOBILE", privacy: "Конфиденциальность", terms: "Условия",
    cols: [
      ["Автомобили", [["BARLAS", "/barlas"], ["NAYMAN", "/nayman"]]],
      ["Сеть", [["Замена батареи", "/swap"], ["Найти станцию", "/swap"]]],
      ["Компания", [["Новости", "/news"], ["Инвесторам", "/investors"], ["О нас", "/about"]]],
      ["Поддержка", [["FAQ", "/faq"], ["Контакты", "/contacts"]]],
    ],
  },
  uz: {
    rights: "© 2026 ECOMOBILE", privacy: "Maxfiylik", terms: "Shartlar",
    cols: [
      ["Avtomobillar", [["BARLAS", "/barlas"], ["NAYMAN", "/nayman"]]],
      ["Tarmoq", [["Batareya almashish", "/swap"], ["Stansiyani topish", "/swap"]]],
      ["Kompaniya", [["Yangiliklar", "/news"], ["Investorlar", "/investors"], ["Biz haqimizda", "/about"]]],
      ["Yordam", [["FAQ", "/faq"], ["Kontaktlar", "/contacts"]]],
    ],
  },
};

export default function Footer() {
  const { language } = (useLanguage?.() as any) || { language: "ru" };
  const ft = FT[language] || FT.en;
  const links: [string, string][] = ft.cols.flatMap((c: any) => c[1]);
  return (
    <footer className="bg-white border-t border-[#e9eaee]">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8 py-6 flex flex-col items-center gap-3 text-center text-[12px] text-[#5c5e62]">
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {links.map(([label, href], i) => (
            <Link key={i} href={href} className="hover:text-[#171a20] transition-colors">{label}</Link>
          ))}
          <Link href="/faq" className="hover:text-[#171a20] transition-colors">{ft.privacy}</Link>
          <Link href="/faq" className="hover:text-[#171a20] transition-colors">{ft.terms}</Link>
        </nav>
        <div className="text-[#8a8d92]">{ft.rights} · EN · RU · UZ</div>
      </div>
    </footer>
  );
}
