"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";

const VEHICLES = [
  { key: "barlas", name: "BARLAS", from: "259 999 000", img: "/images/barlas-hero.jpg", href: "/barlas" },
  { key: "nayman", name: "NAYMAN", from: "289 999 000", img: "/images/nayman-hero.jpg", href: "/nayman" },
];
const LANGS: [string, string][] = [["en", "EN"], ["ru", "RU"], ["uz", "UZ"]];

const HT: Record<string, any> = {
  en: { links: { swap: "Battery Swap", news: "News", investors: "Investors", contacts: "Contacts" }, faq: "FAQ", from: "from", order: "Order", tags: { barlas: "Business sedan", nayman: "Electric SUV" } },
  ru: { links: { swap: "Замена батареи", news: "Новости", investors: "Инвесторам", contacts: "Контакты" }, faq: "FAQ", from: "от", order: "Заказать", tags: { barlas: "Бизнес-седан", nayman: "Электро-кроссовер" } },
  uz: { links: { swap: "Batareya almashish", news: "Yangiliklar", investors: "Investorlar", contacts: "Kontaktlar" }, faq: "FAQ", from: "dan", order: "Buyurtma", tags: { barlas: "Biznes-sedan", nayman: "Elektr krossover" } },
};

export default function Header() {
  const path = usePathname();
  const { language, setLanguage } = (useLanguage?.() as any) || { language: "en", setLanguage: () => {} };
  const tr = HT[language] || HT.en;
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", f);
    f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mob ? "hidden" : "";
  }, [mob]);

  const isActive = (p: string) => path.startsWith(p);
  const NAV: [string, string][] = [
    ["/barlas", "BARLAS"], ["/nayman", "NAYMAN"],
    ["/swap", tr.links.swap], ["/news", tr.links.news], ["/investors", tr.links.investors],
  ];

  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <header className={"transition-all duration-300 " + (scrolled ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,.06)]" : "bg-transparent")}>
        <div className="relative mx-auto max-w-[1280px] px-4 md:px-6 flex items-center justify-between" style={{ paddingBlock: 14 }}>
          {/* left nav (desktop) / spacer (mobile) */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {NAV.map(([p, n]) => (
              <Link key={p} href={p} className={"rounded-md px-3 py-1.5 text-[14px] font-medium transition-colors " + (isActive(p) ? "text-[#171a20]" : "text-[#393c41] hover:text-[#171a20]")}>{n}</Link>
            ))}
          </nav>
          <div className="lg:hidden w-9" />

          {/* centered wordmark */}
          <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center" onClick={() => setMob(false)}>
            <img src="/images/logo.svg" alt="ECOMOBILE" className="h-[18px] md:h-[22px] w-auto" />
          </Link>

          {/* right utilities */}
          <div className="flex items-center gap-1">
            <div className="relative hidden sm:block" onMouseLeave={() => setLangOpen(false)}>
              <button onClick={() => setLangOpen((v) => !v)} className="rounded-md px-3 py-1.5 text-[14px] font-medium text-[#393c41] hover:text-[#171a20] transition-colors">
                {(LANGS.find((l) => l[0] === language) || LANGS[0])[1]}
              </button>
              <div className={"absolute right-0 top-full pt-2 transition-all " + (langOpen ? "opacity-100 visible" : "opacity-0 invisible")}>
                <ul className="min-w-[130px] rounded-lg bg-white p-1.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,.25)]">
                  {LANGS.map(([code]) => (
                    <li key={code}>
                      <button onClick={() => { setLanguage(code); setLangOpen(false); }} className={"w-full rounded-md px-3 py-2 text-left text-[14px] hover:bg-[#f4f4f4] " + (language === code ? "text-[#171a20] font-medium" : "text-[#393c41]")}>
                        {{ en: "English", ru: "Русский", uz: "O‘zbekcha" }[code]}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link href="/contacts" className="hidden sm:inline-flex rounded-md px-3 py-1.5 text-[14px] font-medium text-[#393c41] hover:text-[#171a20] transition-colors">{tr.order}</Link>
            <button className="lg:hidden flex flex-col gap-[5px] p-2.5 -mr-2" onClick={() => setMob((v) => !v)} aria-label="Menu">
              <span className={"h-0.5 w-6 bg-[#171a20] rounded transition-transform " + (mob ? "translate-y-[7px] rotate-45" : "")} />
              <span className={"h-0.5 w-6 bg-[#171a20] rounded transition-opacity " + (mob ? "opacity-0" : "")} />
              <span className={"h-0.5 w-6 bg-[#171a20] rounded transition-transform " + (mob ? "-translate-y-[7px] -rotate-45" : "")} />
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      <div className={"lg:hidden fixed inset-0 z-[60] bg-white flex flex-col transition-opacity duration-300 " + (mob ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none")}>
        <div className="flex items-center justify-between px-5 h-[58px] border-b border-[#eef0f3] shrink-0">
          <Link href="/" onClick={() => setMob(false)} className="flex items-center"><img src="/images/logo.svg" alt="ECOMOBILE" className="h-[19px] w-auto" /></Link>
          <button onClick={() => setMob(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full hover:bg-[#f3f5f7] -mr-2 transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#171a20" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <nav className="flex flex-col divide-y divide-[#eef0f3]">
            {([["/barlas", "BARLAS"], ["/nayman", "NAYMAN"], ["/swap", tr.links.swap], ["/news", tr.links.news], ["/investors", tr.links.investors], ["/contacts", tr.links.contacts], ["/faq", tr.faq]] as [string, string][]).map(([p, n]) => (
              <Link key={p} href={p} onClick={() => setMob(false)} className="py-4 text-[19px] font-medium text-[#171a20]">{n}</Link>
            ))}
          </nav>
          <Link href="/contacts" onClick={() => setMob(false)} className="mt-6 flex items-center justify-center rounded-md bg-[#171a20] text-white py-3.5 text-[15px] font-medium">{tr.order}</Link>
          <div className="mt-5 flex gap-2">
            {LANGS.map(([code, label]) => (
              <button key={code} onClick={() => { setLanguage(code); setMob(false); }} className={"flex-1 rounded-md border py-2.5 text-sm font-medium " + (language === code ? "border-[#171a20] text-[#171a20]" : "border-[#e4e7ec] text-[#393c41]")}>{label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
