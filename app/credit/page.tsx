"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useLanguage } from "@/contexts/language-context"
import { Calculator, Car, FileText, Send } from "lucide-react"
import { getAllModels, getModelById, type ModelData } from "@/lib/models-data"
import { useSearchParams } from 'next/navigation'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { sendToTelegram } from "@/lib/telegram-utils"
import { useToast } from "@/hooks/use-toast"

function CreditPageContent() {
  const { language } = useLanguage()
  const searchParams = useSearchParams()
  const modelsData = getAllModels()
  
  // Получаем модель из URL параметров или используем первую по умолчанию
  const initialModelId = searchParams.get('model') || modelsData[0]?.id
  const [selectedModelId, setSelectedModelId] = useState<string>(initialModelId)
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [loanTerm, setLoanTerm] = useState(36)
  const annualRate = 20

  // Состояние формы заявки
  const [formData, setFormData] = useState({
    city: '',
    personType: 'individual', // 'individual' или 'legal'
    name: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const currentModel = getModelById(selectedModelId)
  const currentTranslation = currentModel?.translations[language as keyof typeof currentModel.translations]

  // Извлекаем цену в сумах из строки
  const extractPriceInSums = (priceString: string): number => {
    const numbers = priceString.replace(/[^\d]/g, '')
    return parseInt(numbers, 10)
  }

  const vehiclePrice = currentTranslation ? extractPriceInSums(currentTranslation.price) : 0
  const loanAmount = vehiclePrice * (100 - downPaymentPercent) / 100

  const translations = {
    ru: {
      title: "Кредитный калькулятор",
      subtitle: "Выберите модель и рассчитайте условия кредитования",
      selectModel: "Выберите модель",
      vehiclePrice: "Цена автомобиля",
      downPayment: "Первоначальный взнос",
      loanAmount: "Сумма кредита",
      loanTerm: "На срок",
      interestRate: "Годовая ставка",
      monthlyPayment: "Ежемесячный платеж",
      totalPayment: "Общая выплата",
      totalInterest: "Переплата",
      months: "мес.",
      currency: "сум",
      from: "от",
      to: "до",
      calculate: "Рассчитать",
      note: "Примечание: Расчеты являются предварительными и могут отличаться от реальных условий кредитования. Для получения точной информации обратитесь к менеджеру.",
      changeModel: "Изменить модель",
      applicationForm: {
        title: "Заполнить заявку",
        subtitle: "Заполните форму для получения кредита на выбранный автомобиль",
        city: "Выберите город",
        personType: "Тип заявителя",
        individual: "Физическое лицо",
        legal: "Юридическое лицо",
        name: "ФИО",
        phone: "Номер телефона",
        submit: "Отправить заявку",
        submitting: "Отправка...",
        success: "Заявка успешно отправлена! Наш менеджер свяжется с вами в ближайшее время.",
        error: "Ошибка при отправке заявки. Попробуйте еще раз."
      }
    },
    uz: {
      title: "Kredit kalkulyatori",
      subtitle: "Modelni tanlang va kreditlash shartlarini hisoblang",
      selectModel: "Modelni tanlang",
      vehiclePrice: "Avtomobil narxi",
      downPayment: "Dastlabki to'lov",
      loanAmount: "Kredit miqdori",
      loanTerm: "Muddatga",
      interestRate: "Yillik foiz",
      monthlyPayment: "Oylik to'lov",
      totalPayment: "Jami to'lov",
      totalInterest: "Ortiqcha to'lov",
      months: "oy",
      currency: "so'm",
      from: "dan",
      to: "gacha",
      calculate: "Hisoblash",
      note: "Izoh: Hisob-kitoblar dastlabki bo'lib, haqiqiy kreditlash shartlaridan farq qilishi mumkin. Aniq ma'lumot olish uchun menejerga murojaat qiling.",
      changeModel: "Modelni o'zgartirish",
      applicationForm: {
        title: "Ariza to'ldirish",
        subtitle: "Tanlangan avtomobil uchun kredit olish uchun shaklni to'ldiring",
        city: "Shaharni tanlang",
        personType: "Ariza beruvchi turi",
        individual: "Jismoniy shaxs",
        legal: "Yuridik shaxs",
        name: "F.I.SH",
        phone: "Telefon raqami",
        submit: "Arizani yuborish",
        submitting: "Yuborilmoqda...",
        success: "Ariza muvaffaqiyatli yuborildi! Menejerimiz tez orada siz bilan bog'lanadi.",
        error: "Ariza yuborishda xato. Qaytadan urinib ko'ring."
      }
    },
    en: {
      title: "Credit Calculator",
      subtitle: "Select model and calculate loan conditions",
      selectModel: "Select Model",
      vehiclePrice: "Vehicle Price",
      downPayment: "Down Payment",
      loanAmount: "Loan Amount",
      loanTerm: "For period",
      interestRate: "Annual Rate",
      monthlyPayment: "Monthly Payment",
      totalPayment: "Total Payment",
      totalInterest: "Overpayment",
      months: "months",
      currency: "sum",
      from: "from",
      to: "to",
      calculate: "Calculate",
      note: "Note: Calculations are preliminary and may differ from actual loan conditions. Contact a manager for accurate information.",
      changeModel: "Change Model",
      applicationForm: {
        title: "Submit Application",
        subtitle: "Fill out the form to get a loan for the selected vehicle",
        city: "Select City",
        personType: "Applicant Type",
        individual: "Individual",
        legal: "Legal Entity",
        name: "Full Name",
        phone: "Phone Number",
        submit: "Submit Application",
        submitting: "Submitting...",
        success: "Application submitted successfully! Our manager will contact you shortly.",
        error: "Error submitting application. Please try again."
      }
    }
  }

  const t = translations[language as keyof typeof translations] || translations.ru

  // Города Узбекистана
  const cities = [
    "Ташкент", "Самарканд", "Наманган", "Андижан", "Нукус", "Бухара", "Карши", 
    "Коканд", "Маргилан", "Фергана", "Ургенч", "Джизак", "Навои", "Термез", 
    "Ангрен", "Алмалык", "Чирчик", "Муйнак", "Гулистан", "Янгиер"
  ]

  // Функция отправки заявки
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const downPaymentAmount = vehiclePrice * (downPaymentPercent / 100)
      const result = await sendToTelegram({
        ...formData,
        source: 'Кредитный калькулятор',
        model: currentTranslation?.name || 'Неизвестная модель',
        vehiclePrice: `${formatNumber(vehiclePrice)} ${t.currency}`,
        downPayment: `${downPaymentPercent}% (${formatNumber(downPaymentAmount)} ${t.currency})`,
        loanTerm: `${loanTerm} ${t.months}`,
        loanAmount: `${formatNumber(loanAmount)} ${t.currency}`,
        monthlyPayment: `${formatNumber(Math.round(monthlyPayment))} ${t.currency}`,
        city: formData.city,
        personType: formData.personType === 'individual' ? t.applicationForm.individual : t.applicationForm.legal
      })

      if (result.success) {
        toast({
          title: "Заявка отправлена!",
          description: t.applicationForm.success,
          variant: "default",
        })
        setFormData({ city: '', personType: 'individual', name: '', phone: '' })
      } else {
        toast({
          title: "Ошибка отправки",
          description: t.applicationForm.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: t.applicationForm.error,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Расчет ежемесячного платежа
  const calculateMonthlyPayment = () => {
    const monthlyRate = annualRate / 100 / 12
    const numberOfPayments = loanTerm
    
    if (monthlyRate === 0) return loanAmount / numberOfPayments
    
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    
    return monthlyPayment
  }

  const monthlyPayment = calculateMonthlyPayment()
  const totalPayment = monthlyPayment * loanTerm + (vehiclePrice * downPaymentPercent / 100)
  const totalInterest = (monthlyPayment * loanTerm) - loanAmount

  // Форматирование числа для отображения
  const formatNumber = (num: number): string => {
    return num.toLocaleString('ru-RU')
  }

  if (!currentModel || !currentTranslation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Модель не найдена</h1>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-lg text-gray-600">{t.subtitle}</p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Левая часть - Выбор модели */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-xl">{t.changeModel}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Селектор модели */}
                <div className="space-y-2">
                  <Label>{t.selectModel}</Label>
                  <Select value={selectedModelId} onValueChange={setSelectedModelId}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {modelsData.map((model) => {
                        const translation = model.translations[language as keyof typeof model.translations]
                        return (
                          <SelectItem key={model.id} value={model.id}>
                            {translation.name}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Изображение модели */}
                <div className="relative">
                  <img
                    src={currentModel.image}
                    alt={currentTranslation.name}
                    className="w-full h-72 object-contain rounded-lg bg-white"
                  />
                </div>

                {/* Информация о модели */}
                <div className="space-y-4">
                  <div>
                    <Badge className="bg-green-100 text-green-800 mb-2">
                      {currentTranslation.name}
                    </Badge>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {currentTranslation.name}
                    </h3>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">{t.vehiclePrice}</div>
                    <div className="text-3xl font-bold text-green-700">
                      {formatNumber(vehiclePrice)} {t.currency}
                    </div>
                  </div>

                  <p className="text-gray-600">
                    {currentTranslation.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Правая часть - Кредитный калькулятор */}
            <Card>
                             <CardHeader>
                 <CardTitle className="flex items-center justify-between text-xl">
                   <div className="flex items-center gap-2">
                     <Calculator className="h-6 w-6 text-green-600" />
                     {t.title}
                   </div>
                   <div className="text-right">
                     <div className="text-2xl font-bold text-green-600">21.9%</div>
                     <div className="text-sm text-gray-600">
                       {t.interestRate} от 18.9% до 21.9%
                     </div>
                   </div>
                 </CardTitle>
               </CardHeader>
              <CardContent className="space-y-6">
                {/* Первоначальный взнос */}
                <div className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <Label className="font-medium">{t.downPayment}</Label>
                    <div className="text-right">
                      <div className="font-semibold text-lg">{downPaymentPercent}%</div>
                      <div className="text-sm text-gray-600">
                        {formatNumber(vehiclePrice * downPaymentPercent / 100)} {t.currency}
                      </div>
                    </div>
                  </div>
                  <Slider
                    value={[downPaymentPercent]}
                    onValueChange={(value) => setDownPaymentPercent(value[0])}
                    max={50}
                    min={20}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>20%</span>
                    <span>50%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {t.from} 20% стоимости автомобиля
                  </div>
                </div>

                {/* Срок кредита */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="font-medium">{t.loanTerm}</Label>
                    <div className="text-lg font-semibold">
                      {loanTerm} {t.months}
                    </div>
                  </div>
                  <Slider
                    value={[loanTerm]}
                    onValueChange={(value) => setLoanTerm(value[0])}
                    max={60}
                    min={12}
                    step={6}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>12 {t.months}</span>
                    <span>60 {t.months}</span>
                  </div>
                </div>

                {/* Сумма кредита */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{t.loanAmount}</div>
                  <div className="text-2xl font-bold text-blue-700">
                    {formatNumber(loanAmount)} {t.currency}
                  </div>
                </div>

                {/* Результаты */}
                <div className="space-y-4 pt-4 border-t">
                                     {/* Ежемесячный платеж */}
                   <div className="bg-green-50 p-4 rounded-lg">
                     <div className="text-sm text-gray-600 mb-1">{t.monthlyPayment}</div>
                     <div className="text-4xl font-bold text-green-700">
                       {formatNumber(Math.round(monthlyPayment))} {t.currency}
                     </div>
                   </div>

                  {/* Общая выплата */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">{t.totalPayment}</div>
                    <div className="text-xl font-bold text-green-700">
                      {formatNumber(Math.round(totalPayment))} {t.currency}
                    </div>
                  </div>

                  {/* Переплата */}
                  {/* <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">{t.totalInterest}</div>
                    <div className="text-xl font-bold text-orange-700">
                      {formatNumber(Math.round(totalInterest))} {t.currency}
                    </div>
                  </div> */}
                </div>

                {/* Примечание */}
                {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <p className="text-sm text-blue-800">
                    <strong>Примечание:</strong> {t.note}
                  </p>
                </div> */}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Форма заявки */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="h-6 w-6 text-green-600" />
                {t.applicationForm.title}
              </CardTitle>
              <p className="text-gray-600 mt-2">{t.applicationForm.subtitle}</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Выбор города */}
                  <div className="space-y-2">
                    <Label htmlFor="city">{t.applicationForm.city}</Label>
                    <Select value={formData.city} onValueChange={(value) => setFormData({...formData, city: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.applicationForm.city} />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Тип лица */}
                  <div className="space-y-4">
                    <Label>{t.applicationForm.personType}</Label>
                    <RadioGroup
                      value={formData.personType}
                      onValueChange={(value) => setFormData({...formData, personType: value})}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="individual" id="individual" />
                        <Label htmlFor="individual" className="font-normal">
                          {t.applicationForm.individual}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="legal" id="legal" />
                        <Label htmlFor="legal" className="font-normal">
                          {t.applicationForm.legal}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Имя */}
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.applicationForm.name}</Label>
                    <Input
                      id="name"
                      placeholder={t.applicationForm.name}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  {/* Телефон */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.applicationForm.phone}</Label>
                    <Input
                      id="phone"
                      placeholder="+998"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Кнопка отправки */}
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                  disabled={isSubmitting}
                  size="lg"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isSubmitting ? t.applicationForm.submitting : t.applicationForm.submit}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Загрузка...</div>
    </div>
  )
}

export default function CreditPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CreditPageContent />
    </Suspense>
  )
} 