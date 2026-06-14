"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV: [string, string][] = [
  ["/barlas", "BARLAS"],
  ["/nayman", "NAYMAN"],
  ["/swap", "Battery Swap"],
  ["/news", "News"],
  ["/investors", "Investors"],
];

export default function Header() {
  const path = usePathname();
  const [s, setS] = useState(false);
  const [o, setO] = useState(false);
  useEffect(() => {
    const f = () => setS(window.scrollY > 20);
    window.addEventListener("scroll", f);
    f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={"fixed top-0 inset-x-0 z-50 transition-all duration-500 " + (s ? "bg-white/80 backdrop-blur-xl border-b border-[#eef0f3]" : "")}>
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-5 md:px-8" style={{ paddingBlock: s ? 12 : 18 }}>
        <Link href="/" className="flex items-center">
          <img src="/images/logo.svg" alt="ECOMOBILE" className="h-[18px] md:h-[24px] w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map(([p, n]) => (
            <Link key={p} href={p} className={"text-[.86rem] transition-colors " + (path === p ? "text-green font-medium" : "text-[#4b5563] hover:text-black")}>{n}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <Link href="/contacts" className="hidden sm:inline-flex rounded-full bg-black text-white px-4 py-2 text-[.82rem] hover:bg-neutral-800 transition-colors">Become a Partner</Link>
          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setO((v) => !v)} aria-label="Menu">
            <span className="h-0.5 w-5 bg-black" /><span className="h-0.5 w-5 bg-black" />
          </button>
        </div>
      </div>
      {o && (
        <nav className="md:hidden border-t border-[#eef0f3] bg-white">
          <div className="flex flex-col px-6 py-4">
            {NAV.map(([p, n]) => (
              <Link key={p} href={p} onClick={() => setO(false)} className="py-3 text-lg">{n}</Link>
            ))}
            <Link href="/faq" onClick={() => setO(false)} className="py-3 text-lg">FAQ</Link>
            <Link href="/contacts" onClick={() => setO(false)} className="py-3 text-lg text-green">Become a Partner</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
