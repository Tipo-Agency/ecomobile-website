/* News content — shared by the newsroom list, the article pages and generateStaticParams.
   Plain data (no "use client") so it can be imported from both server routes and client UI. */

export type NewsItem = {
  slug: string;
  date: string;
  cat: string;
  title: string;
  excerpt: string;
  img: string;
  read: string;
  body: string[];
  quote?: string;
  facts?: [string, string][];
};

export const NEWS: NewsItem[] = [
  {
    slug: "first-swap-stations-tashkent",
    date: "Jun 2026",
    cat: "Launch",
    title: "First swap stations go live in Tashkent",
    excerpt:
      "The first ECOMOBILE battery-swap stations open across the capital, cutting charging downtime from forty minutes to two — and proving the model at city scale.",
    img: "/images/station-1.png",
    read: "4 min read",
    facts: [
      ["≈ 2 min", "To a full battery"],
      ["−95%", "Downtime vs charging"],
      ["24/7", "Always-on energy"],
    ],
    body: [
      "ECOMOBILE has switched on its first battery-swap stations in Tashkent, marking the start of commercial operations for the region's first open swap network. For the drivers using them, the change is immediate: a depleted pack becomes a fully charged one in about two minutes — roughly the time it takes to refuel a petrol car.",
      "Each station is a compact, automated unit. A vehicle pulls in, the system releases the empty pack, slots in a charged one, and the driver is back on the road. There are no cables to handle and no queue for a fast charger. The packs that come out are recharged on-site under controlled conditions, which keeps every battery healthier than ad-hoc fast charging ever could.",
      "The Tashkent rollout is deliberately taxi-first. For a working driver, every minute spent charging is lost income — and a forty-minute charge in the middle of a shift is simply unaffordable. Swapping removes that trade-off entirely, letting fleets run their cars closer to round the clock.",
      "It is also the first real-world proof of the wider platform. Every station does double duty as distributed energy storage: when demand on the grid is low, idle packs charge; when it spikes, they can give energy back. Transport and energy, running on the same asset.",
    ],
    quote:
      "Two minutes is the number that changes the economics of electric driving in this region.",
  },
  {
    slug: "barlas-deliveries-begin",
    date: "May 2026",
    cat: "Vehicles",
    title: "BARLAS deliveries begin",
    excerpt:
      "The business-class battery-swap sedan reaches its first customers across Uzbekistan.",
    img: "/images/barlas-side.jpg",
    read: "3 min read",
    facts: [
      ["500 km", "Range per pack"],
      ["~6.5 s", "0–100 km/h"],
      ["5", "Business seats"],
    ],
    body: [
      "The first BARLAS sedans have reached their owners. ECOMOBILE's flagship is a business-class electric car built from the ground up around a swappable CATL battery — so the single biggest frustration of electric ownership, the charging wait, is engineered out.",
      "BARLAS pairs a clean fastback silhouette with a calm, spacious cabin: soft-touch materials, a panoramic roof and a large central display. On a full pack it covers up to 500 km, and when that pack runs low, a two-minute swap replaces it with a fresh one.",
      "Crucially, customers buy the car and subscribe to the battery. Battery-as-a-Service strips the most expensive component out of the upfront price and turns energy into a predictable monthly cost — a far easier entry point for the mass market, and a recurring relationship rather than a one-off sale.",
      "Deliveries begin in Uzbekistan and follow the swap network as it expands across the country and the wider region.",
    ],
  },
  {
    slug: "nayman-suv-unveiled",
    date: "Apr 2026",
    cat: "Vehicles",
    title: "NAYMAN electric SUV unveiled",
    excerpt:
      "The swap-compatible SUV joins the lineup with up to 500 km of range and available all-wheel drive.",
    img: "/images/nayman-hero.jpg",
    read: "3 min read",
    facts: [
      ["190 mm", "Ground clearance"],
      ["AWD", "Available"],
      ["5", "Seats + cargo"],
    ],
    body: [
      "NAYMAN extends the ECOMOBILE family into the segment Central Asian buyers want most: a spacious, capable electric SUV. It shares the same swappable battery standard as BARLAS, so both cars draw on one network — and a NAYMAN can swap at any station a BARLAS can.",
      "A higher stance, longer suspension travel and available all-wheel drive make NAYMAN equally at home in the city and on the road beyond it. Inside, an elevated, flexible cabin seats five with generous room for their gear.",
      "Like every ECOMOBILE, NAYMAN is built around Battery-as-a-Service. Owners get a lower entry price, predictable energy costs, and freedom from worrying about battery degradation — the network keeps every pack healthy.",
      "NAYMAN moves to deliveries following its public unveiling, widening the lineup as the station network scales.",
    ],
  },
  {
    slug: "open-battery-standard",
    date: "Mar 2026",
    cat: "Platform",
    title: "Open battery standard announced",
    excerpt:
      "ECOMOBILE opens its battery standard to other brands — one shared network for the whole region.",
    img: "/images/chassis.jpg",
    read: "5 min read",
    facts: [
      ["1", "Shared pack standard"],
      ["Any", "Compatible vehicle"],
      ["Network", "Effect economics"],
    ],
    body: [
      "ECOMOBILE is opening its battery standard to other manufacturers. Rather than a walled garden of one brand and one proprietary pack, the goal is a single shared standard that any compatible vehicle — from any maker — can swap on.",
      "The logic is the network effect. A closed swap network is only as useful as one company's fleet. An open one grows more valuable with every brand, vehicle and station that joins: more cars justify more stations, and more stations make every car more useful. Value compounds instead of fragmenting.",
      "It mirrors how other essential infrastructure works. Drivers do not refuel at a station that only serves one brand of car. Swappable energy should be no different — interoperable by default, so the whole industry can build on top of it.",
      "For partners, the open standard lowers the barrier to launching electric models without each one having to build its own charging or swapping infrastructure from scratch. For drivers, it means a denser, more reliable network. For the region, it means a faster path to electric mobility at scale.",
    ],
    quote:
      "Open beats closed. A swap network grows more valuable with every brand that plugs in.",
  },
  {
    slug: "catl-partnership-confirmed",
    date: "Feb 2026",
    cat: "Partners",
    title: "CATL partnership confirmed",
    excerpt: "Swappable CATL packs power the BARLAS and NAYMAN platforms.",
    img: "/images/interior.jpg",
    read: "2 min read",
    facts: [
      ["CATL", "Battery partner"],
      ["Swappable", "Pack design"],
      ["Longer", "Service life"],
    ],
    body: [
      "ECOMOBILE has confirmed a battery partnership with CATL, the world's largest manufacturer of electric-vehicle batteries. The swappable packs at the heart of BARLAS and NAYMAN are engineered for safety, range and a long service life.",
      "Centralized charging is a quiet advantage of the swap model. Instead of being fast-charged in the field under whatever conditions happen to apply, packs are recharged at the station under optimal temperature and current — the single biggest factor in how long a battery lasts. The result is healthier batteries and a longer usable life for every pack in the network.",
      "Pairing a proven cell supplier with the swap architecture gives ECOMOBILE both the energy density to deliver up to 500 km of range and the durability to keep packs cycling through the network for years.",
    ],
  },
  {
    slug: "central-asia-expansion-roadmap",
    date: "Jan 2026",
    cat: "Network",
    title: "Central Asia expansion roadmap",
    excerpt:
      "Stations planned across Kazakhstan, Kyrgyzstan, Tajikistan and Turkmenistan.",
    img: "/images/lifestyle.jpg",
    read: "4 min read",
    facts: [
      ["5", "Countries in plan"],
      ["2026–30", "Rollout window"],
      ["Open", "To partners"],
    ],
    body: [
      "ECOMOBILE has laid out its expansion roadmap for Central Asia. Starting from Uzbekistan, the swap network is planned to reach Kazakhstan, Kyrgyzstan, Tajikistan and Turkmenistan — five markets with fast-growing demand for affordable electric mobility.",
      "The sequence is deliberate. Density comes first: enough stations in each launch city that a driver is never far from a swap, so the network is genuinely useful from day one. Cities then link into corridors, and corridors into a regional grid.",
      "By 2027 the focus is a dense station network across Uzbekistan and volume deliveries of NAYMAN. From 2028, expansion into Kazakhstan and Kyrgyzstan runs in parallel with opening the battery standard to partners. By 2030 the aim is a region-wide network where transport and energy share the same infrastructure.",
      "Each new market strengthens the whole: more stations, more vehicles, more idle storage feeding back into local grids.",
    ],
  },
  {
    slug: "stations-double-as-grid-storage",
    date: "Dec 2025",
    cat: "Energy",
    title: "Stations to double as grid storage",
    excerpt:
      "Idle battery packs will balance the grid and absorb renewable energy when demand is low.",
    img: "/images/station-2.png",
    read: "4 min read",
    facts: [
      ["−30%", "Peak grid load"],
      ["2nd", "Business per asset"],
      ["VIE", "Renewables absorbed"],
    ],
    body: [
      "Every ECOMOBILE swap station is also an energy asset. At any moment a station holds a buffer of charged and charging packs — and that buffer is, in effect, distributed grid storage sitting exactly where energy is consumed.",
      "When demand on the grid is low and electricity is cheap or renewable, packs charge. When demand peaks, the station can lean on its already-charged buffer instead of pulling hard from the grid — shaving the peaks that are the most expensive and carbon-intensive energy to supply.",
      "It also helps absorb renewables. Solar and wind are abundant but intermittent; flexible storage that can soak up surplus when it is available and release it later is exactly what a high-renewable grid needs. A network of swap stations becomes a fleet of small, smart batteries spread across a city.",
      "Commercially, it means a second business running on the same asset: ECOMOBILE earns on every swap, and on the grid-balancing and storage services the network provides.",
    ],
    quote:
      "A swap station isn't just a place to get energy — it's a place that gives energy back.",
  },
  {
    slug: "barlas-interior-revealed",
    date: "Nov 2025",
    cat: "Vehicles",
    title: "BARLAS interior revealed",
    excerpt:
      "A first look inside the business-class cabin — panoramic roof and a large central display.",
    img: "/images/interior-2.jpg",
    read: "2 min read",
    facts: [
      ["Panoramic", "Glass roof"],
      ["Business", "Class comfort"],
      ["Quiet", "EV cabin"],
    ],
    body: [
      "ECOMOBILE has revealed the interior of BARLAS. The brief was a calm, business-class cabin that feels expensive without shouting about it — and that holds up over the long days the car is built for.",
      "A panoramic glass roof opens up the space and floods it with light. A large central display anchors the dashboard, soft-touch materials wrap the surfaces you actually touch, and the fully electric drivetrain keeps the cabin quiet at speed.",
      "It is the inside of a car designed around time. Two-minute swaps mean less of the day spent waiting; the cabin is built so the time spent driving is genuinely comfortable.",
    ],
  },
];

export const newsBySlug = (slug: string): NewsItem | undefined =>
  NEWS.find((n) => n.slug === slug);

export const relatedNews = (slug: string, count = 3): NewsItem[] =>
  NEWS.filter((n) => n.slug !== slug).slice(0, count);
