/* News content — shared by the newsroom list, the article pages and generateStaticParams.
   Plain data (no "use client") so it can be imported from both server routes and client UI.
   All copy is localized (en/ru/uz); use pick()/pickArr() to read for the active language. */

export type Lang = "en" | "ru" | "uz";
export type Loc = { en: string; ru: string; uz: string };
export type LocArr = { en: string[]; ru: string[]; uz: string[] };
export type LocPairs = { en: [string, string][]; ru: [string, string][]; uz: [string, string][] };

export type NewsItem = {
  slug: string;
  cat: string;        // stable category key (see CAT_LABELS)
  img: string;
  date: Loc;
  read: Loc;
  title: Loc;
  excerpt: Loc;
  body: LocArr;
  quote?: Loc;
  facts?: LocPairs;
};

export const pick = (loc: any, lang: string): string =>
  (loc && (loc[lang] ?? loc.ru ?? loc.en)) ?? "";

export const pickArr = (loc: any, lang: string): string[] =>
  (loc && ((loc[lang] && loc[lang].length ? loc[lang] : (loc.ru && loc.ru.length ? loc.ru : loc.en)))) ?? [];

export const CAT_LABELS: Record<string, Loc> = {
  Launch: { en: "Launch", ru: "Запуск", uz: "Ishga tushirish" },
  Vehicles: { en: "Vehicles", ru: "Автомобили", uz: "Avtomobillar" },
  Network: { en: "Network", ru: "Сеть", uz: "Tarmoq" },
  Platform: { en: "Platform", ru: "Платформа", uz: "Platforma" },
  Partners: { en: "Partners", ru: "Партнёры", uz: "Hamkorlar" },
  Energy: { en: "Energy", ru: "Энергетика", uz: "Energetika" },
};

export const NEWS_UI: Record<string, any> = {
  en: { eyebrow: "Newsroom", title: "News & updates", sub: "Launches, stations and milestones across the ECOMOBILE platform.", all: "All", featured: "Featured", readMore: "Read more →", empty: "No stories in this category yet.", nlTitle: "Get ECOMOBILE updates", nlSub: "New stations, models and milestones — straight to your inbox.", subscribe: "Subscribe", emailPh: "Your email", backShort: "Newsroom", back: "Back to newsroom", more: "More from the newsroom", loop: "Stay in the loop", notFound: "Story not found", moved: "This article may have moved." },
  ru: { eyebrow: "Пресс-центр", title: "Новости и обновления", sub: "Запуски, станции и вехи платформы ECOMOBILE.", all: "Все", featured: "Главное", readMore: "Читать →", empty: "В этой категории пока нет материалов.", nlTitle: "Подпишитесь на обновления ECOMOBILE", nlSub: "Новые станции, модели и вехи — прямо на почту.", subscribe: "Подписаться", emailPh: "Ваш e-mail", backShort: "Пресс-центр", back: "Назад в пресс-центр", more: "Ещё из пресс-центра", loop: "Оставайтесь на связи", notFound: "Материал не найден", moved: "Возможно, статья была перемещена." },
  uz: { eyebrow: "Matbuot markazi", title: "Yangiliklar va yangilanishlar", sub: "ECOMOBILE platformasi bo‘ylab ishga tushirishlar, stansiyalar va bosqichlar.", all: "Hammasi", featured: "Asosiy", readMore: "Batafsil →", empty: "Bu turkumda hozircha materiallar yo‘q.", nlTitle: "ECOMOBILE yangilanishlarini oling", nlSub: "Yangi stansiyalar, modellar va bosqichlar — to‘g‘ridan-to‘g‘ri pochtangizga.", subscribe: "Obuna bo‘lish", emailPh: "Sizning e-mail", backShort: "Matbuot markazi", back: "Matbuot markaziga qaytish", more: "Matbuot markazidan yana", loop: "Aloqada bo‘ling", notFound: "Material topilmadi", moved: "Maqola ko‘chirilgan bo‘lishi mumkin." },
};

