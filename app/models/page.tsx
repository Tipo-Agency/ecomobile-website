"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Battery, Route, Package, ChevronRight, ArrowLeft, ArrowRight, Snowflake, MapPin, Camera } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import { getAllModels, getModelById, type ModelData } from "@/lib/models-data"
import Link from "next/link"
import { useSearchParams } from 'next/navigation'
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
import { Textarea } from "@/components/ui/textarea"
import { sendToTelegram } from "@/lib/telegram-utils"

// Компонент для работы с search params
function ModelsPageContent() {
  const { language } = useLanguage()
  const searchParams = useSearchParams()
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null)
  const [currentModelIndex, setCurrentModelIndex] = useState(0)
  const modelsData = getAllModels()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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
      hero: {
        buyButton: "Купить",
      },
      orderForm: {
        title: "Заказать звонок",
        description: "Пожалуйста, заполните форму ниже, и наш менеджер свяжется с вами в ближайшее время.",
        name: "Имя",
        phone: "Телефон",
        email: "Электронная почта",
        message: "Сообщение",
        submit: "Отправить",
        submitting: "Отправка...",
        success: "✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
        error: "❌ Ошибка при отправке заявки. Попробуйте еще раз.",
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
      hero: {
        buyButton: "Sotib olish",
      },
      orderForm: {
        title: "Zvonok qilish",
        description: "Iltimos, quyida to'ldirilgan shaklni to'ldiring, va biz siz bilan aloqaniyatishadi.",
        name: "Ism",
        phone: "Telefon",
        email: "Elektron pochta",
        message: "Xabar",
        submit: "Yuborish",
        submitting: "Yuborish...",
        success: "✅ Buyurtma muvaffaqiyatli yuborildi! Biz siz bilan aloqaniyatishadi.",
        error: "❌ Buyurtma yuborishda xatolik. Iltimos, qayta urinib ko'ring.",
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
      hero: {
        buyButton: "Buy",
      },
      orderForm: {
        title: "Order a Call",
        description: "Please fill out the form below, and our manager will contact you shortly.",
        name: "Name",
        phone: "Phone",
        email: "Email",
        message: "Message",
        submit: "Submit",
        submitting: "Submitting...",
        success: "✅ Order submitted successfully! We will contact you shortly.",
        error: "❌ Error submitting order. Please try again.",
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const result = await sendToTelegram({
        ...formData,
        model: currentTranslation?.name || 'Неизвестная модель',
        source: 'Страница моделей'
      })

      if (result.success) {
        setSubmitStatus('success')
        setFormData({ name: '', phone: '', email: '', message: '' })
        setTimeout(() => {
          setIsOrderModalOpen(false)
          setSubmitStatus('idle')
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
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
                  className={`border-0 shadow-xl bg-white rounded-xl cursor-pointer transition-all duration-300 hover:shadow-2xl ${selectedModelId === model.id ? 'ring-2 ring-green-500' : ''
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
          <div className="flex flex-col lg:flex-row items-start gap-12">
            {/* Model Image и Технические характеристики */}
            <div className="w-full lg:w-1/2 flex flex-col items-center">
              <img
                src={currentModel.image}
                alt={currentTranslation.name}
                className="max-w-full h-auto rounded-2xl bg-white mb-8"
                style={{ maxHeight: 320 }}
              />

            </div>

            {/* Model Info и Особенности */}
            <div className="w-full lg:w-1/2 flex flex-col items-start justify-center">
              <Badge className="bg-green-50 text-green-700 mb-4 px-4 py-2 text-base font-semibold rounded-full">
                {currentTranslation.name}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{currentTranslation.name}</h2>
              <p className="text-base md:text-lg text-gray-600 mb-8">{currentTranslation.description}</p>

              {/* Характеристики */}
              <div className="flex flex-col sm:flex-row gap-4 w-full mb-8">
                <div className="flex-1 bg-green-50 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center min-w-[120px] md:min-w-[140px]">
                  <span className="text-xl md:text-2xl font-bold text-green-700 mb-1">{currentTranslation.maxSpeed.split(':')[1].trim()}</span>
                  <span className="text-xs md:text-sm text-green-700">Макс. скорость</span>
                </div>
                <div className="flex-1 bg-blue-50 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center min-w-[120px] md:min-w-[140px]">
                  <span className="text-xl md:text-2xl font-bold text-blue-700 mb-1">{currentTranslation.rangePerCharge.split(':')[1].trim()}</span>
                  <span className="text-xs md:text-sm text-blue-700">Запас хода</span>
                </div>
                <div className="flex-1 bg-purple-50 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center min-w-[120px] md:min-w-[140px]">
                  <span className="text-xl md:text-2xl font-bold text-purple-700 mb-1">{currentTranslation.maxPayload.split(':')[1].trim()}</span>
                  <span className="text-xs md:text-sm text-purple-700">Грузоподъемность</span>
                </div>
              </div>

              {/* Кнопки */}
              <div className="flex flex-col sm:flex-row gap-4 w-full mb-8">
                <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white text-base md:text-lg font-semibold flex items-center justify-center">
                      {t.hero?.buyButton || "Купить"} <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>{t.orderForm.title}</DialogTitle>
                      <DialogDescription>{t.orderForm.description}</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t.orderForm.name}</Label>
                        <Input 
                          id="name" 
                          placeholder={t.orderForm.name}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t.orderForm.phone}</Label>
                        <Input 
                          id="phone" 
                          placeholder="+998 90 123 45 67"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t.orderForm.email}</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">{t.orderForm.message}</Label>
                        <Textarea 
                          id="message" 
                          placeholder={t.orderForm.message}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                        />
                      </div>
                      
                      {submitStatus === 'success' && (
                        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                          {t.orderForm.success}
                        </div>
                      )}
                      
                      {submitStatus === 'error' && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                          {t.orderForm.error}
                        </div>
                      )}
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-green-600 hover:bg-green-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? t.orderForm.submitting : t.orderForm.submit}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Link href="/contacts" className="flex-1">
                  <Button variant="outline" size="lg" className="w-full text-base md:text-lg font-semibold flex items-center justify-center">
                    Связаться с нами
                  </Button>
                </Link>
              </div>



            </div>

          </div>
          <div className="bg-gradient-to-b from-white to-green-200/35 rounded-xl shadow-xl px-6 py-6 md:px-8 md:py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Технические характеристики */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">{t.specifications}</h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-900 text-base md:text-lg">{currentTranslation.dimensions}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-900 text-base md:text-lg">{currentTranslation.cargoVolume}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-900 text-base md:text-lg">{currentTranslation.maxPayload}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-900 text-base md:text-lg">{currentTranslation.maxSpeed}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-900 text-base md:text-lg">{currentTranslation.rangePerCharge}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-gray-900 text-base md:text-lg">{currentTranslation.batterySwapTime}</span>
                  </div>
                </div>
              </div>

              {/* Особенности */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-xl text-center md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">{t.features}</h3>
                <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg">
                    <Snowflake className="w-7 md:w-9 md:h-7 text-green-600" />
                    <span className="text-gray-700 text-sm md:text-base">{currentTranslation.features.climateControl}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg">
                    <MapPin className="w-7 md:w-9 md:h-10 lg:w-16 text-blue-600" />
                    <span className="text-gray-700 text-sm md:text-base">{currentTranslation.features.navigation}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg">
                    <Camera className="w-7 md:w-9 md:h-10 lg:w-16 text-purple-600" />
                    <span className="text-gray-700 text-sm md:text-base">{currentTranslation.features.camera}</span>
                  </div>
                </div>
              </div>
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