"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";

const VEHICLES = [
  { name: "BARLAS", tag: "Business sedan", from: "259 999 000", img: "/images/barlas-hero.jpg", href: "/barlas" },
  { name: "NAYMAN", tag: "Electric SUV", from: "289 999 000", img: "/images/nayman-hero.jpg", href: "/nayman" },
];
const LINKS: [string, string][] = [
  ["/swap", "Battery Swap"],
  ["/news", "News"],
  ["/investors", "Investors"],
  ["/contacts", "Contacts"],
];
const LANGS: [string, string][] = [["en", "EN"], ["ru", "RU"], ["uz", "UZ"]];

export default function Header() {
  const path = usePathname();
  const { language, setLanguage } = (useLanguage?.() as any) || { language: "en", setLanguage: () => {} };
  const [scrolled, setScrolled] = useState(false);
  const [veh, setVeh] = useState(false);
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

  const isActive = (p: string) => (p === "/" ? path === "/" : path.startsWith(p));

  return (
    <div className="fixed top-0 inset-x-0 z-50">
      {/* top bar */}
      <div
        className="hidden md:block bg-[#0a0b0d] text-white/70 overflow-hidden transition-all duration-500"
        style={{ height: scrolled ? 0 : 38, opacity: scrolled ? 0 : 1 }}
      >
        <div className="mx-auto max-w-[1240px] px-6 h-[38px] flex items-center justify-between text-[12.5px]">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green" style={{ boxShadow: "0 0 8px #10e07f" }} />
            Now delivering across Central Asia — BARLAS &amp; NAYMAN
          </span>
          <div className="flex items-center gap-6">
            <a href="tel:+998000000000" className="hover:text-white transition-colors">+998 00 000 00 00</a>
            <Link href="/swap" className="hover:text-white transition-colors">Find a swap station →</Link>
          </div>
        </div>
      </div>

      {/* main bar */}
      <header className={"transition-all duration-500 " + (scrolled ? "bg-white/85 backdrop-blur-xl border-b border-[#eef0f3] shadow-[0_8px_30px_-20px_rgba(16,24,40,.3)]" : "bg-white/60 backdrop-blur-md")}>
        <div className="mx-auto max-w-[1240px] px-5 md:px-6 flex items-center justify-between" style={{ paddingBlock: scrolled ? 12 : 16 }}>
          <Link href="/" className="flex items-center shrink-0" onClick={() => setMob(false)}>
            <img src="/images/logo.svg" alt="ECOMOBILE" className="h-[19px] md:h-[25px] w-auto" />
          </Link>

          {/* desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <div className="relative" onMouseEnter={() => setVeh(true)} onMouseLeave={() => setVeh(false)}>
              <button className={"flex items-center gap-1.5 rounded-full px-4 py-2 text-[.9rem] transition-colors " + ((isActive("/barlas") || isActive("/nayman") || veh) ? "text-black bg-[#f3f5f7]" : "text-[#4b5563] hover:text-black")}>
                Vehicles
                <svg width="11" height="7" viewBox="0 0 11 7" className={"transition-transform " + (veh ? "rotate-180" : "")}><path d="M1 1l4.5 4.5L10 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
              </button>
              {/* mega menu */}
              <div className={"absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-200 " + (veh ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-1 pointer-events-none")}>
                <div className="w-[640px] rounded-3xl border border-[#eef0f3] bg-white p-3 shadow-[0_40px_80px_-30px_rgba(16,24,40,.4)]">
                  <div className="grid grid-cols-2 gap-3">
                    {VEHICLES.map((v) => (
                      <Link key={v.name} href={v.href} className="group rounded-2xl border border-[#eef0f3] overflow-hidden hover:border-green/40 hover:shadow-[0_24px_50px_-28px_rgba(11,166,120,.5)] transition-all">
                        <div className="relative aspect-[16/10] bg-[#f4f6f8] overflow-hidden">
                          <img src={v.img} alt={v.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ mixBlendMode: "multiply" }} />
                          <span className="absolute top-3 left-3 rounded-full bg-white/85 backdrop-blur px-2.5 py-1 text-[10px] font-semibold tracking-wide">{v.tag}</span>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold tracking-tight">{v.name}</span>
                            <span className="text-green text-sm font-medium opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">Explore →</span>
                          </div>
                          <div className="text-xs text-[#9aa1ab] mt-1">from {v.from} сум</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link href="/swap" className="mt-3 flex items-center justify-between rounded-2xl bg-[#f6f8fa] px-5 py-3.5 text-sm hover:bg-[#eef6f2] transition-colors">
                    <span className="font-medium">One battery network for both — Battery-as-a-Service</span>
                    <span className="text-green font-medium">How swap works →</span>
                  </Link>
                </div>
              </div>
            </div>
            {LINKS.map(([p, n]) => (
              <Link key={p} href={p} className={"rounded-full px-4 py-2 text-[.9rem] transition-colors " + (isActive(p) ? "text-black bg-[#f3f5f7]" : "text-[#4b5563] hover:text-black")}>{n}</Link>
            ))}
          </nav>

          {/* right */}
          <div className="flex items-center gap-2.5">
            {/* language */}
            <div className="relative hidden sm:block" onMouseLeave={() => setLangOpen(false)}>
              <button onClick={() => setLangOpen((v) => !v)} className="flex items-center gap-1 rounded-full border border-[#e4e7ec] px-3 py-2 text-[.78rem] font-medium hover:border-[#cfd4dc] transition-colors">
                {(LANGS.find((l) => l[0] === language) || LANGS[0])[1]}
                <svg width="9" height="6" viewBox="0 0 9 6"><path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" /></svg>
              </button>
              <div className={"absolute right-0 top-full pt-2 transition-all " + (langOpen ? "opacity-100 visible" : "opacity-0 invisible")}>
                <ul className="min-w-[120px] rounded-xl border border-[#eceef1] bg-white p-1.5 shadow-xl">
                  {LANGS.map(([code, label]) => (
                    <li key={code}>
                      <button onClick={() => { setLanguage(code); setLangOpen(false); }} className={"w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-[#f5f6f8] " + (language === code ? "text-green font-medium" : "text-[#4b5563]")}>
                        {{ en: "English", ru: "Русский", uz: "O‘zbekcha" }[code]}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link href="/contacts" className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-green text-white px-5 py-2.5 text-[.85rem] font-medium shadow-[0_12px_30px_-12px_rgba(11,166,120,.7)] hover:bg-green-600 transition-colors">
              Order now <span>→</span>
            </Link>
            <button className="lg:hidden flex flex-col gap-[5px] p-2.5 -mr-2" onClick={() => setMob((v) => !v)} aria-label="Menu">
              <span className={"h-0.5 w-6 bg-black rounded transition-transform " + (mob ? "translate-y-[7px] rotate-45" : "")} />
              <span className={"h-0.5 w-6 bg-black rounded transition-opacity " + (mob ? "opacity-0" : "")} />
              <span className={"h-0.5 w-6 bg-black rounded transition-transform " + (mob ? "-translate-y-[7px] -rotate-45" : "")} />
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      <div className={"lg:hidden fixed inset-0 top-0 bg-white transition-all duration-300 " + (mob ? "opacity-100 visible" : "opacity-0 invisible")} style={{ paddingTop: 78 }}>
        <div className="h-full overflow-y-auto px-6 pb-10">
          <div className="grid grid-cols-2 gap-3 mt-2">
            {VEHICLES.map((v) => (
              <Link key={v.name} href={v.href} onClick={() => setMob(false)} className="rounded-2xl border border-[#eef0f3] overflow-hidden">
                <div className="relative aspect-[16/11] bg-[#f4f6f8]"><img src={v.img} className="absolute inset-0 h-full w-full object-cover" style={{ mixBlendMode: "multiply" }} alt={v.name} /></div>
                <div className="p-3"><div className="font-bold">{v.name}</div><div className="text-xs text-[#9aa1ab]">from {v.from} сум</div></div>
              </Link>
            ))}
          </div>
          <nav className="mt-6 flex flex-col divide-y divide-[#eef0f3]">
            {LINKS.map(([p, n]) => (<Link key={p} href={p} onClick={() => setMob(false)} className="py-4 text-xl font-medium">{n}</Link>))}
            <Link href="/faq" onClick={() => setMob(false)} className="py-4 text-xl font-medium">FAQ</Link>
          </nav>
          <Link href="/contacts" onClick={() => setMob(false)} className="mt-6 flex items-center justify-center gap-2 rounded-full bg-green text-white py-4 text-lg font-medium">Order now →</Link>
          <div className="mt-6 flex gap-2">
            {LANGS.map(([code, label]) => (
              <button key={code} onClick={() => setLanguage(code)} className={"flex-1 rounded-xl border py-3 text-sm font-medium " + (language === code ? "border-green text-green" : "border-[#e4e7ec] text-[#4b5563]")}>{label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