export const NEWS: NewsItem[] = [
  {
    slug: "first-swap-stations-tashkent",
    cat: "Launch",
    img: "/images/station-1.png",
    date: { en: "Jun 2026", ru: "Июнь 2026", uz: "2026-yil iyun" },
    read: { en: "4 min read", ru: "4 мин", uz: "4 daq" },
    title: {
      en: "First swap stations go live in Tashkent",
      ru: "Первые станции замены заработали в Ташкенте",
      uz: "Toshkentda birinchi almashish stansiyalari ishga tushdi",
    },
    excerpt: {
      en: "The first ECOMOBILE battery-swap stations open across the capital, cutting charging downtime from forty minutes to two — and proving the model at city scale.",
      ru: "Первые станции замены батарей ECOMOBILE открылись в столице, сократив простой с сорока минут до двух — и доказав модель в масштабе города.",
      uz: "ECOMOBILE’ning birinchi batareya almashish stansiyalari poytaxtda ochildi — to‘xtash vaqtini qirq daqiqadan ikki daqiqaga qisqartirdi va modelni shahar miqyosida isbotladi.",
    },
    facts: {
      en: [["≈ 2 min", "To a full battery"], ["−95%", "Downtime vs charging"], ["24/7", "Always-on energy"]],
      ru: [["≈ 2 мин", "До полной батареи"], ["−95%", "Простоя против зарядки"], ["24/7", "Всегда есть энергия"]],
      uz: [["≈ 2 daq", "To‘liq batareyagacha"], ["−95%", "Quvvatlashga nisbatan to‘xtash"], ["24/7", "Doim energiya"]],
    },
    body: {
      en: [
        "ECOMOBILE has switched on its first battery-swap stations in Tashkent, marking the start of commercial operations for the region's first open swap network. For the drivers using them, the change is immediate: a depleted pack becomes a fully charged one in about two minutes — roughly the time it takes to refuel a petrol car.",
        "Each station is a compact, automated unit. A vehicle pulls in, the system releases the empty pack, slots in a charged one, and the driver is back on the road. There are no cables to handle and no queue for a fast charger. The packs that come out are recharged on-site under controlled conditions, which keeps every battery healthier than ad-hoc fast charging ever could.",
        "The Tashkent rollout is deliberately taxi-first. For a working driver, every minute spent charging is lost income — and a forty-minute charge in the middle of a shift is simply unaffordable. Swapping removes that trade-off entirely, letting fleets run their cars closer to round the clock.",
        "It is also the first real-world proof of the wider platform. Every station does double duty as distributed energy storage: when demand on the grid is low, idle packs charge; when it spikes, they can give energy back. Transport and energy, running on the same asset.",
      ],
      ru: [
        "ECOMOBILE запустил первые станции замены батарей в Ташкенте — старт коммерческой работы первой в регионе открытой сети замены. Для водителя разница мгновенная: разряженная батарея становится полной примерно за две минуты — почти как заправить бензиновую машину.",
        "Каждая станция — компактный автоматический модуль. Машина заезжает, система снимает пустую батарею, ставит заряженную, и водитель снова в пути. Никаких кабелей и очередей к быстрой зарядке. Снятые батареи заряжаются на месте в контролируемых условиях, что бережёт их лучше, чем стихийная быстрая зарядка.",
        "Запуск в Ташкенте сознательно ориентирован на такси. Для работающего водителя каждая минута на зарядке — потерянный доход, а сорокаминутная зарядка посреди смены просто непозволительна. Замена убирает этот компромисс, позволяя паркам работать почти круглосуточно.",
        "Это и первое реальное доказательство всей платформы. Каждая станция работает как распределённое хранилище энергии: когда нагрузка на сеть низкая — батареи заряжаются, когда растёт — могут отдавать энергию. Транспорт и энергетика на одном активе.",
      ],
      uz: [
        "ECOMOBILE Toshkentda birinchi batareya almashish stansiyalarini ishga tushirdi — mintaqadagi birinchi ochiq almashish tarmog‘ining tijoriy faoliyati boshlandi. Haydovchi uchun farq darhol seziladi: bo‘shagan batareya taxminan ikki daqiqada to‘ladi — xuddi avtomobilni quygandek.",
        "Har bir stansiya — ixcham avtomatik modul. Avtomobil kiradi, tizim bo‘sh batareyani chiqaradi, to‘lasini o‘rnatadi va haydovchi yana yo‘lda. Kabel ham, tez quvvatlash navbati ham yo‘q. Chiqarilgan batareyalar joyida nazorat ostida quvvatlanadi, bu ularni tartibsiz tez quvvatlashdan ko‘ra yaxshiroq saqlaydi.",
        "Toshkentdagi ishga tushirish ataylab taksiga qaratilgan. Ishlaydigan haydovchi uchun quvvatlashdagi har daqiqa — yo‘qotilgan daromad, smena o‘rtasidagi qirq daqiqalik quvvatlash esa shunchaki imkonsiz. Almashish bu muammoni butunlay olib tashlaydi va parklarga deyarli sutka bo‘yi ishlash imkonini beradi.",
        "Bu butun platformaning birinchi real isboti hamdir. Har bir stansiya taqsimlangan energiya ombori bo‘lib ishlaydi: tarmoqdagi yuk past bo‘lganda batareyalar quvvatlanadi, oshganda esa energiya qaytaradi. Transport va energetika bitta aktivda.",
      ],
    },
    quote: {
      en: "Two minutes is the number that changes the economics of electric driving in this region.",
      ru: "Две минуты — это цифра, которая меняет экономику электромобильности в регионе.",
      uz: "Ikki daqiqa — mintaqada elektr harakat iqtisodini o‘zgartiradigan raqam.",
    },
  },
  {
    slug: "barlas-deliveries-begin",
    cat: "Vehicles",
    img: "/images/barlas-side.jpg",
    date: { en: "May 2026", ru: "Май 2026", uz: "2026-yil may" },
    read: { en: "3 min read", ru: "3 мин", uz: "3 daq" },
    title: {
      en: "BARLAS deliveries begin",
      ru: "Начались поставки BARLAS",
      uz: "BARLAS yetkazib berish boshlandi",
    },
    excerpt: {
      en: "The business-class battery-swap sedan reaches its first customers across Uzbekistan.",
      ru: "Бизнес-седан с заменой батареи доходит до первых клиентов по всему Узбекистану.",
      uz: "Batareya almashinuvchi biznes-sedan O‘zbekiston bo‘ylab birinchi mijozlarga yetib bormoqda.",
    },
    facts: {
      en: [["500 km", "Range per pack"], ["~6.5 s", "0–100 km/h"], ["5", "Business seats"]],
      ru: [["500 км", "Запас хода на батарее"], ["~6.5 с", "0–100 км/ч"], ["5", "Мест бизнес-класса"]],
      uz: [["500 km", "Batareyada masofa"], ["~6.5 s", "0–100 km/soat"], ["5", "Biznes-klass o‘rin"]],
    },
    body: {
      en: [
        "The first BARLAS sedans have reached their owners. ECOMOBILE's flagship is a business-class electric car built from the ground up around a swappable CATL battery — so the single biggest frustration of electric ownership, the charging wait, is engineered out.",
        "BARLAS pairs a clean fastback silhouette with a calm, spacious cabin: soft-touch materials, a panoramic roof and a large central display. On a full pack it covers up to 500 km, and when that pack runs low, a two-minute swap replaces it with a fresh one.",
        "Crucially, customers buy the car and subscribe to the battery. Battery-as-a-Service strips the most expensive component out of the upfront price and turns energy into a predictable monthly cost — a far easier entry point for the mass market, and a recurring relationship rather than a one-off sale.",
      ],
      ru: [
        "Первые седаны BARLAS добрались до владельцев. Флагман ECOMOBILE — электромобиль бизнес-класса, построенный вокруг сменной батареи CATL, так что главное разочарование электромобиля — ожидание зарядки — убрано на уровне конструкции.",
        "BARLAS сочетает чистый силуэт фастбэка со спокойным просторным салоном: мягкие материалы, панорамная крыша и крупный центральный дисплей. На полной батарее проезжает до 500 км, а когда заряд на исходе — двухминутная замена ставит свежую.",
        "Главное: клиент покупает машину и подписывается на батарею. Battery-as-a-Service убирает самый дорогой компонент из стартовой цены и превращает энергию в предсказуемый ежемесячный платёж — гораздо более доступный вход и постоянные отношения вместо разовой продажи.",
      ],
      uz: [
        "Birinchi BARLAS sedanlari egalariga yetib bordi. ECOMOBILE flagmani — CATL almashinuvchi batareyasi atrofida qurilgan biznes-klass elektromobil, shu bois elektromobilning asosiy muammosi — quvvatlashni kutish — konstruksiya darajasida olib tashlangan.",
        "BARLAS toza fastbek silueti bilan tinch, keng salonni birlashtiradi: yumshoq materiallar, panoramali tom va katta markaziy displey. To‘liq batareyada 500 km gacha yuradi, zaryad tugaganda esa ikki daqiqalik almashish yangisini o‘rnatadi.",
        "Eng muhimi: mijoz avtomobilni sotib oladi va batareyaga obuna bo‘ladi. Battery-as-a-Service eng qimmat qismni boshlang‘ich narxdan olib tashlaydi va energiyani oldindan aniq oylik to‘lovga aylantiradi — ancha arzon kirish va bir martalik savdo o‘rniga doimiy munosabat.",
      ],
    },
  },
  {
    slug: "nayman-suv-unveiled",
    cat: "Vehicles",
    img: "/images/nayman-hero.jpg",
    date: { en: "Apr 2026", ru: "Апрель 2026", uz: "2026-yil aprel" },
    read: { en: "3 min read", ru: "3 мин", uz: "3 daq" },
    title: {
      en: "NAYMAN electric SUV unveiled",
      ru: "Представлен электрокроссовер NAYMAN",
      uz: "NAYMAN elektr krossoveri taqdim etildi",
    },
    excerpt: {
      en: "The swap-compatible SUV joins the lineup with up to 500 km of range and available all-wheel drive.",
      ru: "Совместимый с заменой кроссовер пополняет линейку: запас хода до 500 км и доступный полный привод.",
      uz: "Almashishga mos krossover liniyaga qo‘shildi: 500 km gacha masofa va ixtiyoriy to‘liq uzatma.",
    },
    facts: {
      en: [["190 mm", "Ground clearance"], ["AWD", "Available"], ["5", "Seats + cargo"]],
      ru: [["190 мм", "Клиренс"], ["AWD", "Доступен"], ["5", "Мест + багаж"]],
      uz: [["190 mm", "Klirens"], ["AWD", "Mavjud"], ["5", "O‘rin + yuk"]],
    },
    body: {
      en: [
        "NAYMAN extends the ECOMOBILE family into the segment Central Asian buyers want most: a spacious, capable electric SUV. It shares the same swappable battery standard as BARLAS, so both cars draw on one network — and a NAYMAN can swap at any station a BARLAS can.",
        "A higher stance, longer suspension travel and available all-wheel drive make NAYMAN equally at home in the city and on the road beyond it. Inside, an elevated, flexible cabin seats five with generous room for their gear.",
        "Like every ECOMOBILE, NAYMAN is built around Battery-as-a-Service. Owners get a lower entry price, predictable energy costs, and freedom from worrying about battery degradation — the network keeps every pack healthy.",
        "NAYMAN moves to deliveries following its public unveiling, widening the lineup as the station network scales.",
      ],
      ru: [
        "NAYMAN расширяет семейство ECOMOBILE в самый востребованный в Центральной Азии сегмент — просторный и способный электрокроссовер. Он использует тот же стандарт сменной батареи, что и BARLAS, поэтому обе машины питаются от одной сети — и NAYMAN меняет батарею на любой станции, где это делает BARLAS.",
        "Более высокая посадка, увеличенный ход подвески и доступный полный привод делают NAYMAN своим и в городе, и на дороге за его пределами. Внутри — приподнятый трансформируемый салон на пятерых с большим местом под вещи.",
        "Как и каждый ECOMOBILE, NAYMAN построен вокруг Battery-as-a-Service. Владелец получает ниже стартовую цену, предсказуемые расходы на энергию и свободу от тревог о деградации батареи — сеть поддерживает каждую батарею здоровой.",
        "После публичной премьеры NAYMAN переходит к поставкам, расширяя линейку по мере роста сети станций.",
      ],
      uz: [
        "NAYMAN ECOMOBILE oilasini Markaziy Osiyoda eng talab qilinadigan segmentga — keng va qobiliyatli elektr krossoverga kengaytiradi. U BARLAS bilan bir xil almashinuvchi batareya standartidan foydalanadi, shu bois ikkala avtomobil bitta tarmoqdan oziqlanadi — NAYMAN BARLAS almashtiradigan har qanday stansiyada batareyani almashtiradi.",
        "Balandroq o‘rindiq, uzunroq osma yurishi va ixtiyoriy to‘liq uzatma NAYMAN’ni shaharda ham, undan tashqaridagi yo‘lda ham qulay qiladi. Ichkarida — beshta odam uchun keng joy va yuk uchun katta bo‘shliqqa ega ko‘tarilgan, moslashuvchan salon.",
        "Har bir ECOMOBILE kabi NAYMAN ham Battery-as-a-Service atrofida qurilgan. Egasi pastroq boshlang‘ich narx, oldindan aniq energiya xarajati va batareya eskirishidan xavotirsizlikni oladi — tarmoq har bir batareyani sog‘lom saqlaydi.",
        "Ommaviy taqdimotdan so‘ng NAYMAN yetkazib berishga o‘tadi va stansiyalar tarmog‘i o‘sishi bilan liniyani kengaytiradi.",
      ],
    },
  },
  {
    slug: "open-battery-standard",
    cat: "Platform",
    img: "/images/chassis.jpg",
    date: { en: "Mar 2026", ru: "Март 2026", uz: "2026-yil mart" },
    read: { en: "5 min read", ru: "5 мин", uz: "5 daq" },
    title: {
      en: "Open battery standard announced",
      ru: "Объявлен открытый стандарт батарей",
      uz: "Ochiq batareya standarti e’lon qilindi",
    },
    excerpt: {
      en: "ECOMOBILE opens its battery standard to other brands — one shared network for the whole region.",
      ru: "ECOMOBILE открывает свой стандарт батарей другим брендам — одна общая сеть на весь регион.",
      uz: "ECOMOBILE batareya standartini boshqa brendlarga ochadi — butun mintaqa uchun bitta umumiy tarmoq.",
    },
    facts: {
      en: [["1", "Shared pack standard"], ["Any", "Compatible vehicle"], ["Network", "Effect economics"]],
      ru: [["1", "Общий стандарт батареи"], ["Любой", "Совместимый автомобиль"], ["Сеть", "Экономика эффекта сети"]],
      uz: [["1", "Umumiy batareya standarti"], ["Har qanday", "Mos avtomobil"], ["Tarmoq", "Tarmoq effekti"]],
    },
    body: {
      en: [
        "ECOMOBILE is opening its battery standard to other manufacturers. Rather than a walled garden of one brand and one proprietary pack, the goal is a single shared standard that any compatible vehicle — from any maker — can swap on.",
        "The logic is the network effect. A closed swap network is only as useful as one company's fleet. An open one grows more valuable with every brand, vehicle and station that joins: more cars justify more stations, and more stations make every car more useful. Value compounds instead of fragmenting.",
        "It mirrors how other essential infrastructure works. Drivers do not refuel at a station that only serves one brand of car. Swappable energy should be no different — interoperable by default, so the whole industry can build on top of it.",
        "For partners, the open standard lowers the barrier to launching electric models without each one having to build its own charging or swapping infrastructure from scratch. For drivers, it means a denser, more reliable network. For the region, it means a faster path to electric mobility at scale.",
      ],
      ru: [
        "ECOMOBILE открывает свой стандарт батарей другим производителям. Вместо «огороженного сада» из одного бренда и проприетарной батареи цель — единый общий стандарт, на котором может меняться любой совместимый автомобиль любого производителя.",
        "Логика — в эффекте сети. Закрытая сеть замены полезна ровно настолько, насколько велик парк одной компании. Открытая становится ценнее с каждым брендом, машиной и станцией: больше машин оправдывают больше станций, а больше станций делают каждую машину полезнее. Ценность накапливается, а не дробится.",
        "Это работает как и любая другая базовая инфраструктура. Водители не заправляются на станции, которая обслуживает только один бренд. Сменная энергия не должна быть исключением — совместимость по умолчанию, чтобы вся отрасль могла строить поверх.",
        "Для партнёров открытый стандарт снижает барьер запуска электромоделей без необходимости каждому строить свою инфраструктуру зарядки или замены с нуля. Для водителей — плотнее и надёжнее сеть. Для региона — более быстрый путь к электромобильности в масштабе.",
      ],
      uz: [
        "ECOMOBILE batareya standartini boshqa ishlab chiqaruvchilarga ochmoqda. Bitta brend va xususiy batareyadan iborat «devor bilan o‘ralgan bog‘» o‘rniga maqsad — har qanday ishlab chiqaruvchining har qanday mos avtomobili almasha oladigan yagona umumiy standart.",
        "Mantiq — tarmoq effektida. Yopiq almashish tarmog‘i faqat bitta kompaniya parki qancha bo‘lsa, shuncha foydali. Ochiq tarmoq esa har bir brend, avtomobil va stansiya bilan qimmatroq bo‘ladi: ko‘proq avtomobil ko‘proq stansiyani oqlaydi, ko‘proq stansiya esa har bir avtomobilni foydaliroq qiladi. Qiymat bo‘linmaydi, balki to‘planadi.",
        "Bu boshqa har qanday muhim infratuzilma kabi ishlaydi. Haydovchilar faqat bitta brendga xizmat qiladigan stansiyada yoqilg‘i quymaydi. Almashinuvchi energiya ham bundan istisno bo‘lmasligi kerak — standart bo‘yicha o‘zaro moslik, toki butun soha uning ustiga qurishi mumkin bo‘lsin.",
        "Hamkorlar uchun ochiq standart har biri o‘z quvvatlash yoki almashish infratuzilmasini noldan qurmasdan elektr modellarni ishga tushirish to‘sig‘ini pasaytiradi. Haydovchilar uchun — zichroq va ishonchliroq tarmoq. Mintaqa uchun — elektr harakatga tezroq yo‘l.",
      ],
    },
    quote: {
      en: "Open beats closed. A swap network grows more valuable with every brand that plugs in.",
      ru: "Открытая побеждает закрытую. Сеть замены становится ценнее с каждым подключившимся брендом.",
      uz: "Ochiq yopiqdan ustun. Almashish tarmog‘i har bir qo‘shilgan brend bilan qimmatroq bo‘ladi.",
    },
  },
  {
    slug: "catl-partnership-confirmed",
    cat: "Partners",
    img: "/images/interior.jpg",
    date: { en: "Feb 2026", ru: "Февраль 2026", uz: "2026-yil fevral" },
    read: { en: "2 min read", ru: "2 мин", uz: "2 daq" },
    title: {
      en: "CATL partnership confirmed",
      ru: "Подтверждено партнёрство с CATL",
      uz: "CATL bilan hamkorlik tasdiqlandi",
    },
    excerpt: {
      en: "Swappable CATL packs power the BARLAS and NAYMAN platforms.",
      ru: "Сменные батареи CATL питают платформы BARLAS и NAYMAN.",
      uz: "Almashinuvchi CATL batareyalari BARLAS va NAYMAN platformalarini quvvatlaydi.",
    },
    facts: {
      en: [["CATL", "Battery partner"], ["Swappable", "Pack design"], ["Longer", "Service life"]],
      ru: [["CATL", "Партнёр по батареям"], ["Сменная", "Конструкция батареи"], ["Дольше", "Срок службы"]],
      uz: [["CATL", "Batareya hamkori"], ["Almashinuvchi", "Batareya dizayni"], ["Uzoqroq", "Xizmat muddati"]],
    },
    body: {
      en: [
        "ECOMOBILE has confirmed a battery partnership with CATL, the world's largest manufacturer of electric-vehicle batteries. The swappable packs at the heart of BARLAS and NAYMAN are engineered for safety, range and a long service life.",
        "Centralized charging is a quiet advantage of the swap model. Instead of being fast-charged in the field under whatever conditions happen to apply, packs are recharged at the station under optimal temperature and current — the single biggest factor in how long a battery lasts. The result is healthier batteries and a longer usable life for every pack in the network.",
        "Pairing a proven cell supplier with the swap architecture gives ECOMOBILE both the energy density to deliver up to 500 km of range and the durability to keep packs cycling through the network for years.",
      ],
      ru: [
        "ECOMOBILE подтвердил партнёрство с CATL — крупнейшим в мире производителем батарей для электромобилей. Сменные батареи в основе BARLAS и NAYMAN спроектированы под безопасность, запас хода и долгий срок службы.",
        "Централизованная зарядка — тихое преимущество модели замены. Вместо быстрой зарядки в поле при любых условиях батареи заряжаются на станции при оптимальной температуре и токе — это главный фактор долговечности. Итог — более здоровые батареи и больший срок службы каждой в сети.",
        "Сочетание проверенного поставщика ячеек с архитектурой замены даёт ECOMOBILE и плотность энергии для запаса хода до 500 км, и долговечность, чтобы батареи годами циркулировали по сети.",
      ],
      uz: [
        "ECOMOBILE dunyodagi eng yirik elektromobil batareyalari ishlab chiqaruvchisi CATL bilan hamkorlikni tasdiqladi. BARLAS va NAYMAN markazidagi almashinuvchi batareyalar xavfsizlik, masofa va uzoq xizmat muddati uchun ishlangan.",
        "Markazlashgan quvvatlash — almashish modelining sokin afzalligi. Dala sharoitida tez quvvatlash o‘rniga batareyalar stansiyada optimal harorat va tokda quvvatlanadi — bu uzoq umrning asosiy omili. Natija — sog‘lomroq batareyalar va tarmoqdagi har birining uzunroq xizmati.",
        "Sinovdan o‘tgan element yetkazib beruvchini almashish arxitekturasi bilan birlashtirish ECOMOBILE’ga 500 km gacha masofa uchun energiya zichligini ham, batareyalarning yillar davomida tarmoqda aylanishi uchun chidamlilikni ham beradi.",
      ],
    },
  },
  {
    slug: "central-asia-expansion-roadmap",
    cat: "Network",
    img: "/images/lifestyle.jpg",
    date: { en: "Jan 2026", ru: "Январь 2026", uz: "2026-yil yanvar" },
    read: { en: "4 min read", ru: "4 мин", uz: "4 daq" },
    title: {
      en: "Central Asia expansion roadmap",
      ru: "Дорожная карта расширения по Центральной Азии",
      uz: "Markaziy Osiyo bo‘ylab kengayish yo‘l xaritasi",
    },
    excerpt: {
      en: "Stations planned across Kazakhstan, Kyrgyzstan, Tajikistan and Turkmenistan.",
      ru: "Станции запланированы в Казахстане, Кыргызстане, Таджикистане и Туркменистане.",
      uz: "Stansiyalar Qozog‘iston, Qirg‘iziston, Tojikiston va Turkmanistonda rejalashtirilgan.",
    },
    facts: {
      en: [["5", "Countries in plan"], ["2026–30", "Rollout window"], ["Open", "To partners"]],
      ru: [["5", "Стран в плане"], ["2026–30", "Окно запуска"], ["Открыт", "Для партнёров"]],
      uz: [["5", "Rejadagi davlat"], ["2026–30", "Ishga tushirish oynasi"], ["Ochiq", "Hamkorlarga"]],
    },
    body: {
      en: [
        "ECOMOBILE has laid out its expansion roadmap for Central Asia. Starting from Uzbekistan, the swap network is planned to reach Kazakhstan, Kyrgyzstan, Tajikistan and Turkmenistan — five markets with fast-growing demand for affordable electric mobility.",
        "The sequence is deliberate. Density comes first: enough stations in each launch city that a driver is never far from a swap, so the network is genuinely useful from day one. Cities then link into corridors, and corridors into a regional grid.",
        "By 2027 the focus is a dense station network across Uzbekistan and volume deliveries of NAYMAN. From 2028, expansion into Kazakhstan and Kyrgyzstan runs in parallel with opening the battery standard to partners. By 2030 the aim is a region-wide network where transport and energy share the same infrastructure.",
        "Each new market strengthens the whole: more stations, more vehicles, more idle storage feeding back into local grids.",
      ],
      ru: [
        "ECOMOBILE представил дорожную карту расширения по Центральной Азии. Стартуя из Узбекистана, сеть замены планируется довести до Казахстана, Кыргызстана, Таджикистана и Туркменистана — пяти рынков с быстро растущим спросом на доступную электромобильность.",
        "Последовательность продуманная. Сначала — плотность: достаточно станций в каждом городе запуска, чтобы водитель всегда был недалеко от замены, и сеть приносила пользу с первого дня. Затем города связываются в коридоры, а коридоры — в региональную сеть.",
        "К 2027 году фокус — плотная сеть станций по Узбекистану и серийные поставки NAYMAN. С 2028 года расширение в Казахстан и Кыргызстан идёт параллельно с открытием стандарта батареи партнёрам. К 2030 году цель — сеть на весь регион, где транспорт и энергетика делят одну инфраструктуру.",
        "Каждый новый рынок усиливает целое: больше станций, больше машин, больше простаивающего хранилища, отдающего энергию местным сетям.",
      ],
      uz: [
        "ECOMOBILE Markaziy Osiyo bo‘ylab kengayish yo‘l xaritasini taqdim etdi. O‘zbekistondan boshlab, almashish tarmog‘i Qozog‘iston, Qirg‘iziston, Tojikiston va Turkmanistonga yetkazilishi rejalashtirilgan — arzon elektr harakatga talab tez o‘sayotgan besh bozor.",
        "Ketma-ketlik o‘ylangan. Avval — zichlik: har bir ishga tushirish shahrida yetarlicha stansiya, toki haydovchi almashishdan hech qachon uzoq bo‘lmasin va tarmoq birinchi kundan foydali bo‘lsin. Keyin shaharlar koridorlarga, koridorlar esa mintaqaviy tarmoqqa bog‘lanadi.",
        "2027 yilga kelib diqqat markazi — O‘zbekiston bo‘ylab zich stansiyalar tarmog‘i va NAYMAN’ning seriyali yetkazib berilishi. 2028 yildan Qozog‘iston va Qirg‘izistonga kengayish batareya standartini hamkorlarga ochish bilan parallel boradi. 2030 yilga maqsad — transport va energetika bitta infratuzilmani bo‘lishadigan butun mintaqa tarmog‘i.",
        "Har bir yangi bozor yaxlitni kuchaytiradi: ko‘proq stansiya, ko‘proq avtomobil, mahalliy tarmoqlarga energiya qaytaradigan ko‘proq bo‘sh ombor.",
      ],
    },
  },
  {
    slug: "stations-double-as-grid-storage",
    cat: "Energy",
    img: "/images/station-2.png",
    date: { en: "Dec 2025", ru: "Декабрь 2025", uz: "2025-yil dekabr" },
    read: { en: "4 min read", ru: "4 мин", uz: "4 daq" },
    title: {
      en: "Stations to double as grid storage",
      ru: "Станции станут хранилищем для энергосети",
      uz: "Stansiyalar energiya tarmog‘i uchun ombor bo‘ladi",
    },
    excerpt: {
      en: "Idle battery packs will balance the grid and absorb renewable energy when demand is low.",
      ru: "Простаивающие батареи будут балансировать сеть и поглощать энергию ВИЭ при низком спросе.",
      uz: "Bo‘sh batareyalar tarmoqni muvozanatlaydi va talab past bo‘lganda qayta tiklanuvchi energiyani yutadi.",
    },
    facts: {
      en: [["−30%", "Peak grid load"], ["2nd", "Business per asset"], ["Renewables", "Absorbed"]],
      ru: [["−30%", "Пик нагрузки сети"], ["2-й", "Бизнес на активе"], ["ВИЭ", "Поглощение"]],
      uz: [["−30%", "Tarmoq cho‘qqi yuki"], ["2-chi", "Aktivdagi biznes"], ["QTE", "Yutilishi"]],
    },
    body: {
      en: [
        "Every ECOMOBILE swap station is also an energy asset. At any moment a station holds a buffer of charged and charging packs — and that buffer is, in effect, distributed grid storage sitting exactly where energy is consumed.",
        "When demand on the grid is low and electricity is cheap or renewable, packs charge. When demand peaks, the station can lean on its already-charged buffer instead of pulling hard from the grid — shaving the peaks that are the most expensive and carbon-intensive energy to supply.",
        "It also helps absorb renewables. Solar and wind are abundant but intermittent; flexible storage that can soak up surplus when it is available and release it later is exactly what a high-renewable grid needs. A network of swap stations becomes a fleet of small, smart batteries spread across a city.",
        "Commercially, it means a second business running on the same asset: ECOMOBILE earns on every swap, and on the grid-balancing and storage services the network provides.",
      ],
      ru: [
        "Каждая станция замены ECOMOBILE — ещё и энергетический актив. В любой момент станция держит буфер заряженных и заряжающихся батарей — а это по сути распределённое хранилище, стоящее ровно там, где потребляется энергия.",
        "Когда спрос в сети низкий, а электричество дёшево или возобновляемо — батареи заряжаются. Когда спрос на пике — станция опирается на уже заряженный буфер вместо того, чтобы жёстко тянуть из сети, срезая самые дорогие и углеродоёмкие пики.",
        "Это помогает и поглощать ВИЭ. Солнце и ветер обильны, но прерывисты; гибкое хранилище, которое впитывает излишки и отдаёт их позже, — именно то, что нужно сети с высокой долей ВИЭ. Сеть станций становится флотом маленьких умных батарей по всему городу.",
        "Коммерчески это второй бизнес на том же активе: ECOMOBILE зарабатывает и на каждой замене, и на услугах балансировки и хранения для сети.",
      ],
      uz: [
        "Har bir ECOMOBILE almashish stansiyasi — energetik aktiv hamdir. Istalgan vaqtda stansiya quvvatlangan va quvvatlanayotgan batareyalar buferini saqlaydi — bu aslida energiya iste’mol qilinadigan joyda turgan taqsimlangan ombor.",
        "Tarmoqdagi talab past, elektr arzon yoki qayta tiklanadigan bo‘lganda batareyalar quvvatlanadi. Talab cho‘qqida bo‘lganda stansiya tarmoqdan kuchli tortish o‘rniga allaqachon quvvatlangan buferga tayanadi va eng qimmat hamda uglerodli cho‘qqilarni qisqartiradi.",
        "Bu QTE’ni yutishga ham yordam beradi. Quyosh va shamol mo‘l, ammo uzluksiz emas; ortiqchani yutib, keyinroq qaytaradigan moslashuvchan ombor — bu aynan QTE ulushi yuqori tarmoqqa kerak bo‘lgan narsa. Stansiyalar tarmog‘i butun shahar bo‘ylab kichik aqlli batareyalar floti bo‘lib qoladi.",
        "Tijoriy jihatdan bu bir xil aktivdagi ikkinchi biznes: ECOMOBILE har bir almashishdan ham, tarmoq uchun muvozanatlash va saqlash xizmatlaridan ham daromad oladi.",
      ],
    },
    quote: {
      en: "A swap station isn't just a place to get energy — it's a place that gives energy back.",
      ru: "Станция замены — это не просто место, где берут энергию, это место, которое её отдаёт.",
      uz: "Almashish stansiyasi — shunchaki energiya olinadigan joy emas, u energiya qaytaradigan joy.",
    },
  },
  {
    slug: "barlas-interior-revealed",
    cat: "Vehicles",
    img: "/images/interior-2.jpg",
    date: { en: "Nov 2025", ru: "Ноябрь 2025", uz: "2025-yil noyabr" },
    read: { en: "2 min read", ru: "2 мин", uz: "2 daq" },
    title: {
      en: "BARLAS interior revealed",
      ru: "Показан интерьер BARLAS",
      uz: "BARLAS interyeri ko‘rsatildi",
    },
    excerpt: {
      en: "A first look inside the business-class cabin — panoramic roof and a large central display.",
      ru: "Первый взгляд внутрь салона бизнес-класса — панорамная крыша и крупный центральный дисплей.",
      uz: "Biznes-klass salon ichiga birinchi nazar — panoramali tom va katta markaziy displey.",
    },
    facts: {
      en: [["Panoramic", "Glass roof"], ["Business", "Class comfort"], ["Quiet", "EV cabin"]],
      ru: [["Панорамная", "Стеклянная крыша"], ["Бизнес", "Уровень комфорта"], ["Тихий", "Салон электромобиля"]],
      uz: [["Panoramali", "Shisha tom"], ["Biznes", "Komfort darajasi"], ["Tinch", "Elektromobil salon"]],
    },
    body: {
      en: [
        "ECOMOBILE has revealed the interior of BARLAS. The brief was a calm, business-class cabin that feels expensive without shouting about it — and that holds up over the long days the car is built for.",
        "A panoramic glass roof opens up the space and floods it with light. A large central display anchors the dashboard, soft-touch materials wrap the surfaces you actually touch, and the fully electric drivetrain keeps the cabin quiet at speed.",
        "It is the inside of a car designed around time. Two-minute swaps mean less of the day spent waiting; the cabin is built so the time spent driving is genuinely comfortable.",
      ],
      ru: [
        "ECOMOBILE показал интерьер BARLAS. Задача была — спокойный салон бизнес-класса, который ощущается дорого, но без крика, и держит планку в долгих поездках, для которых машина и создана.",
        "Панорамная стеклянная крыша раскрывает пространство и наполняет его светом. Крупный центральный дисплей задаёт тон передней панели, мягкие материалы обволакивают поверхности, которых касаешься, а полностью электрический привод держит салон тихим на скорости.",
        "Это салон машины, спроектированной вокруг времени. Двухминутная замена означает меньше времени в ожидании; салон сделан так, чтобы время за рулём было по-настоящему комфортным.",
      ],
      uz: [
        "ECOMOBILE BARLAS interyerini ko‘rsatdi. Vazifa — qimmat, ammo baqirmaydigan va avtomobil yaratilgan uzoq safarlarda darajani ushlab turadigan tinch biznes-klass salon edi.",
        "Panoramali shisha tom bo‘shliqni ochadi va uni yorug‘likka to‘ldiradi. Katta markaziy displey old panelga ohang beradi, yumshoq materiallar siz tegadigan yuzalarni o‘raydi, to‘liq elektr yuritma esa tezlikda salonni tinch saqlaydi.",
        "Bu vaqt atrofida ishlangan avtomobilning saloni. Ikki daqiqalik almashish kutishda kamroq vaqtni anglatadi; salon rul ortidagi vaqt chinakam qulay bo‘lishi uchun yaratilgan.",
      ],
    },
  },
];

export const newsBySlug = (slug: string): NewsItem | undefined =>
  NEWS.find((n) => n.slug === slug);

export const relatedNews = (slug: string, count = 3): NewsItem[] =>
  NEWS.filter((n) => n.slug !== slug).slice(0, count);
