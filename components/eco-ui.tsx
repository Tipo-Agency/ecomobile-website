"use client";
import React, { useRef, useState, useEffect, createContext, useContext, Fragment } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

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
        ctaP:"Become a Partner", ctaC:"Talk to us", footTag:"A green-transport platform for the future of mobility." },
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
        ctaP:"Стать партнёром", ctaC:"Связаться", footTag:"Платформа зелёного транспорта для мобильности будущего." },
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
        ctaP:"Hamkor bo‘lish", ctaC:"Bog‘lanish", footTag:"Kelajak harakati uchun yashil transport platformasi." },
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
    function Btn({children,primary,ghost,lg,light,onClick}){
      const ref=useRef(null); const x=useMotionValue(0),y=useMotionValue(0);
      const sx=useSpring(x,{stiffness:200,damping:15}),sy=useSpring(y,{stiffness:200,damping:15});
      const pad=lg?"px-8 py-4 text-[1.02rem]":"px-6 py-3.5 text-[.95rem]";
      const skin=primary?"bg-green text-white hover:bg-green-600 shadow-[0_14px_30px_-10px_rgba(11,166,120,.6)]"
        :light?"bg-white text-ink hover:bg-white/90"
        :"bg-white text-ink border border-[#e2e4e9] hover:border-ink";
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
      return (<section id="top" className="hero-stage relative overflow-hidden flex flex-col min-h-[100svh] pt-[112px] md:pt-[128px] pb-4">
        <DotField/>
        <div className="blob" style={{width:520,height:520,left:"-10%",top:"4%",background:"radial-gradient(closest-side,#e3f7ee,transparent)"}}/>
        <div className="blob" style={{width:420,height:420,right:"-8%",bottom:"16%",background:"radial-gradient(closest-side,#eaf1ff,transparent)"}}/>

        <div className="relative z-10 mx-auto max-w-[1000px] px-5 text-center shrink-0">
          <motion.div initial={{y:12}} animate={{y:0}} transition={{delay:.05,duration:.6}} className="inline-flex items-center gap-2 rounded-full border border-[#e4e7ec] bg-white/70 backdrop-blur px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green"/><span className="eyebrow text-[11px]" style={{color:"#5b6470"}}>{t.eyebrow}</span>
          </motion.div>
          <motion.h1 initial={{y:22}} animate={{y:0}} transition={{delay:.15,duration:.8,ease:[0.16,1,0.3,1]}}
            className="mx-auto mt-4 max-w-[15ch] font-bold tracking-[-.035em] leading-[1.03]" style={{fontSize:"clamp(1.95rem,4.6vw,4rem)"}}>{t.title}</motion.h1>
          <motion.p initial={{y:16}} animate={{y:0}} transition={{delay:.28,duration:.6}} className="muted mx-auto mt-4 max-w-lg text-base md:text-lg leading-relaxed">{t.sub}</motion.p>
          <motion.div initial={{y:16}} animate={{y:0}} transition={{delay:.38,duration:.6}} className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Btn primary onClick={()=>go("/barlas")}>{t.cta1}</Btn>
            <Btn ghost onClick={()=>go("/swap")}>{t.cta2}</Btn>
          </motion.div>
        </div>

        <div className="relative z-20 flex-1 min-h-0 w-full flex items-end justify-center">
          <div className="relative">
            <HeroBubbles/>
            <motion.img initial={{y:34}} animate={{y:0}} transition={{delay:.35,duration:1,ease:[0.16,1,0.3,1]}}
              src="/images/barlas-hero-nobg.png" alt="ECOMOBILE BARLAS"
              className="relative z-10 block mx-auto h-auto w-auto max-h-[44vh] max-w-[86vw]"
              style={{filter:"drop-shadow(0 30px 40px rgba(16,24,40,.20))"}}/>
          </div>
        </div>

        {/* compact stat row on mobile (bubbles hidden on small screens) */}
        <div className="sm:hidden relative z-30 mx-auto mt-3 grid grid-cols-4 gap-2 px-4 shrink-0">
          {t.stats.map(([v,l],i)=>(<div key={i} className="text-center"><div className="text-lg font-bold tracking-tight">{v}</div><div className="muted mt-0.5 text-[10px] leading-tight">{l}</div></div>))}
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

    function Why(){ const t=useContext(L);
      return (<section id="why" className="mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-36">
        <Head n="01" title={t.whyTitle} lead={t.whyLead}/>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {t.why.map(([ti,d],i)=><Reveal key={i} delay={i*.05}><div className="softcard h-full p-8 transition-transform duration-300 hover:-translate-y-1">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-green-50 text-green font-semibold">{String(i+1).padStart(2,"0")}</div>
            <h3 className="mt-5 text-xl font-semibold">{ti}</h3><p className="muted mt-2.5 leading-relaxed">{d}</p>
          </div></Reveal>)}
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
      return (<section id="swap" className="mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-36">
        <Head n="03" title={t.swapTitle} lead={t.swapLead} center/>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {t.steps.map(([ti,d],i)=><Reveal key={i} delay={i*.08}><div className="softcard h-full p-8">
            <div className="flex items-center justify-between"><span className="text-6xl font-bold text-[#eef0f3]">0{i+1}</span><span className="h-10 w-10 grid place-items-center rounded-full bg-green text-white text-sm font-semibold">{i+1}</span></div>
            <h3 className="mt-6 text-xl font-semibold">{ti}</h3><p className="muted mt-2">{d}</p>
          </div></Reveal>)}
        </div>
        <Reveal delay={.1}><div className="mt-14 text-center"><span className="font-bold text-green leading-none tracking-tight" style={{fontSize:"clamp(3.4rem,9vw,6.5rem)"}}>≈ 2 min</span><p className="muted mt-2">start to finish</p></div></Reveal>
      </section>);
    }

    function Ecosystem(){ const t=useContext(L);
      return (<section id="ecosystem" className="bg-[#fafbfc] border-y border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-36">
        <Head n="04" title={t.ecoTitle} lead={t.ecoLead} center/>
        <div className="mt-14 mx-auto max-w-md flex flex-col items-center gap-3">
          {t.eco.map((n,i)=><Fragment key={i}>
            <Reveal delay={i*.06} className="w-full"><div className={"w-full rounded-2xl px-7 py-5 text-center font-semibold "+(i===t.eco.length-1?"bg-green text-white shadow-[0_18px_40px_-16px_rgba(11,166,120,.6)]":"softcard")}>{n}</div></Reveal>
            {i<t.eco.length-1&&<span className="text-[#c7ccd4] text-sm">↓</span>}
          </Fragment>)}
        </div>
      </div></section>);
    }

    function Open(){ const t=useContext(L);
      return (<section className="mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-36">
        <Head n="05" title={t.openTitle} center/>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <Reveal><div className="rounded-[24px] border border-[#e9eaee] bg-[#fafbfc] p-8 md:p-10">
            <div className="eyebrow" style={{color:"#9aa1ab"}}>Closed ecosystem</div>
            <ul className="mt-6">{t.closed.map((c,i)=><li key={i} className="flex items-center gap-3 border-b border-[#eef0f3] py-4 text-[#8a909b]"><span>—</span>{c}</li>)}</ul>
          </div></Reveal>
          <Reveal delay={.08}><div className="softcard p-8 md:p-10" style={{background:"linear-gradient(180deg,#f0faf5,#ffffff)"}}>
            <div className="eyebrow">Open ecosystem</div>
            <ul className="mt-6">{t.open.map((c,i)=><li key={i} className="flex items-center gap-3 border-b border-[#e7f3ec] py-4 font-medium"><span className="text-green">✓</span>{c}</li>)}</ul>
          </div></Reveal>
        </div>
      </section>);
    }

    function Taxi(){ const t=useContext(L);
      return (<section className="bg-[#fafbfc] border-y border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-36 grid md:grid-cols-2 gap-12 items-center">
        <div><Head n="06" title={t.taxiTitle} lead={t.taxiLead}/></div>
        <div className="grid gap-4">{t.taxiStats.map(([v,l],i)=><Reveal key={i} delay={i*.08}><div className="softcard flex items-center gap-5 px-7 py-6">
          <div className="text-4xl md:text-5xl font-bold text-green">{v}</div><div className="muted">{l}</div></div></Reveal>)}</div>
      </div></section>);
    }

    function Network(){ const t=useContext(L);
      const dots=[[320,230,0],[400,270,0],[470,210,0],[560,250,1],[250,280,1],[640,200,1],[700,280,2],[360,180,2]];
      const col=["#0ba678","#7fd6ba","#cfd4dc"];
      return (<section id="network" className="mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-36">
        <Head n="07" title={t.netTitle} lead={t.netLead} center/>
        <Reveal delay={.12}><div className="mt-12 overflow-hidden rounded-[26px] border border-[#e9eaee] p-6 md:p-12" style={{background:"radial-gradient(120% 100% at 50% 0, #f4f7fa, #ffffff)"}}>
          <svg viewBox="0 0 900 460" className="w-full h-auto">
            <path d="M120 180 C180 120 320 90 430 110 C560 95 690 110 770 160 C820 200 800 260 740 300 C680 340 600 330 520 350 C420 375 320 380 240 340 C160 305 90 250 120 180Z" fill="#f0f3f7" stroke="#0ba678" strokeOpacity=".3" strokeWidth="1.2" strokeDasharray="3 6"/>
            {dots.map(([x,y,k],i)=><circle key={i} cx={x} cy={y} r="6" fill={col[k]} style={k===0?{animation:`pulse 2.4s ease-in-out ${i*.2}s infinite`,transformOrigin:`${x}px ${y}px`}:{}}/>)}
          </svg>
        </div></Reveal>
        <div className="mt-7 flex flex-wrap justify-center gap-6 text-sm muted">{t.legend.map((l,i)=><span key={i} className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full" style={{background:col[i]}}/>{l}</span>)}</div>
        <div className="mt-9 flex flex-wrap justify-center gap-x-9 gap-y-2 text-base font-semibold text-[#b7bdc6]">{["Uzbekistan","Kazakhstan","Kyrgyzstan","Tajikistan","Turkmenistan"].map(c=><span key={c}>{c}</span>)}</div>
      </section>);
    }

    function Energy(){ const t=useContext(L);
      return (<section className="bg-[#fafbfc] border-y border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-36 grid md:grid-cols-2 gap-12 items-center">
        <div><Head n="08" title={t.energyTitle} lead={t.energyLead}/>
          <div className="mt-8 grid grid-cols-2 gap-3">{t.energy.map((b,i)=><Reveal key={i} delay={i*.05}><div className="rounded-xl border border-[#e9eaee] bg-white px-5 py-4 text-sm font-medium hover:border-green/50 transition-colors">{b}</div></Reveal>)}</div>
        </div>
        <Reveal delay={.1}><div className="relative w-full overflow-hidden rounded-[26px] border border-[#edeff3] aspect-square" style={{boxShadow:"0 30px 70px -34px rgba(16,24,40,.22)"}}>
          <img src="/images/station-1.png" alt="ECOMOBILE swap station" className="absolute inset-0 h-full w-full object-cover"/>
          <span className="absolute bottom-4 left-4 rounded-full bg-black/30 backdrop-blur px-3 py-1.5 text-[11px] tracking-[.16em] uppercase text-white/85">Swap station</span>
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
            <Reveal delay={.16}><div className="mt-9 flex flex-wrap justify-center gap-3"><Btn light lg onClick={()=>go("/contacts")}>{t.ctaP}</Btn><Btn ghost lg onClick={()=>go("/contacts")}>{t.ctaC}</Btn></div></Reveal>
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
      barlas:{ name:"BARLAS", tag:"Business sedan", tagline:"The flagship battery-swap sedan.",
        hero:"/images/barlas-hero.jpg",
        gallery:["/images/barlas-side.jpg","/images/interior.jpg","/images/barlas-silver.jpg","/images/lifestyle.jpg"],
        specs:[["Range","up to 500 km"],["Battery","CATL · swappable"],["Swap time","≈ 2 min"],["0–100 km/h","~6.5 s"],["Seats","5 · business"],["Safety","Advanced ADAS"]],
        trims:[["Comfort","259 999 000"],["Max","279 999 000"]] },
      nayman:{ name:"NAYMAN", tag:"Electric SUV", tagline:"Space, range and two-minute swaps.",
        hero:"/images/nayman-hero.jpg",
        gallery:["/images/nayman-2.jpg","/images/interior-2.jpg","/images/chassis.jpg","/images/station-2.png"],
        specs:[["Range","up to 500 km"],["Battery","CATL · swappable"],["Swap time","≈ 2 min"],["Clearance","190 mm"],["Seats","5 · SUV"],["Drive","AWD available"]],
        trims:[["Comfort","289 999 000"],["Max","319 999 000"]] },
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

    function VehiclePage({slug}){
      const v=VEHICLES[slug]; const other=slug==="barlas"?"nayman":"barlas";
      return (<main>
        <PageHero eyebrow={v.tag} title={v.name} sub={v.tagline}/>
        <section className="mx-auto max-w-[1200px] px-5 md:px-8 -mt-2">
          <Reveal><img src={v.hero} alt={v.name} className="mx-auto w-[min(860px,94vw)] h-auto" style={{mixBlendMode:"darken"}}/></Reveal>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Btn primary onClick={()=>go("/contacts")}>Book a test drive</Btn>
            <Btn ghost onClick={()=>go("/swap")}>How swap works</Btn>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28">
          <Head n="·" title="Specifications" center/>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-px bg-[#e9eaee] rounded-2xl overflow-hidden border border-[#e9eaee]">
            {v.specs.map(([k,val],i)=><div key={i} className="bg-white p-6"><div className="text-xs uppercase tracking-wider text-[#9aa1ab]">{k}</div><div className="mt-2 text-lg font-semibold">{val}</div></div>)}
          </div>
        </section>

        <section className="bg-[#fafbfc] border-y border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28">
          <Head n="·" title="Gallery"/>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {v.gallery.map((g,i)=><Reveal key={i} delay={i*.05}><div className={"relative overflow-hidden rounded-[22px] border border-[#edeff3] "+(i===0?"md:col-span-2 aspect-[16/9]":"aspect-[4/3]")} style={{boxShadow:"0 30px 70px -38px rgba(16,24,40,.2)"}}>
              <img src={g} alt="" className="absolute inset-0 h-full w-full object-cover"/></div></Reveal>)}
          </div>
        </div></section>

        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28">
          <Head n="·" title="Pricing" lead="Own the car, subscribe to the battery." center/>
          <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {v.trims.map(([trim,price],i)=><Reveal key={i} delay={i*.06}><div className={"softcard p-8 "+(i===1?"ring-1 ring-green/30":"")}>
              <div className="flex items-center justify-between"><h3 className="text-xl font-bold">{v.name} {trim}</h3>{i===1&&<span className="rounded-full bg-green-50 text-green text-xs font-semibold px-3 py-1">Top</span>}</div>
              <div className="muted text-sm mt-5">from</div><div className="text-2xl font-bold">{price} <span className="text-sm font-medium muted">сум</span></div>
              <div className="mt-6"><Btn primary onClick={()=>go("/contacts")}>Order {trim}</Btn></div>
            </div></Reveal>)}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 md:px-8 pb-24 text-center">
          <p className="muted">Looking for the other model?</p>
          <button onClick={()=>go("/"+other)} className="mt-3 text-xl font-bold tracking-tight hover:text-green transition-colors">Explore {VEHICLES[other].name} →</button>
        </section>
      </main>);
    }

    function SwapPage(){ const t=useContext(L);
      return (<main>
        <PageHero eyebrow="Battery Swap · BaaS" title="Two minutes. Then you're gone." sub="No cables, no waiting. An automated station swaps your depleted pack for a full one — and the network doubles as distributed energy storage."/>
        <Swap/>
        <section className="bg-[#fafbfc] border-y border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <Reveal><div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-[#edeff3]" style={{boxShadow:"0 30px 70px -38px rgba(16,24,40,.2)"}}><img src="/images/station-1.png" className="absolute inset-0 h-full w-full object-cover"/></div></Reveal>
          <div><Head n="·" title="Battery-as-a-Service"/>
            <p className="muted mt-4 text-lg">Buy the car, subscribe to the battery. You get a far lower entry price, predictable monthly energy, and you never worry about battery degradation — the network keeps every pack healthy.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">{["Lower upfront price","Predictable energy cost","Always-healthy battery","Swap anywhere on the network"].map((x,i)=><div key={i} className="flex items-center gap-2 text-sm"><span className="text-green">✓</span>{x}</div>)}</div>
          </div>
        </div></section>
        <Network/><Energy/>
        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 text-center">
          <Head n="·" title="Become a station partner" lead="Bring battery swap to your city and earn on every swap." center/>
          <div className="mt-8 flex justify-center"><Btn primary onClick={()=>go("/contacts")}>Partner with us</Btn></div>
        </section>
      </main>);
    }

    const NEWS=[
      ["Jun 2026","First swap stations go live in Tashkent","The first ECOMOBILE battery-swap stations open, cutting charging downtime to two minutes.","/images/station-1.png"],
      ["May 2026","BARLAS deliveries begin","The business-class battery-swap sedan reaches its first customers across Uzbekistan.","/images/barlas-side.jpg"],
      ["Apr 2026","NAYMAN electric SUV unveiled","The swap-compatible SUV joins the lineup with up to 500 km of range.","/images/nayman-hero.jpg"],
      ["Mar 2026","Open battery standard announced","ECOMOBILE opens its battery standard to other brands — one network for the whole region.","/images/chassis.jpg"],
      ["Feb 2026","CATL partnership confirmed","Swappable CATL packs power the BARLAS and NAYMAN platforms.","/images/interior.jpg"],
      ["Jan 2026","Central Asia expansion roadmap","Stations planned across Kazakhstan, Kyrgyzstan, Tajikistan and Turkmenistan.","/images/lifestyle.jpg"],
    ];
    function NewsPage(){
      return (<main>
        <PageHero eyebrow="Newsroom" title="News & updates" sub="What's new across the ECOMOBILE platform."/>
        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-12 md:py-20">
          <div className="grid md:grid-cols-3 gap-6">
            {NEWS.map(([date,title,ex,img],i)=><Reveal key={i} delay={(i%3)*.06}><article className="softcard overflow-hidden h-full group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#f4f6f8]"><img src={img} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/></div>
              <div className="p-6"><div className="eyebrow" style={{color:"#9aa1ab"}}>{date}</div><h3 className="mt-3 text-lg font-semibold leading-snug">{title}</h3><p className="muted mt-2 text-sm">{ex}</p>
                <div className="mt-4 text-sm font-medium text-green">Read more →</div></div>
            </article></Reveal>)}
          </div>
        </section>
      </main>);
    }

    const FAQ=[
      ["How long does a battery swap take?","About two minutes. You pull into the station, an automated system swaps your depleted pack for a fully charged one, and you drive away — roughly the time it takes to refuel."],
      ["What is Battery-as-a-Service (BaaS)?","You own the car and subscribe to the battery. This lowers the upfront price dramatically and turns energy into a predictable monthly cost."],
      ["What is the range?","Up to 500 km on a full pack, using CATL swappable battery technology."],
      ["Where can I swap batteries?","Across a growing network — starting in Uzbekistan, expanding to Kazakhstan, Kyrgyzstan, Tajikistan and Turkmenistan."],
      ["Is battery swapping safe?","Yes. Swaps happen in automated, certified stations. Every pack is inspected and charged under optimal conditions, which also extends its life."],
      ["Can other brands use the network?","Yes — ECOMOBILE is an open platform built on a shared battery standard, so the whole industry can plug in."],
      ["What's the difference between Comfort and Max?","Max adds range, equipment and premium finishes. Both swap on the same network. See each model page for full pricing."],
    ];
    function FaqItem({q,a}){ const [o,setO]=useState(false);
      return (<div className="border-b border-[#eef0f3]"><button onClick={()=>setO(v=>!v)} className="w-full flex items-center justify-between gap-4 py-5 text-left">
        <span className="text-lg font-semibold">{q}</span><span className={"text-green transition-transform "+(o?"rotate-45":"")}>+</span></button>
        <div className="overflow-hidden transition-all duration-300" style={{maxHeight:o?"240px":"0"}}><p className="muted pb-5 pr-8">{a}</p></div></div>);
    }
    function FaqPage(){
      return (<main>
        <PageHero eyebrow="Help" title="Frequently asked questions" sub="Everything about battery swap, BaaS and ownership."/>
        <section className="mx-auto max-w-[820px] px-5 md:px-8 py-12 md:py-20">
          {FAQ.map(([q,a],i)=><Reveal key={i} delay={i*.03}><FaqItem q={q} a={a}/></Reveal>)}
          <div className="mt-12 softcard p-8 text-center"><h3 className="text-xl font-bold">Still have questions?</h3><p className="muted mt-2">Our team is happy to help.</p><div className="mt-5 flex justify-center"><Btn primary onClick={()=>go("/contacts")}>Contact us</Btn></div></div>
        </section>
      </main>);
    }

    function InvestorsPage(){
      const market=[
        ["$2.4B","Central Asia passenger-EV market by 2030","Demand across Uzbekistan, Kazakhstan, Kyrgyzstan, Tajikistan and Turkmenistan is compounding fast."],
        ["~40 → 2 min","charging vs swapping","For taxis and fleets, downtime is lost revenue. Swapping removes it entirely."],
        ["Recurring","battery-as-a-service revenue","Every car on the road is a monthly subscription — not a one-off sale."],
      ];
      const streams=[
        ["01","Vehicle sales","Margin on every BARLAS and NAYMAN sold."],
        ["02","Battery subscription","Recurring monthly BaaS revenue per vehicle."],
        ["03","Swap fees","Per-swap revenue across the growing network."],
        ["04","Energy services","Grid balancing & storage from idle battery packs."],
      ];
      const traction=[["2","Models in market"],["259.9M","сум — entry price"],["5","Countries in plan"],["CATL","Battery partner"]];
      const road=[["2026","Launch","BARLAS & NAYMAN deliveries; first swap stations in Tashkent."],["2027","Scale","Station network across Uzbekistan; NAYMAN volume."],["2028","Expand","Kazakhstan & Kyrgyzstan; open the standard to partners."],["2030","Platform","Region-wide energy + mobility network."]];
      const funds=[["Swap-station network","45"],["Vehicle & battery inventory","30"],["R&D & platform software","15"],["Team & operations","10"]];
      return (<main>
        <PageHero eyebrow="Investor Relations" title="The open battery-swap network of Central Asia." sub="Not just an EV brand — a transport-and-energy platform with recurring revenue and network-effect economics."/>

        <section className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid md:grid-cols-3 gap-5">{market.map(([n,t,d],i)=><Reveal key={i} delay={i*.06}><div className="softcard p-8 h-full">
            <div className="text-3xl md:text-4xl font-bold text-green tracking-tight">{n}</div>
            <div className="mt-3 font-semibold">{t}</div><p className="muted mt-2 text-sm leading-relaxed">{d}</p></div></Reveal>)}</div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-6">
          <Reveal><div className="rounded-[24px] border border-[#e9eaee] bg-[#fafbfc] p-8 md:p-10 h-full"><div className="eyebrow" style={{color:"#9aa1ab"}}>The problem</div><h3 className="mt-3 text-2xl font-bold">Charging is slow and capital-heavy.</h3><p className="muted mt-4 text-lg">Every minute a taxi or fleet vehicle is plugged in is lost revenue. And the battery — the most expensive part of an EV — keeps the upfront price out of reach for the mass market.</p></div></Reveal>
          <Reveal delay={.08}><div className="softcard p-8 md:p-10 h-full" style={{background:"linear-gradient(180deg,#f0faf5,#fff)"}}><div className="eyebrow">The solution</div><h3 className="mt-3 text-2xl font-bold">Decouple the battery from the car.</h3><p className="muted mt-4 text-lg">Two-minute swaps remove downtime. Battery-as-a-Service removes the upfront battery cost. And the station network doubles as distributed energy storage — a second business on the same asset.</p></div></Reveal>
        </section>

        <section className="text-white" style={{background:"#0a0b0d"}}><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div><div className="eyebrow" style={{color:"#7dd6b6"}}>Business model</div><h2 className="mt-3 font-bold tracking-tight leading-[1.05]" style={{fontSize:"clamp(2rem,4.4vw,3.2rem)"}}>Four revenue streams. One platform.</h2><p className="mt-5 text-white/55 text-lg max-w-md">A car sale is the start of the relationship, not the end — every vehicle generates recurring battery and energy revenue for years.</p></div>
          <div className="grid sm:grid-cols-2 gap-4">{streams.map(([n,t,d],i)=><Reveal key={i} delay={i*.05}><div className="rounded-2xl border border-white/12 bg-white/[.03] p-6 h-full"><div className="text-green-400 text-sm font-semibold">{n}</div><div className="mt-2 font-semibold">{t}</div><p className="text-white/50 text-sm mt-1.5">{d}</p></div></Reveal>)}</div>
        </div></section>

        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28">
          <Head n="·" title="Traction" center/>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-5">{traction.map(([n,l],i)=><Reveal key={i} delay={i*.05}><div className="text-center"><div className="text-3xl md:text-4xl font-bold tracking-tight">{n}</div><div className="muted mt-1 text-sm">{l}</div></div></Reveal>)}</div>
          <Reveal delay={.1}><div className="mt-12 relative overflow-hidden rounded-[26px] border border-[#edeff3] aspect-[21/9]" style={{boxShadow:"0 30px 70px -38px rgba(16,24,40,.2)"}}><img src="/images/chassis.jpg" alt="" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0" style={{background:"linear-gradient(90deg, rgba(0,0,0,.55), transparent 60%)"}}/><div className="absolute bottom-6 left-6 md:left-8 text-white max-w-md"><div className="text-xs uppercase tracking-widest opacity-80">Open battery standard</div><div className="text-xl md:text-2xl font-bold mt-1">One pack. Any compatible vehicle.</div></div></div></Reveal>
        </section>

        <section className="bg-[#fafbfc] border-y border-[#eef0f3]"><div className="mx-auto max-w-[1200px] px-5 md:px-8 py-20"><Head n="·" title="Roadmap" center/>
          <div className="mt-12 grid md:grid-cols-4 gap-5">{road.map(([y,h,d],i)=><Reveal key={i} delay={i*.06}><div className="softcard p-7 h-full"><div className="text-green font-bold text-lg">{y}</div><div className="mt-2 text-lg font-semibold">{h}</div><p className="muted mt-2 text-sm">{d}</p></div></Reveal>)}</div>
        </div></section>

        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-start">
          <div><Head n="·" title="The raise"/><p className="muted mt-4 text-lg max-w-md">We're raising to build the swap-station network and scale vehicle & battery inventory ahead of demand. Indicative use of funds:</p></div>
          <div className="space-y-5 pt-2">{funds.map(([l,p],i)=><Reveal key={i} delay={i*.06}><div><div className="flex justify-between text-sm font-medium"><span>{l}</span><span className="text-green">{p}%</span></div><div className="mt-2 h-2.5 rounded-full bg-[#eef0f3] overflow-hidden"><div className="h-full rounded-full" style={{width:p+"%",background:"linear-gradient(90deg,#0ba678,#10b981)"}}/></div></div></Reveal>)}</div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 md:px-8 pb-24">
          <div className="relative overflow-hidden rounded-[30px] px-6 py-16 md:py-20 text-center text-white" style={{background:"linear-gradient(135deg,#0ba678,#078a64)"}}>
            <img src="/images/logomark.svg" alt="" className="pointer-events-none absolute -right-12 -bottom-16 w-72 opacity-15" style={{filter:"brightness(0) invert(1)"}}/>
            <div className="relative z-10 mx-auto max-w-2xl"><h2 className="font-bold tracking-tight" style={{fontSize:"clamp(2rem,5vw,3.4rem)"}}>Request the investor deck</h2><p className="mx-auto mt-4 max-w-lg text-white/85 text-lg">Full market sizing, unit economics, financials and expansion strategy.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Btn light lg onClick={()=>go("/contacts")}>Contact investor relations</Btn></div></div>
          </div>
        </section>
      </main>);
    }

    function ContactsPage(){
      const [sent,setSent]=useState(false);
      return (<main>
        <PageHero eyebrow="Contact" title="Let's talk." sub="Customers, partners and investors — reach the right team."/>
        <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-12 md:py-20 grid md:grid-cols-2 gap-12">
          <div>
            <div className="grid gap-5">
              {[["Sales","BARLAS & NAYMAN orders, test drives","sales@ecomobile.world"],["Partners","Swap-station & dealer partnership","partners@ecomobile.world"],["Investors","Investor relations","invest@ecomobile.world"]].map(([h,d,e],i)=>
                <Reveal key={i} delay={i*.05}><div className="softcard p-6"><div className="font-semibold">{h}</div><div className="muted text-sm mt-1">{d}</div><a href={"mailto:"+e} className="text-green text-sm font-medium mt-2 inline-block">{e}</a></div></Reveal>)}
            </div>
            <p className="muted text-sm mt-6">Tashkent, Uzbekistan · ecomobile.world</p>
          </div>
          <Reveal delay={.08}><form onSubmit={e=>{e.preventDefault();setSent(true);}} className="softcard p-8">
            <h3 className="text-xl font-bold">Send a message</h3>
            {sent ? <div className="mt-6 rounded-xl bg-green-50 text-green p-5 text-sm font-medium">Thanks — we'll be in touch shortly.</div> : <div className="mt-6 grid gap-4">
              <input required placeholder="Name" className="rounded-xl border border-[#e2e4e9] px-4 py-3 outline-none focus:border-green"/>
              <input required placeholder="Phone or email" className="rounded-xl border border-[#e2e4e9] px-4 py-3 outline-none focus:border-green"/>
              <select className="rounded-xl border border-[#e2e4e9] px-4 py-3 outline-none focus:border-green text-[#4b5563]"><option>I'm a customer</option><option>I'm a partner</option><option>I'm an investor</option></select>
              <textarea rows="4" placeholder="Message" className="rounded-xl border border-[#e2e4e9] px-4 py-3 outline-none focus:border-green"/>
              <Btn primary>Send message</Btn>
            </div>}
          </form></Reveal>
        </section>
      </main>);
    }

    function HomePage(){
      return (<main><Hero/><Trust/><Models/><Why/><Meet/><Swap/><Ecosystem/><Open/><Taxi/><Network/><Energy/><CTA/></main>);
    }

    function App(){
      const [lang,setLang]=useState("en");
      const route=useHashRoute();
      useEffect(()=>{document.documentElement.lang=lang;},[lang]);
      let page;
      if(route==="/barlas") page=<VehiclePage slug="barlas"/>;
      else if(route==="/nayman") page=<VehiclePage slug="nayman"/>;
      else if(route==="/swap") page=<SwapPage/>;
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

export { HomePage, VehiclePage, SwapPage, NewsPage, FaqPage, InvestorsPage, ContactsPage };
