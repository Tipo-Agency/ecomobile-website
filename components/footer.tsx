"use client";
import Link from "next/link";

const COLS: [string, [string, string][]][] = [
  ["Vehicles", [["BARLAS", "/barlas"], ["NAYMAN", "/nayman"]]],
  ["Network", [["Battery Swap", "/swap"], ["News", "/news"]]],
  ["Company", [["Investors", "/investors"], ["Contacts", "/contacts"]]],
];

export default function Footer() {
  return (
    <footer className="border-t border-[#eef0f3] pt-16 pb-10">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 grid md:grid-cols-2 gap-10">
        <div>
          <Link href="/" className="inline-flex"><img src="/images/logo.svg" alt="ECOMOBILE" className="h-7 w-auto" /></Link>
          <p className="muted mt-4 max-w-xs">A green-transport platform for the future of mobility.</p>
        </div>
        <div className="grid grid-cols-3 gap-6 text-sm">
          {COLS.map(([h, items], i) => (
            <div key={i}>
              <h4 className="font-semibold mb-3">{h}</h4>
              {items.map(([x, href], j) => (
                <Link key={j} href={href} className="block py-1.5 muted hover:text-green">{x}</Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 mt-12 pt-6 border-t border-[#eef0f3] flex flex-wrap justify-between gap-3 text-xs text-[#9aa1ab]">
        <span>© 2026 ECOMOBILE</span><span>Green Transport Platform · Central Asia</span>
      </div>
    </footer>
  );
}
