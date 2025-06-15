"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Leaf,
  Battery,
  Truck,
  Shield,
  CheckCircle,
  Star,
  Users,
  Phone,
  Mail,
  Calculator,
  Download,
  ChevronRight,
} from "lucide-react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"

export default function BuyPage() {
  const { language } = useLanguage()
  const [selectedModel, setSelectedModel] = useState("standard")
  const [selectedColor, setSelectedColor] = useState("white")
  const [selectedPackage, setSelectedPackage] = useState("basic")

  const translations = {
    ru: {
      hero: {
        badge: "Купить EcoMobile",
        title: "Выберите свой",
        titleHighlight: "EcoMobile",
        description:
          "Революционный электромобиль с технологией быстрой замены батареи. Экологично, экономично, эффективно.",
      },
      models: {
        title: "Выберите модель",
        subtitle: "Три варианта для разных потребностей вашего бизнеса",
        standard: {
          name: "EcoMobile Standard",
          description: "Идеальное решение для городских доставок",
        },
        pro: {
          name: "EcoMobile Pro",
          description: "Расширенные возможности для коммерческого использования",
        },
        premium: {
          name: "EcoMobile Premium",
          description: "Максимальная производительность и комфорт",
        },
        range: "Запас хода:",
        payload: "Грузоподъемность:",
        charging: "Зарядка:",
        warranty: "Гарантия:",
        selected: "Выбрано",
      },
      configuration: {
        title: "Конфигурация",
        subtitle: "Настройте автомобиль под ваши потребности",
        color: "Цвет кузова",
        colors: {
          white: "Белый",
          black: "Черный",
          blue: "Синий",
          green: "Зеленый",
        },
        servicePackage: "Пакет обслуживания",
        packages: {
          basic: {
            name: "Базовый пакет",
            features: ["Стандартная гарантия", "Базовое обслуживание", "Техподдержка"],
          },
          comfort: {
            name: "Комфорт пакет",
            features: [
              "Расширенная гарантия",
              "Приоритетное обслуживание",
              "24/7 техподдержка",
              "Мобильное приложение",
            ],
          },
          business: {
            name: "Бизнес пакет",
            features: [
              "Максимальная гарантия",
              "VIP обслуживание",
              "Персональный менеджер",
              "Аналитика и отчеты",
              "Корпоративные скидки",
            ],
          },
        },
        included: "Включено",
      },
      order: {
        title: "Ваш заказ",
        total: "Итого:",
        includingOptions: "Включая все опции",
        financing: "Варианты финансирования:",
        leasing: "Лизинг (36 мес.):",
        installment: "Рассрочка (24 мес.):",
        orderBtn: "Оформить заказ",
        calculateBtn: "Рассчитать лизинг",
        downloadBtn: "Скачать спецификацию",
      },
      advantages: {
        title: "Почему EcoMobile?",
        subtitle: "Преимущества, которые делают нас лидером в сфере электротранспорта",
        fastSwap: {
          title: "Быстрая замена",
          description: "Замена батареи за 1 минуту вместо часов зарядки",
        },
        eco: {
          title: "Экологично",
          description: "Нулевые выбросы CO2 и чистая энергия",
        },
        reliability: {
          title: "Надежность",
          description: "Проверенная технология CATL с гарантией",
        },
        support: {
          title: "Поддержка 24/7",
          description: "Круглосуточная техническая поддержка",
        },
      },
      reviews: {
        title: "Отзывы клиентов",
        subtitle: "Что говорят о нас наши клиенты",
      },
      contact: {
        title: "Остались вопросы?",
        subtitle: "Наши эксперты помогут выбрать идеальную конфигурацию для вашего бизнеса",
        callBtn: "Позвонить консультанту",
        writeBtn: "Написать нам",
      },
    },
    uz: {
      hero: {
        badge: "EcoMobile sotib olish",
        title: "O'zingiznikini tanlang",
        titleHighlight: "EcoMobile",
        description: "Batareyani tez almashtirish texnologiyali inqilobiy elektromobil. Ekologik, tejamkor, samarali.",
      },
      models: {
        title: "Modelni tanlang",
        subtitle: "Biznesingizning turli ehtiyojlari uchun uchta variant",
        standard: {
          name: "EcoMobile Standard",
          description: "Shahar yetkazib berish uchun ideal yechim",
        },
        pro: {
          name: "EcoMobile Pro",
          description: "Tijorat foydalanish uchun kengaytirilgan imkoniyatlar",
        },
        premium: {
          name: "EcoMobile Premium",
          description: "Maksimal unumdorlik va qulaylik",
        },
        range: "Masofa:",
        payload: "Yuk ko'tarish qobiliyati:",
        charging: "Quvvatlash:",
        warranty: "Kafolat:",
        selected: "Tanlangan",
      },
      configuration: {
        title: "Konfiguratsiya",
        subtitle: "Avtomobilni ehtiyojlaringizga moslang",
        color: "Kuzov rangi",
        colors: {
          white: "Oq",
          black: "Qora",
          blue: "Ko'k",
          green: "Yashil",
        },
        servicePackage: "Xizmat paketi",
        packages: {
          basic: {
            name: "Asosiy paket",
            features: ["Standart kafolat", "Asosiy xizmat", "Texnik yordam"],
          },
          comfort: {
            name: "Qulaylik paketi",
            features: ["Kengaytirilgan kafolat", "Ustuvor xizmat", "24/7 texnik yordam", "Mobil ilova"],
          },
          business: {
            name: "Biznes paket",
            features: [
              "Maksimal kafolat",
              "VIP xizmat",
              "Shaxsiy menejer",
              "Tahlil va hisobotlar",
              "Korporativ chegirmalar",
            ],
          },
        },
        included: "Kiritilgan",
      },
      order: {
        title: "Sizning buyurtmangiz",
        total: "Jami:",
        includingOptions: "Barcha variantlar bilan",
        financing: "Moliyalashtirish variantlari:",
        leasing: "Lizing (36 oy):",
        installment: "Bo'lib to'lash (24 oy):",
        orderBtn: "Buyurtma berish",
        calculateBtn: "Lizingni hisoblash",
        downloadBtn: "Spetsifikatsiyani yuklab olish",
      },
      advantages: {
        title: "Nega EcoMobile?",
        subtitle: "Bizni elektrotransport sohasida lider qiladigan afzalliklar",
        fastSwap: {
          title: "Tez almashtirish",
          description: "Soatlab quvvatlash o'rniga 1 daqiqada batareya almashtirish",
        },
        eco: {
          title: "Ekologik",
          description: "CO2 chiqindilari nol va toza energiya",
        },
        reliability: {
          title: "Ishonchlilik",
          description: "Kafolat bilan CATL ning isbotlangan texnologiyasi",
        },
        support: {
          title: "24/7 yordam",
          description: "Kecha-kunduz texnik yordam",
        },
      },
      reviews: {
        title: "Mijozlar fikrlari",
        subtitle: "Mijozlarimiz biz haqimizda nima deyishadi",
      },
      contact: {
        title: "Savollar qoldimi?",
        subtitle: "Mutaxassislarimiz biznesingiz uchun ideal konfiguratsiyani tanlashda yordam beradi",
        callBtn: "Maslahatchi bilan bog'lanish",
        writeBtn: "Bizga yozing",
      },
    },
    en: {
      hero: {
        badge: "Buy EcoMobile",
        title: "Choose your",
        titleHighlight: "EcoMobile",
        description:
          "Revolutionary electric vehicle with fast battery swapping technology. Ecological, economical, efficient.",
      },
      models: {
        title: "Choose Model",
        subtitle: "Three options for different business needs",
        standard: {
          name: "EcoMobile Standard",
          description: "Perfect solution for urban deliveries",
        },
        pro: {
          name: "EcoMobile Pro",
          description: "Extended capabilities for commercial use",
        },
        premium: {
          name: "EcoMobile Premium",
          description: "Maximum performance and comfort",
        },
        range: "Range:",
        payload: "Payload:",
        charging: "Charging:",
        warranty: "Warranty:",
        selected: "Selected",
      },
      configuration: {
        title: "Configuration",
        subtitle: "Customize the vehicle to your needs",
        color: "Body color",
        colors: {
          white: "White",
          black: "Black",
          blue: "Blue",
          green: "Green",
        },
        servicePackage: "Service package",
        packages: {
          basic: {
            name: "Basic package",
            features: ["Standard warranty", "Basic service", "Tech support"],
          },
          comfort: {
            name: "Comfort package",
            features: ["Extended warranty", "Priority service", "24/7 tech support", "Mobile app"],
          },
          business: {
            name: "Business package",
            features: [
              "Maximum warranty",
              "VIP service",
              "Personal manager",
              "Analytics and reports",
              "Corporate discounts",
            ],
          },
        },
        included: "Included",
      },
      order: {
        title: "Your Order",
        total: "Total:",
        includingOptions: "Including all options",
        financing: "Financing options:",
        leasing: "Leasing (36 months):",
        installment: "Installment (24 months):",
        orderBtn: "Place Order",
        calculateBtn: "Calculate Leasing",
        downloadBtn: "Download Specification",
      },
      advantages: {
        title: "Why EcoMobile?",
        subtitle: "Advantages that make us a leader in electric transport",
        fastSwap: {
          title: "Fast Swap",
          description: "1-minute battery replacement instead of hours of charging",
        },
        eco: {
          title: "Eco-friendly",
          description: "Zero CO2 emissions and clean energy",
        },
        reliability: {
          title: "Reliability",
          description: "Proven CATL technology with warranty",
        },
        support: {
          title: "24/7 Support",
          description: "Round-the-clock technical support",
        },
      },
      reviews: {
        title: "Customer Reviews",
        subtitle: "What our customers say about us",
      },
      contact: {
        title: "Have Questions?",
        subtitle: "Our experts will help choose the perfect configuration for your business",
        callBtn: "Call Consultant",
        writeBtn: "Write to Us",
      },
    },
  }

  const t = translations[language as keyof typeof translations] || translations.ru

  const models = {
    standard: {
      name: "EcoMobile Standard",
      price: 25000,
      description: t.models.standard.description,
      specs: {
        range: "250 км",
        payload: "800 кг",
        charging: "1 минута замена",
        warranty: "3 года",
      },
    },
    pro: {
      name: "EcoMobile Pro",
      price: 32000,
      description: t.models.pro.description,
      specs: {
        range: "300 км",
        payload: "1200 кг",
        charging: "1 минута замена",
        warranty: "5 лет",
      },
    },
    premium: {
      name: "EcoMobile Premium",
      price: 45000,
      description: t.models.premium.description,
      specs: {
        range: "400 км",
        payload: "1500 кг",
        charging: "1 минута замена",
        warranty: "5 лет + расширенная",
      },
    },
  }

  const packages = {
    basic: {
      name: t.configuration.packages.basic.name,
      price: 0,
      features: t.configuration.packages.basic.features,
    },
    comfort: {
      name: t.configuration.packages.comfort.name,
      price: 3000,
      features: t.configuration.packages.comfort.features,
    },
    business: {
      name: t.configuration.packages.business.name,
      price: 5000,
      features: t.configuration.packages.business.features,
    },
  }

  const currentModel = models[selectedModel as keyof typeof models]
  const currentPackage = packages[selectedPackage as keyof typeof packages]
  const totalPrice = currentModel.price + currentPackage.price

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mb-6">{t.hero.badge}</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t.hero.title}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {" "}
                {t.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">{t.hero.description}</p>
          </div>
        </div>
      </section>

      {/* Model Selection */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.models.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.models.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {Object.entries(models).map(([key, model]) => (
              <Card
                key={key}
                className={`border-2 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedModel === key
                    ? "border-green-500 shadow-lg bg-green-50/50"
                    : "border-gray-200 hover:border-green-300"
                }`}
                onClick={() => setSelectedModel(key)}
              >
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{model.name}</CardTitle>
                  <div className="text-3xl font-bold text-green-600">${model.price.toLocaleString()}</div>
                  <p className="text-gray-600">{model.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.models.range}</span>
                      <span className="font-semibold">{model.specs.range}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.models.payload}</span>
                      <span className="font-semibold">{model.specs.payload}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.models.charging}</span>
                      <span className="font-semibold">{model.specs.charging}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.models.warranty}</span>
                      <span className="font-semibold">{model.specs.warranty}</span>
                    </div>
                  </div>
                  {selectedModel === key && (
                    <div className="mt-4 p-3 bg-green-100 rounded-lg">
                      <div className="flex items-center text-green-700">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span className="font-medium">{t.models.selected}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Configuration */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.configuration.title}</h2>
              <p className="text-xl text-gray-600">{t.configuration.subtitle}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Configuration Options */}
              <div className="space-y-8">
                {/* Color Selection */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="w-6 h-6 bg-blue-500 rounded-full mr-3"></div>
                      {t.configuration.color}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        {
                          key: "white",
                          name: t.configuration.colors.white,
                          color: "bg-white border-2 border-gray-300",
                        },
                        { key: "black", name: t.configuration.colors.black, color: "bg-gray-900" },
                        { key: "blue", name: t.configuration.colors.blue, color: "bg-blue-600" },
                        { key: "green", name: t.configuration.colors.green, color: "bg-green-600" },
                      ].map((color) => (
                        <button
                          key={color.key}
                          onClick={() => setSelectedColor(color.key)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            selectedColor === color.key
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-green-300"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${color.color}`}></div>
                          <div className="text-sm font-medium">{color.name}</div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Service Package */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-6 h-6 text-purple-600 mr-3" />
                      {t.configuration.servicePackage}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(packages).map(([key, pkg]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedPackage(key)}
                          className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                            selectedPackage === key
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-green-300"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{pkg.name}</h3>
                            <span className="font-bold text-green-600">
                              {pkg.price > 0 ? `+$${pkg.price.toLocaleString()}` : t.configuration.included}
                            </span>
                          </div>
                          <div className="space-y-1">
                            {pkg.features.map((feature, index) => (
                              <div key={index} className="flex items-center text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="space-y-8">
                <Card className="border-0 shadow-xl sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-2xl">{t.order.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Selected Model */}
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{currentModel.name}</h3>
                          <p className="text-sm text-gray-600">{currentModel.description}</p>
                        </div>
                        <span className="font-bold">${currentModel.price.toLocaleString()}</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Selected Package */}
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{currentPackage.name}</h3>
                          <p className="text-sm text-gray-600">{t.configuration.servicePackage}</p>
                        </div>
                        <span className="font-bold">
                          {currentPackage.price > 0
                            ? `$${currentPackage.price.toLocaleString()}`
                            : t.configuration.included}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    {/* Total */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">{t.order.total}</span>
                        <span className="text-2xl font-bold text-green-600">${totalPrice.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{t.order.includingOptions}</p>
                    </div>

                    {/* Financing Options */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">{t.order.financing}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>{t.order.leasing}</span>
                          <span className="font-semibold">${Math.round(totalPrice / 36).toLocaleString()}/мес</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t.order.installment}</span>
                          <span className="font-semibold">${Math.round(totalPrice / 24).toLocaleString()}/мес</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
                        {t.order.orderBtn}
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Calculator className="mr-2 w-5 h-5" />
                        {t.order.calculateBtn}
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Download className="mr-2 w-5 h-5" />
                        {t.order.downloadBtn}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose EcoMobile */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.advantages.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.advantages.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Battery className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t.advantages.fastSwap.title}</h3>
                <p className="text-gray-600">{t.advantages.fastSwap.description}</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t.advantages.eco.title}</h3>
                <p className="text-gray-600">{t.advantages.eco.description}</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t.advantages.reliability.title}</h3>
                <p className="text-gray-600">{t.advantages.reliability.description}</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t.advantages.support.title}</h3>
                <p className="text-gray-600">{t.advantages.support.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.reviews.title}</h2>
            <p className="text-xl text-gray-600">{t.reviews.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "EcoMobile полностью изменил наш бизнес доставки. Экономия на топливе огромная, а клиенты довольны
                  экологичностью."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">АК</span>
                  </div>
                  <div>
                    <div className="font-semibold">Алексей Ким</div>
                    <div className="text-sm text-gray-500">Директор службы доставки</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Технология замены батареи просто фантастическая! Никаких простоев, работаем круглосуточно."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">МС</span>
                  </div>
                  <div>
                    <div className="font-semibold">Мария Смирнова</div>
                    <div className="text-sm text-gray-500">Владелец логистической компании</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Отличное качество сборки, надежность и экономичность. Рекомендую всем коллегам по бизнесу."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">ДП</span>
                  </div>
                  <div>
                    <div className="font-semibold">Дмитрий Петров</div>
                    <div className="text-sm text-gray-500">Предприниматель</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">{t.contact.title}</h2>
            <p className="text-xl text-green-100 mb-8">{t.contact.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                <Phone className="mr-2 w-5 h-5" />
                {t.contact.callBtn}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3"
              >
                <Mail className="mr-2 w-5 h-5" />
                {t.contact.writeBtn}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
