"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Battery,
  Zap,
  Cpu,
  Shield,
  Gauge,
  Wifi,
  Cloud,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  CheckCircle,
  Timer,
  Activity,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"

export default function TechnologyPage() {
  const { language } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const [batteryLevel, setBatteryLevel] = useState(20)
  const [swapProgress, setSwapProgress] = useState(0)
  const [isSwapping, setIsSwapping] = useState(false)

  const translations = {
    ru: {
      hero: {
        badge: "Технология CATL EVOGO",
        title: "Революционная технология",
        titleHighlight: "быстрой замены батарей",
        description:
          "Инновационная система CATL EVOGO позволяет заменить батарею за 1 минуту, обеспечивая непрерывную работу вашего бизнеса",
        watchDemo: "Смотреть демо",
        learnMore: "Подробнее",
      },
      swapProcess: {
        title: "Процесс замены батареи",
        subtitle: "Автоматизированная система замены за 60 секунд",
        step1: "Подъезд к станции",
        step2: "Автоматическое позиционирование",
        step3: "Извлечение разряженной батареи",
        step4: "Установка заряженной батареи",
        step5: "Готово к работе",
        startDemo: "Запустить демо",
        pauseDemo: "Пауза",
        resetDemo: "Сброс",
      },
      specifications: {
        title: "Технические характеристики",
        subtitle: "Передовые технологии в каждой детали",
        batteryCapacity: "Емкость батареи",
        swapTime: "Время замены",
        range: "Запас хода",
        efficiency: "Эффективность",
        warranty: "Гарантия",
        temperature: "Рабочая температура",
        charging: "Скорость зарядки",
        cycles: "Циклы зарядки",
      },
      features: {
        title: "Ключевые особенности",
        subtitle: "Технологии, которые делают EcoMobile уникальным",
        modular: {
          title: "Модульная система",
          description: "Две съемные батареи обеспечивают гибкость и надежность",
        },
        smart: {
          title: "Умное управление",
          description: "ИИ-система оптимизирует энергопотребление в реальном времени",
        },
        safety: {
          title: "Безопасность",
          description: "Многоуровневая система защиты от перегрева и короткого замыкания",
        },
        connectivity: {
          title: "Подключенность",
          description: "IoT-датчики для мониторинга состояния и предиктивного обслуживания",
        },
        fast: {
          title: "Быстрая зарядка",
          description: "Полная зарядка батареи за 30 минут на станции",
        },
        durable: {
          title: "Долговечность",
          description: "Более 3000 циклов зарядки без потери емкости",
        },
      },
      innovation: {
        title: "Инновации CATL",
        subtitle: "Партнерство с мировым лидером батарейных технологий",
        description:
          "CATL - крупнейший производитель литий-ионных батарей в мире, поставщик Tesla, BMW, Volkswagen и других ведущих автопроизводителей.",
        achievements: "Достижения CATL",
        patents: "Патентов",
        factories: "Заводов по всему миру",
        capacity: "ГВт·ч производственных мощностей",
        experience: "Лет опыта",
      },
    },
    uz: {
      hero: {
        badge: "CATL EVOGO texnologiyasi",
        title: "Inqilobiy texnologiya",
        titleHighlight: "batareyani tez almashtirish",
        description:
          "CATL EVOGO innovatsion tizimi batareyani 1 daqiqada almashtirish imkonini beradi va biznesingizning uzluksiz ishlashini ta'minlaydi",
        watchDemo: "Demo ko'rish",
        learnMore: "Batafsil",
      },
      swapProcess: {
        title: "Batareya almashtirish jarayoni",
        subtitle: "60 soniyada avtomatlashtirilgan almashtirish tizimi",
        step1: "Stantsiyaga yaqinlashish",
        step2: "Avtomatik joylashish",
        step3: "Zaryadlanmagan batareyani chiqarish",
        step4: "Zaryadlangan batareyani o'rnatish",
        step5: "Ishga tayyor",
        startDemo: "Demoni boshlash",
        pauseDemo: "Pauza",
        resetDemo: "Qayta boshlash",
      },
      specifications: {
        title: "Texnik xususiyatlar",
        subtitle: "Har bir detaldagi ilg'or texnologiyalar",
        batteryCapacity: "Batareya sig'imi",
        swapTime: "Almashtirish vaqti",
        range: "Masofa",
        efficiency: "Samaradorlik",
        warranty: "Kafolat",
        temperature: "Ish harorati",
        charging: "Quvvatlash tezligi",
        cycles: "Quvvatlash tsikllari",
      },
      features: {
        title: "Asosiy xususiyatlar",
        subtitle: "EcoMobile'ni noyob qiladigan texnologiyalar",
        modular: {
          title: "Modulli tizim",
          description: "Ikki olinadigan batareya moslashuvchanlik va ishonchlilikni ta'minlaydi",
        },
        smart: {
          title: "Aqlli boshqaruv",
          description: "AI tizimi real vaqtda energiya iste'molini optimallashtiradi",
        },
        safety: {
          title: "Xavfsizlik",
          description: "Qizib ketish va qisqa tutashuvdan ko'p darajali himoya tizimi",
        },
        connectivity: {
          title: "Ulanish",
          description: "Holat monitoring va bashoratli xizmat uchun IoT datchiklari",
        },
        fast: {
          title: "Tez quvvatlash",
          description: "Stantsiyada batareyani 30 daqiqada to'liq quvvatlash",
        },
        durable: {
          title: "Chidamlilik",
          description: "Sig'im yo'qotmasdan 3000 dan ortiq quvvatlash tsikli",
        },
      },
      innovation: {
        title: "CATL innovatsiyalari",
        subtitle: "Batareya texnologiyalari bo'yicha jahon lideri bilan hamkorlik",
        description:
          "CATL - dunyodagi eng yirik litiy-ion batareya ishlab chiqaruvchisi, Tesla, BMW, Volkswagen va boshqa yetakchi avtomobil ishlab chiqaruvchilarning yetkazib beruvchisi.",
        achievements: "CATL yutuqlari",
        patents: "Patentlar",
        factories: "Butun dunyo bo'ylab zavodlar",
        capacity: "GVt·soat ishlab chiqarish quvvati",
        experience: "Yillik tajriba",
      },
    },
    en: {
      hero: {
        badge: "CATL EVOGO Technology",
        title: "Revolutionary technology",
        titleHighlight: "of fast battery swapping",
        description:
          "Innovative CATL EVOGO system allows battery replacement in 1 minute, ensuring continuous operation of your business",
        watchDemo: "Watch Demo",
        learnMore: "Learn More",
      },
      swapProcess: {
        title: "Battery Swap Process",
        subtitle: "Automated replacement system in 60 seconds",
        step1: "Approach to station",
        step2: "Automatic positioning",
        step3: "Discharged battery removal",
        step4: "Charged battery installation",
        step5: "Ready to work",
        startDemo: "Start Demo",
        pauseDemo: "Pause",
        resetDemo: "Reset",
      },
      specifications: {
        title: "Technical Specifications",
        subtitle: "Advanced technologies in every detail",
        batteryCapacity: "Battery capacity",
        swapTime: "Swap time",
        range: "Range",
        efficiency: "Efficiency",
        warranty: "Warranty",
        temperature: "Operating temperature",
        charging: "Charging speed",
        cycles: "Charging cycles",
      },
      features: {
        title: "Key Features",
        subtitle: "Technologies that make EcoMobile unique",
        modular: {
          title: "Modular System",
          description: "Two removable batteries provide flexibility and reliability",
        },
        smart: {
          title: "Smart Management",
          description: "AI system optimizes energy consumption in real time",
        },
        safety: {
          title: "Safety",
          description: "Multi-level protection system from overheating and short circuit",
        },
        connectivity: {
          title: "Connectivity",
          description: "IoT sensors for condition monitoring and predictive maintenance",
        },
        fast: {
          title: "Fast Charging",
          description: "Full battery charge in 30 minutes at station",
        },
        durable: {
          title: "Durability",
          description: "More than 3000 charging cycles without capacity loss",
        },
      },
      innovation: {
        title: "CATL Innovations",
        subtitle: "Partnership with the world leader in battery technologies",
        description:
          "CATL is the world's largest lithium-ion battery manufacturer, supplier to Tesla, BMW, Volkswagen and other leading automakers.",
        achievements: "CATL Achievements",
        patents: "Patents",
        factories: "Factories worldwide",
        capacity: "GWh production capacity",
        experience: "Years of experience",
      },
    },
  }

  const t = translations[language as keyof typeof translations] || translations.ru

  const swapSteps = [
    { icon: ArrowRight, title: t.swapProcess.step1 },
    { icon: Gauge, title: t.swapProcess.step2 },
    { icon: Battery, title: t.swapProcess.step3 },
    { icon: Zap, title: t.swapProcess.step4 },
    { icon: CheckCircle, title: t.swapProcess.step5 },
  ]

  useEffect(() => {
    if (!isAnimating) return

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const nextStep = (prev + 1) % swapSteps.length

        // Синхронизируем с прогрессом замены батареи
        if (nextStep === 0) {
          // Начинаем новый цикл
          setSwapProgress(0)
          setBatteryLevel(20)
        } else {
          // Обновляем прогресс пропорционально шагу
          const progress = (nextStep / (swapSteps.length - 1)) * 100
          setSwapProgress(progress)

          // Обновляем уровень батареи
          if (nextStep >= 3) {
            // После установки заряженной батареи
            setBatteryLevel(20 + (progress - 60) * 2) // Плавно увеличиваем до 100%
          }
        }

        return nextStep
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isAnimating, swapSteps.length])

  const startSwapDemo = () => {
    setIsSwapping(true)
    setActiveStep(0)
    setSwapProgress(0)
    setBatteryLevel(20)

    // Запускаем быструю демонстрацию
    let step = 0
    const demoInterval = setInterval(() => {
      step++
      setActiveStep(step)
      setSwapProgress((step / (swapSteps.length - 1)) * 100)

      if (step >= 3) {
        setBatteryLevel(20 + ((step - 2) / 2) * 80)
      }

      if (step >= swapSteps.length - 1) {
        setBatteryLevel(100)
        setIsSwapping(false)
        clearInterval(demoInterval)
      }
    }, 800)
  }

  const resetDemo = () => {
    setSwapProgress(0)
    setBatteryLevel(20)
    setIsSwapping(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-lg px-4 py-2">{t.hero.badge}</Badge>
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  {t.hero.title}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                    {" "}
                    {t.hero.titleHighlight}
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">{t.hero.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => document.getElementById("swap-demo")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                >
                  <Play className="mr-2 w-5 h-5" />
                  {t.hero.watchDemo}
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce">
                      <Battery className="w-16 h-16 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">1 мин</div>
                    <div className="text-gray-600">
                      {language === "ru" && "Время замены"}
                      {language === "uz" && "Almashtirish vaqti"}
                      {language === "en" && "Swap time"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Swap Process Animation */}
      <section
        id="swap-demo"
        className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t.swapProcess.title}</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">{t.swapProcess.subtitle}</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex gap-4 mb-8">
                  <Button
                    onClick={() => setIsAnimating(!isAnimating)}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  >
                    {isAnimating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isAnimating ? t.swapProcess.pauseDemo : t.swapProcess.startDemo}
                  </Button>
                  <Button
                    onClick={() => setActiveStep(0)}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {t.swapProcess.resetDemo}
                  </Button>
                </div>

                <div className="space-y-6">
                  {swapSteps.map((step, index) => {
                    const Icon = step.icon
                    const isActive = index === activeStep
                    const isCompleted = index < activeStep

                    return (
                      <div
                        key={index}
                        className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                          isActive
                            ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 scale-105"
                            : isCompleted
                              ? "bg-green-500/10 border border-green-400/30"
                              : "bg-white/5 border border-white/10"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                            isActive
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"
                              : isCompleted
                                ? "bg-green-500"
                                : "bg-white/10"
                          }`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-semibold transition-colors duration-300 ${
                                isActive ? "text-white" : isCompleted ? "text-green-300" : "text-white/70"
                              }`}
                            >
                              {step.title}
                            </span>
                            <span className="text-white/50 text-sm">
                              {language === "ru" && `Шаг ${index + 1}`}
                              {language === "uz" && `${index + 1}-qadam`}
                              {language === "en" && `Step ${index + 1}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="relative">
                <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-lg">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {language === "ru" && "Интерактивная демонстрация"}
                        {language === "uz" && "Interaktiv namoyish"}
                        {language === "en" && "Interactive Demo"}
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-white/80">
                          <span>
                            {language === "ru" && "Уровень батареи:"}
                            {language === "uz" && "Batareya darajasi:"}
                            {language === "en" && "Battery level:"}
                          </span>
                          <span className="font-bold">{batteryLevel}%</span>
                        </div>
                        <Progress value={batteryLevel} className="h-3" />

                        {isSwapping && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-white/80">
                              <span>
                                {language === "ru" && "Прогресс замены:"}
                                {language === "uz" && "Almashtirish jarayoni:"}
                                {language === "en" && "Swap progress:"}
                              </span>
                              <span className="font-bold">{swapProgress}%</span>
                            </div>
                            <Progress value={swapProgress} className="h-3" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={startSwapDemo}
                        disabled={isSwapping}
                        className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        {language === "ru" && "Начать замену"}
                        {language === "uz" && "Almashtirishni boshlash"}
                        {language === "en" && "Start Swap"}
                      </Button>
                      <Button
                        onClick={resetDemo}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t.specifications.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.specifications.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: t.specifications.batteryCapacity, value: "26.5 кВт·ч", icon: Battery, color: "blue" },
              { label: t.specifications.swapTime, value: "60 сек", icon: Timer, color: "green" },
              { label: t.specifications.range, value: "300 км", icon: Gauge, color: "purple" },
              { label: t.specifications.efficiency, value: "95%", icon: Activity, color: "orange" },
              { label: t.specifications.warranty, value: "5 лет", icon: Shield, color: "red" },
              { label: t.specifications.temperature, value: "-20°C +60°C", icon: Cpu, color: "cyan" },
              { label: t.specifications.charging, value: "1C", icon: Zap, color: "yellow" },
              { label: t.specifications.cycles, value: "3000+", icon: RotateCcw, color: "pink" },
            ].map((spec, index) => {
              const Icon = spec.icon
              return (
                <Card
                  key={index}
                  className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-${spec.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-8 h-8 text-${spec.color}-600`} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{spec.value}</div>
                    <div className="text-gray-600 font-medium">{spec.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t.features.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: t.features.modular.title,
                description: t.features.modular.description,
                icon: Battery,
                gradient: "from-blue-500 to-purple-500",
              },
              {
                title: t.features.smart.title,
                description: t.features.smart.description,
                icon: Cpu,
                gradient: "from-green-500 to-blue-500",
              },
              {
                title: t.features.safety.title,
                description: t.features.safety.description,
                icon: Shield,
                gradient: "from-red-500 to-pink-500",
              },
              {
                title: t.features.connectivity.title,
                description: t.features.connectivity.description,
                icon: Wifi,
                gradient: "from-purple-500 to-indigo-500",
              },
              {
                title: t.features.fast.title,
                description: t.features.fast.description,
                icon: Zap,
                gradient: "from-yellow-500 to-orange-500",
              },
              {
                title: t.features.durable.title,
                description: t.features.durable.description,
                icon: Activity,
                gradient: "from-teal-500 to-cyan-500",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardContent className="p-8 relative">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CATL Innovation */}
      <section className="py-24 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <Badge className="bg-white/10 text-white hover:bg-white/20 text-lg px-4 py-2">
                    {t.innovation.title}
                  </Badge>
                  <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">{t.innovation.subtitle}</h2>
                  <p className="text-xl text-blue-100 leading-relaxed">{t.innovation.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { value: "15,000+", label: t.innovation.patents },
                    { value: "13", label: t.innovation.factories },
                    { value: "500+", label: t.innovation.capacity },
                    { value: "25+", label: t.innovation.experience },
                  ].map((stat, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                      <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-blue-200">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Cloud className="w-16 h-16 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">CATL</h3>
                      <p className="text-blue-200">
                        {language === "ru" && "Мировой лидер"}
                        {language === "uz" && "Jahon lideri"}
                        {language === "en" && "World leader"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
