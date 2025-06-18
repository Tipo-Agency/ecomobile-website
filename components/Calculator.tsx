"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useLanguage } from "@/contexts/language-context"

export default function CalculatorComponent() {
  const { language } = useLanguage()
  const [calculatorData, setCalculatorData] = useState({
    fleetSize: 5,
    averageDailyDistance: 120,
    operatingDaysPerWeek: 5,
    vehicleType: 'diesel', // 'diesel' or 'gasoline'
    dieselPrice: 1.5, // Price per liter
    gasolinePrice: 1.7, // Price per liter
    electricityPrice: 0.15, // Price per kWh
  })

  const translations = {
    ru: {
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
    uz: {
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
    en: {
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
      fuelCost: (totalAnnualFuelCost / 12).toFixed(0),
      electricCost: (totalAnnualElectricCost / 12).toFixed(0),
      savings: monthlySavings.toFixed(0),
    }
  }

  const savings = calculateSavings()

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{t.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start bg-white p-8 rounded-3xl shadow-xl items-center">
            {/* Input Your Details (Left Column) */}
            <Card className="border-0 shadow-none bg-transparent">
              <CardContent className="p-0 space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.inputDetails}</h3>
                <div className="space-y-6">
                  {/* Fleet Size */}
                  <div className="space-y-2">
                    <Label htmlFor="fleet-size" className="text-lg font-medium">{t.fleetSize}</Label>
                    <Input
                      id="fleet-size"
                      type="number"
                      min="1"
                      value={calculatorData.fleetSize}
                      onChange={(e) => setCalculatorData({ ...calculatorData, fleetSize: Number(e.target.value) })}
                      className="w-full border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  {/* Average Daily Distance */}
                  <div className="space-y-2">
                    <Label htmlFor="average-daily-distance" className="text-lg font-medium">{t.averageDailyDistance}</Label>
                    <Input
                      id="average-daily-distance"
                      type="number"
                      min="10"
                      value={calculatorData.averageDailyDistance}
                      onChange={(e) => setCalculatorData({ ...calculatorData, averageDailyDistance: Number(e.target.value) })}
                      className="w-full border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  {/* Operating Days per Week */}
                  <div className="space-y-2">
                    <Label htmlFor="operating-days" className="text-lg font-medium">{t.operatingDaysPerWeek}</Label>
                    <Input
                      id="operating-days"
                      type="number"
                      min="1"
                      max="7"
                      value={calculatorData.operatingDaysPerWeek}
                      onChange={(e) => setCalculatorData({ ...calculatorData, operatingDaysPerWeek: Number(e.target.value) })}
                      className="w-full border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  {/* Current Vehicle Type */}
                  <div className="space-y-2">
                    <Label className="text-lg font-medium">{t.currentVehicleType}</Label>
                    <RadioGroup
                      defaultValue="diesel"
                      value={calculatorData.vehicleType}
                      onValueChange={(value) => setCalculatorData({ ...calculatorData, vehicleType: value as 'diesel' | 'gasoline' })}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="diesel" id="diesel" />
                        <Label htmlFor="diesel">{t.diesel}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="gasoline" id="gasoline" />
                        <Label htmlFor="gasoline">{t.gasoline}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Estimated Savings (Right Column) */}
            <Card className="border-0 shadow-none bg-transparent pt-8 lg:pt-0 border-l lg:border-l-gray-200 lg:pl-12">
              <CardContent className="p-0 space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">{t.estimatedSavings}</h3>
                <div className="space-y-6">
                  {/* Monthly Fuel/Energy Cost Savings */}
                  <div>
                    <p className="text-gray-500 text-sm mb-1">{t.monthlyFuelEnergyCostSavings}</p>
                    <div className="text-4xl font-bold text-green-600">${savings.monthlyFuelEnergyCostSavings}</div>
                  </div>

                  {/* Annual CO2 Reduction */}
                  <div>
                    <p className="text-gray-500 text-sm mb-1">{t.annualCO2Reduction}</p>
                    <div className="text-4xl font-bold text-gray-900">{savings.annualCO2Reduction} {t.tons}</div>
                  </div>

                  {/* 5-Year Total Savings */}
                  <div>
                    <p className="text-gray-500 text-sm mb-1">{t.fiveYearTotalSavings}</p>
                    <div className="text-4xl font-bold text-green-600">${savings.fiveYearTotalSavings}</div>
                  </div>

                  {/* Estimated ROI Period */}
                  <div>
                    <p className="text-gray-500 text-sm mb-1">{t.estimatedROIPeriod}</p>
                    <div className="text-4xl font-bold text-gray-900">{savings.estimatedROIPeriod} {t.years}</div>
                  </div>

                  <p className="text-xs text-gray-500 mt-8">{t.calculationDisclaimer}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
