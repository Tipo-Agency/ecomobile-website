"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TrendingUp, Globe, Battery, Users, Target, Download, ChevronRight, BarChart3, Zap } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"

export default function InvestorsPage() {
  const { language } = useLanguage()

  const translations = {
    ru: {
      hero: {
        badge: "Инвестиционная возможность",
        title: "Инвестируйте в будущее",
        titleHighlight: "городского транспорта",
        description:
          "EcoMobile революционизирует рынок коммерческого транспорта с помощью технологии быстрой замены батарей CATL. Присоединяйтесь к нам на пути к созданию экологически чистого и экономически эффективного будущего.",
        downloadBtn: "Скачать презентацию",
        meetingBtn: "Запросить встречу",
      },
      market: {
        title: "Рыночная возможность",
        subtitle: "Огромный потенциал роста в сегменте коммерческого электротранспорта",
        marketSize: "Объём рынка коммерческого электротранспорта к 2030 году",
        growth: "Ежегодный рост рынка электрических коммерческих автомобилей",
        swapTime: "Время замены батареи — ключевое конкурентное преимущество",
        savings: "Экономия операционных расходов по сравнению с ДВС",
      },
      business: {
        title: "Бизнес-модель",
        subtitle: "Многоуровневая модель монетизации с высокой маржинальностью",
        sales: {
          title: "Продажа автомобилей",
          description: "Прямые продажи электромобилей B2B клиентам с высокой маржой",
          margin: "Маржа:",
          cycle: "Цикл продаж:",
        },
        stations: {
          title: "Сеть станций замены",
          description: "Развитие сети станций быстрой замены батарей по франшизной модели",
          revenue: "Доход за замену:",
          franchise: "Франшизный взнос:",
        },
        subscription: {
          title: "Подписочная модель",
          description: "Ежемесячные платежи за обслуживание, ПО и телематику",
          monthly: "Ежемесячно:",
          ltv: "LTV:",
        },
      },
      technology: {
        title: "Технологическое преимущество",
        titleHighlight: "CATL",
        subtitle: "Партнёрство с мировым лидером в области батарейных технологий",
        fastSwap: {
          title: "Быстрая замена",
          description:
            "Технология EVOGO позволяет заменить батарею за 1 минуту, что быстрее заправки обычного автомобиля",
        },
        modular: {
          title: "Модульность",
          description: "Система из 2-х съёмных батарей обеспечивает гибкость и надёжность энергоснабжения",
        },
        scalable: {
          title: "Масштабируемость",
          description: "Проверенная технология с возможностью быстрого масштабирования по всему миру",
        },
        badge: "Технология будущего",
      },
      expansion: {
        title: "План развития",
        subtitle: "Поэтапное масштабирование с фокусом на ключевые рынки",
        phase1: {
          title: "Фаза 1: Узбекистан",
          description: "Запуск производства и создание первых 50 станций замены батарей в Ташкенте и крупных городах",
          salesTarget: "Цель продаж",
          stations: "Станции",
          revenue: "Выручка",
        },
        phase2: {
          title: "Фаза 2: Центральная Азия",
          description: "Расширение в Казахстан, Кыргызстан и Таджикистан с адаптацией под местные условия",
        },
        phase3: {
          title: "Фаза 3: Глобальная экспансия",
          description: "Выход на рынки Европы, Ближнего Востока и Юго-Восточной Азии",
        },
      },
      investment: {
        title: "Инвестиционные условия",
        subtitle: "Привлекательные условия для стратегических инвесторов",
        roundA: "Раунд A",
        funding: "Объём привлечения:",
        valuation: "Оценка компании:",
        equity: "Доля для инвесторов:",
        useOfFunds: "Использование средств:",
        production: "Производство и R&D",
        network: "Развитие сети станций",
        marketing: "Маркетинг и продажи",
        operations: "Операционные расходы",
        keyMetrics: "Ключевые метрики",
        roiForecast: "ROI прогноз",
        payback: "Срок окупаемости",
        exitStrategy: "Exit стратегия",
      },
      cta: {
        title: "Готовы инвестировать в будущее?",
        subtitle: "Присоединяйтесь к революции в городском транспорте уже сегодня",
        button: "Запросить встречу",
      },
      modal: {
        title: "Запрос встречи",
        description: "Мы свяжемся с вами для назначения встречи",
        name: "Имя",
        email: "Email",
        company: "Компания",
        message: "Сообщение",
        placeholder: "Расскажите о ваших инвестиционных интересах...",
        submit: "Отправить запрос",
      },
    },
    uz: {
      hero: {
        badge: "Investitsiya imkoniyati",
        title: "Kelajakka investitsiya qiling",
        titleHighlight: "shahar transporti",
        description:
          "EcoMobile CATL ning batareyani tez almashtirish texnologiyasi yordamida tijorat transport bozorini inqilob qilmoqda. Ekologik toza va iqtisodiy samarali kelajakni yaratish yo'lida bizga qo'shiling.",
        downloadBtn: "Taqdimotni yuklab olish",
        meetingBtn: "Uchrashuv so'rash",
      },
      market: {
        title: "Bozor imkoniyati",
        subtitle: "Tijorat elektrotransport segmentida ulkan o'sish potentsiali",
        marketSize: "2030 yilga qadar tijorat elektrotransport bozori hajmi",
        growth: "Elektr tijorat avtomobillari bozorining yillik o'sishi",
        swapTime: "Batareya almashtirish vaqti - asosiy raqobat ustunligi",
        savings: "ICE bilan solishtirganda operatsion xarajatlarni tejash",
      },
      business: {
        title: "Biznes model",
        subtitle: "Yuqori marjinallik bilan ko'p darajali monetizatsiya modeli",
        sales: {
          title: "Avtomobil sotish",
          description: "Yuqori marja bilan B2B mijozlarga elektromobillarni to'g'ridan-to'g'ri sotish",
          margin: "Marja:",
          cycle: "Sotuv tsikli:",
        },
        stations: {
          title: "Almashtirish stantsiyalari tarmog'i",
          description:
            "Franchayzing modeli bo'yicha batareyalarni tez almashtirish stantsiyalari tarmog'ini rivojlantirish",
          revenue: "Almashtirish uchun daromad:",
          franchise: "Franchayzing to'lovi:",
        },
        subscription: {
          title: "Obuna modeli",
          description: "Xizmat ko'rsatish, dasturiy ta'minot va telematika uchun oylik to'lovlar",
          monthly: "Oylik:",
          ltv: "LTV:",
        },
      },
      technology: {
        title: "Texnologik ustunlik",
        titleHighlight: "CATL",
        subtitle: "Batareya texnologiyalari sohasidagi jahon lideri bilan hamkorlik",
        fastSwap: {
          title: "Tez almashtirish",
          description:
            "EVOGO texnologiyasi batareyani 1 daqiqada almashtirish imkonini beradi, bu oddiy avtomobilni yoqilg'i quyishdan tezroq",
        },
        modular: {
          title: "Modullik",
          description:
            "2 ta olinadigan batareyadan iborat tizim energiya ta'minoti moslashuvchanligi va ishonchliligini ta'minlaydi",
        },
        scalable: {
          title: "Kengaytiriluvchanlik",
          description: "Butun dunyo bo'ylab tez kengaytirish imkoniyati bilan isbotlangan texnologiya",
        },
        badge: "Kelajak texnologiyasi",
      },
      expansion: {
        title: "Rivojlanish rejasi",
        subtitle: "Asosiy bozorlarga e'tibor qaratgan bosqichma-bosqich kengaytirish",
        phase1: {
          title: "1-bosqich: O'zbekiston",
          description:
            "Ishlab chiqarishni boshlash va Toshkent va yirik shaharlarda birinchi 50 ta batareya almashtirish stantsiyasini yaratish",
          salesTarget: "Sotuv maqsadi",
          stations: "Stantsiyalar",
          revenue: "Daromad",
        },
        phase2: {
          title: "2-bosqich: Markaziy Osiyo",
          description: "Qozog'iston, Qirg'iziston va Tojikistonga mahalliy sharoitlarga moslashgan holda kengayish",
        },
        phase3: {
          title: "3-bosqich: Global kengayish",
          description: "Yevropa, Yaqin Sharq va Janubi-Sharqiy Osiyo bozorlariga chiqish",
        },
      },
      investment: {
        title: "Investitsiya shartlari",
        subtitle: "Strategik investorlar uchun jozibali shartlar",
        roundA: "A raund",
        funding: "Jalb qilinadigan hajm:",
        valuation: "Kompaniya bahosi:",
        equity: "Investorlar ulushi:",
        useOfFunds: "Mablag'lardan foydalanish:",
        production: "Ishlab chiqarish va R&D",
        network: "Stantsiyalar tarmog'ini rivojlantirish",
        marketing: "Marketing va sotish",
        operations: "Operatsion xarajatlar",
        keyMetrics: "Asosiy ko'rsatkichlar",
        roiForecast: "ROI prognozi",
        payback: "Qoplash muddati",
        exitStrategy: "Chiqish strategiyasi",
      },
      cta: {
        title: "Kelajakka investitsiya qilishga tayyormisiz?",
        subtitle: "Bugun shahar transportidagi inqilobga qo'shiling",
        button: "Uchrashuv so'rash",
      },
      modal: {
        title: "Uchrashuv so'rovi",
        description: "Uchrashuv belgilash uchun siz bilan bog'lanamiz",
        name: "Ism",
        email: "Email",
        company: "Kompaniya",
        message: "Xabar",
        placeholder: "Investitsiya qiziqishlaringiz haqida gapirib bering...",
        submit: "So'rov yuborish",
      },
    },
    en: {
      hero: {
        badge: "Investment Opportunity",
        title: "Invest in the future",
        titleHighlight: "of urban transport",
        description:
          "EcoMobile is revolutionizing the commercial transport market with CATL's fast battery swapping technology. Join us on the path to creating an environmentally clean and economically efficient future.",
        downloadBtn: "Download Presentation",
        meetingBtn: "Request Meeting",
      },
      market: {
        title: "Market Opportunity",
        subtitle: "Huge growth potential in the commercial electric transport segment",
        marketSize: "Commercial electric transport market volume by 2030",
        growth: "Annual growth of electric commercial vehicle market",
        swapTime: "Battery swap time - key competitive advantage",
        savings: "Operational cost savings compared to ICE",
      },
      business: {
        title: "Business Model",
        subtitle: "Multi-level monetization model with high margins",
        sales: {
          title: "Vehicle Sales",
          description: "Direct sales of electric vehicles to B2B clients with high margins",
          margin: "Margin:",
          cycle: "Sales cycle:",
        },
        stations: {
          title: "Swap Station Network",
          description: "Development of fast battery swap station network through franchise model",
          revenue: "Revenue per swap:",
          franchise: "Franchise fee:",
        },
        subscription: {
          title: "Subscription Model",
          description: "Monthly payments for service, software and telematics",
          monthly: "Monthly:",
          ltv: "LTV:",
        },
      },
      technology: {
        title: "Technology Advantage",
        titleHighlight: "CATL",
        subtitle: "Partnership with the world leader in battery technologies",
        fastSwap: {
          title: "Fast Swap",
          description: "EVOGO technology allows battery replacement in 1 minute, faster than refueling a regular car",
        },
        modular: {
          title: "Modularity",
          description: "System of 2 removable batteries provides flexibility and reliability of power supply",
        },
        scalable: {
          title: "Scalability",
          description: "Proven technology with the ability to scale rapidly worldwide",
        },
        badge: "Technology of the future",
      },
      expansion: {
        title: "Development Plan",
        subtitle: "Phased scaling with focus on key markets",
        phase1: {
          title: "Phase 1: Uzbekistan",
          description: "Launch production and create the first 50 battery swap stations in Tashkent and major cities",
          salesTarget: "Sales target",
          stations: "Stations",
          revenue: "Revenue",
        },
        phase2: {
          title: "Phase 2: Central Asia",
          description: "Expansion to Kazakhstan, Kyrgyzstan and Tajikistan with adaptation to local conditions",
        },
        phase3: {
          title: "Phase 3: Global Expansion",
          description: "Entry into European, Middle Eastern and Southeast Asian markets",
        },
      },
      investment: {
        title: "Investment Terms",
        subtitle: "Attractive terms for strategic investors",
        roundA: "Round A",
        funding: "Funding amount:",
        valuation: "Company valuation:",
        equity: "Investor share:",
        useOfFunds: "Use of funds:",
        production: "Production and R&D",
        network: "Station network development",
        marketing: "Marketing and sales",
        operations: "Operating expenses",
        keyMetrics: "Key metrics",
        roiForecast: "ROI forecast",
        payback: "Payback period",
        exitStrategy: "Exit strategy",
      },
      cta: {
        title: "Ready to invest in the future?",
        subtitle: "Join the urban transport revolution today",
        button: "Request Meeting",
      },
      modal: {
        title: "Meeting Request",
        description: "We will contact you to schedule a meeting",
        name: "Name",
        email: "Email",
        company: "Company",
        message: "Message",
        placeholder: "Tell us about your investment interests...",
        submit: "Send Request",
      },
    },
  }

  const t = translations[language as keyof typeof translations] || translations.ru

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-6">{t.hero.badge}</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t.hero.title}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                {t.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">{t.hero.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                <Download className="mr-2 w-5 h-5" />
                {t.hero.downloadBtn}
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                {t.hero.meetingBtn}
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.market.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.market.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-blue-600">$180B</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.market.marketSize}</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-green-600">25%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.market.growth}</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Battery className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-purple-600">1 мин</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.market.swapTime}</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-orange-600">75%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.market.savings}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.business.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.business.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{t.business.sales.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{t.business.sales.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.business.sales.margin}</span>
                    <span className="font-semibold text-green-600">25-30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.business.sales.cycle}</span>
                    <span className="font-semibold">3-6 месяцев</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4">
                  <Battery className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{t.business.stations.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{t.business.stations.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.business.stations.revenue}</span>
                    <span className="font-semibold text-green-600">$15-25</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.business.stations.franchise}</span>
                    <span className="font-semibold">$50K-100K</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{t.business.subscription.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{t.business.subscription.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.business.subscription.monthly}</span>
                    <span className="font-semibold text-green-600">$200-500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.business.subscription.ltv}</span>
                    <span className="font-semibold">$15K-30K</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Advantage */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {t.technology.title}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                {" "}
                {t.technology.titleHighlight}
              </span>
            </h2>
            <p className="text-xl text-blue-100">{t.technology.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t.technology.fastSwap.title}</h3>
                  <p className="text-blue-100">{t.technology.fastSwap.description}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Battery className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t.technology.modular.title}</h3>
                  <p className="text-blue-100">{t.technology.modular.description}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t.technology.scalable.title}</h3>
                  <p className="text-blue-100">{t.technology.scalable.description}</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Battery className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">CATL EVOGO</h3>
                  <p className="text-blue-200">{t.technology.badge}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expansion Plan */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.expansion.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.expansion.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold text-xl">1</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{t.expansion.phase1.title}</h3>
                    <Badge className="bg-green-100 text-green-800">2024-2025</Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{t.expansion.phase1.description}</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-900">{t.expansion.phase1.salesTarget}</div>
                      <div className="text-2xl font-bold text-green-600">500 авто</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-900">{t.expansion.phase1.stations}</div>
                      <div className="text-2xl font-bold text-blue-600">50</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-900">{t.expansion.phase1.revenue}</div>
                      <div className="text-2xl font-bold text-purple-600">$15M</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-xl">2</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{t.expansion.phase2.title}</h3>
                    <Badge className="bg-blue-100 text-blue-800">2025-2026</Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{t.expansion.phase2.description}</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-900">{t.expansion.phase1.salesTarget}</div>
                      <div className="text-2xl font-bold text-green-600">2,000 авто</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-900">{t.expansion.phase1.stations}</div>
                      <div className="text-2xl font-bold text-blue-600">200</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-900">{t.expansion.phase1.revenue}</div>
                      <div className="text-2xl font-bold text-purple-600">$60M</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold text-xl">3</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{t.expansion.phase3.title}</h3>
                    <Badge className="bg-purple-100 text-purple-800">2026+</Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{t.expansion.phase3.description}</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-900">{t.expansion.phase1.salesTarget}</div>
                      <div className="text-2xl font-bold text-green-600">10,000+ авто</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-900">{t.expansion.phase1.stations}</div>
                      <div className="text-2xl font-bold text-blue-600">1,000+</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-900">{t.expansion.phase1.revenue}</div>
                      <div className="text-2xl font-bold text-purple-600">$300M+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Terms */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.investment.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.investment.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.investment.roundA}</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">{t.investment.funding}</span>
                          <span className="text-2xl font-bold text-green-600">$5M - $10M</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">{t.investment.valuation}</span>
                          <span className="text-xl font-bold text-blue-600">$25M - $35M</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">{t.investment.equity}</span>
                          <span className="text-xl font-bold text-purple-600">20% - 30%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">{t.investment.useOfFunds}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.investment.production}</span>
                          <span className="font-medium">40%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.investment.network}</span>
                          <span className="font-medium">30%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.investment.marketing}</span>
                          <span className="font-medium">20%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.investment.operations}</span>
                          <span className="font-medium">10%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">{t.investment.keyMetrics}</h4>
                      <div className="space-y-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">{t.investment.roiForecast}</div>
                          <div className="text-2xl font-bold text-green-700">5-10x</div>
                          <div className="text-sm text-green-600">за 5-7 лет</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">{t.investment.payback}</div>
                          <div className="text-2xl font-bold text-blue-700">3-4 года</div>
                          <div className="text-sm text-blue-600">при текущих планах</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="text-sm text-purple-600 font-medium">{t.investment.exitStrategy}</div>
                          <div className="text-lg font-bold text-purple-700">IPO / M&A</div>
                          <div className="text-sm text-purple-600">2028-2030</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">{t.cta.title}</h2>
            <p className="text-xl text-blue-100 mb-8">{t.cta.subtitle}</p>
            <div className="flex justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                    {t.cta.button}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{t.modal.title}</DialogTitle>
                    <DialogDescription>{t.modal.description}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="meeting-name">{t.modal.name}</Label>
                      <Input id="meeting-name" placeholder="Ваше имя" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meeting-email">{t.modal.email}</Label>
                      <Input id="meeting-email" type="email" placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meeting-company">{t.modal.company}</Label>
                      <Input id="meeting-company" placeholder="Название компании" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meeting-message">{t.modal.message}</Label>
                      <Textarea id="meeting-message" placeholder={t.modal.placeholder} />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">{t.modal.submit}</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
