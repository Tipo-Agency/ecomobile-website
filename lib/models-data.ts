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
];

export const getModelById = (id: string): ModelData | undefined => {
  return modelsData.find(model => model.id === id);
};

export const getAllModels = (): ModelData[] => {
  return modelsData;
}; 