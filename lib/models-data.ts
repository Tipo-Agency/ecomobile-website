export interface ModelData {
  id: string;
  image: string;
  translations: {
    ru: ModelTranslation;
    uz: ModelTranslation;
    en: ModelTranslation;
  };
}

export interface ModelTranslation {
    name: string;
    description: string;
    dimensions: string;
    cargoVolume: string;
    maxPayload: string;
    maxSpeed: string;
    rangePerCharge: string;
    batterySwapTime: string;
    power: string;
    torque: string;
    driveType: string;
    suspension: string;
    brakes: string;
    clearance: string;
    climbAbility: string;
    features: {
      title: string;
      climateControl: string;
      navigation: string;
      camera: string;
    };
    learnMore: string;
  }
  

export const modelsData: ModelData[] = [
  {
    id: "cargo",
    image: "/images/cargo.jpeg",
    translations: {
        ru: {
          name: "CarGo",
          description: "Компактный электрический грузовик для городской логистики и доставки.",
          dimensions: "Длина: 3.82 м | Ширина: 1.48 м | Высота: 1.705 м",
          cargoVolume: "Размер грузового отсека: 2.015 × 1.4 × 1.2 м",
          maxPayload: "Макс. полезная нагрузка: 540 кг",
          maxSpeed: "Максимальная скорость: 70 км/ч",
          rangePerCharge: "Запас хода на одном заряде: 80–140 км",
          batterySwapTime: "Тип батареи: Литий-железо-фосфатная (BMS)",
          power: "Мощность: 15/30 кВт (номинальная/макс.)",
          torque: "Крутящий момент: 130 Н·м",
          driveType: "Привод: Задний",
          suspension: "Подвеска: Макферсон / листовая рессора",
          brakes: "Тормоза: Диск / Барабан",
          clearance: "Дорожный просвет: 144 мм",
          climbAbility: "Преодолеваемый уклон: ≥20%",
          features: {
            title: "Особенности",
            climateControl: "Удобный салон с вентиляцией",
            navigation: "Базовая система навигации и мониторинга маршрута",
            camera: "Зеркала заднего вида и хорошая обзорность для манёвров",
          },
          learnMore: "Подробнее",
        },
        uz: {
          name: "CarGo",
          description: "Shahar logistikasi va yetkazib berish uchun ixcham elektr yuk mashinasi.",
          dimensions: "Uzunligi: 3.82 m | Kengligi: 1.48 m | Balandligi: 1.705 m",
          cargoVolume: "Yuk bo‘limi o‘lchami: 2.015 × 1.4 × 1.2 m",
          maxPayload: "Maks. foydali yuk: 540 kg",
          maxSpeed: "Maksimal tezlik: 70 km/soat",
          rangePerCharge: "Bir zaryadda yurish masofasi: 80–140 km",
          batterySwapTime: "Batareya turi: Lityum temir fosfat (BMS)",
          power: "Quvvat: 15/30 kVt (nominal/maksimal)",
          torque: "Buralish momenti: 130 N·m",
          driveType: "Haydov tizimi: Orqa g‘ildirak",
          suspension: "Osma: Makferson / listli ressora",
          brakes: "Tormozlar: Disk / Baraban",
          clearance: "Yo‘l bo‘shlig‘i: 144 mm",
          climbAbility: "Ko‘tarilish qobiliyati: ≥20%",
          features: {
            title: "Xususiyatlar",
            climateControl: "Ventilyatsiyali qulay kabina",
            navigation: "Asosiy navigatsiya va marshrut monitoringi tizimi",
            camera: "Manevr qilish uchun keng ko‘rinishli orqa ko‘zgular",
          },
          learnMore: "Batafsil",
        },
        en: {
          name: "CarGo",
          description: "Compact electric truck for urban logistics and delivery.",
          dimensions: "Length: 3.82m | Width: 1.48m | Height: 1.705m",
          cargoVolume: "Cargo Compartment Size: 2.015 × 1.4 × 1.2 m",
          maxPayload: "Maximum Payload: 540 kg",
          maxSpeed: "Maximum Speed: 70 km/h",
          rangePerCharge: "Range per Charge: 80–140 km",
          batterySwapTime: "Battery Type: Lithium Iron Phosphate (BMS)",
          power: "Power Output: 15/30 kW (nominal/peak)",
          torque: "Max Torque: 130 Nm",
          driveType: "Drive Type: Rear-Wheel Drive",
          suspension: "Suspension: MacPherson / Leaf Spring",
          brakes: "Brakes: Disc / Drum",
          clearance: "Ground Clearance: 144 mm",
          climbAbility: "Gradeability: ≥20%",
          features: {
            title: "Features",
            climateControl: "Comfortable Cabin with Ventilation",
            navigation: "Basic Navigation & Route Monitoring System",
            camera: "Wide Rear Mirrors for Urban Maneuvering",
          },
          learnMore: "Learn More",
        },
      },
  },
  {
    id: "ikki",
    image: "/images/ikki.jpg",
    translations: {
      ru: {
        name: "IKKI",
        description: "Электрический компактный автомобиль для комфортных поездок по городу",
        dimensions: "Длина: 2м | Ширина: 1.2м | Высота: 1.5м",
        cargoVolume: "Объем груза: 12.0м³",
        maxPayload: "Макс. полезная нагрузка: 2,500кг",
        maxSpeed: "Максимальная скорость: 110 км/ч",
        rangePerCharge: "Запас хода на одном заряде: 300 км",
        batterySwapTime: "Время замены батареи: 1 минуты",
        power: "Мощность: 15/30 кВт (номинальная/макс.)",
        torque: "Крутящий момент: 130 Н·м",
        driveType: "Привод: Задний",
        suspension: "Подвеска: Макферсон / листовая рессора",
        brakes: "Тормоза: Диск / Барабан",
        clearance: "Дорожный просвет: 144 мм",
        climbAbility: "Преодолеваемый уклон: ≥20%",
        features: {
          title: "Особенности",
          climateControl: "Зональный климат-контроль",
          navigation: "Интегрированная навигация с оптимизацией маршрутов",
          camera: "Система камер кругового обзора с парковочным ассистентом",
        },
        learnMore: "Подробнее",
      },
      uz: {
        name: "IKKI",
        description: "Qulay shahar sayohatlari uchun elektr ixcham avtomobil",
        dimensions: "Uzunligi: 2.0m | Kengligi: 1.2m | Balandligi: 1.5m",
        cargoVolume: "Yuk hajmi: 12.0m³",
        maxPayload: "Maks. foydali yuk: 2,500kg",
        maxSpeed: "Maksimal tezlik: 110 km/soat",
        rangePerCharge: "Bir zaryadda yurish masofasi: 300 km",
        batterySwapTime: "Batareya almashtirish vaqti: 1 daqiqa",
        power: "Quvvat: 15/30 kVt (nominal/maksimal)",
        torque: "Buralish momenti: 130 N·m",
        driveType: "Haydov tizimi: Orqa g‘ildirak",
        suspension: "Osma: Makferson / listli ressora",
        brakes: "Tormozlar: Disk / Baraban",
        clearance: "Yo‘l bo‘shlig‘i: 144 mm",
        climbAbility: "Ko‘tarilish qobiliyati: ≥20%",
        features: {
          title: "Xususiyatlar",
          climateControl: "Zonali iqlim nazorati",
          navigation: "Marshrutni optimallashtirish bilan integratsiyalashgan navigatsiya",
          camera: "Avtoturargoh yordamchisi bilan to'liq ko'rish kamerasi tizimi",
        },
        learnMore: "Batafsil",
      },
      en: {
        name: "IKKI",
        description: "Electric compact car for comfortable city trips.",
        dimensions: "Length: 2.0m | Width: 1.2m | Height: 1.5m",
        cargoVolume: "Cargo Volume: 12.0m³",
        maxPayload: "Maximum Payload: 2,500kg",
        maxSpeed: "Maximum Speed: 110 km/h",
        rangePerCharge: "Range per Charge: 300 km",
        batterySwapTime: "Battery Swap Time: 1 minute",
        power: "Power Output: 15/30 kW (nominal/peak)",
        torque: "Max Torque: 130 Nm",
        driveType: "Drive Type: Rear-Wheel Drive",
        suspension: "Suspension: MacPherson / Leaf Spring",
        brakes: "Brakes: Disc / Drum",
        clearance: "Ground Clearance: 144 mm",
        climbAbility: "Gradeability: ≥20%",
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
    id: "yuki",
    image: "/images/yuki.jpg",
    translations: {
      ru: {
        name: "YUKI",
        description: "Компактный и маневренный электромобиль для городского использования.",
        dimensions: "Длина: 3.5м | Ширина: 1.6м | Высота: 1.5м",
        cargoVolume: "Объем груза: 1.0м³",
        maxPayload: "Макс. полезная нагрузка: 200кг",
        maxSpeed: "Максимальная скорость: 80 км/ч",
        rangePerCharge: "Запас хода на одном заряде: 150 км",
        batterySwapTime: "Время замены батареи: 1 минута",
        power: "Мощность: 15/30 кВт (номинальная/макс.)",
        torque: "Крутящий момент: 130 Н·м",
        driveType: "Привод: Задний",
        suspension: "Подвеска: Макферсон / листовая рессора",
        brakes: "Тормоза: Диск / Барабан",
        clearance: "Дорожный просвет: 144 мм",
        climbAbility: "Преодолеваемый уклон: ≥20%",
        features: {
          title: "Особенности",
          climateControl: "Эффективный климат-контроль",
          navigation: "Интегрированный GPS-навигатор",
          camera: "Задняя камера для удобной парковки",
        },
        learnMore: "Подробнее",
      },
      uz: {
        name: "YUKI",
        description: "Shahar sharoitida foydalanish uchun ixcham va manevrli elektromobil.",
        dimensions: "Uzunligi: 3.5m | Kengligi: 1.6m | Balandligi: 1.5m",
        cargoVolume: "Yuk hajmi: 1.0m³",
        maxPayload: "Maks. foydali yuk: 200kg",
        maxSpeed: "Maksimal tezlik: 80 km/soat",
        rangePerCharge: "Bir zaryadda yurish masofasi: 150 km",
        batterySwapTime: "Batareya almashtirish vaqti: 1 daqiqa",
        power: "Quvvat: 15/30 kVt (nominal/maksimal)",
        torque: "Buralish momenti: 130 N·m",
        driveType: "Haydov tizimi: Orqa g‘ildirak",
        suspension: "Osma: Makferson / listli ressora",
        brakes: "Tormozlar: Disk / Baraban",
        clearance: "Yo‘l bo‘shlig‘i: 144 mm",
        climbAbility: "Ko‘tarilish qobiliyati: ≥20%",
        features: {
          title: "Xususiyatlar",
          climateControl: "Samarali iqlim nazorati",
          navigation: "Integratsiyalashgan GPS-navigator",
          camera: "Qulay avtoturargoh uchun orqa kamera",
        },
        learnMore: "Batafsil",
      },
      en: {
        name: "YUKI",
        description: "Compact and maneuverable electric vehicle for urban use.",
        dimensions: "Length: 3.5m | Width: 1.6m | Height: 1.5m",
        cargoVolume: "Cargo Volume: 1.0m³",
        maxPayload: "Maximum Payload: 200kg",
        maxSpeed: "Maximum Speed: 80 km/h",
        rangePerCharge: "Range per Charge: 150 km",
        batterySwapTime: "Battery Swap Time: 1 minute",
        power: "Power Output: 15/30 kW (nominal/peak)",
        torque: "Max Torque: 130 Nm",
        driveType: "Drive Type: Rear-Wheel Drive",
        suspension: "Suspension: MacPherson / Leaf Spring",
        brakes: "Brakes: Disc / Drum",
        clearance: "Ground Clearance: 144 mm",
        climbAbility: "Gradeability: ≥20%",
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
];

export const getModelById = (id: string): ModelData | undefined => {
  return modelsData.find(model => model.id === id);
};

export const getAllModels = (): ModelData[] => {
  return modelsData;
}; 