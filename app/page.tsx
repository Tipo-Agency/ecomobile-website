"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Battery, Leaf, Sun, Truck, Users, TrendingUp, ChevronRight, DollarSign, Shield, X } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import Script from 'next/script' // Added Script import
import { useMobile } from '@/hooks/use-mobile'
import YandexMap from "@/components/YandexMap"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"



declare global {
  interface Window {
    ymaps: any;
  }
}

export default function HomePage() {
  const { language } = useLanguage()
  const isMobile = useMobile()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false)
  const [advantageModal, setAdvantageModal] = useState<string | null>(null)
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false)
  const [batteryAnimation, setBatteryAnimation] = useState(false)
  const [currentModelIndex, setCurrentModelIndex] = useState(0) // New state for model index
  const [calculatorData, setCalculatorData] = useState({
    fleetSize: 5,
    averageDailyDistance: 120,
    operatingDaysPerWeek: 5,
    vehicleType: 'diesel', // 'diesel' or 'gasoline'
    dieselPrice: 1.5, // Price per liter
    gasolinePrice: 1.7, // Price per liter
    electricityPrice: 0.15, // Price per kWh
  })

  const modelsData = [
    {
      id: "ecotruck",
      image: "/images/ecotruck.jpeg",
      translations: {
        ru: {
          name: "EcoTruck",
          description: "Компактный электрический грузовик для городской логистики.",
          dimensions: "Длина: 4.5м | Ширина: 1.8м | Высота: 2.2м",
          cargoVolume: "Объем груза: 5.6м³",
          maxPayload: "Макс. полезная нагрузка: 1,000кг",
          maxSpeed: "Максимальная скорость: 100 км/ч",
          rangePerCharge: "Запас хода на одном заряде: 200 км",
          batterySwapTime: "Время замены батареи: 3 минуты",
          features: {
            title: "Особенности",
            climateControl: "Умная система климат-контроля",
            navigation: "10\" Сенсорный экран навигации и управления автопарком",
            camera: "Система камер 360° для городского маневрирования",
          },
          learnMore: "Подробнее",
        },
        uz: {
          name: "EcoTruck",
          description: "Shahar logistikasi uchun ixcham elektr yuk mashinasi.",
          dimensions: "Uzunligi: 4.5m | Kengligi: 1.8m | Balandligi: 2.2m",
          cargoVolume: "Yuk hajmi: 5.6m³",
          maxPayload: "Maks. foydali yuk: 1,000kg",
          maxSpeed: "Maksimal tezlik: 100 km/soat",
          rangePerCharge: "Bir zaryadda yurish masofasi: 200 km",
          batterySwapTime: "Batareya almashtirish vaqti: 3 daqiqa",
          features: {
            title: "Xususiyatlar",
            climateControl: "Aqlli iqlim nazorati tizimi",
            navigation: "10\" Sensorli ekranli navigatsiya va avtoparkni boshqarish",
            camera: "Shahar harakati uchun 360° kamera tizimi",
          },
          learnMore: "Batafsil",
        },
        en: {
          name: "EcoTruck",
          description: "Compact electric truck for urban logistics.",
          dimensions: "Length: 4.5m | Width: 1.8m | Height: 2.2m",
          cargoVolume: "Cargo Volume: 5.6m³",
          maxPayload: "Maximum Payload: 1,000kg",
          maxSpeed: "Maximum Speed: 100 km/h",
          rangePerCharge: "Range per Charge: 200 km",
          batterySwapTime: "Battery Swap Time: 3 minutes",
          features: {
            title: "Features",
            climateControl: "Smart Climate Control System",
            navigation: "10\" Touchscreen Navigation & Fleet Management",
            camera: "360° Camera System for Urban Maneuverability",
          },
          learnMore: "Learn More",
        },
      },
    },
    {
      id: "pony",
      image: "/images/pony.png",
      translations: {
        ru: {
          name: "Pony",
          description: "Электрический компактный автомобиль для комфортных поездок по городу",
          dimensions: "Длина: 2м | Ширина: 1.2м | Высота: 1.5м",
          cargoVolume: "Объем груза: 12.0м³",
          maxPayload: "Макс. полезная нагрузка: 2,500кг",
          maxSpeed: "Максимальная скорость: 110 км/ч",
          rangePerCharge: "Запас хода на одном заряде: 300 км",
          batterySwapTime: "Время замены батареи: 1 минуты",
          features: {
            title: "Особенности",
            climateControl: "Зональный климат-контроль",
            navigation: "Интегрированная навигация с оптимизацией маршрутов",
            camera: "Система камер кругового обзора с парковочным ассистентом",
          },
          learnMore: "Подробнее",
        },
        uz: {
          name: "Pony",
          description: "Qulay shahar sayohatlari uchun elektr ixcham avtomobil",
          dimensions: "Uzunligi: 2.0m | Kengligi: 1.2m | Balandligi: 1.5m",
          cargoVolume: "Yuk hajmi: 12.0m³",
          maxPayload: "Maks. foydali yuk: 2,500kg",
          maxSpeed: "Maksimal tezlik: 110 km/soat",
          rangePerCharge: "Bir zaryadda yurish masofasi: 300 km",
          batterySwapTime: "Batareya almashtirish vaqti: 1 daqiqa",
          features: {
            title: "Xususiyatlar",
            climateControl: "Zonali iqlim nazorati",
            navigation: "Marshrutni optimallashtirish bilan integratsiyalashgan navigatsiya",
            camera: "Avtoturargoh yordamchisi bilan to'liq ko'rish kamerasi tizimi",
          },
          learnMore: "Batafsil",
        },
        en: {
          name: "Pony",
          description: "Electric compact car for comfortable city trips.",
          dimensions: "Length: 2.0m | Width: 1.2m | Height: 1.5m",
          cargoVolume: "Cargo Volume: 12.0m³",
          maxPayload: "Maximum Payload: 2,500kg",
          maxSpeed: "Maximum Speed: 110 km/h",
          rangePerCharge: "Range per Charge: 300 km",
          batterySwapTime: "Battery Swap Time: 1 minute",
          features: {
            title: "Features",
            climateControl: "Zonal Climate Control",
            navigation: "Integrated Navigation with Route Optimization",
            camera: "Surround View Camera System with Parking Assist",
          },
          learnMore: "Learn More",
        },
      },
    },
    {
      id: "brumby",
      image: "/images/brumby.png",
      translations: {
        ru: {
          name: "Brumby",
          description: "Компактный и маневренный электромобиль для городского использования.",
          dimensions: "Длина: 3.5м | Ширина: 1.6м | Высота: 1.5м",
          cargoVolume: "Объем груза: 1.0м³",
          maxPayload: "Макс. полезная нагрузка: 200кг",
          maxSpeed: "Максимальная скорость: 80 км/ч",
          rangePerCharge: "Запас хода на одном заряде: 150 км",
          batterySwapTime: "Время замены батареи: 1 минута",
          features: {
            title: "Особенности",
            climateControl: "Эффективный климат-контроль",
            navigation: "Интегрированный GPS-навигатор",
            camera: "Задняя камера для удобной парковки",
          },
          learnMore: "Подробнее",
        },
        uz: {
          name: "Brumby",
          description: "Shahar sharoitida foydalanish uchun ixcham va manevrli elektromobil.",
          dimensions: "Uzunligi: 3.5m | Kengligi: 1.6m | Balandligi: 1.5m",
          cargoVolume: "Yuk hajmi: 1.0m³",
          maxPayload: "Maks. foydali yuk: 200kg",
          maxSpeed: "Maksimal tezlik: 80 km/soat",
          rangePerCharge: "Bir zaryadda yurish masofasi: 150 km",
          batterySwapTime: "Batareya almashtirish vaqti: 1 daqiqa",
          features: {
            title: "Xususiyatlar",
            climateControl: "Samarali iqlim nazorati",
            navigation: "Integratsiyalashgan GPS-navigator",
            camera: "Qulay avtoturargoh uchun orqa kamera",
          },
          learnMore: "Batafsil",
        },
        en: {
          name: "Brumby",
          description: "Compact and maneuverable electric vehicle for urban use.",
          dimensions: "Length: 3.5m | Width: 1.6m | Height: 1.5m",
          cargoVolume: "Cargo Volume: 1.0m³",
          maxPayload: "Maximum Payload: 200kg",
          maxSpeed: "Maximum Speed: 80 km/h",
          rangePerCharge: "Range per Charge: 150 km",
          batterySwapTime: "Battery Swap Time: 1 minute",
          features: {
            title: "Features",
            climateControl: "Efficient Climate Control",
            navigation: "Integrated GPS Navigator",
            camera: "Rear Camera for Easy Parking",
          },
          learnMore: "Learn More",
        },
      },
    },
    // Add more models here if needed
  ];

  const currentModel = modelsData[currentModelIndex];

  const translations = {
    ru: {
      hero: {
        title: "Революция в городском транспорте",
        subtitle: "Электромобиль с технологией быстрой замены батареи",
        description:
          "Инновационное решение для экологичной доставки и городских перевозок с возможностью замены батареи за 1 минуту",
        buyButton: "Купить",
        forInvestors: "Для инвесторов",
      },
      swapNetwork: {
        title: "Растущая сеть станций замены",
        subtitle: "Удобный доступ к основным городским центрам",
        locations: {
          title: "Расположение станций замены",
          active: "Активные станции",
          comingSoon: "Скоро открытие",
          planned: "Планируемое расширение",
        },
        findNearest: "Найти ближайшую станцию",
        highlights: {
          title: "Основные показатели сети",
          activeStations: {
            number: "42",
            label: "Активные станции",
          },
          citiesCovered: {
            number: "12",
            label: "Городов охвачено",
          },
          uptimeReliability: {
            number: "98.5%",
            label: "Надежность работы",
          },
          description:
            "Наша сеть быстро расширяется, каждый месяц добавляются новые станции. Каждая станция может обслуживать до 200 автомобилей в день, обеспечивая минимальное время ожидания даже в часы пик.",
        },
      },
      advantages: {
        title: "Преимущества Ecomobile",
        subtitle: "Революционные технологии для эффективного и экологичного будущего",
        eco: {
          title: "100% Экологично",
          description: "Нулевые выбросы CO2, чистая энергия для чистого будущего",
          learnMore: "Узнать больше",
        },
        economy: {
          title: "Экономия до 75%",
          description: "Значительное снижение операционных расходов по сравнению с ДВС",
          calculate: "Рассчитать экономию",
        },
        solar: {
          title: "Солнечная энергия",
          description: "Возможность зарядки от солнечных панелей для полной автономности",
          learnMore: "Подробнее",
        },
        reliability: {
          title: "Надёжность",
          description: "Проверенная технология с гарантией качества",
          guarantees: "Гарантии",
        },
      },
      calculator: {
        title: "Калькулятор экономии",
        subtitle: "Узнайте, сколько вы сэкономите, перейдя на Ecomobile",
        dailyDistance: "Ежедневный пробег (км)",
        fuelPrice: "Цена топлива ($/л)",
        electricityPrice: "Цена электричества ($/кВт·ч)",
        regularCar: "Обычный автомобиль",
        ecoMobile: "Ecomobile",
        yourSavings: "Ваша экономия",
        monthlyExpenses: "расходы в месяц",
        everyMonth: "каждый месяц",
        perYear: "За год",
        inputDetails: "Введите данные",
        fleetSize: "Размер автопарка",
        averageDailyDistance: "Средний ежедневный пробег (км)",
        operatingDaysPerWeek: "Рабочих дней в неделю",
        currentVehicleType: "Текущий тип автомобиля",
        diesel: "Дизель",
        gasoline: "Бензин",
        calculateSavingsButton: "Рассчитать экономию",
        estimatedSavings: "Ваша предполагаемая экономия",
        monthlyFuelEnergyCostSavings: "Ежемесячная экономия на топливе/энергии",
        annualCO2Reduction: "Ежегодное сокращение CO2",
        tons: "тонн",
        fiveYearTotalSavings: "Общая экономия за 5 лет",
        estimatedROIPeriod: "Предполагаемый срок окупаемости",
        years: "лет",
        calculationDisclaimer: "Эти расчеты являются оценками, основанными на средних ценах на топливо и электроэнергию. Ваши фактические сбережения могут отличаться в зависимости от конкретных условий эксплуатации и местных цен на энергию.",
        downloadDetailedReport: "Скачать подробный отчет",
      },
      applications: {
        title: "Идеальное решение для любого бизнеса",
        subtitle: "От курьерских служб до муниципальных предприятий",
        delivery: {
          title: "Доставка и логистика",
          description: "Курьерские службы, доставка еды, интернет-магазины",
        },
        services: {
          title: "Сервисные службы",
          description: "Клининг, ремонт, техническое обслуживание",
        },
        trade: {
          title: "Мобильная торговля",
          description: "Развозная торговля, мобильные магазины",
        },
        municipal: {
          title: "Муниципальные службы",
          description: "ЖКХ, коммунальные и городские службы",
        },
      },
      cta: {
        title: "Готовы к переходу на экологичный транспорт?",
        subtitle: "Присоединяйтесь к революции в городском транспорте уже сегодня",
        orderButton: "Оставить заявку",
        learnMore: "Узнать больше",
      },
      orderForm: {
        title: "Оставить заявку",
        description: "Мы свяжемся с вами для обсуждения деталей",
        name: "Имя",
        phone: "Телефон",
        email: "Email",
        message: "Сообщение",
        submit: "Отправить заявку",
      },
      investorModal: {
        title: "Связаться по поводу инвестиций",
        description: "Расскажите о ваших инвестиционных интересах",
        company: "Компания",
        position: "Должность",
        investmentAmount: "Объем инвестиций",
        message: "Сообщение",
        messagePlaceholder: "Ваши инвестиционные цели...",
        submit: "Отправить запрос",
        selectRange: "Выберите диапазон",
      },
    },
    uz: {
      hero: {
        title: "Shahar transportida inqilob",
        subtitle: "Batareyani tez almashtirish texnologiyali elektromobil",
        description:
          "1 daqiqada batareyani almashtirish imkoniyati bilan ekologik yetkazib berish va shahar tashish uchun innovatsion yechim",
        buyButton: "Sotib olish",
        forInvestors: "Investorlar uchun",
      },
      swapNetwork: {
        title: "Kengayib borayotgan almashinish stantsiyalari tarmog'i",
        subtitle: "Yirik shahar markazlariga qulay kirish",
        locations: {
          title: "Almashinish stantsiyalari joylashuvi",
          active: "Faol stantsiyalar",
          comingSoon: "Tez orada",
          planned: "Rejalashtirilgan kengaytirish",
        },
        findNearest: "Eng yaqin stantsiyani topish",
        highlights: {
          title: "Tarmoqning asosiy ko'rsatkichlari",
          activeStations: {
            number: "42",
            label: "Faol stantsiyalar",
          },
          citiesCovered: {
            number: "12",
            label: "Qamrab olingan shaharlar",
          },
          uptimeReliability: {
            number: "98.5%",
            label: "Ishlash ishonchliligi",
          },
          description:
            "Bizning tarmoq tez kengaymoqda, har oy yangi stantsiyalar qo'shilmoqda. Har bir stantsiya kuniga 200 tagacha avtomobilga xizmat ko'rsatishi mumkin, bu esa eng yuqori soatlarda ham minimal kutish vaqtlarini ta'minlaydi.",
        },
      },
      advantages: {
        title: "Ecomobile afzalliklari",
        subtitle: "Samarali va ekologik kelajak uchun inqilobiy texnologiyalar",
        eco: {
          title: "100% Ekologik",
          description: "CO2 chiqindilari nol, toza kelajak uchun toza energiya",
          learnMore: "Batafsil",
        },
        economy: {
          title: "75% gacha tejash",
          description: "ICE bilan solishtirganda operatsion xarajatlarni sezilarli kamaytirish",
          calculate: "Tejashni hisoblash",
        },
        solar: {
          title: "Quyosh energiyasi",
          description: "To'liq avtonomiya uchun quyosh panellaridan quvvatlash imkoniyati",
          learnMore: "Batafsil",
        },
        reliability: {
          title: "Ishonchlilik",
          description: "Sifat kafolati bilan isbotlangan texnologiya",
          guarantees: "Kafolatlar",
        },
      },
      calculator: {
        title: "Tejash kalkulyatori",
        subtitle: "Ecomobile'ga o'tish bilan qancha tejashingizni bilib oling",
        dailyDistance: "Kunlik masofa (km)",
        fuelPrice: "Yoqilg'i narxi ($/l)",
        electricityPrice: "Elektr energiya narxi ($/kVt·soat)",
        regularCar: "Oddiy avtomobil",
        ecoMobile: "Ecomobile",
        yourSavings: "Sizning tejashingiz",
        monthlyExpenses: "oylik xarajatlar",
        everyMonth: "har oy",
        perYear: "Yil davomida",
        inputDetails: "Ma'lumotlaringizni kiriting",
        fleetSize: "Avtopark hajmi",
        averageDailyDistance: "O'rtacha kunlik masofa (km)",
        operatingDaysPerWeek: "Haftalik ish kunlari",
        currentVehicleType: "Joriy avtomobil turi",
        diesel: "Dizel",
        gasoline: "Benzin",
        calculateSavingsButton: "Tejashni hisoblash",
        estimatedSavings: "Sizning taxminiy tejashingiz",
        monthlyFuelEnergyCostSavings: "Oylik yoqilg'i/energiya tejash",
        annualCO2Reduction: "Yillik CO2 kamayishi",
        tons: "tonna",
        fiveYearTotalSavings: "5 yillik umumiy tejash",
        estimatedROIPeriod: "Taxminiy investitsiya qaytish muddati",
        years: "yil",
        calculationDisclaimer: "Ushbu hisob-kitoblar o'rtacha yoqilg'i narxlari va elektr energiyasi narxlariga asoslangan. Sizning haqiqiy tejashingiz operatsion sharoitlarga va mahalliy energiya narxlariga qarab farq qilishi mumkin.",
        downloadDetailedReport: "Batafsil hisobotni yuklab olish",
      },
      applications: {
        title: "Har qanday biznes uchun ideal yechim",
        subtitle: "Kuryer xizmatlaridan tortib munitsipal korxonalargacha",
        delivery: {
          title: "Yetkazib berish va logistika",
          description: "Kuryer xizmatlari, ovqat yetkazib berish, internet-do'konlar",
        },
        services: {
          title: "Xizmat ko'rsatish xizmatlari",
          description: "Tozalash, ta'mirlash, texnik xizmat ko'rsatish",
        },
        trade: {
          title: "Mobil savdo",
          description: "Uyma-uy savdo, mobil do'konlar",
        },
        municipal: {
          title: "Munitsipal xizmatlar",
          description: "Kommunal xizmatlar, shahar xizmatlari",
        },
      },
      cta: {
        title: "Ekologik transportga o'tishga tayyormisiz?",
        subtitle: "Bugun shahar transportidagi inqilobga qo'shiling",
        orderButton: "Ariza qoldirish",
        learnMore: "Batafsil",
      },
      orderForm: {
        title: "Ariza qoldirish",
        description: "Tafsilotlarni muhokama qilish uchun siz bilan bog'lanamiz",
        name: "Ism",
        phone: "Telefon",
        email: "Email",
        message: "Xabar",
        submit: "Ariza yuborish",
      },
      investorModal: {
        title: "Investitsiya bo'yicha bog'lanish",
        description: "Investitsiya qiziqishlaringiz haqida gapirib bering",
        company: "Kompaniya",
        position: "Lavozim",
        investmentAmount: "Investitsiya hajmi",
        message: "Xabar",
        messagePlaceholder: "Investitsiya maqsadlaringiz...",
        submit: "So'rov yuborish",
        selectRange: "Diapazonni tanlang",
      },
    },
    en: {
      hero: {
        title: "Revolution in Urban Transport",
        subtitle: "Electric Vehicle with Battery Swapping Technology",
        description:
          "Innovative solution for eco-friendly delivery and urban transportation with 1-minute battery replacement capability",
        buyButton: "Buy",
        forInvestors: "For Investors",
      },
      swapNetwork: {
        title: "Growing Swap Station Network",
        subtitle: "Convenient access across major urban centers",
        locations: {
          title: "Swap Station Locations",
          active: "Active Stations",
          comingSoon: "Coming Soon",
          planned: "Planned Expansion",
        },
        findNearest: "Find Nearest Station",
        highlights: {
          title: "Network Highlights",
          activeStations: {
            number: "42",
            label: "Active Stations",
          },
          citiesCovered: {
            number: "12",
            label: "Cities Covered",
          },
          uptimeReliability: {
            number: "98.5%",
            label: "Uptime Reliability",
          },
          description:
            "Our network is expanding rapidly, with new stations being added every month. Each station can service up to 200 vehicles per day, ensuring minimal wait times even during peak hours.",
        },
      },
      advantages: {
        title: "Ecomobile Advantages",
        subtitle: "Revolutionary technologies for an efficient and eco-friendly future",
        eco: {
          title: "100% Eco-Friendly",
          description: "Zero CO2 emissions, clean energy for a clean future",
          learnMore: "Learn More",
        },
        economy: {
          title: "Save up to 75%",
          description: "Significant reduction in operating costs compared to ICE",
          calculate: "Calculate Savings",
        },
        solar: {
          title: "Solar Energy",
          description: "Possibility of charging from solar panels for complete autonomy",
          learnMore: "Learn More",
        },
        reliability: {
          title: "Reliability",
          description: "Proven technology with quality guarantee",
          guarantees: "Guarantees",
        },
      },
      calculator: {
        title: "Savings Calculator",
        subtitle: "Find out how much you'll save by switching to Ecomobile",
        dailyDistance: "Daily distance (km)",
        fuelPrice: "Fuel price ($/l)",
        electricityPrice: "Electricity price ($/kWh)",
        regularCar: "Regular car",
        ecoMobile: "Ecomobile",
        yourSavings: "Your savings",
        monthlyExpenses: "monthly expenses",
        everyMonth: "every month",
        perYear: "Per year",
        inputDetails: "Input Your Details",
        fleetSize: "Fleet Size",
        averageDailyDistance: "Average Daily Distance (km)",
        operatingDaysPerWeek: "Operating Days per Week",
        currentVehicleType: "Current Vehicle Type",
        diesel: "Diesel",
        gasoline: "Gasoline",
        calculateSavingsButton: "Calculate Savings",
        estimatedSavings: "Your Estimated Savings",
        monthlyFuelEnergyCostSavings: "Monthly Fuel/Energy Cost Savings",
        annualCO2Reduction: "Annual CO2 Reduction",
        tons: "tons",
        fiveYearTotalSavings: "5-Year Total Savings",
        estimatedROIPeriod: "Estimated ROI Period",
        years: "years",
        calculationDisclaimer: "These calculations are estimates based on average fuel prices and electricity costs. Your actual savings may vary based on specific operating conditions and local energy prices.",
        downloadDetailedReport: "Download Detailed Report",
      },
      applications: {
        title: "Perfect solution for any business",
        subtitle: "From courier services to municipal enterprises",
        delivery: {
          title: "Delivery and Logistics",
          description: "Courier services, food delivery, online stores",
        },
        services: {
          title: "Service Companies",
          description: "Cleaning, repair, technical maintenance",
        },
        trade: {
          title: "Mobile Trade",
          description: "Door-to-door sales, mobile stores",
        },
        municipal: {
          title: "Municipal Services",
          description: "Utilities, communal and city services",
        },
      },
      cta: {
        title: "Ready to switch to eco-friendly transport?",
        subtitle: "Join the urban transport revolution today",
        orderButton: "Leave a Request",
        learnMore: "Learn More",
      },
      orderForm: {
        title: "Leave a Request",
        description: "We will contact you to discuss the details",
        name: "Name",
        phone: "Phone",
        email: "Email",
        message: "Message",
        submit: "Submit Request",
      },
      investorModal: {
        title: "Contact about investments",
        description: "Tell us about your investment interests",
        company: "Company",
        position: "Position",
        investmentAmount: "Investment amount",
        message: "Message",
        messagePlaceholder: "Your investment goals...",
        submit: "Send request",
        selectRange: "Select range",
      },
    },
  }

  const t = translations[language as keyof typeof translations] || translations.ru

  const calculateSavings = () => {
    const { fleetSize, averageDailyDistance, operatingDaysPerWeek, vehicleType, dieselPrice, gasolinePrice, electricityPrice } = calculatorData;

    const annualOperatingDays = operatingDaysPerWeek * 52;
    const annualDistancePerVehicle = averageDailyDistance * annualOperatingDays;
    const totalAnnualDistance = annualDistancePerVehicle * fleetSize;

    // Fuel Car Calculations
    let fuelConsumptionPer100Km = 0;
    let fuelPricePerLiter = 0;
    let co2EmissionPerLiter = 0; // kg CO2 per liter

    if (vehicleType === 'diesel') {
      fuelConsumptionPer100Km = 8; // L/100km
      fuelPricePerLiter = dieselPrice;
      co2EmissionPerLiter = 2.68; // kg CO2
    } else { // gasoline
      fuelConsumptionPer100Km = 10; // L/100km
      fuelPricePerLiter = gasolinePrice;
      co2EmissionPerLiter = 2.31; // kg CO2
    }

    const totalAnnualFuelConsumption = (totalAnnualDistance / 100) * fuelConsumptionPer100Km;
    const totalAnnualFuelCost = totalAnnualFuelConsumption * fuelPricePerLiter;

    // EcoMobile Calculations
    const electricConsumptionPer100Km = 15; // kWh/100km
    const totalAnnualElectricConsumption = (totalAnnualDistance / 100) * electricConsumptionPer100Km;
    const totalAnnualElectricCost = totalAnnualElectricConsumption * electricityPrice;

    // Savings
    const annualSavings = totalAnnualFuelCost - totalAnnualElectricCost;
    const monthlySavings = annualSavings / 12;
    const fiveYearSavings = annualSavings * 5;

    // CO2 Reduction
    const totalAnnualCO2EmissionFuel = (totalAnnualFuelConsumption * co2EmissionPerLiter) / 1000; // in tons
    const annualCO2Reduction = totalAnnualCO2EmissionFuel; // simplified, assuming zero for electric

    // ROI Period (simplified: initial investment / annual savings)
    const estimatedEcoMobileCost = 86250; // Placeholder for initial investment based on image example
    const estimatedROIPeriod = annualSavings > 0 ? estimatedEcoMobileCost / annualSavings : 0;

    return {
      monthlyFuelEnergyCostSavings: monthlySavings.toFixed(0),
      annualCO2Reduction: annualCO2Reduction.toFixed(1),
      fiveYearTotalSavings: fiveYearSavings.toFixed(0),
      estimatedROIPeriod: estimatedROIPeriod.toFixed(1),
    }
  }

  const savings = calculateSavings()

  // Effect for auto-scrolling models
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModelIndex((prevIndex) => (prevIndex + 1) % modelsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [modelsData.length]);

  const advantageModals = {
    eco: {
      title: t.advantages.eco.title,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              {language === "ru" && "Нулевые выбросы CO2"}
              {language === "uz" && "CO2 chiqindilari nol"}
              {language === "en" && "Zero CO2 emissions"}
            </h3>
            <p className="text-gray-600">
              {language === "ru" &&
                "Ecomobile работает исключительно на электричестве, что означает полное отсутствие вредных выбросов в атмосферу. Каждый километр пути способствует улучшению экологической ситуации в городе."}
              {language === "uz" &&
                "Ecomobile faqat elektr energiyasida ishlaydi, bu atmosferaga zararli chiqindilarning to'liq yo'qligini anglatadi. Har bir kilometr yo'l shahardagi ekologik vaziyatni yaxshilashga yordam beradi."}
              {language === "en" &&
                "Ecomobile runs exclusively on electricity, which means complete absence of harmful emissions into the atmosphere. Every kilometer traveled contributes to improving the environmental situation in the city."}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">0g</div>
                <div className="text-sm text-green-700">
                  {language === "ru" && "CO2 на км"}
                  {language === "uz" && "CO2 km uchun"}
                  {language === "en" && "CO2 per km"}
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-blue-700">
                  {language === "ru" && "Чистая энергия"}
                  {language === "uz" && "Toza energiya"}
                  {language === "en" && "Clean energy"}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-xl mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                {language === "ru" && "Экологические преимущества:"}
                {language === "uz" && "Ekologik afzalliklar:"}
                {language === "en" && "Environmental benefits:"}
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  {language === "ru" && "Снижение загрязнения воздуха в городах"}
                  {language === "uz" && "Shaharlarda havo ifloslanishini kamaytirish"}
                  {language === "en" && "Reducing air pollution in cities"}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  {language === "ru" && "Уменьшение шумового загрязнения"}
                  {language === "uz" && "Shovqin ifloslanishini kamaytirish"}
                  {language === "en" && "Reducing noise pollution"}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  {language === "ru" && "Поддержка устойчивого развития"}
                  {language === "uz" && "Barqaror rivojlanishni qo'llab-quvvatlash"}
                  {language === "en" && "Supporting sustainable development"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    economy: {
      title: t.advantages.economy.title,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              {language === "ru" && "Значительная экономия операционных расходов"}
              {language === "uz" && "Operatsion xarajatlarni sezilarli tejash"}
              {language === "en" && "Significant operational cost savings"}
            </h3>
            <p className="text-gray-600">
              {language === "ru" &&
                "Электричество значительно дешевле бензина или дизельного топлива, а обслуживание электромобиля требует меньших затрат. Экономия достигает 75% от операционных расходов традиционного транспорта."}
              {language === "uz" &&
                "Elektr energiyasi benzin yoki dizel yoqilg'isidan ancha arzon, elektromobilni xizmat ko'rsatish esa kamroq xarajat talab qiladi. Tejash an'anaviy transportning operatsion xarajatlarining 75% ini tashkil qiladi."}
              {language === "en" &&
                "Electricity is significantly cheaper than gasoline or diesel fuel, and electric vehicle maintenance requires lower costs. Savings reach 75% of traditional transport operational costs."}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600">$240</div>
                <div className="text-sm text-red-700">
                  {language === "ru" && "Топливо/месяц"}
                  {language === "uz" && "Yoqilg'i/oy"}
                  {language === "en" && "Fuel/month"}
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">$60</div>
                <div className="text-sm text-green-700">
                  {language === "ru" && "Электричество/месяц"}
                  {language === "uz" && "Elektr/oy"}
                  {language === "en" && "Electricity/month"}
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">$180</div>
                <div className="text-sm text-blue-700">
                  {language === "ru" && "Экономия/месяц"}
                  {language === "uz" && "Tejash/oy"}
                  {language === "en" && "Savings/month"}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                {language === "ru" && "Дополнительные преимущества:"}
                {language === "uz" && "Qo'shimcha afzalliklar:"}
                {language === "en" && "Additional benefits:"}
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  {language === "ru" && "Меньше затрат на техническое обслуживание"}
                  {language === "uz" && "Texnik xizmat ko'rsatishga kamroq xarajat"}
                  {language === "en" && "Lower maintenance costs"}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  {language === "ru" && "Налоговые льготы для электротранспорта"}
                  {language === "uz" && "Elektrotransport uchun soliq imtiyozlari"}
                  {language === "en" && "Tax benefits for electric transport"}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  {language === "ru" && "Стабильные цены на электроэнергию"}
                  {language === "uz" && "Elektr energiyasining barqaror narxlari"}
                  {language === "en" && "Stable electricity prices"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    battery: {
      title: t.advantages.reliability.title,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="relative">
              <div
                className={`w-32 h-32 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-1000 ${batteryAnimation ? "scale-110 bg-green-100" : ""
                  }`}
              >
                <Battery
                  className={`w-16 h-16 transition-colors duration-1000 ${batteryAnimation ? "text-green-600" : "text-purple-600"
                    }`}
                />
              </div>
              <Button
                onClick={() => setBatteryAnimation(!batteryAnimation)}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                {batteryAnimation
                  ? language === "ru"
                    ? "Заряженная батарея"
                    : language === "uz"
                      ? "Zaryadlangan batareya"
                      : "Charged battery"
                  : language === "ru"
                    ? "Разряженная батарея"
                    : language === "uz"
                      ? "Zaryadlanmagan batareya"
                      : "Discharged battery"}
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {/* <h3 className="text-xl font-semibold">
              {language === "ru" && "CATL EVOGO - революционная технология"}
              {language === "uz" && "CATL EVOGO - inqilobiy texnologiya"}
              {language === "en" && "CATL EVOGO - revolutionary technology"}
            </h3> */}
            <p className="text-gray-600">
              {language === "ru" &&
                "Система быстрой замены батарей позволяет заменить энергоблок всего за 1 минуту, что быстрее заправки обычного автомобиля."}
              {language === "uz" &&
                "Batareyalarni tez almashtirish tizimi energiya blokini atigi 1 daqiqada almashtirish imkonini beradi, bu oddiy avtomobilni yoqilg'i quyishdan tezroq."}
              {language === "en" &&
                "The fast battery swapping system allows replacing the energy unit in just 1 minute, which is faster than refueling a regular car."}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">1</div>
                <div className="text-sm text-purple-700">
                  {language === "ru" && "минута замены"}
                  {language === "uz" && "daqiqa almashtirish"}
                  {language === "en" && "minute replacement"}
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">5</div>
                <div className="text-sm text-green-700">
                  {language === "ru" && "лет гарантии"}
                  {language === "uz" && "yil kafolat"}
                  {language === "en" && "years warranty"}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                {language === "ru" && "Технические характеристики:"}
                {language === "uz" && "Texnik xususiyatlar:"}
                {language === "en" && "Technical specifications:"}
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  {language === "ru" && "Модульная система из 2-х батарей"}
                  {language === "uz" && "2 ta batareyadan iborat modulli tizim"}
                  {language === "en" && "Modular system of 2 batteries"}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  {language === "ru" && "Автоматическая система замены"}
                  {language === "uz" && "Avtomatik almashtirish tizimi"}
                  {language === "en" && "Automatic replacement system"}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  {language === "ru" && "Совместимость с сетью станций"}
                  {language === "uz" && "Stantsiyalar tarmog'i bilan moslashuvchanlik"}
                  {language === "en" && "Compatibility with station network"}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  {language === "ru" && "Мониторинг состояния в реальном времени"}
                  {language === "uz" && "Real vaqtda holatni kuzatish"}
                  {language === "en" && "Real-time condition monitoring"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    solar: {
      title: t.advantages.solar.title,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sun className="w-12 h-12 text-yellow-600" />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              {language === "ru" && "Полная энергетическая независимость"}
              {language === "uz" && "To'liq energiya mustaqilligi"}
              {language === "en" && "Complete energy independence"}
            </h3>
            <p className="text-gray-600">
              {language === "ru" &&
                "Возможность зарядки от солнечных панелей делает Ecomobile полностью автономным и экологически чистым решением. Станции замены батарей могут работать на солнечной энергии, обеспечивая 100% возобновляемую энергию."}
              {language === "uz" &&
                "Quyosh panellaridan quvvatlash imkoniyati Ecomobile'ni to'liq avtonom va ekologik toza yechim qiladi. Batareya almashtirish stantsiyalari quyosh energiyasida ishlashi mumkin, bu 100% qayta tiklanadigan energiyani ta'minlaydi."}
              {language === "en" &&
                "The ability to charge from solar panels makes Ecomobile a completely autonomous and environmentally clean solution. Battery swap stations can run on solar energy, providing 100% renewable energy."}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600">100%</div>
                <div className="text-sm text-yellow-700">
                  {language === "ru" && "Возобновляемая энергия"}
                  {language === "uz" && "Qayta tiklanadigan energiya"}
                  {language === "en" && "Renewable energy"}
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">24/7</div>
                <div className="text-sm text-orange-700">
                  {language === "ru" && "Автономная работа"}
                  {language === "uz" && "Avtonom ish"}
                  {language === "en" && "Autonomous operation"}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                {language === "ru" && "Преимущества солнечной энергии:"}
                {language === "uz" && "Quyosh energiyasining afzalliklari:"}
                {language === "en" && "Solar energy advantages:"}
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  {language === "ru" && "Неисчерпаемый источник энергии"}
                  {language === "uz" && "Tugamaydigan energiya manbai"}
                  {language === "en" && "Inexhaustible energy source"}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  {language === "ru" && "Снижение зависимости от электросети"}
                  {language === "uz" && "Elektr tarmog'iga bog'liqlikni kamaytirish"}
                  {language === "en" && "Reducing dependence on power grid"}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  {language === "ru" && "Дополнительная экономия на электричестве"}
                  {language === "uz" && "Elektr energiyasida qo'shimcha tejash"}
                  {language === "en" && "Additional electricity savings"}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  {language === "ru" && "Возможность продажи излишков энергии"}
                  {language === "uz" && "Ortiqcha energiyani sotish imkoniyati"}
                  {language === "en" && "Possibility to sell excess energy"}
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mt-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">
                  {language === "ru" && "Окупаемость солнечных панелей:"}
                  {language === "uz" && "Quyosh panellarining o'zini oqlash muddati:"}
                  {language === "en" && "Solar panel payback period:"}
                </span>
                <span className="text-2xl font-bold text-green-600">
                  {language === "ru" && "2-3 года"}
                  {language === "uz" && "2-3 yil"}
                  {language === "en" && "2-3 years"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 inset-0 bg-gradient-to-br from-green-50/50 via-white to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                {/* <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  {language === "ru" && "Инновационная технология CATL"}
                  {language === "uz" && "CATL innovatsion texnologiyasi"}
                  {language === "en" && "Innovative CATL technology"}
                </Badge> */}
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">{t.hero.title}</h1>
                <p className="text-xl text-gray-600 leading-relaxed">{t.hero.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                      {t.hero.buyButton}
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>{t.orderForm.title}</DialogTitle>
                      <DialogDescription>{t.orderForm.description}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t.orderForm.name}</Label>
                        <Input id="name" placeholder={t.orderForm.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t.orderForm.phone}</Label>
                        <Input id="phone" placeholder="+998 90 123 45 67" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t.orderForm.email}</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">{t.orderForm.message}</Label>
                        <Textarea id="message" placeholder={t.orderForm.message} />
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700">{t.orderForm.submit}</Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={isInvestorModalOpen} onOpenChange={setIsInvestorModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-8 py-3 border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      {t.hero.forInvestors}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>{t.investorModal.title}</DialogTitle>
                      <DialogDescription>{t.investorModal.description}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">{t.investorModal.company}</Label>
                        <Input
                          id="company"
                          placeholder={
                            language === "ru"
                              ? "Название компании"
                              : language === "uz"
                                ? "Kompaniya nomi"
                                : "Company name"
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">{t.investorModal.position}</Label>
                        <Input
                          id="position"
                          placeholder={
                            language === "ru"
                              ? "Ваша должность"
                              : language === "uz"
                                ? "Sizning lavozimingiz"
                                : "Your position"
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="investment">{t.investorModal.investmentAmount}</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={t.investorModal.selectRange} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="100k">$100K - $500K</SelectItem>
                            <SelectItem value="500k">$500K - $1M</SelectItem>
                            <SelectItem value="1m">$1M - $5M</SelectItem>
                            <SelectItem value="5m">$5M+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="investor-message">{t.investorModal.message}</Label>
                        <Textarea id="investor-message" placeholder={t.investorModal.messagePlaceholder} />
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">{t.investorModal.submit}</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src="/images/ecotruck.jpeg"
                  alt={
                    language === "ru"
                      ? "Электромобиль Ecomobile"
                      : language === "uz"
                        ? "Ecomobile elektromobili"
                        : "Ecomobile Electric Vehicle"
                  }
                  className="rounded-2xl object-cover w-full h-full"
                />
              </div>
              {/* <div className="absolute -bottom-6 -right-2 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Battery className="w-6 h-6 text-green-600" />
                  <span className="font-semibold">
                    {language === "ru" && "Замена за 1 мин"}
                    {language === "uz" && "1 daqiqada almashtirish"}
                    {language === "en" && "1-min swap"}
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {language === "ru" && "Модели"}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {" "}
                Ecomobile
                {" "}
              </span>
              {language === "uz" && "Modellari"}
              {language === "en" && "Models"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === "ru" && "Ознакомьтесь с разнообразием наших электромобилей, разработанных для различных задач"}
              {language === "uz" && "Turli vazifalar uchun mo'ljallangan elektromobillarimizning xilma-xilligi bilan tanishing"}
              {language === "en" && "Explore our range of electric vehicles designed for various tasks"}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center transition-opacity duration-1000 ease-in-out" key={currentModel.id}> {/* Key and transition for the whole block */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">{currentModel.translations[language as keyof typeof currentModel.translations].name}</h3>
              <p className="text-lg text-gray-600 leading-relaxed">{currentModel.translations[language as keyof typeof currentModel.translations].description}</p>

              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-gray-900">
                  {language === "ru" && "Технические характеристики"}
                  {language === "uz" && "Texnik xususiyatlar"}
                  {language === "en" && "Technical Specifications"}
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {currentModel.translations[language as keyof typeof currentModel.translations].dimensions}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {currentModel.translations[language as keyof typeof currentModel.translations].cargoVolume}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {currentModel.translations[language as keyof typeof currentModel.translations].maxPayload}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {currentModel.translations[language as keyof typeof currentModel.translations].maxSpeed}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {currentModel.translations[language as keyof typeof currentModel.translations].rangePerCharge}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {currentModel.translations[language as keyof typeof currentModel.translations].batterySwapTime}
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-gray-900">{currentModel.translations[language as keyof typeof currentModel.translations].features.title}</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {currentModel.translations[language as keyof typeof currentModel.translations].features.climateControl}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {currentModel.translations[language as keyof typeof currentModel.translations].features.navigation}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {currentModel.translations[language as keyof typeof currentModel.translations].features.camera}
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <img
                src={currentModel.image}
                alt={currentModel.translations[language as keyof typeof currentModel.translations].name}
                className="rounded-2xl object-cover w-full h-full" // Removed opacity/transform from img
              />
              <div className="mt-6 text-center">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                >
                  {currentModel.translations[language as keyof typeof currentModel.translations].learnMore}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Swap Network Station Map Section */}
      <section className="py-12 md:py-24"> {/* Убран bg-gray-50 отсюда */}
        {isMobile ? (
          <div className="container mx-auto"> {/* bg-gray-50 для мобильных */}
            {/* Заголовок */}
            <div className="text-center mb-8 px-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{t.swapNetwork.title}</h2>
              <p className="text-base text-gray-600">{t.swapNetwork.subtitle}</p>
            </div>

            {/* Карта */}
            <div className="w-full rounded-2xl overflow-hidden shadow-md mb-4 h-[300px]"> {/* Фиксированная высота для мобильных */}
              <YandexMap />
            </div>

            {/* Информация о точках (перенесена вниз) */}
            <div className="bg-white rounded-2xl shadow-md p-4 mb-8"> {/* Убран mx-4 */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.swapNetwork.locations.title}</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  {t.swapNetwork.locations.active} (42)
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                  {t.swapNetwork.locations.comingSoon} (18)
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  {t.swapNetwork.locations.planned} (35)
                </li>
              </ul>
              <Button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white text-sm">
                {t.swapNetwork.findNearest}
              </Button>
            </div>

            {/* Хайлайты */}
            <div className="text-center px-4 mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {t.swapNetwork.highlights.title}
              </h3>
              <div className="grid grid-cols-1 gap-4"> {/* Сетка 1 колонка для мобильных */}
                <Card className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-green-600">
                    {t.swapNetwork.highlights.activeStations.number}
                  </div>
                  <p className="text-sm text-gray-600">{t.swapNetwork.highlights.activeStations.label}</p>
                </Card>
                <Card className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">
                    {t.swapNetwork.highlights.citiesCovered.number}
                  </div>
                  <p className="text-sm text-gray-600">{t.swapNetwork.highlights.citiesCovered.label}</p>
                </Card>
                <Card className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">
                    {t.swapNetwork.highlights.uptimeReliability.number}
                  </div>
                  <p className="text-sm text-gray-600">{t.swapNetwork.highlights.uptimeReliability.label}</p>
                </Card>
              </div>
              <p className="text-sm text-gray-700 mt-6">
                {t.swapNetwork.highlights.description}
              </p>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4"> {/* bg-gray-50 для десктопа */}
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t.swapNetwork.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.swapNetwork.subtitle}</p>
            </div>

            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden mb-16 aspect-video"> {/* aspect-video для десктопа */}
              <YandexMap /> {/* Карта */}
              <div className="absolute top-3 left-3 sm:top-6 sm:left-6 md:top-8 md:left-8 bg-white rounded-xl p-4 sm:p-6 shadow-xl"> {/* Абсолютное позиционирование для десктопа */}
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.swapNetwork.locations.title}</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    {t.swapNetwork.locations.active} (42)
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                    {t.swapNetwork.locations.comingSoon} (18)
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    {t.swapNetwork.locations.planned} (35)
                  </li>
                </ul>
                <Button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white">
                  {t.swapNetwork.findNearest}
                </Button>
              </div>
            </div>

            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">{t.swapNetwork.highlights.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Сетка 3 колонки для десктопа */}
                <Card className="border-0 shadow-xl bg-white rounded-xl p-6 text-center bg-gradient-to-br from-green-300/60 to-white">
                  <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-2">{t.swapNetwork.highlights.activeStations.number}</div>
                  <p className="text-gray-600">{t.swapNetwork.highlights.activeStations.label}</p>
                </Card>
                <Card className="border-0 shadow-lg bg-white rounded-xl p-6 text-center bg-gradient-to-br from-blue-300/60 to-white">
                  <div className="text-5xl font-bold text-blue-600 mb-2">{t.swapNetwork.highlights.citiesCovered.number}</div>
                  <p className="text-gray-600">{t.swapNetwork.highlights.citiesCovered.label}</p>
                </Card>
                <Card className="border-0 shadow-lg bg-white rounded-xl p-6 text-center bg-gradient-to-br from-purple-300/60 to-white">
                  <div className="text-5xl font-bold text-purple-600 mb-2">{t.swapNetwork.highlights.uptimeReliability.number}</div>
                  <p className="text-gray-600">{t.swapNetwork.highlights.uptimeReliability.label}</p>
                </Card>
              </div>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto mt-12">{t.swapNetwork.highlights.description}</p>
            </div>
          </div>
        )}
      </section>


      {/* Advantages Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white to-blue-50/30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            {/* <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-medium mb-6">
              <Leaf className="w-4 h-4 mr-2" />
              {language === "ru" && "Технология CATL EVOGO"}
              {language === "uz" && "CATL EVOGO texnologiyasi"}
              {language === "en" && "CATL EVOGO Technology"}
            </div> */}
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {language === "ru" && "Преимущества"}
              {language === "en" && "Advantages of"}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {" "}
                Ecomobile
              </span>
              {language === "uz" && " Afzalliklari"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t.advantages.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Main Feature Card */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-2xl bg-white"> {/* Stronger gradient background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full -translate-y-32 translate-x-32 opacity-30 blur-xl"></div> {/* Adjusted opacity and blur */}
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-50 rounded-full translate-y-24 -translate-x-24 opacity-30 blur-xl"></div> {/* Adjusted opacity and blur */}
                <CardContent className="p-6 md:p-12 relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center h-full"> {/* Adjusted padding, added responsive grid, adjusted gap */}
                  <div className="h-full flex flex-col justify-center space-y-6 md:pr-8"> {/* Removed fixed pr-8, added responsive pr-8 */}
                    <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-dark"> {/* Adjusted font size for responsiveness */}
                      {language === "ru" && "Технология быстрой замены батареи"}
                      {language === "uz" && "Batareyani tez almashtirish texnologiyasi"}
                      {language === "en" && "Fast Battery Swapping Technology"}
                    </h3>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6"> {/* Adjusted font size for responsiveness */}
                      {language === "ru" && "Революционная система позволяет заменить энергоблок всего за 1 минуту, что быстрее заправки обычного автомобиля."}
                      {language === "uz" && "Batareyalarni tez almashtirish tizimi energiya blokini atigi 1 daqiqada almashtirish imkonini beradi, bu oddiy avtomobilni yoqilg'i quyishdan tezroq."}
                      {language === "en" && "The fast battery swapping system allows replacing the energy unit in just 1 minute, which is faster than refueling a regular car."}
                    </p>
                    <div className="flex items-center space-x-4 md:space-x-6 pt-4 border-t border-white/30"> {/* Adjusted space-x for responsiveness */}
                      <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold">1</div> {/* Adjusted font size for responsiveness */}
                        <div className="text-sm mt-1">
                          {language === "ru" && "минута"}
                          {language === "uz" && "daqiqa"}
                          {language === "en" && "minute"}
                        </div>
                      </div>
                      <div className="w-0.5 h-12 bg-white/30"></div>
                      <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold ">24/7</div> {/* Adjusted font size for responsiveness */}
                        <div className="text-sm mt-1">
                          {language === "ru" && "доступность"}
                          {language === "uz" && "mavjudlik"}
                          {language === "en" && "availability"}
                        </div>
                      </div>
                      <div className="w-0.5 h-12 bg-white/30"></div>
                      <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold">300+</div> {/* Adjusted font size for responsiveness */}
                        <div className="text-sm mt-1">
                          {language === "ru" && "км запас хода"}
                          {language === "uz" && "km masofa"}
                          {language === "en" && "km range"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-full flex items-center justify-center md:pl-8"> {/* Removed fixed pl-8, added responsive pl-8 */}
                    <img
                      src="images/swapsystem.png"
                      alt={
                        language === "ru"
                          ? "Система быстрой замены батареи"
                          : language === "uz"
                            ? "Batareyani tez almashtirish tizimi"
                            : "Battery Swapping System"
                      }
                      className="object-cover rounded-2xl w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature Cards Grid */}
            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 -translate-y-2 hover:-translate-y-3 bg-gradient-to-br from-white to-green-100/60 flex flex-col">
              <CardContent className="p-8 flex-1 flex flex-col">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.advantages.eco.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 flex-1">{t.advantages.eco.description}</p>
                <button
                  onClick={() => setAdvantageModal("eco")}
                  className="flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors mt-auto"
                >
                  <span>{t.advantages.eco.learnMore}</span>
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 -translate-y-2 hover:-translate-y-3 bg-gradient-to-br from-white to-blue-100/90 flex flex-col">
              <CardContent className="p-8 flex-1 flex flex-col">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.advantages.economy.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 flex-1">{t.advantages.economy.description}</p>
                <button
                  onClick={() => setIsCalculatorModalOpen(true)}
                  className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors mt-auto"
                >
                  <span>{t.advantages.economy.calculate}</span>
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 -translate-y-5 hover:-translate-y-6 bg-gradient-to-br from-white to-yellow-100/60 flex flex-col">
              <CardContent className="p-8 flex-1 flex flex-col">
                <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sun className="w-7 h-7 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.advantages.solar.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 flex-1">{t.advantages.solar.description}</p>
                <button
                  onClick={() => setAdvantageModal("solar")}
                  className="flex items-center text-yellow-600 font-semibold hover:text-yellow-700 transition-colors mt-auto"
                >
                  <span>{t.advantages.solar.learnMore}</span>
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 -translate-y-5 hover:-translate-y-6 bg-gradient-to-br from-white to-purple-100/90 flex flex-col">
              <CardContent className="p-8 flex-1 flex flex-col">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.advantages.reliability.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 flex-1">
                  {t.advantages.reliability.description}
                </p>
                <button
                  onClick={() => setAdvantageModal("battery")}
                  className="flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors mt-auto"
                >
                  <span>{t.advantages.reliability.guarantees}</span>
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden"> {/* Изменен фон секции */}
        {/* Removed the placeholder background image as it's not in the reference image */}
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{t.calculator.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.calculator.subtitle}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start bg-white p-8 rounded-3xl shadow-xl"> {/* Общая структура двух колонок */}
              {/* Input Your Details (Left Column) */}
              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="p-0 space-y-6"> {/* Added space-y for consistent spacing */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.calculator.inputDetails}</h3> {/* Adjusted mb */}
                  <div className="space-y-6">
                    {/* Fleet Size */}
                    <div className="space-y-2">
                      <Label htmlFor="fleet-size" className="text-lg font-medium">{t.calculator.fleetSize}</Label>
                      <Input
                        id="fleet-size"
                        type="number"
                        min="1"
                        value={calculatorData.fleetSize}
                        onChange={(e) => setCalculatorData({ ...calculatorData, fleetSize: Number(e.target.value) })}
                        className="w-full border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500" // Styled input
                      />
                    </div>

                    {/* Average Daily Distance */}
                    <div className="space-y-2">
                      <Label htmlFor="average-daily-distance" className="text-lg font-medium">{t.calculator.averageDailyDistance}</Label>
                      <Input
                        id="average-daily-distance"
                        type="number"
                        min="10"
                        value={calculatorData.averageDailyDistance}
                        onChange={(e) => setCalculatorData({ ...calculatorData, averageDailyDistance: Number(e.target.value) })}
                        className="w-full border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500" // Styled input
                      />
                    </div>

                    {/* Operating Days per Week */}
                    <div className="space-y-2">
                      <Label htmlFor="operating-days" className="text-lg font-medium">{t.calculator.operatingDaysPerWeek}</Label>
                      <Input
                        id="operating-days"
                        type="number"
                        min="1"
                        max="7"
                        value={calculatorData.operatingDaysPerWeek}
                        onChange={(e) => setCalculatorData({ ...calculatorData, operatingDaysPerWeek: Number(e.target.value) })}
                        className="w-full border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500" // Styled input
                      />
                    </div>

                    {/* Current Vehicle Type */}
                    <div className="space-y-2">
                      <Label className="text-lg font-medium">{t.calculator.currentVehicleType}</Label> {/* Removed mb-3, space-y will handle it */}
                      <RadioGroup
                        defaultValue="diesel"
                        value={calculatorData.vehicleType}
                        onValueChange={(value) => setCalculatorData({ ...calculatorData, vehicleType: value as 'diesel' | 'gasoline' })}
                        className="flex space-x-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="diesel" id="diesel" />
                          <Label htmlFor="diesel">{t.calculator.diesel}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="gasoline" id="gasoline" />
                          <Label htmlFor="gasoline">{t.calculator.gasoline}</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white mt-6 py-3 rounded-md">
                      {t.calculator.calculateSavingsButton}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Your Estimated Savings (Right Column) */}
              <Card className="border-0 shadow-none bg-transparent pt-8 lg:pt-0 border-l lg:border-l-gray-200 lg:pl-12"> {/* Добавлен разделитель для десктопа */}
                <CardContent className="p-0 space-y-6"> {/* Added space-y for consistent spacing */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">{t.calculator.estimatedSavings}</h3>
                  <div className="space-y-6"> {/* Adjusted space-y to match image */}
                    {/* Monthly Fuel/Energy Cost Savings */}
                    <div>
                      <p className="text-gray-500 text-sm mb-1">{t.calculator.monthlyFuelEnergyCostSavings}</p> {/* Adjusted text size */}
                      <div className="text-4xl font-bold text-green-600">${savings.monthlyFuelEnergyCostSavings}</div>
                    </div>

                    {/* Annual CO2 Reduction */}
                    <div>
                      <p className="text-gray-500 text-sm mb-1">{t.calculator.annualCO2Reduction}</p> {/* Adjusted text size */}
                      <div className="text-4xl font-bold text-gray-900">{savings.annualCO2Reduction} {t.calculator.tons}</div>
                    </div>

                    {/* 5-Year Total Savings */}
                    <div>
                      <p className="text-gray-500 text-sm mb-1">{t.calculator.fiveYearTotalSavings}</p> {/* Adjusted text size */}
                      <div className="text-4xl font-bold text-green-600">${savings.fiveYearTotalSavings}</div>
                    </div>

                    {/* Estimated ROI Period */}
                    <div>
                      <p className="text-gray-500 text-sm mb-1">{t.calculator.estimatedROIPeriod}</p> {/* Adjusted text size */}
                      <div className="text-4xl font-bold text-gray-900">{savings.estimatedROIPeriod} {t.calculator.years}</div>
                    </div>

                    <p className="text-xs text-gray-500 mt-8">{t.calculator.calculationDisclaimer}</p> {/* Adjusted text size */}

                    <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 mt-6 py-3 rounded-md">
                      {t.calculator.downloadDetailedReport}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-green-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-6">
              <Users className="w-4 h-4 mr-2" />
              {language === "ru" && "Области применения"}
              {language === "uz" && "Qo'llash sohalari"}
              {language === "en" && "Applications"}
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t.applications.title}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                {language === "ru" && "любого бизнеса"}
                {language === "uz" && "har qanday biznes"}
                {language === "en" && "any business"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.applications.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group relative h-80">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 bg-white h-full flex flex-col">
                <CardContent className="p-8 text-center flex-1 flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t.applications.delivery.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-1">{t.applications.delivery.description}</p>
                </CardContent>
              </Card>
            </div>

            <div className="group relative h-80">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 bg-white h-full flex flex-col">
                <CardContent className="p-8 text-center flex-1 flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t.applications.services.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-1">{t.applications.services.description}</p>
                </CardContent>
              </Card>
            </div>

            <div className="group relative h-80">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 bg-white h-full flex flex-col">
                <CardContent className="p-8 text-center flex-1 flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t.applications.trade.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-1">{t.applications.trade.description}</p>
                </CardContent>
              </Card>
            </div>

            <div className="group relative h-80">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 bg-white h-full flex flex-col">
                <CardContent className="p-8 text-center flex-1 flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t.applications.municipal.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-1">{t.applications.municipal.description}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">{t.cta.title}</h2>
            <p className="text-xl text-green-100 mb-8">{t.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                {t.cta.orderButton}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100  px-8 py-3"
              >
                {t.cta.learnMore}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Advantage Modals */}
      {advantageModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setAdvantageModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {advantageModals[advantageModal as keyof typeof advantageModals]?.title}
                </h2>
                <button
                  onClick={() => setAdvantageModal(null)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              {advantageModals[advantageModal as keyof typeof advantageModals]?.content}
            </div>
          </div>
        </div>
      )}

      {/* Calculator Modal - Removed */}
      {/* {isCalculatorModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsCalculatorModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{t.calculator.title}</h2>
                <button
                  onClick={() => setIsCalculatorModalOpen(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="modal-distance" className="text-lg font-medium">
                      {t.calculator.dailyDistance}: {calculatorData.averageDailyDistance} км
                    </Label>
                    <Input
                      id="modal-distance"
                      type="range"
                      min="50"
                      max="300"
                      value={calculatorData.averageDailyDistance}
                      onChange={(e) => setCalculatorData({ ...calculatorData, averageDailyDistance: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="modal-fuel-price" className="text-lg font-medium">
                      {t.calculator.fuelPrice}: ${calculatorData.fuelPrice}/л
                    </Label>
                    <Input
                      id="modal-fuel-price"
                      type="range"
                      min="1"
                      max="3"
                      step="0.1"
                      value={calculatorData.fuelPrice}
                      onChange={(e) => setCalculatorData({ ...calculatorData, fuelPrice: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="modal-electric-price" className="text-lg font-medium">
                      {t.calculator.electricityPrice}: ${calculatorData.electricityPrice}/кВт·ч
                    </Label>
                    <Input
                      id="modal-electric-price"
                      type="range"
                      min="0.05"
                      max="0.3"
                      step="0.01"
                      value={calculatorData.electricityPrice}
                      onChange={(e) =>
                        setCalculatorData({ ...calculatorData, electricityPrice: Number(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-red-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-red-700 font-medium">{t.calculator.regularCar}</span>
                      <Truck className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-3xl font-bold text-red-700 mb-1">${savings.fuelCost}</div>
                    <p className="text-sm text-red-600">{t.calculator.monthlyExpenses}</p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-700 font-medium">{t.calculator.ecoMobile}</span>
                      <Battery className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-700 mb-1">${savings.electricCost}</div>
                    <p className="text-sm text-green-600">{t.calculator.monthlyExpenses}</p>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-700 font-bold">{t.calculator.yourSavings}</span>
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-4xl font-bold text-blue-700 mb-1">${savings.savings}</div>
                    <p className="text-sm text-blue-600 mb-3">{t.calculator.everyMonth}</p>
                    <div className="pt-3 border-t border-blue-200">
                      <p className="text-blue-600">
                        {t.calculator.perYear}:{" "}
                        <span className="font-bold">${(Number(savings.savings) * 12).toFixed(0)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Script for Yandex Maps API */}
      {/* <Script
        src="https://api-maps.yandex.ru/2.1/?apikey=ac2e95bf-f199-4184-937d-24722f5cc478&lang=ru_RU"
        strategy="beforeInteractive"
      /> */}
    </div>
  )
}
