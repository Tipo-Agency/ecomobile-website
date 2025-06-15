"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Truck,
  Package,
  Building,
  ShoppingCart,
  Wrench,
  Utensils,
  Heart,
  Clock,
  Target,
  CheckCircle,
  ArrowRight,
  Leaf,
  DollarSign,
  Shield,
  Star,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"

export default function ApplicationsPage() {
  const { language } = useLanguage()
  const [activeApplication, setActiveApplication] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const [selectedCase, setSelectedCase] = useState(0)

  const translations = {
    ru: {
      hero: {
        badge: "Применения EcoMobile",
        title: "Идеальное решение для",
        titleHighlight: "любого бизнеса",
        description:
          "От курьерских служб до муниципальных предприятий — EcoMobile адаптируется под потребности любой отрасли",
        exploreApplications: "Изучить применения",
        viewCaseStudies: "Кейсы клиентов",
      },
      applications: {
        delivery: {
          title: "Доставка и логистика",
          subtitle: "Быстро, экологично, экономично",
          description: "Идеальное решение для курьерских служб, доставки еды и интернет-магазинов",
          benefits: [
            "Снижение затрат на топливо на 75%",
            "Доступ в экологические зоны",
            "Быстрая замена батареи без простоев",
            "Улучшение имиджа компании",
          ],
          stats: {
            efficiency: "95%",
            savings: "75%",
            uptime: "99.5%",
          },
        },
        services: {
          title: "Сервисные службы",
          subtitle: "Надежность и профессионализм",
          description: "Клининг, ремонт, техническое обслуживание — всегда вовремя и без выбросов",
          benefits: [
            "Тихая работа в жилых зонах",
            "Надежность оборудования",
            "Предсказуемые расходы",
            "Экологическая ответственность",
          ],
          stats: {
            reliability: "99.9%",
            noise: "45 дБ",
            maintenance: "50%",
          },
        },
        trade: {
          title: "Мобильная торговля",
          subtitle: "Торговля без границ",
          description: "Развозная торговля, мобильные магазины и точки продаж",
          benefits: [
            "Больше остановок за день",
            "Привлечение эко-сознательных клиентов",
            "Снижение операционных расходов",
            "Гибкость маршрутов",
          ],
          stats: {
            range: "300 км",
            stops: "+40%",
            customers: "+25%",
          },
        },
        municipal: {
          title: "Муниципальные службы",
          subtitle: "Чистый город, чистое будущее",
          description: "ЖКХ, коммунальные и городские службы для устойчивого развития",
          benefits: [
            "Соответствие экологическим стандартам",
            "Снижение городского смога",
            "Экономия бюджетных средств",
            "Пример для граждан",
          ],
          stats: {
            emissions: "0 г CO2",
            budget: "60%",
            air: "+30%",
          },
        },
      },
      caseStudies: {
        title: "Истории успеха",
        subtitle: "Реальные результаты наших клиентов",
        case1: {
          company: "FastDelivery",
          industry: "Доставка еды",
          challenge: "Высокие затраты на топливо и ограничения в центре города",
          solution: "Замена 20 автомобилей на EcoMobile",
          results: [
            "Экономия $8,000/месяц на топливе",
            "Увеличение заказов на 30%",
            "Доступ ко всем зонам города",
            "Улучшение рейтинга компании",
          ],
        },
        case2: {
          company: "CleanService Pro",
          industry: "Клининговые услуги",
          challenge: "Жалобы на шум и выхлопы в жилых районах",
          solution: "Переход на электрический парк EcoMobile",
          results: [
            "Снижение жалоб на 95%",
            "Рост клиентской базы на 40%",
            "Сокращение расходов на 50%",
            "Получение эко-сертификации",
          ],
        },
        case3: {
          company: "CityMart Mobile",
          industry: "Мобильная торговля",
          challenge: "Ограниченный радиус действия и высокие расходы",
          solution: "Внедрение технологии быстрой замены батарей",
          results: [
            "Увеличение маршрута в 2 раза",
            "Рост продаж на 60%",
            "Экономия времени на заправках",
            "Привлечение новых клиентов",
          ],
        },
      },
      industries: {
        title: "Отрасли применения",
        subtitle: "EcoMobile работает в любой сфере",
        list: [
          { name: "Курьерские службы", growth: "+45%", icon: Package },
          { name: "Доставка еды", growth: "+60%", icon: Utensils },
          { name: "Интернет-торговля", growth: "+35%", icon: ShoppingCart },
          { name: "Клининг", growth: "+40%", icon: Wrench },
          { name: "Медицинские услуги", growth: "+25%", icon: Heart },
          { name: "Муниципальные службы", growth: "+30%", icon: Building },
        ],
      },
      benefits: {
        title: "Преимущества для каждой отрасли",
        universal: "Универсальные преимущества",
        specific: "Специфические преимущества",
        universalList: [
          "Снижение операционных расходов",
          "Экологическая ответственность",
          "Надежность и долговечность",
          "Современные технологии",
        ],
      },
      roi: {
        title: "Окупаемость по отраслям",
        subtitle: "Быстрая окупаемость в любой сфере",
        delivery: "12-18 месяцев",
        services: "15-20 месяцев",
        trade: "10-15 месяцев",
        municipal: "18-24 месяцев",
      },
    },
    uz: {
      hero: {
        badge: "EcoMobile qo'llanilishi",
        title: "Har qanday biznes uchun",
        titleHighlight: "ideal yechim",
        description:
          "Kuryer xizmatlaridan tortib munitsipal korxonalargacha — EcoMobile har qanday soha ehtiyojlariga moslashadi",
        exploreApplications: "Qo'llanishlarni o'rganish",
        viewCaseStudies: "Mijozlar keyslar",
      },
      applications: {
        delivery: {
          title: "Yetkazib berish va logistika",
          subtitle: "Tez, ekologik, tejamkor",
          description: "Kuryer xizmatlari, ovqat yetkazib berish va internet-do'konlar uchun ideal yechim",
          benefits: [
            "Yoqilg'i xarajatlarini 75% kamaytirish",
            "Ekologik zonalarga kirish",
            "To'xtamasdan batareyani tez almashtirish",
            "Kompaniya imidjini yaxshilash",
          ],
          stats: {
            efficiency: "95%",
            savings: "75%",
            uptime: "99.5%",
          },
        },
        services: {
          title: "Xizmat ko'rsatish xizmatlari",
          subtitle: "Ishonchlilik va professionallik",
          description: "Tozalash, ta'mirlash, texnik xizmat — har doim vaqtida va chiqindisiz",
          benefits: [
            "Turar-joy zonalarida jim ish",
            "Uskunaning ishonchliligi",
            "Bashorat qilinadigan xarajatlar",
            "Ekologik mas'uliyat",
          ],
          stats: {
            reliability: "99.9%",
            noise: "45 dB",
            maintenance: "50%",
          },
        },
        trade: {
          title: "Mobil savdo",
          subtitle: "Chegarasiz savdo",
          description: "Uyma-uy savdo, mobil do'konlar va sotuv nuqtalari",
          benefits: [
            "Kun davomida ko'proq to'xtashlar",
            "Eko-ongli mijozlarni jalb qilish",
            "Operatsion xarajatlarni kamaytirish",
            "Marshrutlarning moslashuvchanligi",
          ],
          stats: {
            range: "300 km",
            stops: "+40%",
            customers: "+25%",
          },
        },
        municipal: {
          title: "Munitsipal xizmatlar",
          subtitle: "Toza shahar, toza kelajak",
          description: "Kommunal xizmatlar va shahar xizmatlari barqaror rivojlanish uchun",
          benefits: [
            "Ekologik standartlarga muvofiqlik",
            "Shahar tutunini kamaytirish",
            "Byudjet mablag'larini tejash",
            "Fuqarolar uchun namuna",
          ],
          stats: {
            emissions: "0 g CO2",
            budget: "60%",
            air: "+30%",
          },
        },
      },
      caseStudies: {
        title: "Muvaffaqiyat tarixlari",
        subtitle: "Mijozlarimizning haqiqiy natijalari",
        case1: {
          company: "FastDelivery",
          industry: "Ovqat yetkazib berish",
          challenge: "Yoqilg'iga yuqori xarajatlar va shahar markazidagi cheklovlar",
          solution: "20 ta avtomobilni EcoMobile bilan almashtirish",
          results: [
            "Yoqilg'ida oyiga $8,000 tejash",
            "Buyurtmalarni 30% oshirish",
            "Shaharning barcha zonalariga kirish",
            "Kompaniya reytingini yaxshilash",
          ],
        },
        case2: {
          company: "CleanService Pro",
          industry: "Tozalash xizmatlari",
          challenge: "Turar-joy hududlarida shovqin va chiqindilar haqida shikoyatlar",
          solution: "EcoMobile elektr parkiga o'tish",
          results: [
            "Shikoyatlarni 95% kamaytirish",
            "Mijozlar bazasini 40% oshirish",
            "Xarajatlarni 50% qisqartirish",
            "Eko-sertifikat olish",
          ],
        },
        case3: {
          company: "CityMart Mobile",
          industry: "Mobil savdo",
          challenge: "Cheklangan ta'sir radiusi va yuqori xarajatlar",
          solution: "Batareyalarni tez almashtirish texnologiyasini joriy etish",
          results: [
            "Marshrutni 2 baravar oshirish",
            "Sotuvni 60% oshirish",
            "Yoqilg'i quyishda vaqt tejash",
            "Yangi mijozlarni jalb qilish",
          ],
        },
      },
      industries: {
        title: "Qo'llaniladigan sohalar",
        subtitle: "EcoMobile har qanday sohada ishlaydi",
        list: [
          { name: "Kuryer xizmatlari", growth: "+45%", icon: Package },
          { name: "Ovqat yetkazib berish", growth: "+60%", icon: Utensils },
          { name: "Internet-savdo", growth: "+35%", icon: ShoppingCart },
          { name: "Tozalash", growth: "+40%", icon: Wrench },
          { name: "Tibbiy xizmatlar", growth: "+25%", icon: Heart },
          { name: "Munitsipal xizmatlar", growth: "+30%", icon: Building },
        ],
      },
      benefits: {
        title: "Har bir soha uchun afzalliklar",
        universal: "Universal afzalliklar",
        specific: "Maxsus afzalliklar",
        universalList: [
          "Operatsion xarajatlarni kamaytirish",
          "Ekologik mas'uliyat",
          "Ishonchlilik va chidamlilik",
          "Zamonaviy texnologiyalar",
        ],
      },
      roi: {
        title: "Sohalar bo'yicha o'zini oqlash",
        subtitle: "Har qanday sohada tez o'zini oqlash",
        delivery: "12-18 oy",
        services: "15-20 oy",
        trade: "10-15 oy",
        municipal: "18-24 oy",
      },
    },
    en: {
      hero: {
        badge: "EcoMobile Applications",
        title: "Perfect solution for",
        titleHighlight: "any business",
        description: "From courier services to municipal enterprises — EcoMobile adapts to the needs of any industry",
        exploreApplications: "Explore Applications",
        viewCaseStudies: "Client Case Studies",
      },
      applications: {
        delivery: {
          title: "Delivery and Logistics",
          subtitle: "Fast, eco-friendly, economical",
          description: "Perfect solution for courier services, food delivery and online stores",
          benefits: [
            "75% reduction in fuel costs",
            "Access to environmental zones",
            "Fast battery swap without downtime",
            "Improved company image",
          ],
          stats: {
            efficiency: "95%",
            savings: "75%",
            uptime: "99.5%",
          },
        },
        services: {
          title: "Service Companies",
          subtitle: "Reliability and professionalism",
          description: "Cleaning, repair, technical maintenance — always on time and emission-free",
          benefits: [
            "Quiet operation in residential areas",
            "Equipment reliability",
            "Predictable expenses",
            "Environmental responsibility",
          ],
          stats: {
            reliability: "99.9%",
            noise: "45 dB",
            maintenance: "50%",
          },
        },
        trade: {
          title: "Mobile Trade",
          subtitle: "Trade without borders",
          description: "Door-to-door sales, mobile stores and sales points",
          benefits: [
            "More stops per day",
            "Attracting eco-conscious customers",
            "Reduced operational costs",
            "Route flexibility",
          ],
          stats: {
            range: "300 km",
            stops: "+40%",
            customers: "+25%",
          },
        },
        municipal: {
          title: "Municipal Services",
          subtitle: "Clean city, clean future",
          description: "Utilities and city services for sustainable development",
          benefits: [
            "Compliance with environmental standards",
            "Reduced urban smog",
            "Budget savings",
            "Example for citizens",
          ],
          stats: {
            emissions: "0 g CO2",
            budget: "60%",
            air: "+30%",
          },
        },
      },
      caseStudies: {
        title: "Success Stories",
        subtitle: "Real results from our clients",
        case1: {
          company: "FastDelivery",
          industry: "Food delivery",
          challenge: "High fuel costs and restrictions in city center",
          solution: "Replacing 20 vehicles with EcoMobile",
          results: [
            "$8,000/month fuel savings",
            "30% increase in orders",
            "Access to all city zones",
            "Improved company rating",
          ],
        },
        case2: {
          company: "CleanService Pro",
          industry: "Cleaning services",
          challenge: "Noise and exhaust complaints in residential areas",
          solution: "Transition to EcoMobile electric fleet",
          results: [
            "95% reduction in complaints",
            "40% growth in client base",
            "50% cost reduction",
            "Eco-certification received",
          ],
        },
        case3: {
          company: "CityMart Mobile",
          industry: "Mobile trade",
          challenge: "Limited range and high expenses",
          solution: "Implementation of fast battery swap technology",
          results: ["2x route increase", "60% sales growth", "Time savings on refueling", "New customer attraction"],
        },
      },
      industries: {
        title: "Application Industries",
        subtitle: "EcoMobile works in any field",
        list: [
          { name: "Courier services", growth: "+45%", icon: Package },
          { name: "Food delivery", growth: "+60%", icon: Utensils },
          { name: "E-commerce", growth: "+35%", icon: ShoppingCart },
          { name: "Cleaning", growth: "+40%", icon: Wrench },
          { name: "Medical services", growth: "+25%", icon: Heart },
          { name: "Municipal services", growth: "+30%", icon: Building },
        ],
      },
      benefits: {
        title: "Benefits for Each Industry",
        universal: "Universal Benefits",
        specific: "Specific Benefits",
        universalList: [
          "Reduced operational costs",
          "Environmental responsibility",
          "Reliability and durability",
          "Modern technologies",
        ],
      },
      roi: {
        title: "ROI by Industry",
        subtitle: "Fast payback in any field",
        delivery: "12-18 months",
        services: "15-20 months",
        trade: "10-15 months",
        municipal: "18-24 months",
      },
    },
  }

  const t = translations[language as keyof typeof translations] || translations.ru

  const applications = [
    {
      title: t.applications.delivery.title,
      subtitle: t.applications.delivery.subtitle,
      description: t.applications.delivery.description,
      icon: Truck,
      color: "blue",
      benefits: t.applications.delivery.benefits,
      stats: t.applications.delivery.stats,
    },
    {
      title: t.applications.services.title,
      subtitle: t.applications.services.subtitle,
      description: t.applications.services.description,
      icon: Wrench,
      color: "green",
      benefits: t.applications.services.benefits,
      stats: t.applications.services.stats,
    },
    {
      title: t.applications.trade.title,
      subtitle: t.applications.trade.subtitle,
      description: t.applications.trade.description,
      icon: ShoppingCart,
      color: "purple",
      benefits: t.applications.trade.benefits,
      stats: t.applications.trade.stats,
    },
    {
      title: t.applications.municipal.title,
      subtitle: t.applications.municipal.subtitle,
      description: t.applications.municipal.description,
      icon: Building,
      color: "orange",
      benefits: t.applications.municipal.benefits,
      stats: t.applications.municipal.stats,
    },
  ]

  const caseStudies = [t.caseStudies.case1, t.caseStudies.case2, t.caseStudies.case3]

  useEffect(() => {
    if (!isAnimating) return

    const interval = setInterval(() => {
      setActiveApplication((prev) => (prev + 1) % applications.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAnimating, applications.length])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-lg px-6 py-3 mb-8">
                {t.hero.badge}
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
                {t.hero.title}
                <span className="bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  {t.hero.titleHighlight}
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12">{t.hero.description}</p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  onClick={() => document.getElementById("applications-demo")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg"
                >
                  <Target className="mr-2 w-5 h-5" />
                  {t.hero.exploreApplications}
                </Button>
              </div>
            </div>

            {/* Industry Stats */}
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              {t.industries.list.map((industry, index) => {
                const Icon = industry.icon
                return (
                  <Card
                    key={index}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-sm font-medium text-gray-900 mb-2">{industry.name}</div>
                      <div className="text-lg font-bold text-green-600">{industry.growth}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Applications */}
      <section
        id="applications-demo"
        className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex gap-4 mb-8">
                  <Button
                    onClick={() => setIsAnimating(!isAnimating)}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  >
                    {isAnimating ? "Пауза" : "Воспроизвести"}
                  </Button>
                </div>

                <div className="space-y-4">
                  {applications.map((app, index) => {
                    const Icon = app.icon
                    const isActive = index === activeApplication

                    return (
                      <button
                        key={index}
                        onClick={() => setActiveApplication(index)}
                        className={`w-full text-left p-6 rounded-2xl transition-all duration-500 ${
                          isActive
                            ? "bg-gradient-to-r from-white/20 to-white/10 border border-white/30 scale-105"
                            : "bg-white/5 border border-white/10 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                              isActive ? `bg-${app.color}-500 animate-pulse` : "bg-white/10"
                            }`}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-1">{app.title}</h3>
                            <p className="text-white/70 text-sm">{app.subtitle}</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-white/50" />
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="relative">
                <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-lg">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div
                        className={`w-24 h-24 bg-${applications[activeApplication].color}-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce`}
                      >
                        {(() => {
                          const Icon = applications[activeApplication].icon
                          return <Icon className="w-12 h-12 text-white" />
                        })()}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{applications[activeApplication].title}</h3>
                      <p className="text-white/80 mb-6">{applications[activeApplication].description}</p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {applications[activeApplication].benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3 text-white/90">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(applications[activeApplication].stats).map(([key, value], index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold text-white">{value}</div>
                          <div className="text-white/60 text-sm capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-green-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t.caseStudies.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.caseStudies.subtitle}</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="flex space-x-2">
                {caseStudies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCase(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      selectedCase === index ? "bg-blue-600 w-8" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <Card className="border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2">
                  <div className="p-12 bg-gradient-to-br from-blue-600 to-green-600 text-white">
                    <div className="space-y-6">
                      <div>
                        <Badge className="bg-white/20 text-white hover:bg-white/30 mb-4">
                          {caseStudies[selectedCase].industry}
                        </Badge>
                        <h3 className="text-3xl font-bold mb-4">{caseStudies[selectedCase].company}</h3>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-blue-100">
                          {language === "ru" && "Вызов:"}
                          {language === "uz" && "Muammo:"}
                          {language === "en" && "Challenge:"}
                        </h4>
                        <p className="text-white/90">{caseStudies[selectedCase].challenge}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-green-100">
                          {language === "ru" && "Решение:"}
                          {language === "uz" && "Yechim:"}
                          {language === "en" && "Solution:"}
                        </h4>
                        <p className="text-white/90">{caseStudies[selectedCase].solution}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-12">
                    <h4 className="text-2xl font-bold text-gray-900 mb-8">
                      {language === "ru" && "Результаты:"}
                      {language === "uz" && "Natijalar:"}
                      {language === "en" && "Results:"}
                    </h4>
                    <div className="space-y-6">
                      {caseStudies[selectedCase].results.map((result, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-gray-700 font-medium">{result}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-gray-600">
                          {language === "ru" && "Отличный результат"}
                          {language === "uz" && "Ajoyib natija"}
                          {language === "en" && "Excellent result"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ROI by Industry */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t.roi.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.roi.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t.applications.delivery.title, period: t.roi.delivery, icon: Truck, color: "blue" },
              { title: t.applications.services.title, period: t.roi.services, icon: Wrench, color: "green" },
              { title: t.applications.trade.title, period: t.roi.trade, icon: ShoppingCart, color: "purple" },
              { title: t.applications.municipal.title, period: t.roi.municipal, icon: Building, color: "orange" },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <Card
                  key={index}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 text-center"
                >
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 bg-${item.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6`}
                    >
                      <Icon className={`w-8 h-8 text-${item.color}-600`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{item.title}</h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">{item.period}</div>
                    <div className="text-gray-600">
                      {language === "ru" && "окупаемость"}
                      {language === "uz" && "o'zini oqlash"}
                      {language === "en" && "payback"}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Universal Benefits */}
      <section className="py-24 bg-gradient-to-r from-blue-900 via-green-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t.benefits.title}</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-8">{t.benefits.universal}</h3>
                  <div className="space-y-6">
                    {t.benefits.universalList.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-white font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: DollarSign,
                    value: "75%",
                    label: language === "ru" ? "экономия" : language === "uz" ? "tejash" : "savings",
                  },
                  { icon: Leaf, value: "0g", label: "CO2" },
                  {
                    icon: Clock,
                    value: "99.5%",
                    label: language === "ru" ? "время работы" : language === "uz" ? "ish vaqti" : "uptime",
                  },
                  {
                    icon: Shield,
                    value: "5",
                    label: language === "ru" ? "лет гарантии" : language === "uz" ? "yil kafolat" : "years warranty",
                  },
                ].map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <Card key={index} className="border-0 shadow-xl bg-white/10 backdrop-blur-lg text-center">
                      <CardContent className="p-6">
                        <Icon className="w-12 h-12 text-white mx-auto mb-4" />
                        <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                        <div className="text-white/70">{stat.label}</div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
