"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

const FT: Record<string, any> = {
  en: {
    tagline: "The electric car that never waits to charge. Two-minute battery swaps and an open energy network, built for Central Asia.",
    nlTitle: "Stay in the loop", nlSub: "New stations, models and BARLAS updates — no spam.",
    emailPh: "Your email", subscribe: "Subscribe", city: "Tashkent, Uzbekistan",
    rights: "© 2026 ECOMOBILE · Green Transport Platform · Central Asia", privacy: "Privacy", terms: "Terms",
    cols: [
      ["Vehicles", [["BARLAS Sedan", "/barlas"], ["NAYMAN SUV", "/nayman"], ["Compare & pricing", "/barlas"]]],
      ["Network", [["Battery Swap", "/swap"], ["Battery-as-a-Service", "/swap"], ["Find a station", "/swap"]]],
      ["Company", [["News", "/news"], ["Investors", "/investors"], ["About", "/about"]]],
      ["Support", [["FAQ", "/faq"], ["Contacts", "/contacts"], ["Become a partner", "/contacts"]]],
    ],
  },
  ru: {
    tagline: "Электромобиль, которому не нужно ждать зарядку. Замена батареи за две минуты и открытая энергосеть для Центральной Азии.",
    nlTitle: "Оставайтесь на связи", nlSub: "Новые станции, модели и новости BARLAS — без спама.",
    emailPh: "Ваш e-mail", subscribe: "Подписаться", city: "Ташкент, Узбекистан",
    rights: "© 2026 ECOMOBILE · Платформа зелёного транспорта · Центральная Азия", privacy: "Конфиденциальность", terms: "Условия",
    cols: [
      ["Автомобили", [["Седан BARLAS", "/barlas"], ["Кроссовер NAYMAN", "/nayman"], ["Сравнить и цены", "/barlas"]]],
      ["Сеть", [["Замена батареи", "/swap"], ["Батарея по подписке", "/swap"], ["Найти станцию", "/swap"]]],
      ["Компания", [["Новости", "/news"], ["Инвесторам", "/investors"], ["О нас", "/about"]]],
      ["Поддержка", [["FAQ", "/faq"], ["Контакты", "/contacts"], ["Стать партнёром", "/contacts"]]],
    ],
  },
  uz: {
    tagline: "Quvvatlashni kutmaydigan elektromobil. Ikki daqiqada batareya almashish va Markaziy Osiyo uchun ochiq energiya tarmog‘i.",
    nlTitle: "Aloqada bo‘ling", nlSub: "Yangi stansiyalar, modellar va BARLAS yangiliklari — spamsiz.",
    emailPh: "Sizning e-mail", subscribe: "Obuna bo‘lish", city: "Toshkent, O‘zbekiston",
    rights: "© 2026 ECOMOBILE · Yashil transport platformasi · Markaziy Osiyo", privacy: "Maxfiylik", terms: "Shartlar",
    cols: [
      ["Avtomobillar", [["BARLAS sedan", "/barlas"], ["NAYMAN krossover", "/nayman"], ["Taqqoslash va narxlar", "/barlas"]]],
      ["Tarmoq", [["Batareya almashish", "/swap"], ["Obunadagi batareya", "/swap"], ["Stansiyani topish", "/swap"]]],
      ["Kompaniya", [["Yangiliklar", "/news"], ["Investorlar", "/investors"], ["Biz haqimizda", "/about"]]],
      ["Yordam", [["FAQ", "/faq"], ["Kontaktlar", "/contacts"], ["Hamkor bo‘lish", "/contacts"]]],
    ],
  },
};

function Social({ d, label, href }: { d: string; label: string; href: string }) {
  return (
    <a href={href} aria-label={label} target="_blank" rel="noreferrer"
      className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-colors">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>
    </a>
  );
}

