"use client";
import React, { useRef, useState, useEffect, createContext, useContext, Fragment } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { CA_VIEWBOX, CA_PATHS, CITIES, LINKS } from "./ca-map";
import { NEWS, newsBySlug, relatedNews, pick, pickArr, CAT_LABELS, NEWS_UI } from "./news-data";
import { useLanguage } from "@/contexts/language-context";

    /* ===================== i18n ===================== */
    const T = {
      en:{ nav:["Why","Models","BARLAS","Battery Swap","Ecosystem","Network"], partner:"Become a Partner",
        modelsTitle:"Two cars. One network.", modelsLead:"Pick your ECOMOBILE — both swap on the same battery network.", from:"from", configure:"Configure",
        eyebrow:"Green Transport Platform",
        title:"The electric car that never waits to charge.",
        sub:"BARLAS swaps its battery in two minutes — zero charging downtime, on an open energy network built for Central Asia.",
        cta1:"Explore BARLAS", cta2:"Find a swap station",
        stats:[["2 min","Battery swap"],["500 km","Range"],["5","Countries"],["0 g","CO₂ / km"]],
        whyTitle:"Electric mobility, without the charging wait.",
        whyLead:"Six reasons the swap model beats the plug.",
        why:[["2-minute battery swap","Pull in, swap, and drive away — about the time it takes to refuel."],
          ["Battery-as-a-Service","Own the car, subscribe to the battery. Far lower entry cost."],
          ["Zero emissions","A fully electric drivetrain with no tailpipe emissions."],
          ["Lower cost of ownership","Less downtime, cheaper energy, longer asset life."],
          ["Growing swap network","An expanding grid of stations across the region."],
          ["Longer battery life","Centralized, optimized charging extends every pack."]],
        meetTitle:"Meet BARLAS.", meetLead:"Business-class comfort, engineered around battery-swap technology.",
        specs:[["Range","up to 500 km"],["Battery","CATL · swappable"],["Swap time","≈ 2 minutes"],["Class","Business sedan"],["Seats","Spacious 5"],["Safety","Advanced ADAS"]],
        explore:"Explore the vehicle",
        swapTitle:"How battery swap works.", swapLead:"Three steps. About two minutes.",
        steps:[["Drive in","Pull into the station — no cables, no waiting."],["Swap","An automated system swaps the depleted pack for a full one."],["Drive away","Back on the road with a full charge."]],
        ecoTitle:"One open ecosystem.", ecoLead:"Vehicle, energy and service — connected end to end.",
        eco:["Vehicle","Battery Swap","Battery Subscription","Energy Network","Autonomous Mobility"],
        openTitle:"Open beats closed.",
        closed:["Single brand only","Proprietary battery","Isolated network","Limited growth"],
        open:["Multi-brand compatible","Shared battery standard","Industry-wide network","Network-effect growth"],
        taxiTitle:"The paying customer is already here.",
        taxiLead:"Taxi fleets are our first market — and the unit economics work in their favour.",
        taxiStats:[["+40%","More trips per day"],["0 min","Charging downtime"],["24/7","Guaranteed energy"]],
        netTitle:"The swap network.", netLead:"Live, planned and future markets across Central Asia.",
        legend:["Live","Planned","Future"],
        energyTitle:"Transport meets energy.",
        energyLead:"Every swap station doubles as distributed storage — balancing the grid and absorbing renewables.",
        energy:["Load balancing","Renewable integration","Peak-demand reduction","Distributed storage"],
        ctaTitle:"Build the network with us.", ctaSub:"Partner, invest, or bring ECOMOBILE to your city.",
        ctaP:"Become a Partner", ctaC:"Talk to us", footTag:"A green-transport platform for the future of mobility.",
        numEyebrow:"By the numbers", numTitle:"Numbers that move the needle.",
        numbers:[[2," min","To swap a full battery","About the time it takes to refuel a car."],[500," km","Range on a single pack","On CATL swappable battery tech."],[20,"×","Faster than charging","Two minutes vs ~40 at a fast charger."],[5,"","Countries on the roadmap","Across Central Asia by 2030."]],
        cmpTitle:"Swap, charge or fuel?", cmpLead:"How a two-minute battery swap stacks up against the alternatives.",
        cmpCols:["Petrol car","Plug-in EV","ECOMOBILE"], cmpBadge:"battery swap",
        cmpRows:[["Time to a full tank / charge","~5 min","40–60 min","≈ 2 min"],["Downtime during the day","Refuel stops","Long charge breaks","Near-zero"],["Upfront battery cost","—","Included · high","On subscription"],["Tailpipe emissions","High","Zero","Zero"],["Energy cost per km","High","Low","Lowest"],["Doubles as grid storage","no","no","yes"]],
        cmpCostTitle:"5-year running cost", cmpCostNote:"illustrative · lower is better",
        cmpCost:[["100%",100],["~58%",58],["~34%",34]],
        cmpFoot1:"Lower energy cost, near-zero downtime and battery-on-subscription can cut total running cost by up to ", cmpFootPct:"~60%", cmpFoot2:" versus petrol.",
        roadTitle:"The road ahead.", roadLead:"From the first stations to a region-wide energy network.",
        road:[["2026","Launch","BARLAS & NAYMAN deliveries; first swap stations live in Tashkent."],["2027","Scale","A dense station network across Uzbekistan; NAYMAN at volume."],["2028","Expand","Kazakhstan & Kyrgyzstan; the battery standard opens to partners."],["2030","Platform","A region-wide energy + mobility network across five countries."]],
        order:"Order", learnMore:"Learn more", powerTitle:"A fully automatic battery swap in two minutes.", powerSub:"Drive in, swap, drive out — no cables, no waiting. One open energy network across Central Asia.", powerCta:"See how it works" },
      ru:{ nav:["Почему","Модели","BARLAS","Замена батареи","Экосистема","Сеть"], partner:"Стать партнёром",
        modelsTitle:"Две машины. Одна сеть.", modelsLead:"Выберите свой ECOMOBILE — обе меняют батарею в одной сети.", from:"от", configure:"Конфигуратор",
        eyebrow:"Платформа зелёного транспорта",
        title:"Электромобиль, которому не нужно ждать зарядку.",
        sub:"BARLAS меняет батарею за две минуты — ноль простоя, открытая энергосеть для Центральной Азии.",
        cta1:"Узнать о BARLAS", cta2:"Найти станцию",
        stats:[["2 мин","Замена батареи"],["500 км","Запас хода"],["5","Стран"],["0 г","CO₂ / км"]],
        whyTitle:"Электромобильность без ожидания зарядки.",
        whyLead:"Шесть причин, почему замена лучше розетки.",
        why:[["Замена за 2 минуты","Заехал, заменил, поехал — почти как заправка."],
          ["Батарея по подписке","Машина ваша, батарея — по подписке. Гораздо ниже входная цена."],
          ["Ноль выбросов","Полностью электрический привод без выхлопов."],
          ["Ниже стоимость владения","Меньше простоя, дешевле энергия, дольше ресурс."],
          ["Растущая сеть","Расширяющаяся сеть станций по региону."],
          ["Дольше живёт батарея","Централизованная зарядка продлевает каждую батарею."]],
        meetTitle:"Знакомьтесь — BARLAS.", meetLead:"Комфорт бизнес-класса, спроектированный вокруг замены батареи.",
        specs:[["Запас хода","до 500 км"],["Батарея","CATL · сменная"],["Замена","≈ 2 минуты"],["Класс","Бизнес-седан"],["Места","Просторный, 5"],["Безопасность","Современный ADAS"]],
        explore:"Подробнее об авто",
        swapTitle:"Как работает замена батареи.", swapLead:"Три шага. Около двух минут.",
        steps:[["Заезжаете","Въезжаете на станцию — без кабелей и ожидания."],["Замена","Автоматика меняет разряженную батарею на полную."],["Уезжаете","Снова в путь с полным зарядом."]],
        ecoTitle:"Одна открытая экосистема.", ecoLead:"Автомобиль, энергия и сервис — связаны от и до.",
        eco:["Автомобиль","Замена батареи","Подписка на батарею","Энергосеть","Автономная мобильность"],
        openTitle:"Открытая побеждает закрытую.",
        closed:["Только один бренд","Проприетарная батарея","Изолированная сеть","Ограниченный рост"],
        open:["Совместимость брендов","Единый стандарт батарей","Сеть в масштабе отрасли","Рост за счёт сети"],
        taxiTitle:"Платёжеспособный клиент уже здесь.",
        taxiLead:"Таксопарки — наш первый рынок, и экономика в их пользу.",
        taxiStats:[["+40%","Больше поездок в день"],["0 мин","Простоя на зарядке"],["24/7","Гарантия энергии"]],
        netTitle:"Сеть станций.", netLead:"Действующие, запланированные и будущие рынки Центральной Азии.",
        legend:["Действует","В планах","Будущее"],
        energyTitle:"Транспорт встречает энергетику.",
        energyLead:"Каждая станция — распределённое хранилище: балансирует сеть и впитывает ВИЭ.",
        energy:["Балансировка нагрузки","Интеграция ВИЭ","Снижение пиков","Распределённое хранение"],
        ctaTitle:"Постройте сеть вместе с нами.", ctaSub:"Партнёрство, инвестиции или запуск ECOMOBILE в вашем городе.",
        ctaP:"Стать партнёром", ctaC:"Связаться", footTag:"Платформа зелёного транспорта для мобильности будущего.",
        numEyebrow:"В цифрах", numTitle:"Цифры, которые меняют правила.",
        numbers:[[2," мин","Заменить полную батарею","Примерно как заправить машину."],[500," км","Запас хода на одной батарее","На сменной батарее CATL."],[20,"×","Быстрее зарядки","Две минуты против ~40 на зарядке."],[5,"","Стран в дорожной карте","По Центральной Азии к 2030 году."]],
        cmpTitle:"Замена, зарядка или бензин?", cmpLead:"Как двухминутная замена батареи смотрится на фоне альтернатив.",
        cmpCols:["Бензин","Электро на зарядке","ECOMOBILE"], cmpBadge:"замена батареи",
        cmpRows:[["Время до полного бака / заряда","~5 мин","40–60 мин","≈ 2 мин"],["Простой в течение дня","Заправки","Долгие зарядки","Почти ноль"],["Стоимость батареи сразу","—","Входит · дорого","По подписке"],["Выбросы выхлопа","Высокие","Ноль","Ноль"],["Цена энергии за км","Высокая","Низкая","Минимальная"],["Работает как накопитель сети","no","no","yes"]],
        cmpCostTitle:"Стоимость владения за 5 лет", cmpCostNote:"ориентировочно · меньше — лучше",
        cmpCost:[["100%",100],["~58%",58],["~34%",34]],
        cmpFoot1:"Дешевле энергия, почти нет простоя и батарея по подписке — суммарные расходы ниже до ", cmpFootPct:"~60%", cmpFoot2:" по сравнению с бензином.",
        roadTitle:"Дорога вперёд.", roadLead:"От первых станций до энергосети всего региона.",
        road:[["2026","Старт","Поставки BARLAS и NAYMAN; первые станции замены в Ташкенте."],["2027","Масштаб","Плотная сеть станций по Узбекистану; NAYMAN серийно."],["2028","Экспансия","Казахстан и Кыргызстан; стандарт батареи открывается партнёрам."],["2030","Платформа","Энерго- и транспортная сеть по пяти странам региона."]],
        order:"Заказать", learnMore:"Подробнее", powerTitle:"Полностью автоматическая замена батареи за две минуты.", powerSub:"Заехал, заменил, поехал — без кабелей и ожидания. Одна открытая энергосеть по Центральной Азии.", powerCta:"Как это работает" },
      uz:{ nav:["Nega","Modellar","BARLAS","Batareya","Ekotizim","Tarmoq"], partner:"Hamkor bo‘lish",
        modelsTitle:"Ikki avtomobil. Bitta tarmoq.", modelsLead:"O‘z ECOMOBILE’ingizni tanlang — ikkalasi bir tarmoqda almashadi.", from:"dan", configure:"Sozlash",
        eyebrow:"Yashil transport platformasi",
        title:"Quvvatlashni kutmaydigan elektromobil.",
        sub:"BARLAS batareyani ikki daqiqada almashtiradi — to‘xtashsiz, Markaziy Osiyo uchun ochiq energiya tarmog‘i.",
        cta1:"BARLAS haqida", cta2:"Stansiyani topish",
        stats:[["2 daq","Almashish"],["500 km","Masofa"],["5","Davlat"],["0 g","CO₂ / km"]],
        whyTitle:"Quvvatlashni kutmasdan elektr harakat.",
        whyLead:"Almashish rozetkadan afzal bo‘lishining olti sababi.",
        why:[["2 daqiqada almashish","Kirdingiz, almashtirdingiz, yo‘ldasiz."],
          ["Batareya — xizmat sifatida","Avtomobil sizniki, batareya obunada. Past kirish narxi."],
          ["Nol chiqindi","To‘liq elektr yuritma, chiqindisiz."],
          ["Past egalik narxi","Kam to‘xtash, arzon energiya, uzoq resurs."],
          ["O‘sayotgan tarmoq","Mintaqa bo‘ylab kengayuvchi tarmoq."],
          ["Uzoq batareya umri","Markazlashgan quvvatlash umrini uzaytiradi."]],
        meetTitle:"Tanishing — BARLAS.", meetLead:"Batareya almashish atrofida ishlangan biznes-klass qulaylik.",
        specs:[["Masofa","500 km gacha"],["Batareya","CATL · almashinuvchi"],["Almashish","≈ 2 daqiqa"],["Sinf","Biznes-sedan"],["O‘rin","Keng, 5"],["Xavfsizlik","Ilg‘or ADAS"]],
        explore:"Avtomobil haqida",
        swapTitle:"Batareya almashish qanday ishlaydi.", swapLead:"Uch qadam. Taxminan ikki daqiqa.",
        steps:[["Kirib kelasiz","Stansiyaga kirasiz — kabelsiz."],["Almashtirish","Avtomatika batareyani almashtiradi."],["Yo‘lda davom","To‘liq quvvat bilan yo‘lda."]],
        ecoTitle:"Yagona ochiq ekotizim.", ecoLead:"Avtomobil, energiya va xizmat — bog‘langan.",
        eco:["Avtomobil","Batareya almashish","Batareya obunasi","Energiya tarmog‘i","Avtonom harakat"],
        openTitle:"Ochiq yopiqdan ustun.",
        closed:["Faqat bitta brend","Maxsus batareya","Yakkalangan tarmoq","Cheklangan o‘sish"],
        open:["Ko‘p brendga moslik","Yagona standart","Soha tarmog‘i","Tarmoq effekti"],
        taxiTitle:"To‘lovga qodir mijoz allaqachon shu yerda.",
        taxiLead:"Taksi parklari — birinchi bozorimiz, iqtisod ularning foydasiga.",
        taxiStats:[["+40%","Ko‘proq qatnov"],["0 daq","To‘xtash"],["24/7","Kafolatli energiya"]],
        netTitle:"Almashish tarmog‘i.", netLead:"Faol, rejadagi va kelajak bozorlari Markaziy Osiyo bo‘ylab.",
        legend:["Faol","Rejada","Kelajak"],
        energyTitle:"Transport energetika bilan.",
        energyLead:"Har bir stansiya — taqsimlangan ombor: tarmoqni muvozanatlaydi.",
        energy:["Yuk muvozanati","Qayta tiklanuvchi integratsiya","Cho‘qqini kamaytirish","Taqsimlangan saqlash"],
        ctaTitle:"Tarmoqni biz bilan quring.", ctaSub:"Hamkorlik, investitsiya yoki ECOMOBILE’ni shahringizga olib keling.",
        ctaP:"Hamkor bo‘lish", ctaC:"Bog‘lanish", footTag:"Kelajak harakati uchun yashil transport platformasi.",
        numEyebrow:"Raqamlarda", numTitle:"Hammasini hal qiladigan raqamlar.",
        numbers:[[2," daq","To‘liq batareyani almashtirish","Avtomobilni quyishga ketadigan vaqtcha."],[500," km","Bitta batareyada masofa","CATL almashinuvchi batareyada."],[20,"×","Quvvatlashdan tezroq","Ikki daqiqa ~40 ga qarshi."],[5,"","Rejadagi davlatlar","2030 yilgacha Markaziy Osiyo bo‘ylab."]],
        cmpTitle:"Almashish, quvvatlash yoki yoqilg‘i?", cmpLead:"Ikki daqiqalik batareya almashish muqobillarga qanday raqobat qiladi.",
        cmpCols:["Benzin avto","Quvvatlanadigan EV","ECOMOBILE"], cmpBadge:"batareya almashish",
        cmpRows:[["To‘liq bak / quvvatgacha vaqt","~5 daq","40–60 daq","≈ 2 daq"],["Kun davomidagi to‘xtash","Yoqilg‘i quyish","Uzoq quvvatlash","Deyarli nol"],["Batareya boshlang‘ich narxi","—","Kiritilgan · qimmat","Obunada"],["Egzoz chiqindilari","Yuqori","Nol","Nol"],["Har km energiya narxi","Yuqori","Past","Eng past"],["Tarmoq uchun ombor sifatida","no","no","yes"]],
        cmpCostTitle:"5 yillik foydalanish xarajati", cmpCostNote:"taxminiy · kam — yaxshi",
        cmpCost:[["100%",100],["~58%",58],["~34%",34]],
        cmpFoot1:"Arzon energiya, deyarli nol to‘xtash va obunadagi batareya umumiy xarajatni ", cmpFootPct:"~60%", cmpFoot2:" gacha (benzinga nisbatan) kamaytiradi.",
        roadTitle:"Oldindagi yo‘l.", roadLead:"Birinchi stansiyalardan butun mintaqa energiya tarmog‘igacha.",
        road:[["2026","Start","BARLAS va NAYMAN yetkazib berish; Toshkentda birinchi stansiyalar."],["2027","Ko‘lam","O‘zbekiston bo‘ylab zich tarmoq; NAYMAN seriyali."],["2028","Kengayish","Qozog‘iston va Qirg‘iziston; batareya standarti hamkorlarga ochiladi."],["2030","Platforma","Besh davlat bo‘ylab energiya va transport tarmog‘i."]],
        order:"Buyurtma berish", learnMore:"Batafsil", powerTitle:"To‘liq avtomatik batareya almashish — ikki daqiqada.", powerSub:"Kirdingiz, almashtirdingiz, ketdingiz — kabelsiz va kutishsiz. Markaziy Osiyo bo‘ylab bitta ochiq energiya tarmog‘i.", powerCta:"Qanday ishlaydi" },
    };
    const L = createContext(T.en);
    const MODELS=[
      {name:"BARLAS", tag:"Sedan", img:"/images/barlas-side.jpg", trims:[["Comfort","259 999 000"],["Max","279 999 000"]]},
      {name:"NAYMAN", tag:"SUV", img:"/images/nayman-hero.jpg", trims:[["Comfort","289 999 000"],["Max","319 999 000"]]},
    ];

    /* ===================== primitives ===================== */
    function Reveal({children,y=22,delay=0,className="",as="div"}){
      const ref=useRef(null); const inView=useInView(ref,{once:true,margin:"-12% 0px"});
      const M=motion[as]||motion.div;
      return <M ref={ref} className={className} initial={{y}} animate={inView?{y:0}:{}} transition={{duration:.8,delay,ease:[0.16,1,0.3,1]}}>{children}</M>;
    }
    /* count-up number — fallback shows the final value so it's visible even if rAF is frozen */
    function CountUp({to,prefix="",suffix="",decimals=0,className}){
      const ref=useRef(null); const inView=useInView(ref,{once:true,margin:"-12% 0px"});
      const [v,setV]=useState(to);
      useEffect(()=>{ if(!inView) return; let raf,start=null,done=false;
        const tick=(ts)=>{ if(done) return; if(start===null) start=ts;
          const p=Math.min(1,(ts-start)/1300), e=1-Math.pow(1-p,3); setV(to*e);
          if(p<1) raf=requestAnimationFrame(tick); };
        raf=requestAnimationFrame(tick); return ()=>{done=true; cancelAnimationFrame(raf);};
      },[inView,to]);
      const txt=decimals>0?v.toFixed(decimals):Math.round(v).toLocaleString("en-US");
      return <span ref={ref} className={className}>{prefix}{txt}{suffix}</span>;
    }
    function Btn({children,primary,ghost,lg,light,outline,onClick}){
      const ref=useRef(null); const x=useMotionValue(0),y=useMotionValue(0);
      const sx=useSpring(x,{stiffness:200,damping:15}),sy=useSpring(y,{stiffness:200,damping:15});
      const pad=lg?"px-8 py-4 text-[1.02rem]":"px-6 py-3.5 text-[.95rem]";
      const skin=primary?"bg-green text-white hover:bg-green-600 shadow-[0_14px_30px_-10px_rgba(11,166,120,.6)]"
        :outline?"bg-transparent text-white border border-white/55 hover:bg-white/10"
        :light?"bg-white text-[#0a0b0d] hover:bg-white/90"
        :"bg-white text-[#0a0b0d] border border-[#e2e4e9] hover:border-[#0a0b0d]";
      return (<motion.button ref={ref} onClick={onClick}
        onMouseMove={e=>{const r=ref.current.getBoundingClientRect();x.set((e.clientX-r.left-r.width/2)*.25);y.set((e.clientY-r.top-r.height/2)*.25);}}
        onMouseLeave={()=>{x.set(0);y.set(0);}} style={{x:sx,y:sy}}
        className={"rounded-full font-medium inline-flex items-center gap-2 transition-colors "+pad+" "+skin}>
        {children}{primary&&<span>→</span>}
      </motion.button>);
    }
    function Stage({label,tall,square,children,tint}){
      const r=tall?"aspect-[4/5]":square?"aspect-square":"aspect-[16/10]";
      return (<div className={"relative w-full overflow-hidden rounded-[26px] "+r}
        style={{background:tint||"radial-gradient(80% 75% at 50% 25%, #f3f5f8, #e9ecf1)",boxShadow:"inset 0 1px 0 #fff, 0 30px 70px -34px rgba(16,24,40,.22)",border:"1px solid #edeff3"}}>
        <div className="blob" style={{width:"60%",height:"60%",left:"20%",top:"8%",background:"radial-gradient(closest-side,#bff0dd,transparent)"}}/>
        {children}
        <div className="absolute inset-x-5 bottom-5 flex items-center justify-between">
          <span className="text-[11px] tracking-[.18em] uppercase text-[#9aa1ab]">{label}</span>
          <span className="text-[10px] tracking-widest text-[#bcc2cb]">ECOMOBILE</span>
        </div>
      </div>);
    }

    /* interactive dot field — reacts to the cursor (works even if rAF is throttled) */
    function DotField(){
      const ref=useRef(null);
      useEffect(()=>{
        const c=ref.current, ctx=c.getContext("2d");
        let w=0,h=0,dots=[],mx=-9999,my=-9999,raf=0,tx=-9999,ty=-9999;
        const dpr=Math.min(window.devicePixelRatio||1,2), GAP=30, R=160;
        function build(){
          const r=c.getBoundingClientRect(); w=r.width; h=r.height;
          c.width=w*dpr; c.height=h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
          dots=[]; for(let y=GAP;y<h;y+=GAP) for(let x=GAP;x<w;x+=GAP) dots.push({x,y});
          draw();
        }
        function draw(){
          ctx.clearRect(0,0,w,h);
          if(mx>-9000){
            const g=ctx.createRadialGradient(mx,my,0,mx,my,R*1.5);
            g.addColorStop(0,"rgba(11,166,120,.10)"); g.addColorStop(1,"rgba(11,166,120,0)");
            ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
          }
          for(let i=0;i<dots.length;i++){
            const d=dots[i], dx=d.x-mx, dy=d.y-my, dist=Math.hypot(dx,dy)||1, t=Math.max(0,1-dist/R);
            const push=t*t*16, px=d.x+(dx/dist)*push, py=d.y+(dy/dist)*push, rr=1+t*3.6;
            ctx.beginPath(); ctx.arc(px,py,rr,0,6.283);
            ctx.fillStyle = t>0.03 ? "rgba(11,166,120,"+(0.25+t*0.75)+")" : "rgba(15,23,42,0.10)";
            ctx.fill();
          }
        }
        function loop(){ mx+=(tx-mx)*0.18; my+=(ty-my)*0.18; draw(); raf=requestAnimationFrame(loop); }
        function move(e){ const r=c.getBoundingClientRect(); tx=e.clientX-r.left; ty=e.clientY-r.top;
          if(mx<-9000){mx=tx;my=ty;} draw(); }            /* draw on move too — survives rAF freeze */
        function leave(){ tx=-9999; ty=-9999; mx=-9999; my=-9999; draw(); }
        build();
        const ro=new ResizeObserver(build); ro.observe(c);
        window.addEventListener("mousemove",move,{passive:true});
        document.addEventListener("mouseleave",leave);
        raf=requestAnimationFrame(loop);
        return ()=>{ cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener("mousemove",move); document.removeEventListener("mouseleave",leave); };
      },[]);
      return <canvas ref={ref} className="absolute inset-0 h-full w-full" style={{pointerEvents:"none"}}/>;
    }

    /* ===================== Nav ===================== */
    function Nav({lang,setLang,route}){
      const t=T[lang]; const [s,setS]=useState(false); const [o,setO]=useState(false); const [lo,setLo]=useState(false);
      useEffect(()=>{const f=()=>setS(window.scrollY>20);window.addEventListener("scroll",f);f();return()=>window.removeEventListener("scroll",f);},[]);
      const NAV=[["/barlas","BARLAS"],["/nayman","NAYMAN"],["/swap","Battery Swap"],["/news","News"],["/investors","Investors"]];
      return (<motion.header initial={{y:-22}} animate={{y:0}} transition={{duration:.6}}
        className={"fixed top-0 inset-x-0 z-50 transition-all duration-500 "+(s?"bg-white/80 backdrop-blur-xl border-b border-[#eef0f3]":"")}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-5 md:px-8" style={{paddingBlock:s?12:18}}>
          <a href="#/" className="flex items-center"><img src="/images/logo.svg" alt="ECOMOBILE" className="h-[18px] md:h-[24px] w-auto"/></a>
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map(([p,n])=><a key={p} href={"#"+p} className={"text-[.86rem] transition-colors "+(route===p?"text-green font-medium":"text-[#4b5563] hover:text-ink")}>{n}</a>)}
          </nav>
          <div className="flex items-center gap-2.5">
            <a href="#/contacts" className="hidden sm:inline-flex rounded-full bg-ink text-white px-4 py-2 text-[.82rem] hover:bg-black transition-colors">{t.partner}</a>
            <div className="relative">
              <button onClick={()=>setLo(v=>!v)} className="flex items-center gap-1 rounded-full border border-[#e2e4e9] px-3 py-2 text-[.78rem] font-medium">{lang.toUpperCase()}<span className="text-[7px]">▼</span></button>
              <AnimatePresence>{lo&&<motion.ul initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} className="absolute right-0 mt-2 min-w-[130px] rounded-xl border border-[#eceef1] bg-white p-1.5 shadow-xl">
                {["en","ru","uz"].map(l=><li key={l}><button onClick={()=>{setLang(l);setLo(false);}} className={"w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-[#f5f6f8] "+(l===lang?"text-green font-medium":"text-[#4b5563]")}>{{en:"English",ru:"Русский",uz:"O‘zbekcha"}[l]}</button></li>)}
              </motion.ul>}</AnimatePresence>
            </div>
            <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={()=>setO(v=>!v)}><span className="h-0.5 w-5 bg-ink"/><span className="h-0.5 w-5 bg-ink"/></button>
          </div>
        </div>
        <AnimatePresence>{o&&<motion.nav initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="md:hidden overflow-hidden border-t border-[#eef0f3] bg-white">
          <div className="flex flex-col px-6 py-4">{NAV.map(([p,n])=><a key={p} href={"#"+p} onClick={()=>setO(false)} className="py-3 text-lg">{n}</a>)}<a href="#/faq" onClick={()=>setO(false)} className="py-3 text-lg">FAQ</a><a href="#/contacts" onClick={()=>setO(false)} className="py-3 text-lg text-green">{t.partner}</a></div>
        </motion.nav>}</AnimatePresence>
      </motion.header>);
    }

    /* ===================== Hero ===================== */
    const BUBBLES=[
      {big:"2",unit:"min",label:"Battery swap",size:132,pos:{top:"-4%",left:"-12%"},anim:"floatA",dur:7,delay:0,par:.35},
      {big:"500",unit:"km",label:"Range",size:144,pos:{top:"4%",right:"-13%"},anim:"floatB",dur:8.5,delay:.6,par:.28},
      {big:"5",unit:"",label:"Countries",size:120,pos:{bottom:"16%",left:"-14%"},anim:"floatC",dur:7.8,delay:1,par:.42},
      {big:"0",unit:"g",label:"CO₂ / km",size:120,pos:{bottom:"4%",right:"-12%"},anim:"floatA",dur:9,delay:.3,par:.32},
    ];
    function HeroBubbles(){
      const ref=useRef(null);
      useEffect(()=>{ const el=ref.current; if(!el) return;
        const movers=Array.from(el.querySelectorAll("[data-par]"));
        function move(e){ const r=el.getBoundingClientRect(); const cx=(e.clientX-r.left-r.width/2)/r.width||0; const cy=(e.clientY-r.top-r.height/2)/r.height||0;
          movers.forEach((m)=>{ const f=parseFloat(m.getAttribute("data-par"))||.2; m.style.transform="translate("+(cx*46*f).toFixed(1)+"px,"+(cy*46*f).toFixed(1)+"px)"; }); }
        window.addEventListener("mousemove",move,{passive:true}); return ()=>window.removeEventListener("mousemove",move);
      },[]);
      return (<div ref={ref} className="pointer-events-none absolute inset-0 z-30 hidden sm:block">
        {BUBBLES.map((b,i)=>(<div key={i} data-par={b.par} style={{position:"absolute",transition:"transform .6s cubic-bezier(.16,1,.3,1)",...b.pos}}>
          <div className="soap" style={{width:b.size,height:b.size,animation:b.anim+" "+b.dur+"s ease-in-out "+b.delay+"s infinite"}}>
            {b.logo
              ? <img src="/images/logomark.svg" alt="" style={{width:b.size*0.46,height:b.size*0.46}}/>
              : <div><div className="font-bold tracking-tight leading-none" style={{fontSize:b.size*0.25}}>{b.big}<span className="font-semibold" style={{fontSize:b.size*0.14}}>{b.unit?(" "+b.unit):""}</span></div>
                  <div className="text-[#5b6470] font-medium" style={{fontSize:b.size*0.092,marginTop:b.size*0.045}}>{b.label}</div></div>}
          </div>
        </div>))}
      </div>);
    }
    function Hero(){
      const t=useContext(L);
      return (<section id="top" className="snap hero-stage relative overflow-hidden h-[100svh] min-h-[600px] w-full flex flex-col items-center text-center">
        <div className="relative z-10 pt-[13vh] md:pt-[15vh] px-4">
          <h1 className="mx-auto max-w-[20ch] font-medium tracking-[-.012em] leading-tight text-[#171a20]" style={{fontSize:"clamp(1.9rem,4.2vw,3rem)"}}>{t.title}</h1>
          <p className="muted mx-auto mt-2 max-w-lg text-[14px] md:text-[15px]">{t.sub}</p>
        </div>
        <div className="relative z-10 flex-1 min-h-0 w-full flex items-center justify-center px-4">
          <img src="/images/barlas-hero-nobg.png" alt="ECOMOBILE BARLAS" className="block mx-auto h-auto w-auto max-h-[46vh] max-w-[88vw]" style={{filter:"drop-shadow(0 30px 40px rgba(16,24,40,.18))"}}/>
        </div>
        <div className="relative z-10 mb-[6vh] md:mb-[5vh] w-full flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center px-4">
          <button onClick={()=>go("/barlas")} className="tbtn tbtn-primary">{t.cta1}</button>
          <button onClick={()=>go("/swap")} className="tbtn tbtn-secondary">{t.cta2}</button>
        </div>
      </section>);
    }

    /* ===== Tesla-faithful full-screen product panel ===== */
    function ModelPanel({slug,bg,dark}){ const {language:lg}=useLanguage(); const t=useContext(L); const v=VEHICLES[slug];
      const price=v.trims[0][1];
      const scrim=dark
        ? "linear-gradient(to bottom, rgba(8,10,12,.42) 0%, rgba(8,10,12,.05) 30%, rgba(8,10,12,.15) 62%, rgba(8,10,12,.6) 100%)"
        : "linear-gradient(to bottom, rgba(255,255,255,.45) 0%, rgba(255,255,255,0) 28%, rgba(255,255,255,0) 60%, rgba(255,255,255,.55) 100%)";
      return (<section className="snap relative h-[100svh] min-h-[600px] w-full overflow-hidden">
        <img src={bg} alt={v.name} className="absolute inset-0 h-full w-full object-cover"/>
        <div className="absolute inset-0" style={{background:scrim}}/>
        <div className="relative z-10 h-full flex flex-col items-center text-center px-4">
          <div className="pt-[12vh] md:pt-[15vh]">
            <h2 className={"font-medium tracking-[-.012em] leading-tight "+(dark?"text-white":"text-[#171a20]")} style={{fontSize:"clamp(2.1rem,4.4vw,3rem)"}}>{v.name}</h2>
            <p className={"mt-1.5 text-[14px] md:text-[15px] "+(dark?"text-white/85":"text-[#393c41]")}>{pick(v.tag,lg)} · {t.from} {price} сум</p>
          </div>
          <div className="mt-auto mb-[7vh] md:mb-[5.5vh] w-full flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center">
            <button onClick={()=>go("/contacts")} className={"tbtn "+(dark?"tbtn-light-primary":"tbtn-primary")}>{t.order}</button>
            <button onClick={()=>go("/"+slug)} className="tbtn tbtn-secondary">{t.learnMore}</button>
          </div>
        </div>
      </section>);
    }

    /* ===== Tesla-faithful battery-swap panel ===== */
    function PowerPanel(){ const t=useContext(L); const {language:lg}=useLanguage();
      const name={en:"Battery Swap",ru:"Замена батареи",uz:"Batareya almashish"}[lg]||"Battery Swap";
      return (<section className="snap relative h-[100svh] min-h-[600px] w-full overflow-hidden">
        <img src="/images/swapstation.png" alt="" className="absolute inset-0 h-full w-full object-cover"/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to bottom, rgba(8,10,12,.5) 0%, rgba(8,10,12,.08) 32%, rgba(8,10,12,.2) 64%, rgba(8,10,12,.66) 100%)"}}/>
        <div className="relative z-10 h-full flex flex-col items-center text-center px-4 text-white">
          <div className="pt-[12vh] md:pt-[15vh]">
            <h2 className="font-medium tracking-[-.012em] leading-tight" style={{fontSize:"clamp(2.1rem,4.4vw,3rem)"}}>{name}</h2>
            <p className="mt-1.5 text-[14px] md:text-[15px] text-white/85 max-w-md mx-auto">{t.powerSub}</p>
          </div>
          <div className="mt-auto mb-[7vh] md:mb-[5.5vh] w-full flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center">
            <button onClick={()=>go("/swap")} className="tbtn tbtn-light-primary">{t.powerCta}</button>
            <button onClick={()=>go("/swap")} className="tbtn tbtn-secondary">{t.cta2}</button>
          </div>
        </div>
      </section>);
    }

    /* generic Tesla-style full-screen feature panel */
    function Panel({img,dark,title,sub,p1,p2}){
      return (<section className="snap relative h-[100svh] min-h-[600px] w-full overflow-hidden">
        <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover"/>
        <div className="absolute inset-0" style={{background: dark
          ? "linear-gradient(to bottom, rgba(8,10,12,.5) 0%, rgba(8,10,12,.08) 32%, rgba(8,10,12,.2) 64%, rgba(8,10,12,.66) 100%)"
          : "linear-gradient(to bottom, rgba(255,255,255,.45) 0%, rgba(255,255,255,0) 28%, rgba(255,255,255,0) 60%, rgba(255,255,255,.55) 100%)"}}/>
        <div className={"relative z-10 h-full flex flex-col items-center text-center px-4 "+(dark?"text-white":"text-[#171a20]")}>
          <div className="pt-[12vh] md:pt-[15vh]">
            <h2 className="font-medium tracking-[-.012em] leading-tight" style={{fontSize:"clamp(2.1rem,4.4vw,3rem)"}}>{title}</h2>
            {sub&&<p className={"mt-1.5 text-[14px] md:text-[15px] max-w-md mx-auto "+(dark?"text-white/85":"text-[#393c41]")}>{sub}</p>}
          </div>
          <div className="mt-auto mb-[7vh] md:mb-[5.5vh] w-full flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center">
            {p1&&<button onClick={()=>go(p1[1])} className={"tbtn "+(dark?"tbtn-light-primary":"tbtn-primary")}>{p1[0]}</button>}
            {p2&&<button onClick={()=>go(p2[1])} className="tbtn tbtn-secondary">{p2[0]}</button>}
          </div>
        </div>
      </section>);
    }

    function Trust(){
      const items=["Battery Swap","Battery-as-a-Service","Zero Emissions","Open Ecosystem","2-Minute Swap","Central Asia"];
      const row=[...items,...items];
      return (<div className="overflow-hidden border-y border-[#eef0f3] bg-[#fafbfc] py-5">
        <div className="flex w-max items-center gap-10 whitespace-nowrap" style={{animation:"marquee 34s linear infinite"}}>
          {row.map((s,i)=><Fragment key={i}><span className="text-sm font-semibold tracking-wide text-[#9aa1ab]">{s}</span><span className="text-green/50 text-xs">●</span></Fragment>)}
        </div>
      </div>);
    }

    function Head({n,title,lead,center}){
      return (<div className={center?"text-center":""}>
        <Reveal><div className={"flex items-center gap-3 "+(center?"justify-center":"")}><span className="text-green text-xs font-semibold">{n}</span><span className="h-px w-8 bg-[#d6d9de]"/><span className="eyebrow" style={{color:"#9aa1ab"}}>ECOMOBILE</span></div></Reveal>
        <Reveal delay={.05}><h2 className={"mt-5 font-bold tracking-[-.03em] leading-[1.05] "+(center?"mx-auto max-w-3xl":"max-w-2xl")} style={{fontSize:"clamp(2rem,4.6vw,3.4rem)"}}>{title}</h2></Reveal>
        {lead&&<Reveal delay={.1}><p className={"muted mt-4 text-lg "+(center?"mx-auto max-w-xl":"max-w-lg")}>{lead}</p></Reveal>}
      </div>);
    }

    function Icon({n,className,style}){
      const P={
        swap:<><path d="M4 9a6 6 0 0 1 10-3.6L17 8"/><path d="M17 4v4h-4"/><path d="M20 15a6 6 0 0 1-10 3.6L7 16"/><path d="M7 20v-4h4"/></>,
        sub:<><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/></>,
        leaf:<><path d="M5 19c0-7 5-13 14-13 0 9-6 14-14 14z"/><path d="M5 19c2-5 5-8 9-10"/></>,
        coin:<><circle cx="12" cy="12" r="9"/><path d="M14.5 9.4a2.5 2 0 0 0-5 0c0 2.6 5 1.5 5 4.2a2.5 2 0 0 1-5 0"/><path d="M12 6.4v11.2"/></>,
        net:<><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6.8l4 9.4M17 6.8l-4 9.4M7 6h10"/></>,
        battery:<><rect x="3" y="8" width="15" height="9" rx="2"/><path d="M21 11.5v2M6.5 11v3M9.5 11v3M12.5 11v3"/></>,
        clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5l3.2 2"/></>,
        bolt:<><path d="M13 2 5 13h6l-1 9 9-12h-6z"/></>,
        car:<><path d="M3 13l2.2-5.2A2 2 0 0 1 7 6.5h10a2 2 0 0 1 1.8 1.3L21 13"/><path d="M3 13h18v3.5a1 1 0 0 1-1 1h-1.5"/><path d="M5.5 17.5H4a1 1 0 0 1-1-1V13"/><path d="M7 17.5h10"/><path d="M6.5 17.2v.6M17.5 17.2v.6"/></>,
        sun:<><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19"/></>,
        grid:<><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
        bot:<><rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 8V4M8 13h.01M16 13h.01M9 16h6"/></>,
      };
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>{P[n]||null}</svg>;
    }
    function SpotCard({children,className=""}){
      const ref=useRef(null); const [p,setP]=useState({x:-300,y:-300});
      return (<div ref={ref} onMouseMove={e=>{const r=ref.current.getBoundingClientRect();setP({x:e.clientX-r.left,y:e.clientY-r.top});}}
        className={"group softcard relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 "+className}>
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{background:"radial-gradient(220px circle at "+p.x+"px "+p.y+"px, rgba(11,166,120,.12), transparent 70%)"}}/>
        <div className="relative z-10 p-8">{children}</div>
      </div>);
    }
    function NetMini({open}){
      const pts=open?[[22,30],[58,18],[100,32],[138,22],[80,60],[120,60],[36,64]]:[[26,26],[56,42],[40,66],[104,26],[130,48],[112,68]];
      return (<svg viewBox="0 0 160 84" className="w-full h-16">
        {open
          ? pts.flatMap((a,i)=>pts.slice(i+1).map((b,j)=>{const d=Math.hypot(a[0]-b[0],a[1]-b[1]);return d<72?<line key={i+"_"+j} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#0ba678" strokeOpacity=".35" strokeWidth="1"/>:null;}))
          : [[0,1],[1,2],[3,4],[4,5]].map(([a,b],k)=><line key={k} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="#c7ccd4" strokeWidth="1"/>)}
        {pts.map((p,i)=><circle key={i} cx={p[0]} cy={p[1]} r="4.5" fill={open?"#0ba678":"#aeb4bd"}/>)}
      </svg>);
    }

    function Why(){ const t=useContext(L);
      const ic=["swap","sub","leaf","coin","net","battery"];
      return (<section id="why" className="mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-36">
        <Head n="01" title={t.whyTitle} lead={t.whyLead}/>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {t.why.map(([ti,d],i)=><Reveal key={i} delay={i*.05}><SpotCard className="h-full">
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-green-50 text-green"><Icon n={ic[i]} className="h-6 w-6"/></div>
              <span className="text-sm font-bold text-[#dce2e6]">{String(i+1).padStart(2,"0")}</span>
            </div>
            <h3 className="mt-5 text-xl font-semibold">{ti}</h3><p className="muted mt-2.5 leading-relaxed">{d}</p>
          </SpotCard></Reveal>)}
        </div>
      </section>);
    }

    function Meet(){ const t=useContext(L);
      return (<section id="barlas" className="bg-[#fafbfc] border-y border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-36 grid md:grid-cols-2 gap-14 items-center">
        <Reveal><div className="relative w-full overflow-hidden rounded-[26px] border border-[#edeff3] aspect-[4/5]" style={{boxShadow:"0 30px 70px -34px rgba(16,24,40,.22)"}}>
          <img src="/images/interior.jpg" alt="BARLAS interior" className="absolute inset-0 h-full w-full object-cover"/>
          <span className="absolute bottom-4 left-4 rounded-full bg-black/30 backdrop-blur px-3 py-1.5 text-[11px] tracking-[.16em] uppercase text-white/85">Interior · BARLAS</span>
        </div></Reveal>
        <div>
          <Head n="02" title={t.meetTitle} lead={t.meetLead}/>
          <div className="mt-8 grid grid-cols-2 gap-px bg-[#e9eaee] rounded-2xl overflow-hidden border border-[#e9eaee]">
            {t.specs.map(([k,v],i)=><Reveal key={i} delay={i*.04}><div className="bg-white p-5 h-full">
              <div className="text-xs uppercase tracking-wider text-[#9aa1ab]">{k}</div><div className="mt-1.5 font-semibold">{v}</div></div></Reveal>)}
          </div>
          <Reveal delay={.2}><div className="mt-8"><Btn primary onClick={()=>go("/barlas")}>{t.explore}</Btn></div></Reveal>
        </div>
      </div></section>);
    }

    function Swap(){ const t=useContext(L);
      const ic=["car","battery","bolt"];
      return (<section id="swap" className="mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-36">
        <Head n="03" title={t.swapTitle} lead={t.swapLead} center/>
        <div className="mt-16 relative grid md:grid-cols-3 gap-8">
          <div className="hidden md:block absolute top-12 left-[17%] right-[17%] h-px" style={{background:"linear-gradient(90deg,transparent,rgba(11,166,120,.4),transparent)"}}/>
          {t.steps.map(([ti,d],i)=><Reveal key={i} delay={i*.1}><div className="relative text-center">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-[26px] bg-white border border-[#e9eaee]" style={{boxShadow:"0 26px 50px -28px rgba(16,24,40,.3)"}}><Icon n={ic[i]} className="h-9 w-9 text-green"/></div>
            <div className="mx-auto -mt-3 relative z-10 grid h-7 w-7 place-items-center rounded-full bg-green text-white text-[13px] font-bold border-2 border-white">{i+1}</div>
            <h3 className="mt-4 text-xl font-semibold">{ti}</h3><p className="muted mt-2 max-w-[26ch] mx-auto">{d}</p>
          </div></Reveal>)}
        </div>
        <Reveal delay={.1}><div className="mt-16 softcard p-8 md:p-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-between"><span className="font-semibold">Time to a full battery</span><span className="text-xs text-[#9aa1ab] uppercase tracking-wider">lower is better</span></div>
          <div className="mt-7 space-y-6">
            <div><div className="flex justify-between text-sm mb-2"><span className="muted">Plug-in charging</span><span className="font-semibold text-[#8a909b]">~40 min</span></div><div className="h-3.5 rounded-full bg-[#eef0f3] overflow-hidden"><div className="h-full rounded-full bg-[#cfd4dc]" style={{width:"100%"}}/></div></div>
            <div><div className="flex justify-between text-sm mb-2"><span className="font-medium">ECOMOBILE swap</span><span className="font-bold text-green">≈ 2 min</span></div><div className="h-3.5 rounded-full bg-[#eef0f3] overflow-hidden"><div className="h-full rounded-full" style={{width:"6%",background:"linear-gradient(90deg,#0ba678,#10b981)"}}/></div></div>
          </div>
          <p className="muted text-sm mt-7">That's roughly <b className="text-green">20× faster</b> than charging — no cables, no waiting.</p>
        </div></Reveal>
      </section>);
    }

    function Ecosystem(){ const t=useContext(L);
      const ic=["car","swap","sub","sun","bot"];
      const R=200,cx=300,cy=300;
      const pos=t.eco.map((_,i)=>{const a=(-90+i*(360/t.eco.length))*Math.PI/180;return [cx+R*Math.cos(a),cy+R*Math.sin(a)];});
      return (<section id="ecosystem" className="bg-[#fafbfc] border-y border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-36">
        <Head n="05" title={t.ecoTitle} lead={t.ecoLead} center/>
        <Reveal delay={.1}><div className="relative mx-auto mt-16 w-full max-w-[600px] aspect-square">
          <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full">
            <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(11,166,120,.22)" strokeWidth="1.5" strokeDasharray="2 8"/>
            {pos.map(([x,y],i)=><line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(11,166,120,.16)" strokeWidth="1.5"/>)}
            <circle cx={cx} cy={cy} r={R} fill="none" stroke="#0ba678" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="10 1247" style={{animation:"spin 14s linear infinite",transformOrigin:"300px 300px",opacity:.6}}/>
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center h-[120px] w-[120px] rounded-full text-white text-center" style={{background:"radial-gradient(120% 120% at 50% 20%, #14b886, #0a0b0d)",boxShadow:"0 20px 50px -16px rgba(11,166,120,.6)"}}>
            <div><img src="/images/logomark.svg" alt="" className="h-8 w-8 mx-auto" style={{filter:"brightness(0) invert(1)"}}/><div className="mt-1.5 text-[11px] font-bold tracking-wide">ECOMOBILE</div></div>
          </div>
          {t.eco.map((n,i)=>{const [x,y]=pos[i];return (<div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{left:(x/600*100)+"%",top:(y/600*100)+"%"}}>
            <div className="w-[124px] rounded-2xl bg-white border border-[#e9eaee] px-3 py-3.5 text-center" style={{boxShadow:"0 18px 40px -24px rgba(16,24,40,.35)"}}>
              <div className="grid h-9 w-9 mx-auto place-items-center rounded-xl bg-green-50 text-green"><Icon n={ic[i]} className="h-5 w-5"/></div>
              <div className="mt-2 text-xs font-semibold leading-tight">{n}</div>
            </div>
          </div>);})}
        </div></Reveal>
      </div></section>);
    }

    function Open(){ const t=useContext(L);
      return (<section className="mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-36">
        <Head n="06" title={t.openTitle} center/>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <Reveal><div className="rounded-[24px] border border-[#e9eaee] bg-[#fafbfc] p-8 md:p-10 h-full">
            <div className="flex items-center justify-between"><div className="eyebrow" style={{color:"#9aa1ab"}}>Closed ecosystem</div><span className="text-xs text-[#b7bdc6]">isolated</span></div>
            <div className="mt-5 rounded-xl border border-[#eef0f3] bg-white p-4"><NetMini open={false}/></div>
            <ul className="mt-5">{t.closed.map((c,i)=><li key={i} className="flex items-center gap-3 border-b border-[#eef0f3] py-4 text-[#8a909b]"><span>—</span>{c}</li>)}</ul>
          </div></Reveal>
          <Reveal delay={.08}><div className="softcard p-8 md:p-10 h-full" style={{background:"linear-gradient(180deg,#f0faf5,#ffffff)"}}>
            <div className="flex items-center justify-between"><div className="eyebrow">Open ecosystem</div><span className="text-xs font-semibold text-green">network effect</span></div>
            <div className="mt-5 rounded-xl border border-[#e7f3ec] bg-white p-4"><NetMini open={true}/></div>
            <ul className="mt-5">{t.open.map((c,i)=><li key={i} className="flex items-center gap-3 border-b border-[#e7f3ec] py-4 font-medium"><span className="text-green">✓</span>{c}</li>)}</ul>
          </div></Reveal>
        </div>
      </section>);
    }

    function Taxi(){ const t=useContext(L);
      const ic=["car","clock","bolt"];
      return (<section className="bg-[#fafbfc] border-y border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-36 grid md:grid-cols-2 gap-12 items-center">
        <div><Head n="07" title={t.taxiTitle} lead={t.taxiLead}/>
          <Reveal delay={.1}><div className="mt-8 softcard p-7">
            <div className="text-sm font-semibold">Trips per day</div>
            <div className="mt-5 space-y-4">
              <div><div className="flex justify-between text-xs mb-1.5"><span className="muted">Plug-in charging EV</span><span className="font-semibold text-[#8a909b]">~18</span></div><div className="h-2.5 rounded-full bg-[#eef0f3] overflow-hidden"><div className="h-full rounded-full bg-[#cfd4dc]" style={{width:"56%"}}/></div></div>
              <div><div className="flex justify-between text-xs mb-1.5"><span className="font-medium">ECOMOBILE swap</span><span className="font-bold text-green">~25</span></div><div className="h-2.5 rounded-full bg-[#eef0f3] overflow-hidden"><div className="h-full rounded-full" style={{width:"80%",background:"linear-gradient(90deg,#0ba678,#10b981)"}}/></div></div>
            </div>
          </div></Reveal>
        </div>
        <div className="grid gap-4">{t.taxiStats.map(([v,l],i)=><Reveal key={i} delay={i*.08}><div className="softcard flex items-center gap-5 px-7 py-6">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-green-50 text-green"><Icon n={ic[i]} className="h-6 w-6"/></div>
          <div><div className="text-3xl md:text-4xl font-bold text-green leading-none tracking-tight">{v}</div><div className="muted text-sm mt-1">{l}</div></div></div></Reveal>)}</div>
      </div></section>);
    }

    /* count-up impact band */
    function Numbers(){ const t=useContext(L);
      return (<section className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28">
        <Reveal><div className="text-center"><div className="eyebrow inline-flex items-center gap-2" style={{color:"#9aa1ab"}}><span className="h-1.5 w-1.5 rounded-full bg-green"/>{t.numEyebrow}</div>
          <h2 className="mt-4 mx-auto max-w-2xl font-bold tracking-[-.03em] leading-[1.05]" style={{fontSize:"clamp(1.9rem,4.4vw,3rem)"}}>{t.numTitle}</h2></div></Reveal>
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#e9eaee] rounded-[26px] overflow-hidden border border-[#e9eaee]">
          {t.numbers.map(([to,suffix,label,sub],i)=><Reveal key={i} delay={i*.06}><div className="bg-white h-full px-6 py-9 md:px-8 md:py-11 text-center md:text-left">
            <div className="font-bold tracking-[-.035em] text-green leading-none" style={{fontSize:"clamp(2.4rem,5vw,3.6rem)"}}><CountUp to={to} suffix={suffix}/></div>
            <div className="mt-3 font-semibold">{label}</div><p className="muted mt-1.5 text-sm leading-relaxed">{sub}</p>
          </div></Reveal>)}
        </div>
      </section>);
    }

    /* comparison matrix + 5-year running cost */
    function Compare(){ const t=useContext(L);
      const gt={gridTemplateColumns:"1.3fr 1fr 1fr 1.15fr"};
      const mark=(v)=> v==="yes"
        ? <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-green text-white text-[12px] font-bold">✓</span>
        : <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#eef0f3] text-[#aab0b9] text-[12px]">✕</span>;
      return (<section className="mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-36">
        <Head n="04" title={t.cmpTitle} lead={t.cmpLead} center/>
        <Reveal delay={.1}><div className="mt-14 overflow-x-auto pb-1">
          <div className="min-w-[660px] rounded-[26px] border border-[#e9eaee] overflow-hidden" style={{boxShadow:"0 30px 70px -40px rgba(16,24,40,.18)"}}>
            <div className="grid items-stretch" style={gt}>
              <div className="bg-white px-5 py-5"/>
              <div className="bg-white px-5 py-5 text-sm font-semibold text-[#8a909b]">{t.cmpCols[0]}</div>
              <div className="bg-white px-5 py-5 text-sm font-semibold text-[#8a909b]">{t.cmpCols[1]}</div>
              <div className="px-5 py-5 text-white" style={{background:"linear-gradient(180deg,#0ba678,#078a64)"}}><div className="text-sm font-bold tracking-tight">{t.cmpCols[2]}</div><div className="text-[10px] uppercase tracking-[.14em] text-white/70">{t.cmpBadge}</div></div>
            </div>
            {t.cmpRows.map((r,i)=><div key={i} className="grid items-center border-t border-[#eef0f3]" style={gt}>
              <div className="px-5 py-4 text-sm font-medium text-[#4b5563] bg-[#fafbfc]">{r[0]}</div>
              <div className="px-5 py-4 text-sm">{r[1]==="yes"||r[1]==="no"?mark(r[1]):<span className="text-[#8a909b]">{r[1]}</span>}</div>
              <div className="px-5 py-4 text-sm">{r[2]==="yes"||r[2]==="no"?mark(r[2]):<span className="text-[#8a909b]">{r[2]}</span>}</div>
              <div className="px-5 py-4 text-sm font-semibold bg-[#f0faf5]">{r[3]==="yes"||r[3]==="no"?mark(r[3]):<span className="text-[#0a0b0d]">{r[3]}</span>}</div>
            </div>)}
          </div>
        </div></Reveal>
        <Reveal delay={.12}><div className="mt-8 softcard p-8 md:p-10">
          <div className="flex items-center justify-between"><span className="font-semibold">{t.cmpCostTitle}</span><span className="text-xs text-[#9aa1ab] uppercase tracking-wider">{t.cmpCostNote}</span></div>
          <div className="mt-7 space-y-5">
            {t.cmpCost.map(([val,w],i)=>{const grad=i===2;return <div key={i}>
              <div className="flex justify-between text-sm mb-2"><span className={grad?"font-medium":"muted"}>{t.cmpCols[i]}</span><span className={grad?"font-bold text-green":"font-semibold text-[#8a909b]"}>{val}</span></div>
              <div className="h-3.5 rounded-full bg-[#eef0f3] overflow-hidden"><div className="h-full rounded-full" style={{width:w+"%",background:grad?"linear-gradient(90deg,#0ba678,#10b981)":(i===1?"#aeb4bd":"#cfd4dc")}}/></div>
            </div>;})}
          </div>
          <p className="muted text-sm mt-7">{t.cmpFoot1}<b className="text-green">{t.cmpFootPct}</b>{t.cmpFoot2}</p>
        </div></Reveal>
      </section>);
    }

    /* horizontal roadmap timeline */
    function Roadmap(){ const t=useContext(L);
      const road=t.road;
      return (<section className="bg-[#fafbfc] border-y border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-32">
        <Head n="·" title={t.roadTitle} lead={t.roadLead} center/>
        <div className="mt-16 relative">
          <div className="hidden md:block absolute left-2 right-2 top-[7px] h-px" style={{background:"linear-gradient(90deg,#0ba678,rgba(11,166,120,.15))"}}/>
          <div className="grid md:grid-cols-4 gap-9 md:gap-6">
            {road.map(([y,h,d],i)=><Reveal key={i} delay={i*.08}><div className="relative md:pr-4">
              <div className="flex items-center gap-3 md:block">
                <span className="relative z-10 block h-4 w-4 rounded-full bg-green ring-4 ring-[#fafbfc]"/>
                <div className="text-green font-bold text-lg md:mt-5">{y}</div>
              </div>
              <div className="mt-2 md:mt-3 text-lg font-semibold">{h}</div>
              <p className="muted mt-2 text-sm leading-relaxed md:max-w-[24ch]">{d}</p>
            </div></Reveal>)}
          </div>
        </div>
      </div></section>);
    }

    function Network(){ const t=useContext(L);
      const col={live:"#0ba678",plan:"#5ccda7",future:"#c7ccd4"};
      const legendCol=[col.live,col.plan,col.future];
      const leftLabel=new Set(["Bukhara","Dushanbe","Ashgabat","Nukus"]);
      return (<section id="network" className="mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-36">
        <Head n="08" title={t.netTitle} lead={t.netLead} center/>
        <Reveal delay={.12}><div className="mt-12 overflow-hidden rounded-[28px] border border-[#e9eaee] p-3 md:p-8" style={{background:"radial-gradient(120% 110% at 50% -10%, #f1faf6 0%, #ffffff 60%)"}}>
          <svg viewBox={CA_VIEWBOX} className="w-full h-auto" style={{maxHeight:560}}>
            <defs>
              <radialGradient id="caglow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#0ba678" stopOpacity=".12"/><stop offset="1" stopColor="#0ba678" stopOpacity="0"/></radialGradient>
              <filter id="dsh" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0ba678" floodOpacity=".55"/></filter>
            </defs>
            <ellipse cx="470" cy="360" rx="460" ry="300" fill="url(#caglow)"/>
            <g>{CA_PATHS.map((d,i)=><path key={i} d={d} fill="#e8edf1" stroke="rgba(11,166,120,.45)" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round"/>)}</g>
            <g stroke="#0ba678" strokeOpacity=".30" strokeWidth="1.4" strokeDasharray="1.5 8" strokeLinecap="round">
              {LINKS.map(([a,b],i)=><line key={i} x1={CITIES[a][1]} y1={CITIES[a][2]} x2={CITIES[b][1]} y2={CITIES[b][2]}/>)}
            </g>
            {CITIES.map(([n,x,y,kk],i)=>(<g key={n}>
              {kk==="live" && <circle cx={x} cy={y} r="14" fill="none" stroke="#0ba678" strokeOpacity=".35"/>}
              <circle cx={x} cy={y} r={kk==="live"?7:5.5} fill={col[kk]} filter={kk==="live"?"url(#dsh)":undefined} style={kk==="live"?{animation:`pulse 2.6s ease-in-out ${i*.25}s infinite`,transformOrigin:`${x}px ${y}px`}:{}}/>
              <text x={leftLabel.has(n)?x-12:x+12} y={y+4.5} textAnchor={leftLabel.has(n)?"end":"start"} fontSize="14.5" fontWeight="600" fill="#5b6470" stroke="#ffffff" strokeWidth="3" style={{paintOrder:"stroke"}}>{n}</text>
            </g>))}
          </svg>
        </div></Reveal>
        <div className="mt-7 flex flex-wrap justify-center gap-6 text-sm muted">{t.legend.map((l,i)=><span key={i} className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full" style={{background:legendCol[i]}}/>{l}</span>)}</div>
        <div className="mt-9 flex flex-wrap justify-center gap-x-9 gap-y-2 text-base font-semibold text-[#b7bdc6]">{["Uzbekistan","Kazakhstan","Kyrgyzstan","Tajikistan","Turkmenistan"].map(c=><span key={c}>{c}</span>)}</div>
      </section>);
    }

    function Energy(){ const t=useContext(L);
      return (<section className="bg-[#fafbfc] border-y border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-36 grid md:grid-cols-2 gap-12 items-center">
        <div><Head n="09" title={t.energyTitle} lead={t.energyLead}/>
          <div className="mt-8 grid grid-cols-2 gap-3">{t.energy.map((b,i)=><Reveal key={i} delay={i*.05}><div className="rounded-xl border border-[#e9eaee] bg-white px-5 py-4 text-sm font-medium hover:border-green/50 transition-colors">{b}</div></Reveal>)}</div>
        </div>
        <Reveal delay={.1}><div className="rounded-[26px] p-7 md:p-9 text-white" style={{background:"radial-gradient(120% 100% at 50% 0,#12161c,#0a0b0d)",boxShadow:"0 30px 70px -34px rgba(16,24,40,.5)"}}>
          <div className="eyebrow" style={{color:"#7dd6b6"}}>How energy flows</div>
          <div className="mt-7 flex items-center justify-between gap-1.5">
            {[["sun","Renewables"],["battery","Swap station"],["grid","City grid"]].map(([ico,lab],i)=><Fragment key={i}>
              <div className="flex flex-col items-center gap-2 text-center"><div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/12 bg-white/[.04] text-green-400"><Icon n={ico} className="h-7 w-7"/></div><span className="text-[11px] text-white/60 font-medium">{lab}</span></div>
              {i<2 && <svg viewBox="0 0 60 12" className="flex-1 h-3 min-w-[26px]"><line x1="2" y1="6" x2="52" y2="6" stroke="#0ba678" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round"><animate attributeName="stroke-dashoffset" from="14" to="0" dur="1s" repeatCount="indefinite"/></line><path d="M50 2l6 4-6 4" fill="none" stroke="#0ba678" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </Fragment>)}
          </div>
          <div className="mt-9 rounded-2xl border border-white/10 bg-white/[.02] p-5">
            <div className="flex items-center justify-between text-xs text-white/50 mb-2"><span>Grid load · peak shaving</span><span className="text-green-400 font-semibold">−30% peak</span></div>
            <svg viewBox="0 0 300 90" className="w-full h-24">
              <path d="M0 72 C40 72 50 18 84 18 C116 18 124 66 160 66 C200 66 208 24 250 24 C280 24 292 62 300 62" fill="none" stroke="#3a414b" strokeWidth="2" strokeDasharray="3 4"/>
              <path d="M0 68 C40 68 64 50 104 50 C152 50 164 52 204 52 C252 52 272 58 300 58" fill="none" stroke="#10e07f" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <div className="flex gap-5 text-[11px] mt-1"><span className="flex items-center gap-1.5 text-white/45"><i className="h-0.5 w-4 bg-[#3a414b] inline-block"/>Raw demand</span><span className="flex items-center gap-1.5 text-white/70"><i className="h-0.5 w-4 inline-block" style={{background:"#10e07f"}}/>Balanced</span></div>
          </div>
        </div></Reveal>
      </div></section>);
    }

    function CTA(){ const t=useContext(L);
      return (<section id="cta" className="mx-auto max-w-[1200px] px-5 md:px-8 py-20">
        <div className="relative overflow-hidden rounded-[30px] px-6 py-20 md:py-28 text-center text-white" style={{background:"linear-gradient(135deg,#0ba678,#078a64)"}}>
          <div className="blob" style={{width:420,height:420,left:"-5%",top:"-30%",background:"radial-gradient(closest-side,rgba(255,255,255,.35),transparent)"}}/>
          <img src="/images/logomark.svg" alt="" className="pointer-events-none absolute -right-16 -bottom-24 w-80 opacity-15" style={{filter:"brightness(0) invert(1)",animation:"spin 32s linear infinite"}}/>
          <div className="relative z-10 mx-auto max-w-2xl">
            <Reveal><h2 className="font-bold tracking-[-.03em] leading-[1.05]" style={{fontSize:"clamp(2.2rem,5.4vw,4rem)"}}>{t.ctaTitle}</h2></Reveal>
            <Reveal delay={.08}><p className="mx-auto mt-5 max-w-lg text-lg text-white/85">{t.ctaSub}</p></Reveal>
            <Reveal delay={.16}><div className="mt-9 flex flex-wrap justify-center gap-3"><Btn light lg onClick={()=>go("/contacts")}>{t.ctaP}</Btn><Btn outline lg onClick={()=>go("/contacts")}>{t.ctaC}</Btn></div></Reveal>
          </div>
        </div>
      </section>);
    }

    function Footer({lang}){ const t=T[lang];
      return (<footer className="border-t border-[#eef0f3] pt-16 pb-10">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8 grid md:grid-cols-2 gap-10">
          <div><a href="#top" className="inline-flex"><img src="/images/logo.svg" alt="ECOMOBILE" className="h-7 w-auto"/></a><p className="muted mt-4 max-w-xs">{t.footTag}</p></div>
          <div className="grid grid-cols-3 gap-6 text-sm">
            {[["Vehicles",["BARLAS","Future models"]],["Stations",["How it works",t.partner]],["Company",["About","Investors"]]].map(([h,it],i)=><div key={i}><h4 className="font-semibold mb-3">{h}</h4>{it.map((x,j)=><a key={j} href="#" className="block py-1.5 muted hover:text-green">{x}</a>)}</div>)}
          </div>
        </div>
        <div className="mx-auto max-w-[1200px] px-5 md:px-8 mt-12 pt-6 border-t border-[#eef0f3] flex flex-wrap justify-between gap-3 text-xs text-[#9aa1ab]"><span>© 2026 ECOMOBILE</span><span>Green Transport Platform · Central Asia</span></div>
      </footer>);
    }

    function Models(){ const t=useContext(L);
      return (<section id="models" className="mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-36">
        <Head n="02" title={t.modelsTitle} lead={t.modelsLead} center/>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {MODELS.map((m,i)=><Reveal key={i} delay={i*.08}>
            <div className="softcard overflow-hidden h-full">
              <div className="relative aspect-[16/11]" style={{background:"radial-gradient(80% 80% at 50% 30%,#f5f7f9,#eceff3)"}}>
                <img src={m.img} alt={m.name} className="absolute inset-0 h-full w-full object-cover" style={{mixBlendMode:"multiply"}}/>
                <span className="absolute top-4 left-4 rounded-full bg-white/85 backdrop-blur px-3 py-1 text-xs font-semibold tracking-wide">{m.tag}</span>
              </div>
              <div className="p-7 md:p-8">
                <h3 className="text-2xl font-bold tracking-tight">{m.name}</h3>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {m.trims.map(([trim,price],j)=><div key={j} className="rounded-2xl border border-[#eef0f3] p-4">
                    <div className="text-sm font-semibold">{trim}</div>
                    <div className="muted text-xs mt-2">{t.from}</div>
                    <div className="font-bold text-[1.05rem] leading-tight">{price} <span className="text-xs font-medium muted">сум</span></div>
                  </div>)}
                </div>
                <div className="mt-6"><Btn primary onClick={()=>go("/"+m.name.toLowerCase())}>{t.configure}</Btn></div>
              </div>
            </div>
          </Reveal>)}
        </div>
      </section>);
    }

    /* ===================== ROUTER ===================== */
    function useHashRoute(){
      const [r,setR]=useState((location.hash||"#/").replace(/^#/,"")||"/");
      useEffect(()=>{const f=()=>{setR((location.hash||"#/").replace(/^#/,"")||"/");window.scrollTo(0,0);};window.addEventListener("hashchange",f);return()=>window.removeEventListener("hashchange",f);},[]);
      return r;
    }
    const go=(p)=>{ if(typeof window!=="undefined") window.location.href=p; };

    const VEHICLES={
      barlas:{ name:"BARLAS", hero:"/images/barlas-hero-nobg.png", blend:false,
        tag:{en:"Business sedan",ru:"Бизнес-седан",uz:"Biznes-sedan"},
        tagline:{en:"The flagship battery-swap sedan — business-class comfort with zero charging downtime.",ru:"Флагманский седан с заменой батареи — комфорт бизнес-класса и ноль простоя на зарядке.",uz:"Batareya almashinuvchi flagman sedan — biznes-klass qulaylik va nol quvvatlash to‘xtashi."},
        highlights:{en:[["500 km","CATL range"],["≈2 min","Battery swap"],["~6.5 s","0–100 km/h"],["5","Business seats"]],ru:[["500 км","Запас хода CATL"],["≈2 мин","Замена батареи"],["~6.5 с","0–100 км/ч"],["5","Мест бизнес-класса"]],uz:[["500 km","CATL masofa"],["≈2 daq","Batareya almashish"],["~6.5 s","0–100 km/soat"],["5","Biznes o‘rin"]]},
        design:{img:"/images/barlas-side.jpg",title:{en:"Aerodynamic, low and sharp.",ru:"Аэродинамичный, низкий и чёткий.",uz:"Aerodinamik, past va aniq."},text:{en:"A clean fastback silhouette, flush door handles and a sculpted front cut drag and add real-world range. Every line earns its place.",ru:"Чистый силуэт фастбэка, утопленные ручки и скульптурный перёд снижают сопротивление и добавляют реальный запас хода. Каждая линия на своём месте.",uz:"Toza fastbek silueti, botiq tutqichlar va haykaltarosh old qism qarshilikni kamaytirib, real masofa qo‘shadi. Har bir chiziq o‘z o‘rnida."}},
        interior:{img:"/images/interior.jpg",title:{en:"A calm, business-class cabin.",ru:"Спокойный салон бизнес-класса.",uz:"Tinch, biznes-klass salon."},text:{en:"Soft-touch materials, a panoramic roof and a large central display. Quiet, spacious and built for long days on the road.",ru:"Мягкие материалы, панорамная крыша и крупный центральный дисплей. Тихо, просторно и создано для долгих дней в пути.",uz:"Yumshoq materiallar, panoramali tom va katta markaziy displey. Tinch, keng va uzoq safarlar uchun yaratilgan."}},
        gallery:["/images/barlas-side.jpg","/images/interior.jpg","/images/barlas-silver.jpg","/images/lifestyle.jpg"],
        specs:{en:[["Range","up to 500 km"],["Battery","CATL · swappable"],["Swap time","≈ 2 min"],["0–100 km/h","~6.5 s"],["Seats","5 · business"],["Safety","Advanced ADAS"]],ru:[["Запас хода","до 500 км"],["Батарея","CATL · сменная"],["Замена","≈ 2 мин"],["0–100 км/ч","~6.5 с"],["Места","5 · бизнес"],["Безопасность","Современный ADAS"]],uz:[["Masofa","500 km gacha"],["Batareya","CATL · almashinuvchi"],["Almashish","≈ 2 daq"],["0–100 km/soat","~6.5 s"],["O‘rin","5 · biznes"],["Xavfsizlik","Ilg‘or ADAS"]]},
        trims:[["Comfort","259 999 000"],["Max","279 999 000"]] },
      nayman:{ name:"NAYMAN", hero:"/images/nayman-hero.jpg", blend:true,
        tag:{en:"Electric SUV",ru:"Электро-кроссовер",uz:"Elektr krossover"},
        tagline:{en:"Space, range and two-minute swaps — the swap-compatible SUV for the whole family.",ru:"Простор, запас хода и двухминутная замена — кроссовер с заменой батареи для всей семьи.",uz:"Keng joy, masofa va ikki daqiqalik almashish — butun oila uchun batareya almashinuvchi krossover."},
        highlights:{en:[["500 km","CATL range"],["≈2 min","Battery swap"],["190 mm","Clearance"],["AWD","Available"]],ru:[["500 км","Запас хода CATL"],["≈2 мин","Замена батареи"],["190 мм","Клиренс"],["AWD","Доступен"]],uz:[["500 km","CATL masofa"],["≈2 daq","Batareya almashish"],["190 mm","Klirens"],["AWD","Mavjud"]]},
        design:{img:"/images/nayman-2.jpg",title:{en:"Built to go further.",ru:"Создан идти дальше.",uz:"Uzoqroq yurish uchun yaratilgan."},text:{en:"A higher stance, longer suspension travel and confident proportions — equally at home in the city and on the road beyond it.",ru:"Более высокая посадка, увеличенный ход подвески и уверенные пропорции — одинаково свой и в городе, и на дороге за его пределами.",uz:"Balandroq o‘rindiq, uzunroq osma yurishi va ishonchli nisbatlar — shaharda ham, undan tashqarida ham bir xil qulay."}},
        interior:{img:"/images/interior-2.jpg",title:{en:"Room for everything.",ru:"Место для всего.",uz:"Hamma narsaga joy."},text:{en:"A flexible, elevated cabin with generous space for five and their gear, wrapped in premium materials and a panoramic view.",ru:"Гибкий приподнятый салон с большим пространством для пятерых и их вещей, в премиальных материалах и с панорамным видом.",uz:"Beshta odam va ularning yuklari uchun keng joyga ega moslashuvchan, ko‘tarilgan salon — premium materiallar va panorama ko‘rinishi bilan."}},
        gallery:["/images/nayman-2.jpg","/images/interior-2.jpg","/images/chassis.jpg","/images/station-2.png"],
        specs:{en:[["Range","up to 500 km"],["Battery","CATL · swappable"],["Swap time","≈ 2 min"],["Clearance","190 mm"],["Seats","5 · SUV"],["Drive","AWD available"]],ru:[["Запас хода","до 500 км"],["Батарея","CATL · сменная"],["Замена","≈ 2 мин"],["Клиренс","190 мм"],["Места","5 · SUV"],["Привод","AWD доступен"]],uz:[["Masofa","500 km gacha"],["Batareya","CATL · almashinuvchi"],["Almashish","≈ 2 daq"],["Klirens","190 mm"],["O‘rin","5 · SUV"],["Uzatma","AWD mavjud"]]},
        trims:[["Comfort","289 999 000"],["Max","319 999 000"]] },
    };
    const VP={
      en:{ testDrive:"Book a test drive", howSwap:"How swap works", specs:"Specifications", baas:"Battery-as-a-Service", ownSub:"A far lower entry price, predictable monthly energy, and a two-minute swap whenever you need a full charge.", seeSwap:"See how swap works", gallery:"Gallery", pricing:"Pricing", pricingLead:"Own the car, subscribe to the battery.", from:"from", top:"Top", other:"Looking for the other model?", own:(n)=>`Own the ${n}. Subscribe to the battery.`, order:(t)=>`Order ${t}`, explore:(n)=>`Explore ${n} →` },
      ru:{ testDrive:"Записаться на тест-драйв", howSwap:"Как работает замена", specs:"Характеристики", baas:"Батарея по подписке", ownSub:"Гораздо ниже входная цена, предсказуемая ежемесячная энергия и двухминутная замена, когда нужен полный заряд.", seeSwap:"Как работает замена", gallery:"Галерея", pricing:"Цены", pricingLead:"Машина ваша, батарея — по подписке.", from:"от", top:"Топ", other:"Ищете другую модель?", own:(n)=>`Владейте ${n}. Подпишитесь на батарею.`, order:(t)=>`Заказать ${t}`, explore:(n)=>`Открыть ${n} →` },
      uz:{ testDrive:"Test-drayvga yozilish", howSwap:"Almashish qanday ishlaydi", specs:"Xususiyatlar", baas:"Obunadagi batareya", ownSub:"Ancha past kirish narxi, oldindan aniq oylik energiya va to‘liq quvvat kerak bo‘lganda ikki daqiqalik almashish.", seeSwap:"Almashish qanday ishlaydi", gallery:"Galereya", pricing:"Narxlar", pricingLead:"Avtomobil sizniki, batareya — obunada.", from:"dan", top:"Top", other:"Boshqa modelni qidiryapsizmi?", own:(n)=>`${n} sizniki. Batareyaga obuna bo‘ling.`, order:(t)=>`${t} buyurtma`, explore:(n)=>`${n} ni ochish →` },
    };

    function PageHero({eyebrow,title,sub}){
      return (<section className="hero-stage relative overflow-hidden pt-36 md:pt-44 pb-12">
        <div className="dotgrid-light"/>
        <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-8">
          <Reveal><div className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-green"/><span className="eyebrow" style={{color:"#5b6470"}}>{eyebrow}</span></div></Reveal>
          <Reveal delay={.05}><h1 className="mt-5 max-w-[18ch] font-bold tracking-[-.035em] leading-[1.03]" style={{fontSize:"clamp(2.4rem,5.6vw,4.6rem)"}}>{title}</h1></Reveal>
          {sub&&<Reveal delay={.1}><p className="muted mt-5 max-w-2xl text-lg md:text-xl">{sub}</p></Reveal>}
        </div>
      </section>);
    }

    function VehiclePage({slug}){ const {language:lg}=useLanguage(); const vp=VP[lg]||VP.en;
      const v=VEHICLES[slug]; const other=slug==="barlas"?"nayman":"barlas";
      return (<main>
        <PageHero eyebrow={pick(v.tag,lg)} title={v.name} sub={pick(v.tagline,lg)}/>
        <section className="mx-auto max-w-[1200px] px-5 md:px-8 -mt-2">
          <Reveal><img src={v.hero} alt={v.name} loading="eager" className="mx-auto w-[min(800px,92vw)] h-auto" style={v.blend?{mixBlendMode:"darken"}:undefined}/></Reveal>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Btn primary onClick={()=>go("/contacts")}>{vp.testDrive}</Btn>
            <Btn ghost onClick={()=>go("/swap")}>{vp.howSwap}</Btn>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#e9eaee] rounded-2xl overflow-hidden border border-[#e9eaee]">
            {(v.highlights[lg]||v.highlights.en).map(([n,l],i)=><div key={i} className="bg-white p-6 md:p-7"><div className="text-2xl md:text-[1.9rem] font-bold tracking-tight text-green">{n}</div><div className="muted mt-1 text-sm">{l}</div></div>)}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
          <Reveal><div className="relative aspect-[4/3] overflow-hidden rounded-[26px] border border-[#edeff3]" style={{boxShadow:"0 30px 70px -38px rgba(16,24,40,.2)"}}><img src={v.design.img} loading="lazy" className="absolute inset-0 h-full w-full object-cover" alt=""/></div></Reveal>
          <div><Head n="·" title={pick(v.design.title,lg)}/><p className="muted mt-4 text-lg leading-relaxed">{pick(v.design.text,lg)}</p></div>
        </section>

        <section className="bg-[#fafbfc] border-y border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2"><Head n="·" title={pick(v.interior.title,lg)}/><p className="muted mt-4 text-lg leading-relaxed">{pick(v.interior.text,lg)}</p></div>
          <Reveal className="md:order-1"><div className="relative aspect-[4/3] overflow-hidden rounded-[26px] border border-[#edeff3]" style={{boxShadow:"0 30px 70px -38px rgba(16,24,40,.2)"}}><img src={v.interior.img} loading="lazy" className="absolute inset-0 h-full w-full object-cover" alt=""/></div></Reveal>
        </div></section>

        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28">
          <Head n="·" title={vp.specs} center/>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-px bg-[#e9eaee] rounded-2xl overflow-hidden border border-[#e9eaee]">
            {(v.specs[lg]||v.specs.en).map(([k,val],i)=><div key={i} className="bg-white p-6"><div className="text-xs uppercase tracking-wider text-[#9aa1ab]">{k}</div><div className="mt-2 text-lg font-semibold">{val}</div></div>)}
          </div>
        </section>

        <section className="text-white" style={{background:"#0a0b0d"}}><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-7 text-center md:text-left">
          <div className="max-w-xl"><div className="eyebrow" style={{color:"#7dd6b6"}}>{vp.baas}</div><h3 className="mt-2 text-2xl md:text-[2rem] font-bold tracking-tight leading-tight">{vp.own(v.name)}</h3><p className="text-white/55 mt-3">{vp.ownSub}</p></div>
          <Btn primary onClick={()=>go("/swap")}>{vp.seeSwap}</Btn>
        </div></section>

        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28">
          <Head n="·" title={vp.gallery}/>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {v.gallery.map((g,i)=><Reveal key={i} delay={i*.05}><div className={"relative overflow-hidden rounded-[22px] border border-[#edeff3] "+(i===0?"md:col-span-2 aspect-[16/9]":"aspect-[4/3]")} style={{boxShadow:"0 30px 70px -38px rgba(16,24,40,.2)"}}>
              <img src={g} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover"/></div></Reveal>)}
          </div>
        </section>

        <section className="bg-[#fafbfc] border-y border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28">
          <Head n="·" title={vp.pricing} lead={vp.pricingLead} center/>
          <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {v.trims.map(([trim,price],i)=><Reveal key={i} delay={i*.06}><div className={"softcard p-8 "+(i===1?"ring-1 ring-green/30":"")}>
              <div className="flex items-center justify-between"><h3 className="text-xl font-bold">{v.name} {trim}</h3>{i===1&&<span className="rounded-full bg-green-50 text-green text-xs font-semibold px-3 py-1">{vp.top}</span>}</div>
              <div className="muted text-sm mt-5">{vp.from}</div><div className="text-2xl font-bold">{price} <span className="text-sm font-medium muted">сум</span></div>
              <div className="mt-6"><Btn primary onClick={()=>go("/contacts")}>{vp.order(trim)}</Btn></div>
            </div></Reveal>)}
          </div>
        </div></section>

        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 text-center">
          <p className="muted">{vp.other}</p>
          <button onClick={()=>go("/"+other)} className="mt-3 text-2xl font-bold tracking-tight hover:text-green transition-colors">{vp.explore(VEHICLES[other].name)}</button>
        </section>
      </main>);
    }

    function SwapPage(){ const {language:lg}=useLanguage(); const sp=SP[lg]||SP.en;
      return (<main>
        <PageHero eyebrow={sp.eyebrow} title={sp.title} sub={sp.sub}/>
        <Swap/>
        <section className="bg-[#fafbfc] border-y border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <Reveal><div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-[#edeff3]" style={{boxShadow:"0 30px 70px -38px rgba(16,24,40,.2)"}}><img src="/images/station-1.png" className="absolute inset-0 h-full w-full object-cover"/></div></Reveal>
          <div><Head n="·" title={sp.baas}/>
            <p className="muted mt-4 text-lg">{sp.baasText}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">{sp.checks.map((x,i)=><div key={i} className="flex items-center gap-2 text-sm"><span className="text-green">✓</span>{x}</div>)}</div>
          </div>
        </div></section>
        <Network/><Energy/>
        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 text-center">
          <Head n="·" title={sp.partnerTitle} lead={sp.partnerLead} center/>
          <div className="mt-8 flex justify-center"><Btn primary onClick={()=>go("/contacts")}>{sp.partnerBtn}</Btn></div>
        </section>
      </main>);
    }
    const SP={
      en:{ eyebrow:"Battery Swap · BaaS", title:"Two minutes. Then you're gone.", sub:"No cables, no waiting. An automated station swaps your depleted pack for a full one — and the network doubles as distributed energy storage.", baas:"Battery-as-a-Service", baasText:"Buy the car, subscribe to the battery. You get a far lower entry price, predictable monthly energy, and you never worry about battery degradation — the network keeps every pack healthy.", checks:["Lower upfront price","Predictable energy cost","Always-healthy battery","Swap anywhere on the network"], partnerTitle:"Become a station partner", partnerLead:"Bring battery swap to your city and earn on every swap.", partnerBtn:"Partner with us" },
      ru:{ eyebrow:"Замена батареи · BaaS", title:"Две минуты. И вы уже в пути.", sub:"Без кабелей и ожидания. Автоматическая станция меняет разряженную батарею на полную — а сеть работает как распределённое хранилище энергии.", baas:"Батарея по подписке", baasText:"Купите машину, подпишитесь на батарею. Гораздо ниже входная цена, предсказуемая ежемесячная энергия и никаких тревог о деградации — сеть держит каждую батарею здоровой.", checks:["Ниже входная цена","Предсказуемая цена энергии","Всегда здоровая батарея","Замена в любой точке сети"], partnerTitle:"Станьте партнёром по станциям", partnerLead:"Приведите замену батарей в свой город и зарабатывайте на каждой замене.", partnerBtn:"Стать партнёром" },
      uz:{ eyebrow:"Batareya almashish · BaaS", title:"Ikki daqiqa. Va siz yo‘ldasiz.", sub:"Kabelsiz va kutishsiz. Avtomatik stansiya bo‘shagan batareyani to‘lasiga almashtiradi — tarmoq esa taqsimlangan energiya ombori bo‘lib ishlaydi.", baas:"Obunadagi batareya", baasText:"Avtomobilni sotib oling, batareyaga obuna bo‘ling. Ancha past kirish narxi, oldindan aniq oylik energiya va eskirishdan xavotirsizlik — tarmoq har bir batareyani sog‘lom saqlaydi.", checks:["Past kirish narxi","Aniq energiya narxi","Doim sog‘lom batareya","Tarmoqning istalgan joyida almashish"], partnerTitle:"Stansiya hamkori bo‘ling", partnerLead:"Batareya almashishni shahringizga olib keling va har almashishdan daromad oling.", partnerBtn:"Hamkor bo‘lish" },
    };

    /* NEWS data now lives in ./news-data.ts (objects with slug + full article body) */
    function NewsPage(){ const {language:lg}=useLanguage(); const ui=NEWS_UI[lg]||NEWS_UI.en;
      const cats=["All","Launch","Vehicles","Network","Platform","Partners","Energy"];
      const catLabel=(k)=> k==="All"?ui.all:pick(CAT_LABELS[k],lg);
      const [cat,setCat]=useState("All");
      const list=cat==="All"?NEWS:NEWS.filter(n=>n.cat===cat);
      const feat=list[0]; const rest=list.slice(1);
      return (<main>
        <PageHero eyebrow={ui.eyebrow} title={ui.title} sub={ui.sub}/>
        <section className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="flex flex-wrap gap-2">{cats.map((c)=><button key={c} onClick={()=>setCat(c)} className={"rounded-full px-4 py-2 text-sm font-medium transition-colors "+(cat===c?"bg-[#0a0b0d] text-white":"border border-[#e4e7ec] text-[#4b5563] hover:border-[#cfd4dc]")}>{catLabel(c)}</button>)}</div>
        </section>
        {feat && <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-10 md:py-14">
          <Reveal><article onClick={()=>go("/news/"+feat.slug)} className="softcard overflow-hidden grid md:grid-cols-2 group cursor-pointer">
            <div className="relative aspect-[16/11] md:aspect-auto md:min-h-[340px] overflow-hidden bg-[#f4f6f8]"><img src={feat.img} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/><span className="absolute top-4 left-4 rounded-full bg-white/85 backdrop-blur px-3 py-1 text-xs font-semibold">{pick(CAT_LABELS[feat.cat],lg)}</span></div>
            <div className="p-8 md:p-12 flex flex-col justify-center"><div className="eyebrow" style={{color:"#9aa1ab"}}>{pick(feat.date,lg)} · {ui.featured} · {pick(feat.read,lg)}</div><h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight leading-tight group-hover:text-green transition-colors">{pick(feat.title,lg)}</h2><p className="muted mt-4 text-lg">{pick(feat.excerpt,lg)}</p><div className="mt-6 text-green font-medium">{ui.readMore}</div></div>
          </article></Reveal>
        </section>}
        <section className="mx-auto max-w-[1200px] px-5 md:px-8 pb-12 md:pb-16">
          {rest.length>0 ? <div className="grid md:grid-cols-3 gap-6">
            {rest.map((n,i)=><Reveal key={n.slug} delay={(i%3)*.06}><article onClick={()=>go("/news/"+n.slug)} className="softcard overflow-hidden h-full group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#f4f6f8]"><img src={n.img} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/><span className="absolute top-3 left-3 rounded-full bg-white/85 backdrop-blur px-2.5 py-1 text-[10px] font-semibold">{pick(CAT_LABELS[n.cat],lg)}</span></div>
              <div className="p-6"><div className="eyebrow" style={{color:"#9aa1ab"}}>{pick(n.date,lg)} · {pick(n.read,lg)}</div><h3 className="mt-3 text-lg font-semibold leading-snug group-hover:text-green transition-colors">{pick(n.title,lg)}</h3><p className="muted mt-2 text-sm">{pick(n.excerpt,lg)}</p><div className="mt-4 text-sm font-medium text-green">{ui.readMore}</div></div>
            </article></Reveal>)}
          </div> : <p className="muted text-center py-10">{ui.empty}</p>}
        </section>
        <section className="bg-[#fafbfc] border-t border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 text-center">
          <Head n="·" title={ui.nlTitle} lead={ui.nlSub} center/>
          <form onSubmit={e=>e.preventDefault()} className="mt-7 mx-auto flex max-w-md gap-2"><input type="email" required placeholder={ui.emailPh} className="flex-1 rounded-full border border-[#e2e4e9] px-5 py-3 outline-none focus:border-green"/><Btn primary>{ui.subscribe}</Btn></form>
        </div></section>
      </main>);
    }

    function ArticlePage({slug}){ const {language:lg}=useLanguage(); const ui=NEWS_UI[lg]||NEWS_UI.en;
      const a=newsBySlug(slug);
      if(!a) return (<main className="mx-auto max-w-[820px] px-5 md:px-8 pt-40 pb-32 text-center">
        <h1 className="text-3xl font-bold">{ui.notFound}</h1>
        <p className="muted mt-4">{ui.moved}</p>
        <div className="mt-8 flex justify-center"><Btn primary onClick={()=>go("/news")}>{ui.back}</Btn></div>
      </main>);
      const more=relatedNews(slug,3); const body=pickArr(a.body,lg);
      return (<main>
        <section className="hero-stage relative overflow-hidden pt-32 md:pt-40 pb-8">
          <div className="dotgrid-light"/>
          <div className="relative z-10 mx-auto max-w-[820px] px-5 md:px-8">
            <Reveal><a href="/news" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-green transition-colors">← {ui.backShort}</a></Reveal>
            <Reveal delay={.05}><div className="mt-6 flex flex-wrap items-center gap-3 text-sm"><span className="rounded-full bg-green-50 text-green font-semibold px-3 py-1 text-xs">{pick(CAT_LABELS[a.cat],lg)}</span><span className="muted">{pick(a.date,lg)}</span><span className="text-[#cfd4dc]">·</span><span className="muted">{pick(a.read,lg)}</span></div></Reveal>
            <Reveal delay={.1}><h1 className="mt-5 font-bold tracking-[-.03em] leading-[1.06]" style={{fontSize:"clamp(2rem,4.6vw,3.4rem)"}}>{pick(a.title,lg)}</h1></Reveal>
            <Reveal delay={.15}><p className="muted mt-5 text-lg md:text-xl leading-relaxed">{pick(a.excerpt,lg)}</p></Reveal>
          </div>
        </section>
        <section className="mx-auto max-w-[1100px] px-5 md:px-8 mt-2 md:mt-4">
          <Reveal><div className="relative overflow-hidden rounded-[26px] border border-[#edeff3] aspect-[21/9]" style={{boxShadow:"0 30px 70px -38px rgba(16,24,40,.22)"}}><img src={a.img} alt="" className="absolute inset-0 h-full w-full object-cover"/></div></Reveal>
        </section>
        {a.facts && <section className="mx-auto max-w-[820px] px-5 md:px-8 mt-10"><Reveal><div className="grid grid-cols-3 gap-px bg-[#e9eaee] rounded-2xl overflow-hidden border border-[#e9eaee]">
          {(a.facts[lg]||a.facts.en).map(([n,l],i)=><div key={i} className="bg-white px-4 py-5 text-center"><div className="text-xl md:text-2xl font-bold text-green tracking-tight">{n}</div><div className="muted mt-1 text-xs leading-tight">{l}</div></div>)}
        </div></Reveal></section>}
        <article className="mx-auto max-w-[720px] px-5 md:px-8 py-12 md:py-16">
          {body.map((p,i)=><Fragment key={i}>
            <Reveal delay={Math.min(i,3)*.03}><p className="text-[1.1rem] md:text-[1.16rem] leading-[1.85] text-[#2c313a] mb-6">{p}</p></Reveal>
            {a.quote && i===1 && <Reveal><blockquote className="my-10 border-l-2 border-green pl-6 text-xl md:text-2xl font-semibold tracking-[-.01em] leading-snug text-[#0a0b0d]">“{pick(a.quote,lg)}”</blockquote></Reveal>}
          </Fragment>)}
          <div className="mt-10 border-t border-[#eef0f3] pt-7"><a href="/news" className="text-sm font-medium text-green">← {ui.back}</a></div>
        </article>
        <section className="bg-[#fafbfc] border-t border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24">
          <Head n="·" title={ui.more}/>
          <div className="mt-10 grid md:grid-cols-3 gap-6">{more.map((n,i)=><Reveal key={n.slug} delay={i*.06}><article onClick={()=>go("/news/"+n.slug)} className="softcard overflow-hidden h-full group cursor-pointer">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#f4f6f8]"><img src={n.img} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/><span className="absolute top-3 left-3 rounded-full bg-white/85 backdrop-blur px-2.5 py-1 text-[10px] font-semibold">{pick(CAT_LABELS[n.cat],lg)}</span></div>
            <div className="p-6"><div className="eyebrow" style={{color:"#9aa1ab"}}>{pick(n.date,lg)}</div><h3 className="mt-3 text-lg font-semibold leading-snug group-hover:text-green transition-colors">{pick(n.title,lg)}</h3><p className="muted mt-2 text-sm">{pick(n.excerpt,lg)}</p><div className="mt-4 text-sm font-medium text-green">{ui.readMore}</div></div>
          </article></Reveal>)}</div>
        </div></section>
        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-20 text-center">
          <Head n="·" title={ui.loop} lead={ui.nlSub} center/>
          <form onSubmit={e=>e.preventDefault()} className="mt-7 mx-auto flex max-w-md gap-2"><input type="email" required placeholder={ui.emailPh} className="flex-1 rounded-full border border-[#e2e4e9] px-5 py-3 outline-none focus:border-green"/><Btn primary>{ui.subscribe}</Btn></form>
        </section>
      </main>);
    }

    const FAQ_L={
      en:[
        ["How long does a battery swap take?","About two minutes. You pull into the station, an automated system swaps your depleted pack for a fully charged one, and you drive away — roughly the time it takes to refuel."],
        ["What is Battery-as-a-Service (BaaS)?","You own the car and subscribe to the battery. This lowers the upfront price dramatically and turns energy into a predictable monthly cost."],
        ["What is the range?","Up to 500 km on a full pack, using CATL swappable battery technology."],
        ["Where can I swap batteries?","Across a growing network — starting in Uzbekistan, expanding to Kazakhstan, Kyrgyzstan, Tajikistan and Turkmenistan."],
        ["Is battery swapping safe?","Yes. Swaps happen in automated, certified stations. Every pack is inspected and charged under optimal conditions, which also extends its life."],
        ["Can other brands use the network?","Yes — ECOMOBILE is an open platform built on a shared battery standard, so the whole industry can plug in."],
        ["What's the difference between Comfort and Max?","Max adds range, equipment and premium finishes. Both swap on the same network. See each model page for full pricing."],
      ],
      ru:[
        ["Сколько занимает замена батареи?","Около двух минут. Вы заезжаете на станцию, автоматика меняет разряженную батарею на полностью заряженную, и вы уезжаете — примерно как заправиться."],
        ["Что такое «Батарея по подписке» (BaaS)?","Машина ваша, а батарея — по подписке. Это резко снижает стартовую цену и превращает энергию в предсказуемый ежемесячный платёж."],
        ["Какой запас хода?","До 500 км на полной батарее, на сменной батарее CATL."],
        ["Где можно менять батареи?","В растущей сети — старт в Узбекистане, далее Казахстан, Кыргызстан, Таджикистан и Туркменистан."],
        ["Безопасна ли замена батареи?","Да. Замена идёт на автоматических сертифицированных станциях. Каждая батарея проверяется и заряжается в оптимальных условиях, что продлевает её срок службы."],
        ["Могут ли другие бренды пользоваться сетью?","Да — ECOMOBILE это открытая платформа на едином стандарте батарей, поэтому подключиться может вся отрасль."],
        ["В чём разница между Comfort и Max?","Max добавляет запас хода, оснащение и премиальную отделку. Обе меняют батарею в одной сети. Полные цены — на странице каждой модели."],
      ],
      uz:[
        ["Batareya almashish qancha vaqt oladi?","Taxminan ikki daqiqa. Stansiyaga kirasiz, avtomatika bo‘shagan batareyani to‘liq quvvatlangan batareyaga almashtiradi va siz yo‘ldasiz — deyarli yoqilg‘i quygandek."],
        ["Battery-as-a-Service (BaaS) nima?","Avtomobil sizniki, batareya esa obunada. Bu boshlang‘ich narxni keskin pasaytiradi va energiyani oldindan aniq oylik to‘lovga aylantiradi."],
        ["Masofa qancha?","To‘liq batareyada 500 km gacha, CATL almashinuvchi batareya texnologiyasida."],
        ["Batareyalarni qayerda almashtirsam bo‘ladi?","O‘sayotgan tarmoqda — O‘zbekistondan boshlab, keyin Qozog‘iston, Qirg‘iziston, Tojikiston va Turkmaniston."],
        ["Batareya almashish xavfsizmi?","Ha. Almashish avtomatik, sertifikatlangan stansiyalarda bo‘ladi. Har bir batareya tekshiriladi va optimal sharoitda quvvatlanadi, bu uning umrini uzaytiradi."],
        ["Boshqa brendlar tarmoqdan foydalana oladimi?","Ha — ECOMOBILE yagona batareya standartiga qurilgan ochiq platforma, shu bois butun soha ulanishi mumkin."],
        ["Comfort va Max o‘rtasidagi farq nima?","Max masofa, jihoz va premium pardozni qo‘shadi. Ikkalasi bir tarmoqda almashadi. To‘liq narxlar — har bir model sahifasida."],
      ],
    };
    const FAQ_UI={
      en:{ eyebrow:"Help", title:"Frequently asked questions", sub:"Everything about battery swap, BaaS and ownership.", still:"Still have questions?", help:"Our team is happy to help.", contact:"Contact us" },
      ru:{ eyebrow:"Помощь", title:"Частые вопросы", sub:"Всё о замене батареи, BaaS и владении.", still:"Остались вопросы?", help:"Наша команда с радостью поможет.", contact:"Связаться" },
      uz:{ eyebrow:"Yordam", title:"Ko‘p so‘raladigan savollar", sub:"Batareya almashish, BaaS va egalik haqida hammasi.", still:"Savollaringiz bormi?", help:"Jamoamiz yordam berishdan mamnun.", contact:"Bog‘lanish" },
    };
    function FaqItem({q,a}){ const [o,setO]=useState(false);
      return (<div className="border-b border-[#eef0f3]"><button onClick={()=>setO(v=>!v)} className="w-full flex items-center justify-between gap-4 py-5 text-left">
        <span className="text-lg font-semibold">{q}</span><span className={"text-green transition-transform "+(o?"rotate-45":"")}>+</span></button>
        <div className="overflow-hidden transition-all duration-300" style={{maxHeight:o?"240px":"0"}}><p className="muted pb-5 pr-8">{a}</p></div></div>);
    }
    function FaqPage(){ const {language:lg}=useLanguage(); const fu=FAQ_UI[lg]||FAQ_UI.en; const items=FAQ_L[lg]||FAQ_L.en;
      return (<main>
        <PageHero eyebrow={fu.eyebrow} title={fu.title} sub={fu.sub}/>
        <section className="mx-auto max-w-[820px] px-5 md:px-8 py-12 md:py-20">
          {items.map(([q,a],i)=><Reveal key={i} delay={i*.03}><FaqItem q={q} a={a}/></Reveal>)}
          <div className="mt-12 softcard p-8 text-center"><h3 className="text-xl font-bold">{fu.still}</h3><p className="muted mt-2">{fu.help}</p><div className="mt-5 flex justify-center"><Btn primary onClick={()=>go("/contacts")}>{fu.contact}</Btn></div></div>
        </section>
      </main>);
    }

    const IV={
      en:{ eyebrow:"Investor Relations", title:"The open battery-swap network of Central Asia.", sub:"Not just an EV brand — a transport-and-energy platform with recurring revenue and network-effect economics.",
        market:[["$2.4B","Central Asia passenger-EV market by 2030","Demand across Uzbekistan, Kazakhstan, Kyrgyzstan, Tajikistan and Turkmenistan is compounding fast."],["~40 → 2 min","charging vs swapping","For taxis and fleets, downtime is lost revenue. Swapping removes it entirely."],["Recurring","battery-as-a-service revenue","Every car on the road is a monthly subscription — not a one-off sale."]],
        problemEy:"The problem", problemTitle:"Charging is slow and capital-heavy.", problemText:"Every minute a taxi or fleet vehicle is plugged in is lost revenue. And the battery — the most expensive part of an EV — keeps the upfront price out of reach for the mass market.",
        solutionEy:"The solution", solutionTitle:"Decouple the battery from the car.", solutionText:"Two-minute swaps remove downtime. Battery-as-a-Service removes the upfront battery cost. And the station network doubles as distributed energy storage — a second business on the same asset.",
        bmEy:"Business model", bmTitle:"Four revenue streams. One platform.", bmText:"A car sale is the start of the relationship, not the end — every vehicle generates recurring battery and energy revenue for years.",
        streams:[["01","Vehicle sales","Margin on every BARLAS and NAYMAN sold."],["02","Battery subscription","Recurring monthly BaaS revenue per vehicle."],["03","Swap fees","Per-swap revenue across the growing network."],["04","Energy services","Grid balancing & storage from idle battery packs."]],
        tractionTitle:"Traction", traction:[["2","Models in market"],["259.9M","сум — entry price"],["5","Countries in plan"],["CATL","Battery partner"]],
        openStd:"Open battery standard", onePack:"One pack. Any compatible vehicle.",
        roadmapTitle:"Roadmap", road:[["2026","Launch","BARLAS & NAYMAN deliveries; first swap stations in Tashkent."],["2027","Scale","Station network across Uzbekistan; NAYMAN volume."],["2028","Expand","Kazakhstan & Kyrgyzstan; open the standard to partners."],["2030","Platform","Region-wide energy + mobility network."]],
        raiseTitle:"The raise", raiseText:"We're raising to build the swap-station network and scale vehicle & battery inventory ahead of demand. Indicative use of funds:",
        funds:[["Swap-station network","45"],["Vehicle & battery inventory","30"],["R&D & platform software","15"],["Team & operations","10"]],
        deckTitle:"Request the investor deck", deckText:"Full market sizing, unit economics, financials and expansion strategy.", deckBtn:"Contact investor relations" },
      ru:{ eyebrow:"Связи с инвесторами", title:"Открытая сеть замены батарей Центральной Азии.", sub:"Не просто бренд электромобилей — транспортно-энергетическая платформа с регулярной выручкой и экономикой сетевого эффекта.",
        market:[["$2.4 млрд","Рынок пассажирских EV Центральной Азии к 2030","Спрос в Узбекистане, Казахстане, Кыргызстане, Таджикистане и Туркменистане растёт по экспоненте."],["~40 → 2 мин","зарядка против замены","Для такси и парков простой — потерянная выручка. Замена убирает его полностью."],["Регулярная","выручка от батареи по подписке","Каждая машина на дороге — ежемесячная подписка, а не разовая продажа."]],
        problemEy:"Проблема", problemTitle:"Зарядка медленная и капиталоёмкая.", problemText:"Каждая минута, что такси или машина парка стоит на зарядке, — потерянная выручка. А батарея — самая дорогая часть EV — держит стартовую цену недоступной для массового рынка.",
        solutionEy:"Решение", solutionTitle:"Отделить батарею от машины.", solutionText:"Двухминутная замена убирает простой. Батарея по подписке убирает стартовую стоимость батареи. А сеть станций работает как распределённое хранилище — второй бизнес на том же активе.",
        bmEy:"Бизнес-модель", bmTitle:"Четыре потока выручки. Одна платформа.", bmText:"Продажа машины — начало отношений, а не конец: каждая машина годами приносит выручку от батареи и энергии.",
        streams:[["01","Продажи авто","Маржа с каждой проданной BARLAS и NAYMAN."],["02","Подписка на батарею","Регулярная ежемесячная выручка BaaS с машины."],["03","Плата за замену","Выручка с каждой замены по растущей сети."],["04","Энергоуслуги","Балансировка сети и хранение от простаивающих батарей."]],
        tractionTitle:"Тяга", traction:[["2","Модели на рынке"],["259.9 млн","сум — входная цена"],["5","Стран в плане"],["CATL","Партнёр по батареям"]],
        openStd:"Открытый стандарт батарей", onePack:"Одна батарея. Любая совместимая машина.",
        roadmapTitle:"Дорожная карта", road:[["2026","Старт","Поставки BARLAS и NAYMAN; первые станции замены в Ташкенте."],["2027","Масштаб","Сеть станций по Узбекистану; NAYMAN серийно."],["2028","Экспансия","Казахстан и Кыргызстан; открытие стандарта партнёрам."],["2030","Платформа","Энерго- и транспортная сеть по всему региону."]],
        raiseTitle:"Раунд", raiseText:"Привлекаем средства на строительство сети станций и масштабирование запасов машин и батарей с опережением спроса. Ориентировочное использование средств:",
        funds:[["Сеть станций замены","45"],["Запасы машин и батарей","30"],["R&D и софт платформы","15"],["Команда и операции","10"]],
        deckTitle:"Запросить инвест-деку", deckText:"Полный объём рынка, юнит-экономика, финансы и стратегия расширения.", deckBtn:"Связаться с IR" },
      uz:{ eyebrow:"Investorlar bilan aloqa", title:"Markaziy Osiyoning ochiq batareya almashish tarmog‘i.", sub:"Shunchaki elektromobil brendi emas — doimiy daromad va tarmoq effekti iqtisodiga ega transport va energiya platformasi.",
        market:[["$2.4 mlrd","2030 yilga Markaziy Osiyo yo‘lovchi EV bozori","O‘zbekiston, Qozog‘iston, Qirg‘iziston, Tojikiston va Turkmanistonda talab tez o‘smoqda."],["~40 → 2 daq","quvvatlash va almashish","Taksi va parklar uchun to‘xtash — yo‘qotilgan daromad. Almashish uni butunlay olib tashlaydi."],["Doimiy","obunadagi batareya daromadi","Yo‘ldagi har bir avtomobil — oylik obuna, bir martalik savdo emas."]],
        problemEy:"Muammo", problemTitle:"Quvvatlash sekin va kapital talab qiladi.", problemText:"Taksi yoki park avtomobili quvvatlashda turgan har daqiqa — yo‘qotilgan daromad. Batareya esa — EV ning eng qimmat qismi — boshlang‘ich narxni ommaviy bozor uchun yetib bo‘lmas qiladi.",
        solutionEy:"Yechim", solutionTitle:"Batareyani avtomobildan ajrating.", solutionText:"Ikki daqiqalik almashish to‘xtashni olib tashlaydi. Obunadagi batareya boshlang‘ich batareya xarajatini olib tashlaydi. Stansiyalar tarmog‘i esa taqsimlangan ombor bo‘lib ishlaydi — bir aktivda ikkinchi biznes.",
        bmEy:"Biznes-model", bmTitle:"To‘rt daromad oqimi. Bitta platforma.", bmText:"Avtomobil sotuvi — munosabatning boshi, oxiri emas: har bir avtomobil yillar davomida batareya va energiya daromadini keltiradi.",
        streams:[["01","Avtomobil savdosi","Har sotilgan BARLAS va NAYMAN’dan marja."],["02","Batareya obunasi","Avtomobilga doimiy oylik BaaS daromadi."],["03","Almashish to‘lovi","O‘sayotgan tarmoq bo‘ylab har almashishdan daromad."],["04","Energiya xizmatlari","Bo‘sh batareyalardan tarmoq muvozanati va saqlash."]],
        tractionTitle:"Natijalar", traction:[["2","Bozordagi model"],["259.9 mln","so‘m — kirish narxi"],["5","Rejadagi davlat"],["CATL","Batareya hamkori"]],
        openStd:"Ochiq batareya standarti", onePack:"Bitta batareya. Har qanday mos avtomobil.",
        roadmapTitle:"Yo‘l xaritasi", road:[["2026","Start","BARLAS va NAYMAN yetkazish; Toshkentda birinchi stansiyalar."],["2027","Ko‘lam","O‘zbekiston bo‘ylab stansiyalar tarmog‘i; NAYMAN seriyali."],["2028","Kengayish","Qozog‘iston va Qirg‘iziston; standartni hamkorlarga ochish."],["2030","Platforma","Butun mintaqa bo‘ylab energiya va transport tarmog‘i."]],
        raiseTitle:"Investitsiya raundi", raiseText:"Stansiyalar tarmog‘ini qurish va talabdan oldinroq avtomobil hamda batareya zaxiralarini kengaytirish uchun mablag‘ jalb qilyapmiz. Mablag‘lardan taxminiy foydalanish:",
        funds:[["Almashish stansiyalari tarmog‘i","45"],["Avtomobil va batareya zaxirasi","30"],["R&D va platforma dasturi","15"],["Jamoa va operatsiyalar","10"]],
        deckTitle:"Investor dekasini so‘rang", deckText:"To‘liq bozor hajmi, yunit-iqtisod, moliya va kengayish strategiyasi.", deckBtn:"IR bilan bog‘lanish" },
    };
    function InvestorsPage(){ const {language:lg}=useLanguage(); const iv=IV[lg]||IV.en;
      return (<main>
        <PageHero eyebrow={iv.eyebrow} title={iv.title} sub={iv.sub}/>

        <section className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid md:grid-cols-3 gap-5">{iv.market.map(([n,t,d],i)=><Reveal key={i} delay={i*.06}><div className="softcard p-8 h-full">
            <div className="text-3xl md:text-4xl font-bold text-green tracking-tight">{n}</div>
            <div className="mt-3 font-semibold">{t}</div><p className="muted mt-2 text-sm leading-relaxed">{d}</p></div></Reveal>)}</div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-6">
          <Reveal><div className="rounded-[24px] border border-[#e9eaee] bg-[#fafbfc] p-8 md:p-10 h-full"><div className="eyebrow" style={{color:"#9aa1ab"}}>{iv.problemEy}</div><h3 className="mt-3 text-2xl font-bold">{iv.problemTitle}</h3><p className="muted mt-4 text-lg">{iv.problemText}</p></div></Reveal>
          <Reveal delay={.08}><div className="softcard p-8 md:p-10 h-full" style={{background:"linear-gradient(180deg,#f0faf5,#fff)"}}><div className="eyebrow">{iv.solutionEy}</div><h3 className="mt-3 text-2xl font-bold">{iv.solutionTitle}</h3><p className="muted mt-4 text-lg">{iv.solutionText}</p></div></Reveal>
        </section>

        <section className="text-white" style={{background:"#0a0b0d"}}><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div><div className="eyebrow" style={{color:"#7dd6b6"}}>{iv.bmEy}</div><h2 className="mt-3 font-bold tracking-tight leading-[1.05]" style={{fontSize:"clamp(2rem,4.4vw,3.2rem)"}}>{iv.bmTitle}</h2><p className="mt-5 text-white/55 text-lg max-w-md">{iv.bmText}</p></div>
          <div className="grid sm:grid-cols-2 gap-4">{iv.streams.map(([n,t,d],i)=><Reveal key={i} delay={i*.05}><div className="rounded-2xl border border-white/12 bg-white/[.03] p-6 h-full"><div className="text-green-400 text-sm font-semibold">{n}</div><div className="mt-2 font-semibold">{t}</div><p className="text-white/50 text-sm mt-1.5">{d}</p></div></Reveal>)}</div>
        </div></section>

        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28">
          <Head n="·" title={iv.tractionTitle} center/>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-5">{iv.traction.map(([n,l],i)=><Reveal key={i} delay={i*.05}><div className="text-center"><div className="text-3xl md:text-4xl font-bold tracking-tight">{n}</div><div className="muted mt-1 text-sm">{l}</div></div></Reveal>)}</div>
          <Reveal delay={.1}><div className="mt-12 relative overflow-hidden rounded-[26px] border border-[#edeff3] aspect-[21/9]" style={{boxShadow:"0 30px 70px -38px rgba(16,24,40,.2)"}}><img src="/images/chassis.jpg" alt="" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0" style={{background:"linear-gradient(90deg, rgba(0,0,0,.55), transparent 60%)"}}/><div className="absolute bottom-6 left-6 md:left-8 text-white max-w-md"><div className="text-xs uppercase tracking-widest opacity-80">{iv.openStd}</div><div className="text-xl md:text-2xl font-bold mt-1">{iv.onePack}</div></div></div></Reveal>
        </section>

        <section className="bg-[#fafbfc] border-y border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-20"><Head n="·" title={iv.roadmapTitle} center/>
          <div className="mt-12 grid md:grid-cols-4 gap-5">{iv.road.map(([y,h,d],i)=><Reveal key={i} delay={i*.06}><div className="softcard p-7 h-full"><div className="text-green font-bold text-lg">{y}</div><div className="mt-2 text-lg font-semibold">{h}</div><p className="muted mt-2 text-sm">{d}</p></div></Reveal>)}</div>
        </div></section>

        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-start">
          <div><Head n="·" title={iv.raiseTitle}/><p className="muted mt-4 text-lg max-w-md">{iv.raiseText}</p></div>
          <div className="space-y-5 pt-2">{iv.funds.map(([l,p],i)=><Reveal key={i} delay={i*.06}><div><div className="flex justify-between text-sm font-medium"><span>{l}</span><span className="text-green">{p}%</span></div><div className="mt-2 h-2.5 rounded-full bg-[#eef0f3] overflow-hidden"><div className="h-full rounded-full" style={{width:p+"%",background:"linear-gradient(90deg,#0ba678,#10b981)"}}/></div></div></Reveal>)}</div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 md:px-8 pb-24">
          <div className="relative overflow-hidden rounded-[30px] px-6 py-16 md:py-20 text-center text-white" style={{background:"linear-gradient(135deg,#0ba678,#078a64)"}}>
            <img src="/images/logomark.svg" alt="" className="pointer-events-none absolute -right-12 -bottom-16 w-72 opacity-15" style={{filter:"brightness(0) invert(1)"}}/>
            <div className="relative z-10 mx-auto max-w-2xl"><h2 className="font-bold tracking-tight" style={{fontSize:"clamp(2rem,5vw,3.4rem)"}}>{iv.deckTitle}</h2><p className="mx-auto mt-4 max-w-lg text-white/85 text-lg">{iv.deckText}</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Btn light lg onClick={()=>go("/contacts")}>{iv.deckBtn}</Btn></div></div>
          </div>
        </section>
      </main>);
    }

    const CT={
      en:{ eyebrow:"Contact", title:"Let's talk.", sub:"Customers, partners and investors — reach the right team.", cards:[["Sales","BARLAS & NAYMAN orders, test drives","sales@ecomobile.world"],["Partners","Swap-station & dealer partnership","partners@ecomobile.world"],["Investors","Investor relations","invest@ecomobile.world"]], city:"Tashkent, Uzbekistan · ecomobile.world", send:"Send a message", thanks:"Thanks — we'll be in touch shortly.", name:"Name", phone:"Phone or email", opts:["I'm a customer","I'm a partner","I'm an investor"], message:"Message", sendBtn:"Send message" },
      ru:{ eyebrow:"Контакты", title:"Давайте поговорим.", sub:"Клиенты, партнёры и инвесторы — пишите нужной команде.", cards:[["Продажи","Заказы BARLAS и NAYMAN, тест-драйвы","sales@ecomobile.world"],["Партнёрам","Партнёрство по станциям и дилерам","partners@ecomobile.world"],["Инвесторам","Связи с инвесторами","invest@ecomobile.world"]], city:"Ташкент, Узбекистан · ecomobile.world", send:"Напишите нам", thanks:"Спасибо — мы скоро свяжемся с вами.", name:"Имя", phone:"Телефон или e-mail", opts:["Я клиент","Я партнёр","Я инвестор"], message:"Сообщение", sendBtn:"Отправить" },
      uz:{ eyebrow:"Kontaktlar", title:"Keling, gaplashamiz.", sub:"Mijozlar, hamkorlar va investorlar — kerakli jamoaga yozing.", cards:[["Savdo","BARLAS va NAYMAN buyurtmalari, test-drayv","sales@ecomobile.world"],["Hamkorlar","Stansiya va diler hamkorligi","partners@ecomobile.world"],["Investorlar","Investorlar bilan aloqa","invest@ecomobile.world"]], city:"Toshkent, O‘zbekiston · ecomobile.world", send:"Bizga yozing", thanks:"Rahmat — tez orada bog‘lanamiz.", name:"Ism", phone:"Telefon yoki e-mail", opts:["Men mijozman","Men hamkorman","Men investorman"], message:"Xabar", sendBtn:"Yuborish" },
    };
    function ContactsPage(){ const {language:lg}=useLanguage(); const ct=CT[lg]||CT.en;
      const [sent,setSent]=useState(false);
      return (<main>
        <PageHero eyebrow={ct.eyebrow} title={ct.title} sub={ct.sub}/>
        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-12 md:py-20 grid md:grid-cols-2 gap-12">
          <div>
            <div className="grid gap-5">
              {ct.cards.map(([h,d,e],i)=>
                <Reveal key={i} delay={i*.05}><div className="softcard p-6"><div className="font-semibold">{h}</div><div className="muted text-sm mt-1">{d}</div><a href={"mailto:"+e} className="text-green text-sm font-medium mt-2 inline-block">{e}</a></div></Reveal>)}
            </div>
            <p className="muted text-sm mt-6">{ct.city}</p>
          </div>
          <Reveal delay={.08}><form onSubmit={e=>{e.preventDefault();setSent(true);}} className="softcard p-8">
            <h3 className="text-xl font-bold">{ct.send}</h3>
            {sent ? <div className="mt-6 rounded-xl bg-green-50 text-green p-5 text-sm font-medium">{ct.thanks}</div> : <div className="mt-6 grid gap-4">
              <input required placeholder={ct.name} className="rounded-xl border border-[#e2e4e9] px-4 py-3 outline-none focus:border-green"/>
              <input required placeholder={ct.phone} className="rounded-xl border border-[#e2e4e9] px-4 py-3 outline-none focus:border-green"/>
              <select className="rounded-xl border border-[#e2e4e9] px-4 py-3 outline-none focus:border-green text-[#4b5563]">{ct.opts.map((o,i)=><option key={i}>{o}</option>)}</select>
              <textarea rows="4" placeholder={ct.message} className="rounded-xl border border-[#e2e4e9] px-4 py-3 outline-none focus:border-green"/>
              <Btn primary>{ct.sendBtn}</Btn>
            </div>}
          </form></Reveal>
        </section>
      </main>);
    }

    const AB={
      en:{ eyebrow:"About ECOMOBILE", title:"Building the open battery-swap network of Central Asia.", sub:"ECOMOBILE is a green-transport platform — battery-swappable electric vehicles, swap stations and Battery-as-a-Service, combined into one open ecosystem for the region.",
        mission:"Our mission", missionText:"To make electric mobility faster and cheaper than fuel — by separating the battery from the car and building the open energy network that powers it.",
        build:"What we build", what:[["Battery-swap EVs","BARLAS & NAYMAN — designed around a swappable CATL pack, not a fixed one."],["Swap stations","A growing network of automated stations where a full battery takes two minutes."],["Battery-as-a-Service","Own the car, subscribe to the battery — lower cost and zero degradation worry."],["Energy network","Idle packs balance the grid and store renewable energy — a second business on every asset."]],
        stats:[["2","Models in market"],["5","Countries in plan"],["2 min","To a full battery"],["Open","Battery standard"]],
        standTitle:"What we stand for", values:[["Open by default","A shared battery standard the whole industry can build on — not a walled garden."],["Time is everything","Two minutes, not forty. Downtime is the enemy of every driver and fleet."],["Built for the region","Engineered for Central Asia's roads, climate and economics — from day one."]],
        techPartner:"Technology partner", techTitle:"Powered by CATL battery technology.", techText:"The world's leading battery maker — swappable packs engineered for safety, range and a long service life.", howSwap:"How swap works",
        join:"Join the movement", joinLead:"Drive one, partner with us, or invest in the network.", explore:"Explore BARLAS", getInTouch:"Get in touch" },
      ru:{ eyebrow:"О ECOMOBILE", title:"Строим открытую сеть замены батарей Центральной Азии.", sub:"ECOMOBILE — платформа зелёного транспорта: электромобили со сменной батареей, станции замены и батарея по подписке, объединённые в одну открытую экосистему региона.",
        mission:"Наша миссия", missionText:"Сделать электромобильность быстрее и дешевле бензина — отделив батарею от машины и построив открытую энергосеть, которая её питает.",
        build:"Что мы строим", what:[["Электромобили с заменой","BARLAS и NAYMAN — спроектированы вокруг сменной батареи CATL, а не фиксированной."],["Станции замены","Растущая сеть автоматических станций, где полная батарея — за две минуты."],["Батарея по подписке","Машина ваша, батарея — по подписке: ниже цена и ноль тревог о деградации."],["Энергосеть","Простаивающие батареи балансируют сеть и хранят ВИЭ — второй бизнес на каждом активе."]],
        stats:[["2","Модели на рынке"],["5","Стран в плане"],["2 мин","До полной батареи"],["Открытый","Стандарт батареи"]],
        standTitle:"За что мы стоим", values:[["Открытость по умолчанию","Единый стандарт батарей, на котором может строить вся отрасль, а не закрытый сад."],["Время — это всё","Две минуты, а не сорок. Простой — враг любого водителя и парка."],["Создано для региона","Инженерно под дороги, климат и экономику Центральной Азии — с первого дня."]],
        techPartner:"Технологический партнёр", techTitle:"На батареях CATL.", techText:"Ведущий мировой производитель батарей — сменные батареи, спроектированные под безопасность, запас хода и долгий срок службы.", howSwap:"Как работает замена",
        join:"Присоединяйтесь к движению", joinLead:"Купите, станьте партнёром или инвестируйте в сеть.", explore:"Узнать о BARLAS", getInTouch:"Связаться" },
      uz:{ eyebrow:"ECOMOBILE haqida", title:"Markaziy Osiyoning ochiq batareya almashish tarmog‘ini quryapmiz.", sub:"ECOMOBILE — yashil transport platformasi: batareya almashinuvchi elektromobillar, almashish stansiyalari va obunadagi batareya — mintaqa uchun bitta ochiq ekotizimda birlashtirilgan.",
        mission:"Bizning vazifamiz", missionText:"Elektr harakatni yoqilg‘idan tezroq va arzonroq qilish — batareyani avtomobildan ajratib, uni quvvatlaydigan ochiq energiya tarmog‘ini qurish orqali.",
        build:"Biz nima quramiz", what:[["Almashinuvchi elektromobillar","BARLAS va NAYMAN — qat’iy emas, almashinuvchi CATL batareyasi atrofida ishlangan."],["Almashish stansiyalari","To‘liq batareya ikki daqiqada bo‘ladigan o‘sayotgan avtomatik stansiyalar tarmog‘i."],["Obunadagi batareya","Avtomobil sizniki, batareya obunada — arzonroq va eskirishdan xavotirsiz."],["Energiya tarmog‘i","Bo‘sh batareyalar tarmoqni muvozanatlaydi va QTE saqlaydi — har aktivda ikkinchi biznes."]],
        stats:[["2","Bozordagi model"],["5","Rejadagi davlat"],["2 daq","To‘liq batareyagacha"],["Ochiq","Batareya standarti"]],
        standTitle:"Biz nimaga tayanamiz", values:[["Standart bo‘yicha ochiq","Butun soha qura oladigan yagona batareya standarti — yopiq bog‘ emas."],["Vaqt — hammasi","Ikki daqiqa, qirq emas. To‘xtash har bir haydovchi va parkning dushmani."],["Mintaqa uchun yaratilgan","Markaziy Osiyo yo‘llari, iqlimi va iqtisodi uchun — birinchi kundan."]],
        techPartner:"Texnologik hamkor", techTitle:"CATL batareya texnologiyasida.", techText:"Dunyodagi yetakchi batareya ishlab chiqaruvchisi — xavfsizlik, masofa va uzoq xizmat uchun ishlangan almashinuvchi batareyalar.", howSwap:"Almashish qanday ishlaydi",
        join:"Harakatga qo‘shiling", joinLead:"Haydang, hamkor bo‘ling yoki tarmoqqa investitsiya qiling.", explore:"BARLAS haqida", getInTouch:"Bog‘lanish" },
    };
    function AboutPage(){ const {language:lg}=useLanguage(); const ab=AB[lg]||AB.en;
      return (<main>
        <PageHero eyebrow={ab.eyebrow} title={ab.title} sub={ab.sub}/>
        <section className="mx-auto max-w-[1200px] px-5 md:px-8 -mt-2">
          <Reveal><div className="relative overflow-hidden rounded-[28px] border border-[#edeff3] aspect-[21/9]" style={{boxShadow:"0 30px 70px -38px rgba(16,24,40,.2)"}}><img src="/images/lifestyle.jpg" alt="" className="absolute inset-0 h-full w-full object-cover"/></div></Reveal>
        </section>
        <section className="mx-auto max-w-[1100px] px-5 md:px-8 py-20 md:py-28 text-center">
          <Head n="·" title={ab.mission} center/>
          <Reveal delay={.05}><p className="mt-6 mx-auto max-w-3xl text-xl md:text-2xl leading-relaxed">{ab.missionText}</p></Reveal>
        </section>
        <section className="bg-[#fafbfc] border-y border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28">
          <Head n="·" title={ab.build} center/>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">{ab.what.map(([t,d],i)=><Reveal key={i} delay={i*.05}><div className="softcard p-7 h-full"><div className="grid h-11 w-11 place-items-center rounded-xl bg-green-50 text-green font-semibold">{String(i+1).padStart(2,"0")}</div><h3 className="mt-5 text-lg font-semibold">{t}</h3><p className="muted mt-2 text-sm leading-relaxed">{d}</p></div></Reveal>)}</div>
        </div></section>
        <section className="text-white" style={{background:"#0a0b0d"}}><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-20"><div className="grid grid-cols-2 md:grid-cols-4 gap-8">{ab.stats.map(([n,l],i)=><Reveal key={i} delay={i*.05}><div className="text-center"><div className="text-3xl md:text-5xl font-bold tracking-tight">{n}</div><div className="text-white/50 mt-1 text-sm">{l}</div></div></Reveal>)}</div></div></section>
        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28">
          <Head n="·" title={ab.standTitle} center/>
          <div className="mt-12 grid md:grid-cols-3 gap-5">{ab.values.map(([t,d],i)=><Reveal key={i} delay={i*.06}><div className="softcard p-8 h-full"><h3 className="text-xl font-semibold">{t}</h3><p className="muted mt-3 leading-relaxed">{d}</p></div></Reveal>)}</div>
        </section>
        <section className="bg-[#fafbfc] border-y border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="max-w-xl"><div className="eyebrow">{ab.techPartner}</div><h3 className="mt-2 text-2xl font-bold">{ab.techTitle}</h3><p className="muted mt-2">{ab.techText}</p></div>
          <Btn ghost onClick={()=>go("/swap")}>{ab.howSwap}</Btn>
        </div></section>
        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-24 text-center">
          <Head n="·" title={ab.join} lead={ab.joinLead} center/>
          <div className="mt-8 flex flex-wrap justify-center gap-3"><Btn primary onClick={()=>go("/barlas")}>{ab.explore}</Btn><Btn ghost onClick={()=>go("/contacts")}>{ab.getInTouch}</Btn></div>
        </section>
      </main>);
    }

    function HomePage(){ const t=useContext(L);
      return (<main>
        <Hero/>
        <ModelPanel slug="barlas" bg="/images/barlas-hero.jpg"/>
        <ModelPanel slug="nayman" bg="/images/nayman-hero.jpg"/>
        <PowerPanel/>
        <Panel img="/images/station-2.png" dark title={t.netTitle} sub={t.netLead} p1={[t.cta2,"/swap"]} p2={[t.ctaP,"/contacts"]}/>
        <Panel img="/images/charging.jpg" dark title={t.energyTitle} sub={t.energyLead} p1={[t.learnMore,"/swap"]}/>
        <Panel img="/images/lifestyle.jpg" dark title={t.ctaTitle} sub={t.ctaSub} p1={[t.ctaP,"/contacts"]} p2={[t.ctaC,"/investors"]}/>
      </main>);
    }

    function App(){
      const [lang,setLang]=useState("en");
      const route=useHashRoute();
      useEffect(()=>{document.documentElement.lang=lang;},[lang]);
      let page;
      if(route==="/barlas") page=<VehiclePage slug="barlas"/>;
      else if(route==="/nayman") page=<VehiclePage slug="nayman"/>;
      else if(route==="/swap") page=<SwapPage/>;
      else if(route.startsWith("/news/")) page=<ArticlePage slug={route.slice(6)}/>;
      else if(route==="/news") page=<NewsPage/>;
      else if(route==="/faq") page=<FaqPage/>;
      else if(route==="/investors") page=<InvestorsPage/>;
      else if(route==="/contacts") page=<ContactsPage/>;
      else page=<HomePage/>;
      return (<L.Provider value={T[lang]}>
        <Nav lang={lang} setLang={setLang} route={route}/>
        {page}
        <Footer lang={lang}/>
      </L.Provider>);
    }

export { HomePage, VehiclePage, SwapPage, NewsPage, ArticlePage, FaqPage, InvestorsPage, ContactsPage, AboutPage, T, L };
