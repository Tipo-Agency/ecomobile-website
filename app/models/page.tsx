"use client"

import { useState, useEffect, Suspense } from "react"
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

// Компонент для работы с search params
function ModelsPageContent() {
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
                  className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={handleNextModel}
                  className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300"
                >
                  <ArrowRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Model Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">{currentTranslation.name}</h2>
                <p className="text-xl text-gray-600 mb-6">{currentTranslation.description}</p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Battery className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{currentTranslation.batterySwapTime.split(':')[1].trim()}</div>
                    <div className="text-sm text-gray-600">Батарея</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Route className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{currentTranslation.rangePerCharge.split(':')[1].trim()}</div>
                    <div className="text-sm text-gray-600">Запас хода</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Package className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{currentTranslation.maxSpeed.split(':')[1].trim()}</div>
                    <div className="text-sm text-gray-600">Скорость</div>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <Card className="border-0 shadow-xl bg-white rounded-xl">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.specifications}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Размеры</span>
                      <span className="font-medium text-gray-900">{currentTranslation.dimensions}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Объем груза</span>
                      <span className="font-medium text-gray-900">{currentTranslation.cargoVolume}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Грузоподъемность</span>
                      <span className="font-medium text-gray-900">{currentTranslation.maxPayload}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Максимальная скорость</span>
                      <span className="font-medium text-gray-900">{currentTranslation.maxSpeed}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Запас хода</span>
                      <span className="font-medium text-gray-900">{currentTranslation.rangePerCharge}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Время замены батареи</span>
                      <span className="font-medium text-gray-900">{currentTranslation.batterySwapTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white rounded-xl">
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.features}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{currentTranslation.features.climateControl}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{currentTranslation.features.navigation}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{currentTranslation.features.camera}</span>
                    </div>
                  </div>
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

// Fallback компонент для Suspense
function ModelsPageFallback() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

// Основной компонент страницы с Suspense
export default function ModelsPage() {
  return (
    <Suspense fallback={<ModelsPageFallback />}>
      <ModelsPageContent />
    </Suspense>
  )
} 