export default function Footer() {
  const { language } = (useLanguage?.() as any) || { language: "ru" };
  const ft = FT[language] || FT.en;
  return (
    <footer className="relative overflow-hidden bg-[#0a0b0d] text-white">
      {/* glow + rotating logomark accent */}
      <div className="pointer-events-none absolute -top-32 right-[-6%] h-[420px] w-[420px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(11,166,120,.18), transparent 70%)", filter: "blur(40px)" }} />
      <img src="/images/logomark.svg" alt="" className="pointer-events-none absolute -right-24 top-10 w-[340px] opacity-[.06]" style={{ filter: "brightness(0) invert(1)", animation: "spin 40s linear infinite" }} />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        {/* top: brand + newsletter */}
        <div className="grid lg:grid-cols-2 gap-10 pt-20 pb-12 border-b border-white/10">
          <div className="max-w-md">
            <div className="flex items-center gap-2.5">
              <img src="/images/logomark.svg" alt="" className="h-8 w-8" />
              <span className="text-2xl font-extrabold tracking-tight">ECOMOBILE</span>
            </div>
            <p className="mt-5 text-white/55 text-[1.05rem] leading-relaxed">
              {ft.tagline}
            </p>
            <div className="mt-6 flex gap-2.5">
              <Social label="Telegram" href="#" d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
              <Social label="Instagram" href="#" d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5.01-4.74.07-.9.04-1.38.19-1.7.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.8-.32 1.7C3.21 8.5 3.2 8.85 3.2 12s.01 3.5.07 4.74c.04.9.19 1.38.32 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.8.28 1.7.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.38-.19 1.7-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.8.32-1.7.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.38-.32-1.7a2.85 2.85 0 00-.69-1.06 2.85 2.85 0 00-1.06-.69c-.32-.13-.8-.28-1.7-.32C15.5 4.01 15.15 4 12 4zm0 3.06A4.94 4.94 0 1112 17a4.94 4.94 0 010-9.88zm0 1.8a3.14 3.14 0 100 6.28 3.14 3.14 0 000-6.28zm5.15-.95a1.15 1.15 0 11-2.3 0 1.15 1.15 0 012.3 0z" />
              <Social label="YouTube" href="#" d="M23 12s0-3.2-.4-4.74a2.46 2.46 0 00-1.73-1.74C19.32 5.13 12 5.13 12 5.13s-7.32 0-8.87.39A2.46 2.46 0 001.4 7.26C1 8.8 1 12 1 12s0 3.2.4 4.74c.22.85.88 1.52 1.73 1.74 1.55.39 8.87.39 8.87.39s7.32 0 8.87-.39a2.46 2.46 0 001.73-1.74C23 15.2 23 12 23 12zM9.75 15.02V8.98L15 12l-5.25 3.02z" />
            </div>
          </div>

          <div className="lg:justify-self-end w-full max-w-md">
            <h4 className="text-lg font-semibold">{ft.nlTitle}</h4>
            <p className="mt-2 text-white/55 text-sm">{ft.nlSub}</p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" required placeholder={ft.emailPh} className="flex-1 rounded-full bg-white/[.06] border border-white/12 px-5 py-3 text-sm outline-none placeholder:text-white/35 focus:border-green/60" />
              <button className="rounded-full bg-green text-white px-5 py-3 text-sm font-medium hover:bg-green-600 transition-colors">{ft.subscribe}</button>
            </form>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <a href="mailto:sales@ecomobile.world" className="text-white/55 hover:text-green transition-colors">sales@ecomobile.world</a>
              <a href="tel:+998000000000" className="text-white/55 hover:text-green transition-colors">+998 00 000 00 00</a>
              <span className="text-white/40">{ft.city}</span>
              <span className="text-white/40">ecomobile.world</span>
            </div>
          </div>
        </div>

        {/* link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {ft.cols.map(([h, items]: [string, [string, string][]], i: number) => (
            <div key={i}>
              <h4 className="text-[12px] font-semibold uppercase tracking-[.16em] text-white/40">{h}</h4>
              <ul className="mt-4 space-y-2.5">
                {items.map(([x, href], j) => (
                  <li key={j}><Link href={href} className="text-[.95rem] text-white/70 hover:text-white transition-colors">{x}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-7 border-t border-white/10 text-[13px] text-white/40">
          <span>{ft.rights}</span>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="hover:text-white transition-colors">{ft.privacy}</Link>
            <Link href="/faq" className="hover:text-white transition-colors">{ft.terms}</Link>
            <span className="text-white/30">EN · RU · UZ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
