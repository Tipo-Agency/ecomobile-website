"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Leaf,
  DollarSign,
  Shield,
  Clock,
  Zap,
  Wind,
  TreePine,
  Heart,
  Truck,
  Calculator,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"

export default function AdvantagesPage() {
  const { language } = useLanguage()
  const [activeAdvantage, setActiveAdvantage] = useState(0)
  const [co2Saved, setCo2Saved] = useState(0)
  const [moneySaved, setMoneySaved] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  const translations = {
    ru: {
      hero: {
        badge: "Преимущества EcoMobile",
        title: "Почему EcoMobile —",
        titleHighlight: "лучший выбор",
        description: "Революционные преимущества, которые делают EcoMobile идеальным решением для современного бизнеса",
        startCalculation: "Начать расчет",
        viewComparison: "Сравнить с конкурентами",
      },
      environmental: {
        title: "Экологические преимущества",
        subtitle: "Забота о планете и будущих поколениях",
        co2Reduction: "Сокращение CO2",
        airQuality: "Качество воздуха",
        noiseReduction: "Снижение шума",
        renewableEnergy: "Возобновляемая энергия",
        co2SavedTitle: "CO2 сэкономлено",
        co2SavedSubtitle: "тонн в год одним автомобилем",
        benefits: [
          "Нулевые выбросы в атмосферу",
          "Снижение городского смога",
          "Уменьшение шумового загрязнения",
          "Поддержка чистого воздуха",
        ],
      },
      economic: {
        title: "Экономические преимущества",
        subtitle: "Значительная экономия и быстрая окупаемость",
        fuelSavings: "Экономия топлива",
        maintenance: "Обслуживание",
        efficiency: "Эффективность",
        roi: "Окупаемость",
        monthlySavings: "Ежемесячная экономия",
        savingsSubtitle: "по сравнению с ДВС",
        benefits: [
          "75% экономии на топливе",
          "50% меньше затрат на обслуживание",
          "Налоговые льготы",
          "Стабильные цены на электричество",
        ],
      },
      operational: {
        title: "Операционные преимущества",
        subtitle: "Максимальная эффективность бизнес-процессов",
        uptime: "Время работы",
        swapSpeed: "Скорость замены",
        reliability: "Надежность",
        monitoring: "Мониторинг",
        benefits: [
          "99.5% времени работы",
          "Замена батареи за 1 минуту",
          "Предиктивное обслуживание",
          "Удаленный мониторинг",
        ],
      },
      social: {
        title: "Социальные преимущества",
        subtitle: "Положительное влияние на общество",
        healthImpact: "Здоровье",
        jobCreation: "Рабочие места",
        innovation: "Инновации",
        reputation: "Репутация",
        benefits: [
          "Улучшение здоровья населения",
          "Создание новых рабочих мест",
          "Технологическое лидерство",
          "Положительный имидж компании",
        ],
      },
      comparison: {
        title: "Сравнение с традиционным транспортом",
        subtitle: "Наглядное преимущество EcoMobile",
        traditional: "Традиционный ДВС",
        ecomobile: "EcoMobile",
        categories: {
          fuel: "Топливо/Энергия",
          emissions: "Выбросы CO2",
          maintenance: "Обслуживание",
          noise: "Уровень шума",
          efficiency: "Эффективность",
        },
      },
      calculator: {
        title: "Калькулятор преимуществ",
        subtitle: "Рассчитайте свою выгоду от перехода на EcoMobile",
        parameters: "Параметры расчета",
        results: "Результаты",
        dailyDistance: "Ежедневный пробег",
        vehicleCount: "Количество автомобилей",
        fuelPrice: "Цена топлива",
        workingDays: "Рабочих дней в году",
        annualSavings: "Годовая экономия",
        co2Reduction: "Сокращение CO2",
        paybackPeriod: "Срок окупаемости",
      },
    },
    uz: {
      hero: {
        badge: "EcoMobile afzalliklari",
        title: "Nega EcoMobile —",
        titleHighlight: "eng yaxshi tanlov",
        description: "Zamonaviy biznes uchun EcoMobile'ni ideal yechim qiladigan inqilobiy afzalliklar",
        startCalculation: "Hisoblashni boshlash",
        viewComparison: "Raqobatchilar bilan solishtirish",
      },
      environmental: {
        title: "Ekologik afzalliklar",
        subtitle: "Sayyora va kelajak avlodlar haqida g'amxo'rlik",
        co2Reduction: "CO2 ni kamaytirish",
        airQuality: "Havo sifati",
        noiseReduction: "Shovqinni kamaytirish",
        renewableEnergy: "Qayta tiklanadigan energiya",
        co2SavedTitle: "CO2 tejaldi",
        co2SavedSubtitle: "yiliga bitta avtomobil uchun tonna",
        benefits: [
          "Atmosferaga nol chiqindi",
          "Shahar tutunini kamaytirish",
          "Shovqin ifloslanishini kamaytirish",
          "Toza havoni qo'llab-quvvatlash",
        ],
      },
      economic: {
        title: "Iqtisodiy afzalliklar",
        subtitle: "Sezilarli tejash va tez o'zini oqlash",
        fuelSavings: "Yoqilg'i tejash",
        maintenance: "Xizmat ko'rsatish",
        efficiency: "Samaradorlik",
        roi: "O'zini oqlash",
        monthlySavings: "Oylik tejash",
        savingsSubtitle: "ICE bilan solishtirganda",
        benefits: [
          "Yoqilg'ida 75% tejash",
          "Xizmat ko'rsatishda 50% kam xarajat",
          "Soliq imtiyozlari",
          "Elektr energiyasining barqaror narxlari",
        ],
      },
      operational: {
        title: "Operatsion afzalliklar",
        subtitle: "Biznes jarayonlarining maksimal samaradorligi",
        uptime: "Ish vaqti",
        swapSpeed: "Almashtirish tezligi",
        reliability: "Ishonchlilik",
        monitoring: "Monitoring",
        benefits: [
          "99.5% ish vaqti",
          "1 daqiqada batareya almashtirish",
          "Bashoratli xizmat ko'rsatish",
          "Masofaviy monitoring",
        ],
      },
      social: {
        title: "Ijtimoiy afzalliklar",
        subtitle: "Jamiyatga ijobiy ta'sir",
        healthImpact: "Salomatlik",
        jobCreation: "Ish o'rinlari",
        innovation: "Innovatsiyalar",
        reputation: "Obro'",
        benefits: [
          "Aholi salomatligini yaxshilash",
          "Yangi ish o'rinlarini yaratish",
          "Texnologik etakchilik",
          "Kompaniyaning ijobiy imidzhi",
        ],
      },
      comparison: {
        title: "An'anaviy transport bilan solishtirish",
        subtitle: "EcoMobile'ning aniq ustunligi",
        traditional: "An'anaviy ICE",
        ecomobile: "EcoMobile",
        categories: {
          fuel: "Yoqilg'i/Energiya",
          emissions: "CO2 chiqindilari",
          maintenance: "Xizmat ko'rsatish",
          noise: "Shovqin darajasi",
          efficiency: "Samaradorlik",
        },
      },
      calculator: {
        title: "Afzalliklar kalkulyatori",
        subtitle: "EcoMobile'ga o'tishdan foydangizni hisoblang",
        parameters: "Hisoblash parametrlari",
        results: "Natijalar",
        dailyDistance: "Kunlik masofa",
        vehicleCount: "Avtomobillar soni",
        fuelPrice: "Yoqilg'i narxi",
        workingDays: "Yiliga ish kunlari",
        annualSavings: "Yillik tejash",
        co2Reduction: "CO2 kamayishi",
        paybackPeriod: "O'zini oqlash muddati",
      },
    },
    en: {
      hero: {
        badge: "EcoMobile Advantages",
        title: "Why EcoMobile is",
        titleHighlight: "the best choice",
        description: "Revolutionary advantages that make EcoMobile the ideal solution for modern business",
        startCalculation: "Start Calculation",
        viewComparison: "Compare with Competitors",
      },
      environmental: {
        title: "Environmental Advantages",
        subtitle: "Care for the planet and future generations",
        co2Reduction: "CO2 Reduction",
        airQuality: "Air Quality",
        noiseReduction: "Noise Reduction",
        renewableEnergy: "Renewable Energy",
        co2SavedTitle: "CO2 Saved",
        co2SavedSubtitle: "tons per year per vehicle",
        benefits: [
          "Zero atmospheric emissions",
          "Reduced urban smog",
          "Decreased noise pollution",
          "Clean air support",
        ],
      },
      economic: {
        title: "Economic Advantages",
        subtitle: "Significant savings and fast payback",
        fuelSavings: "Fuel Savings",
        maintenance: "Maintenance",
        efficiency: "Efficiency",
        roi: "ROI",
        monthlySavings: "Monthly Savings",
        savingsSubtitle: "compared to ICE",
        benefits: ["75% fuel savings", "50% lower maintenance costs", "Tax benefits", "Stable electricity prices"],
      },
      operational: {
        title: "Operational Advantages",
        subtitle: "Maximum efficiency of business processes",
        uptime: "Uptime",
        swapSpeed: "Swap Speed",
        reliability: "Reliability",
        monitoring: "Monitoring",
        benefits: ["99.5% uptime", "1-minute battery swap", "Predictive maintenance", "Remote monitoring"],
      },
      social: {
        title: "Social Advantages",
        subtitle: "Positive impact on society",
        healthImpact: "Health",
        jobCreation: "Job Creation",
        innovation: "Innovation",
        reputation: "Reputation",
        benefits: ["Improved public health", "New job creation", "Technology leadership", "Positive company image"],
      },
      comparison: {
        title: "Comparison with Traditional Transport",
        subtitle: "Clear advantage of EcoMobile",
        traditional: "Traditional ICE",
        ecomobile: "EcoMobile",
        categories: {
          fuel: "Fuel/Energy",
          emissions: "CO2 Emissions",
          maintenance: "Maintenance",
          noise: "Noise Level",
          efficiency: "Efficiency",
        },
      },
      calculator: {
        title: "Advantages Calculator",
        subtitle: "Calculate your benefits from switching to EcoMobile",
        parameters: "Calculation Parameters",
        results: "Results",
        dailyDistance: "Daily Distance",
        vehicleCount: "Vehicle Count",
        fuelPrice: "Fuel Price",
        workingDays: "Working Days per Year",
        annualSavings: "Annual Savings",
        co2Reduction: "CO2 Reduction",
        paybackPeriod: "Payback Period",
      },
    },
  }

  const t = translations[language as keyof typeof translations] || translations.ru

  const advantages = [
    {
      title: t.environmental.title,
      subtitle: t.environmental.subtitle,
      icon: Leaf,
      color: "green",
      benefits: t.environmental.benefits,
    },
    {
      title: t.economic.title,
      subtitle: t.economic.subtitle,
      icon: DollarSign,
      color: "blue",
      benefits: t.economic.benefits,
    },
    {
      title: t.operational.title,
      subtitle: t.operational.subtitle,
      icon: Zap,
      color: "purple",
      benefits: t.operational.benefits,
    },
    {
      title: t.social.title,
      subtitle: t.social.subtitle,
      icon: Heart,
      color: "pink",
      benefits: t.social.benefits,
    },
  ]

  useEffect(() => {
    if (!isAnimating) return

    const interval = setInterval(() => {
      setActiveAdvantage((prev) => (prev + 1) % advantages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isAnimating, advantages.length])

  useEffect(() => {
    const co2Interval = setInterval(() => {
      setCo2Saved((prev) => (prev < 4.2 ? prev + 0.1 : 4.2))
    }, 100)

    const moneyInterval = setInterval(() => {
      setMoneySaved((prev) => (prev < 2160 ? prev + 50 : 2160))
    }, 50)

    return () => {
      clearInterval(co2Interval)
      clearInterval(moneyInterval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-lg px-6 py-3 mb-8">
                {t.hero.badge}
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
                {t.hero.title}
                <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  {t.hero.titleHighlight}
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12">{t.hero.description}</p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg"
                >
                  <Calculator className="mr-2 w-5 h-5" />
                  {t.hero.startCalculation}
                </Button>
              </div>
            </div>

            {/* Live Statistics */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="border-0 shadow-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <CardContent className="p-8 relative">
                  <div className="flex items-center justify-between mb-4">
                    <TreePine className="w-12 h-12 text-white/80" />
                    <div className="text-right">
                      <div className="text-4xl font-bold">{co2Saved.toFixed(1)}</div>
                      <div className="text-green-100">{t.environmental.co2SavedTitle}</div>
                    </div>
                  </div>
                  <div className="text-green-100">{t.environmental.co2SavedSubtitle}</div>
                  <Progress value={(co2Saved / 4.2) * 100} className="mt-4 h-2" />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <CardContent className="p-8 relative">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="w-12 h-12 text-white/80" />
                    <div className="text-right">
                      <div className="text-4xl font-bold">${moneySaved}</div>
                      <div className="text-blue-100">{t.economic.monthlySavings}</div>
                    </div>
                  </div>
                  <div className="text-blue-100">{t.economic.savingsSubtitle}</div>
                  <Progress value={(moneySaved / 2160) * 100} className="mt-4 h-2" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Advantages */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
                  {advantages.map((advantage, index) => {
                    const Icon = advantage.icon
                    const isActive = index === activeAdvantage

                    return (
                      <button
                        key={index}
                        onClick={() => setActiveAdvantage(index)}
                        className={`w-full text-left p-6 rounded-2xl transition-all duration-500 ${
                          isActive
                            ? "bg-gradient-to-r from-white/20 to-white/10 border border-white/30 scale-105"
                            : "bg-white/5 border border-white/10 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                              isActive ? `bg-${advantage.color}-500 animate-pulse` : "bg-white/10"
                            }`}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2">{advantage.title}</h3>
                            <p className="text-white/70">{advantage.subtitle}</p>
                          </div>
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
                        className={`w-24 h-24 bg-${advantages[activeAdvantage].color}-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce`}
                      >
                        {(() => {
                          const Icon = advantages[activeAdvantage].icon
                          return <Icon className="w-12 h-12 text-white" />
                        })()}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{advantages[activeAdvantage].title}</h3>
                      <p className="text-white/80 mb-6">{advantages[activeAdvantage].subtitle}</p>
                    </div>

                    <div className="space-y-4">
                      {advantages[activeAdvantage].benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3 text-white/90">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span>{benefit}</span>
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

      {/* Comparison Chart */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t.comparison.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.comparison.subtitle}</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8">
              {[
                {
                  category: t.comparison.categories.fuel,
                  traditional: { value: "$240/мес", trend: "up", color: "red" },
                  ecomobile: { value: "$60/мес", trend: "down", color: "green" },
                  icon: Truck,
                },
                {
                  category: t.comparison.categories.emissions,
                  traditional: { value: "4.2т CO2/год", trend: "up", color: "red" },
                  ecomobile: { value: "0т CO2/год", trend: "neutral", color: "green" },
                  icon: Leaf,
                },
                {
                  category: t.comparison.categories.maintenance,
                  traditional: { value: "$150/мес", trend: "up", color: "red" },
                  ecomobile: { value: "$75/мес", trend: "down", color: "green" },
                  icon: Shield,
                },
                {
                  category: t.comparison.categories.noise,
                  traditional: { value: "70 дБ", trend: "up", color: "red" },
                  ecomobile: { value: "45 дБ", trend: "down", color: "green" },
                  icon: Wind,
                },
                {
                  category: t.comparison.categories.efficiency,
                  traditional: { value: "25%", trend: "down", color: "red" },
                  ecomobile: { value: "95%", trend: "up", color: "green" },
                  icon: Zap,
                },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="grid md:grid-cols-3 gap-8 items-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Icon className="w-8 h-8 text-gray-600" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900">{item.category}</h3>
                        </div>

                        <div className="text-center">
                          <div className="text-sm text-gray-500 mb-2">{t.comparison.traditional}</div>
                          <div className="text-2xl font-bold text-red-600 mb-2">{item.traditional.value}</div>
                          <div className="flex items-center justify-center">
                            {item.traditional.trend === "up" && <ArrowUp className="w-4 h-4 text-red-500" />}
                            {item.traditional.trend === "down" && <ArrowDown className="w-4 h-4 text-red-500" />}
                            {item.traditional.trend === "neutral" && <Minus className="w-4 h-4 text-gray-500" />}
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="text-sm text-gray-500 mb-2">{t.comparison.ecomobile}</div>
                          <div className="text-2xl font-bold text-green-600 mb-2">{item.ecomobile.value}</div>
                          <div className="flex items-center justify-center">
                            {item.ecomobile.trend === "up" && <ArrowUp className="w-4 h-4 text-green-500" />}
                            {item.ecomobile.trend === "down" && <ArrowDown className="w-4 h-4 text-green-500" />}
                            {item.ecomobile.trend === "neutral" && <Minus className="w-4 h-4 text-green-500" />}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Calculator */}
      <section
        id="calculator"
        className="py-24 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t.calculator.title}</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">{t.calculator.subtitle}</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-8">{t.calculator.parameters}</h3>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-white font-medium">{t.calculator.dailyDistance}: 150 км</label>
                      <input
                        type="range"
                        min="50"
                        max="300"
                        defaultValue="150"
                        className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-white font-medium">{t.calculator.vehicleCount}: 5</label>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        defaultValue="5"
                        className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-white font-medium">{t.calculator.fuelPrice}: $1.5/л</label>
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        defaultValue="1.5"
                        className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-white font-medium">{t.calculator.workingDays}: 250</label>
                      <input
                        type="range"
                        min="200"
                        max="300"
                        defaultValue="250"
                        className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-0 shadow-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg border border-green-400/30">
                  <CardContent className="p-8 text-center">
                    <DollarSign className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-green-400 mb-2">$54,000</div>
                    <div className="text-green-200">{t.calculator.annualSavings}</div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border border-blue-400/30">
                  <CardContent className="p-8 text-center">
                    <TreePine className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-blue-400 mb-2">21 т</div>
                    <div className="text-blue-200">{t.calculator.co2Reduction}</div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-400/30">
                  <CardContent className="p-8 text-center">
                    <Clock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-purple-400 mb-2">18 мес</div>
                    <div className="text-purple-200">{t.calculator.paybackPeriod}</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
