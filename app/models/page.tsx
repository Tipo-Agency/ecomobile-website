"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Battery, Route, Package, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import { getAllModels, getModelById, type ModelData } from "@/lib/models-data"
import Link from "next/link"
import { useSearchParams } from 'next/navigation'

export default function ModelsPage() {
  const { language } = useLanguage()
  const searchParams = useSearchParams()
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null)
  const [currentModelIndex, setCurrentModelIndex] = useState(0)
  const modelsData = getAllModels()

  // Получаем модель из URL hash при загрузке страницы
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      const model = getModelById(hash)
      if (model) {
        setSelectedModelId(hash)
        const index = modelsData.findIndex(m => m.id === hash)
        if (index !== -1) {
          setCurrentModelIndex(index)
        }
      }
    } else {
      setSelectedModelId(modelsData[0]?.id || null)
    }
  }, [modelsData])

  // Обновляем URL при изменении модели
  useEffect(() => {
    if (selectedModelId) {
      window.location.hash = selectedModelId
    }
  }, [selectedModelId])

  const currentModel = selectedModelId ? getModelById(selectedModelId) : modelsData[0]
  const currentTranslation = currentModel?.translations[language as keyof typeof currentModel.translations]

  const translations = {
    ru: {
      badge: "Модели",
      title: "Модели электромобилей",
      subtitle: "Исследуйте наш ассортимент электрических транспортных средств",
      overview: "Обзор моделей",
      specifications: "Технические характеристики",
      features: "Особенности",
      selectModel: "Выберите модель",
      viewDetails: "Подробнее",
      backToOverview: "Вернуться к обзору",
      nextModel: "Следующая модель",
      prevModel: "Предыдущая модель",
      cta: {
        title: "Нужна помощь с выбором модели?",
        subtitle: "Мы вам поможем! Свяжитесь с нами",
        contactButton: "Связаться",
       },
    },
    uz: {
      badge: "Modellar",
      title: "Elektromobil modellari",
      subtitle: "Bizning elektr transport vositalari assortimentini o'rganing",
      overview: "Modellar bo'yicha ma'lumot",
      specifications: "Texnik xususiyatlar",
      features: "Xususiyatlar",
      selectModel: "Modelni tanlang",
      viewDetails: "Batafsil",
      backToOverview: "Ma'lumotga qaytish",
      nextModel: "Keyingi model",
      prevModel: "Oldingi model",
      cta: {
        title: "Model tanlovida yordam kerakmi?",
        subtitle: "Biz sizga yordam beramiz! Biz bilan bog'laning",
        contactButton: "Bog'lanish",
       },
    },
    en: {
      badge: "Models",
      title: "Electric Vehicle Models",
      subtitle: "Explore our range of electric vehicles",
      overview: "Model Overview",
      specifications: "Technical Specifications",
      features: "Features",
      selectModel: "Select Model",
      viewDetails: "View Details",
      backToOverview: "Back to Overview",
      nextModel: "Next Model",
      prevModel: "Previous Model",
      cta: {
        title: "Need help choosing a model?",
        subtitle: "We will help you! Contact us",
        contactButton: "Contact",
       },
    },
  }

  const t = translations[language as keyof typeof translations] || translations.ru

  const handleModelSelect = (modelId: string) => {
    setSelectedModelId(modelId)
    const index = modelsData.findIndex(m => m.id === modelId)
    if (index !== -1) {
      setCurrentModelIndex(index)
    }
  }

  const handleNextModel = () => {
    const nextIndex = (currentModelIndex + 1) % modelsData.length
    setCurrentModelIndex(nextIndex)
    setSelectedModelId(modelsData[nextIndex].id)
  }

  const handlePrevModel = () => {
    const prevIndex = currentModelIndex === 0 ? modelsData.length - 1 : currentModelIndex - 1
    setCurrentModelIndex(prevIndex)
    setSelectedModelId(modelsData[prevIndex].id)
  }

  if (!currentModel || !currentTranslation) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Модель не найдена</h1>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mb-6">{t.badge}</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">{t.title}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
          </div>

          {/* Model Navigation */}
          {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
            {modelsData.map((model) => (
              <button
                key={model.id}
                onClick={() => handleModelSelect(model.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedModelId === model.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'
                }`}
              >
                {model.translations[language as keyof typeof model.translations].name}
              </button>
            ))}
          </div> */}
        </div>
      </section>

      {/* All Models Overview */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.overview}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === "ru" && "Сравните все наши модели электромобилей"}
              {language === "uz" && "Barcha elektromobil modellarimizni taqqoslang"}
              {language === "en" && "Compare all our electric vehicle models"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modelsData.map((model) => {
              const translation = model.translations[language as keyof typeof model.translations]
              return (
                <Card 
                  key={model.id} 
                  className={`border-0 shadow-xl bg-white rounded-xl cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                    selectedModelId === model.id ? 'ring-2 ring-green-500' : ''
                  }`}
                  onClick={() => handleModelSelect(model.id)}
                >
                  <CardContent className="p-6">
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <img
                        src={model.image}
                        alt={translation.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{translation.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{translation.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{translation.maxSpeed.split(':')[1].trim()}</span>
                      <Button className="bg-white border-[1.5px] border-green-600 text-green-600 hover:bg-green-600 hover:text-white" variant="outline" size="sm" onClick={() => document.getElementById("model")?.scrollIntoView({ behavior: "smooth" })}>
                        {t.viewDetails}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Model Details Section */}
      <section className="py-24 bg-white" id="model">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Model Image */}
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden ">
                <img
                  src={currentModel.image}
                  alt={currentTranslation.name}
                  className="rounded-2xl object-cover w-full h-full"
                />
              </div>
              
              {/* Navigation Arrows */}
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={handlePrevModel}
                  className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={handleNextModel}
                  className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <ArrowRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Model Information */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  {currentTranslation.name}
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900">{currentTranslation.name}</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{currentTranslation.description}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    {currentTranslation.maxSpeed.split(':')[1].trim()}
                  </div>
                  <div className="text-sm text-green-700">
                    {language === "ru" && "Макс. скорость"}
                    {language === "uz" && "Maks. tezlik"}
                    {language === "en" && "Max Speed"}
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">
                    {currentTranslation.rangePerCharge.split(':')[1].trim()}
                  </div>
                  <div className="text-sm text-blue-700">
                    {language === "ru" && "Запас хода"}
                    {language === "uz" && "Masofa"}
                    {language === "en" && "Range"}
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">
                    {currentTranslation.maxPayload.split(':')[1].trim()}
                  </div>
                  <div className="text-sm text-purple-700">
                    {language === "ru" && "Грузоподъемность"}
                    {language === "uz" && "Yuk ko'tarish"}
                    {language === "en" && "Payload"}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/buy?model=${currentModel.id}`}>
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                    {language === "ru" && "Купить"}
                    {language === "uz" && "Sotib olish"}
                    {language === "en" && "Buy"}
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contacts">
                  <Button variant="outline" size="lg" className="px-8 py-3">
                    {language === "ru" && "Связаться с нами"}
                    {language === "uz" && "Biz bilan bog'laning"}
                    {language === "en" && "Contact Us"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.specifications}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-xl bg-white rounded-xl">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === "ru" && "Размеры"}
                  {language === "uz" && "O'lchamlar"}
                  {language === "en" && "Dimensions"}
                </h3>
                <p className="text-gray-600">{currentTranslation.dimensions}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white rounded-xl">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Battery className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === "ru" && "Батарея"}
                  {language === "uz" && "Batareya"}
                  {language === "en" && "Battery"}
                </h3>
                <p className="text-gray-600">{currentTranslation.batterySwapTime}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white rounded-xl">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Route className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === "ru" && "Запас хода"}
                  {language === "uz" && "Masofa"}
                  {language === "en" && "Range"}
                </h3>
                <p className="text-gray-600">{currentTranslation.rangePerCharge}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white rounded-xl">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === "ru" && "Объем груза"}
                  {language === "uz" && "Yuk hajmi"}
                  {language === "en" && "Cargo Volume"}
                </h3>
                <p className="text-gray-600">{currentTranslation.cargoVolume}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white rounded-xl">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === "ru" && "Грузоподъемность"}
                  {language === "uz" && "Yuk ko'tarish"}
                  {language === "en" && "Payload"}
                </h3>
                <p className="text-gray-600">{currentTranslation.maxPayload}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white rounded-xl">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Route className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === "ru" && "Максимальная скорость"}
                  {language === "uz" && "Maksimal tezlik"}
                  {language === "en" && "Max Speed"}
                </h3>
                <p className="text-gray-600">{currentTranslation.maxSpeed}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white rounded-xl">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Battery className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {language === "ru" && "Климат-контроль"}
                  {language === "uz" && "Iqlim nazorati"}
                  {language === "en" && "Climate Control"}
                </h3>
                <p className="text-gray-600">{currentTranslation.features.climateControl}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white rounded-xl">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Route className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {language === "ru" && "Навигация"}
                  {language === "uz" && "Navigatsiya"}
                  {language === "en" && "Navigation"}
                </h3>
                <p className="text-gray-600">{currentTranslation.features.navigation}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white rounded-xl">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {language === "ru" && "Камеры"}
                  {language === "uz" && "Kamerlar"}
                  {language === "en" && "Cameras"}
                </h3>
                <p className="text-gray-600">{currentTranslation.features.camera}</p>
              </CardContent>
            </Card>
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
            <Link href='/contacts'>
              <Button variant="outline" size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                {t.cta.contactButton}
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
} 