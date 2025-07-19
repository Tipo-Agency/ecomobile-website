"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Users, Building } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import YandexMap from "@/components/YandexMap"
import { sendToTelegram } from "@/lib/telegram-utils"
import { useState } from "react"

export default function ContactsPage() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const translations = {
    ru: {
      hero: {
        badge: "Свяжитесь с нами",
        title: "Готовы обсудить",
        titleHighlight: "сотрудничество?",
        description:
          "Мы всегда открыты для диалога. Свяжитесь с нами любым удобным способом, и мы обязательно ответим в кратчайшие сроки.",
      },
      contact: {
        title: "Контактная информация",
        subtitle: "Выберите наиболее удобный способ связи. Мы работаем с клиентами по всему миру.",
        phone: {
          title: "Телефон",
          description: "Звоните в рабочее время",
          hours: "Пн-Пт: 9:00 - 18:00 (UTC+5)",
        },
        email: {
          title: "Email",
          description: "Пишите нам в любое время",
          response: "Ответим в течение 24 часов",
        },
        address: {
          title: "Адрес",
          description: "Наш офис в Ташкенте",
          street: "ул. Амира Темура, 15",
          city: "Ташкент 100000, Узбекистан",
          note: "Встречи по предварительной записи",
        },
        departments: {
          title: "Специализированные отделы",
          sales: "Продажи",
          investors: "Инвесторы",
        },
      },
      form: {
        title: "Напишите нам",
        subtitle: "Заполните форму, и мы свяжемся с вами в ближайшее время",
        firstName: "Имя",
        lastName: "Фамилия",
        email: "Email",
        phone: "Телефон",
        company: "Компания",
        subject: "Тема обращения",
        subjects: {
          sales: "Покупка автомобилей",
          partnership: "Партнёрство",
          investment: "Инвестиции",
          franchise: "Франшиза станций",
          media: "СМИ и пресса",
          support: "Техническая поддержка",
          other: "Другое",
        },
        message: "Сообщение",
        messagePlaceholder: "Расскажите подробнее о ваших потребностях или вопросах...",
        privacy: "Я согласен с обработкой персональных данных и",
        privacyLink: "политикой конфиденциальности",
        submit: "Отправить сообщение",
        required: "*",
        submitting: "Отправка...",
        success: "✅ Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.",
        error: "❌ Ошибка при отправке сообщения. Попробуйте еще раз.",
      },
      map: {
        title: "Как нас найти",
        subtitle: "Наш офис находится в центре Ташкента",
        mapPlaceholder: "Интерактивная карта",
        workingHours: {
          title: "Рабочие часы",
          weekdays: "Пн-Пт: 9:00 - 18:00",
          weekend: "Сб-Вс: По записи",
        },
        phoneCard: {
          title: "Телефон",
          available: "Звонки принимаем 24/7",
        },
        emailCard: {
          title: "Email",
          response: "Ответим в течение дня",
        },
      },
      faq: {
        title: "Часто задаваемые вопросы",
        subtitle: "Ответы на популярные вопросы о Ecomobile",
        questions: [
          {
            question: "Как долго занимает замена батареи?",
            answer:
              "Благодаря технологии быстрой замены батареи, замена батареи занимает всего 1 минуту. Это быстрее, чем заправка обычного автомобиля.",
          },
          {
            question: "Какой запас хода у автомобиля?",
            answer:
              "С двумя батареями запас хода составляет до 300 км в городском цикле. Для увеличения дальности поездки можно быстро заменить разряженные батареи на заряженные.",
          },
          {
            question: "Где можно заменить батареи?",
            answer:
              "Мы развиваем сеть станций быстрой замены батарей. Первые станции откроются в Ташкенте, затем в других крупных городах Узбекистана и региона.",
          },
          {
            question: "Какие гарантии предоставляются?",
            answer:
              "Мы предоставляем 3 года гарантии на автомобиль и 5 лет на батарейную систему. Также доступно расширенное сервисное обслуживание.",
          },
        ],
      },
    },
    uz: {
      hero: {
        badge: "Biz bilan bog'laning",
        title: "Muhokama qilishga",
        titleHighlight: "tayyormisiz?",
        description:
          "Biz har doim muloqotga ochmiz. Biz bilan qulay usulda bog'laning, biz albatta qisqa vaqt ichida javob beramiz.",
      },
      contact: {
        title: "Aloqa ma'lumotlari",
        subtitle: "Eng qulay aloqa usulini tanlang. Biz butun dunyo bo'ylab mijozlar bilan ishlaymiz.",
        phone: {
          title: "Telefon",
          description: "Ish vaqtida qo'ng'iroq qiling",
          hours: "Du-Ju: 9:00 - 18:00 (UTC+5)",
        },
        email: {
          title: "Email",
          description: "Bizga istalgan vaqtda yozing",
          response: "24 soat ichida javob beramiz",
        },
        address: {
          title: "Manzil",
          description: "Toshdagi ofisimiz",
          street: "Amir Temur ko'chasi, 15",
          city: "Toshkent 100000, O'zbekiston",
          note: "Uchrashuvlar oldindan kelishilgan holda",
        },
        departments: {
          title: "Ixtisoslashgan bo'limlar",
          sales: "Sotuvlar",
          investors: "Investorlar",
        },
      },
      form: {
        title: "Bizga yozing",
        subtitle: "Formani to'ldiring, biz yaqin vaqt ichida siz bilan bog'lanamiz",
        firstName: "Ism",
        lastName: "Familiya",
        email: "Email",
        phone: "Telefon",
        company: "Kompaniya",
        subject: "Murojaat mavzusi",
        subjects: {
          sales: "Avtomobil sotib olish",
          partnership: "Hamkorlik",
          investment: "Investitsiyalar",
          franchise: "Stantsiya franchayzi",
          media: "OAV va matbuot",
          support: "Texnik yordam",
          other: "Boshqa",
        },
        message: "Xabar",
        messagePlaceholder: "Ehtiyojlaringiz yoki savollaringiz haqida batafsil gapirib bering...",
        privacy: "Men shaxsiy ma'lumotlarni qayta ishlash va",
        privacyLink: "maxfiylik siyosati bilan roziman",
        submit: "Xabar yuborish",
        required: "*",
        submitting: "Yuborish...",
        success: "✅ Xabar muvaffaqiyatli yuborildi! Biz siz bilan tez orada bog'lanamiz.",
        error: "❌ Xabar yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
      },
      map: {
        title: "Bizni qanday topish mumkin",
        subtitle: "Ofisimiz Toshkent markazida joylashgan",
        mapPlaceholder: "Interaktiv xarita",
        workingHours: {
          title: "Ish vaqti",
          weekdays: "Du-Ju: 9:00 - 18:00",
          weekend: "Sh-Ya: Kelishuv bo'yicha",
        },
        phoneCard: {
          title: "Telefon",
          available: "Qo'ng'iroqlarni 24/7 qabul qilamiz",
        },
        emailCard: {
          title: "Email",
          response: "Kun davomida javob beramiz",
        },
      },
      faq: {
        title: "Tez-tez so'raladigan savollar",
        subtitle: "Ecomobile haqida mashhur savollarga javoblar",
        questions: [
          {
            question: "Batareya almashtirish qancha vaqt oladi?",
            answer:
              "Batareya tez almashtirish texnologiyasi tufayli batareya almashtirish atigi 1 daqiqa vaqt oladi. Bu oddiy avtomobilni yoqilg'i quyishdan tezroq.",
          },
          {
            question: "Avtomobilning masofa qancha?",
            answer:
              "Ikki batareya bilan shahar tsiklida masofa 300 km gacha. Sayohat masofasini oshirish uchun tushgan batareyalarni zaryadlanganlarga tez almashtirish mumkin.",
          },
          {
            question: "Batareyalarni qayerda almashtirish mumkin?",
            answer:
              "Biz batareyalarni tez almashtirish stantsiyalari tarmog'ini rivojlantiramiz. Birinchi stantsiyalar Toshkentda, keyin O'zbekiston va mintaqaning boshqa yirik shaharlarida ochiladi.",
          },
          {
            question: "Qanday kafolatlar beriladi?",
            answer:
              "Biz avtomobilga 3 yil, batareya tizimiga 5 yil kafolat beramiz. Shuningdek, kengaytirilgan servis xizmati mavjud.",
          },
        ],
      },
    },
    en: {
      hero: {
        badge: "Contact Us",
        title: "Ready to discuss",
        titleHighlight: "cooperation?",
        description:
          "We are always open for dialogue. Contact us in any convenient way, and we will definitely respond as soon as possible.",
      },
      contact: {
        title: "Contact Information",
        subtitle: "Choose the most convenient way to contact us. We work with clients worldwide.",
        phone: {
          title: "Phone",
          description: "Call during business hours",
          hours: "Mon-Fri: 9:00 - 18:00 (UTC+5)",
        },
        email: {
          title: "Email",
          description: "Write to us anytime",
          response: "We'll respond within 24 hours",
        },
        address: {
          title: "Address",
          description: "Our office in Tashkent",
          street: "Amir Temur Street, 15",
          city: "Tashkent 100000, Uzbekistan",
          note: "Meetings by appointment",
        },
        departments: {
          title: "Specialized Departments",
          sales: "Sales",
          investors: "Investors",
        },
      },
      form: {
        title: "Write to Us",
        subtitle: "Fill out the form and we'll contact you soon",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phone: "Phone",
        company: "Company",
        subject: "Subject",
        subjects: {
          sales: "Vehicle Purchase",
          partnership: "Partnership",
          investment: "Investment",
          franchise: "Station Franchise",
          media: "Media and Press",
          support: "Technical Support",
          other: "Other",
        },
        message: "Message",
        messagePlaceholder: "Tell us more about your needs or questions...",
        privacy: "I agree to personal data processing and",
        privacyLink: "privacy policy",
        submit: "Send Message",
        required: "*",
        submitting: "Sending...",
        success: "✅ Message sent successfully! We'll contact you soon.",
        error: "❌ Error sending message. Please try again.",
      },
      map: {
        title: "How to Find Us",
        subtitle: "Our office is located in the center of Tashkent",
        mapPlaceholder: "Interactive map",
        workingHours: {
          title: "Working Hours",
          weekdays: "Mon-Fri: 9:00 - 18:00",
          weekend: "Sat-Sun: By appointment",
        },
        phoneCard: {
          title: "Phone",
          available: "We accept calls 24/7",
        },
        emailCard: {
          title: "Email",
          response: "We'll respond within a day",
        },
      },
      faq: {
        title: "Frequently Asked Questions",
        subtitle: "Answers to popular questions about EcoMobile",
        questions: [
          {
            question: "How long does battery replacement take?",
            answer:
              "Thanks to Fast Swap technology, battery replacement takes only 1 minute. This is faster than refueling a regular car.",
          },
          {
            question: "What is the vehicle's range?",
            answer:
              "With two batteries, the range is up to 300 km in city cycle. To increase travel distance, you can quickly replace discharged batteries with charged ones.",
          },
          {
            question: "Where can batteries be replaced?",
            answer:
              "We are developing a network of fast battery swap stations. The first stations will open in Tashkent, then in other major cities of Uzbekistan and the region.",
          },
          {
            question: "What warranties are provided?",
            answer:
              "We provide 3 years warranty on the vehicle and 5 years on the battery system. Extended service is also available.",
          },
        ],
      },
    },
  }

  const t = translations[language as keyof typeof translations] || translations.ru

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const result = await sendToTelegram({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        company: formData.company,
        message: `Тема: ${formData.subject}\n\n${formData.message}`,
        source: 'Страница контактов'
      })

      if (result.success) {
        setSubmitStatus('success')
        setFormData({ firstName: '', lastName: '', phone: '', company: '', subject: '', message: '' })
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 3000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

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

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.contact.title}</h2>
                <p className="text-lg text-gray-600 mb-8">{t.contact.subtitle}</p>
              </div>

              <div className="space-y-6">

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <a href="tel:+998901756707">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.contact.phone.title}</h3>
                          <p className="text-gray-600 mb-2">{t.contact.phone.description}</p>
                          <div className="space-y-1">
                            <p className="font-medium text-gray-900">+998 99 096-99-69</p>
                            <p className="text-sm text-gray-500">{t.contact.phone.hours}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </a>
                </Card>


                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <a href="mailto:info@ecomobile.world">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Mail className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.contact.email.title}</h3>
                          <p className="text-gray-600 mb-2">{t.contact.email.description}</p>
                          <div className="space-y-1">
                            <p className="font-medium text-gray-900">info@ecomobile.world</p>
                            <p className="text-sm text-gray-500">{t.contact.email.response}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </a>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.contact.address.title}</h3>
                        <p className="text-gray-600 mb-2">{t.contact.address.description}</p>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900">{t.contact.address.street}</p>
                          <p className="font-medium text-gray-900">{t.contact.address.city}</p>
                          <p className="text-sm text-gray-500">{t.contact.address.note}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Departments */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t.contact.departments.title}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Users className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-gray-900">{t.contact.departments.sales}</span>
                    </div>
                    <p className="text-sm text-gray-600">info@ecomobile.world</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Building className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">{t.contact.departments.investors}</span>
                    </div>
                    <p className="text-sm text-gray-600">info@ecomobile.world</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-2xl">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                    <CardTitle className="text-2xl">{t.form.title}</CardTitle>
                  </div>
                  <p className="text-gray-600">{t.form.subtitle}</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          {t.form.firstName} {t.form.required}
                        </Label>
                        <Input 
                          id="firstName" 
                          placeholder={t.form.firstName} 
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">
                          {t.form.lastName} {t.form.required}
                        </Label>
                        <Input 
                          id="lastName" 
                          placeholder={t.form.lastName} 
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.form.phone}</Label>
                      <Input 
                        id="phone" 
                        placeholder="+998 90 123 45 67"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">{t.form.company}</Label>
                      <Input 
                        id="company" 
                        placeholder={t.form.company}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">
                        {t.form.subject} {t.form.required}
                      </Label>
                      <Select 
                        value={formData.subject}
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t.form.subject} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sales">{t.form.subjects.sales}</SelectItem>
                          <SelectItem value="partnership">{t.form.subjects.partnership}</SelectItem>
                          <SelectItem value="investment">{t.form.subjects.investment}</SelectItem>
                          <SelectItem value="franchise">{t.form.subjects.franchise}</SelectItem>
                          <SelectItem value="media">{t.form.subjects.media}</SelectItem>
                          <SelectItem value="support">{t.form.subjects.support}</SelectItem>
                          <SelectItem value="other">{t.form.subjects.other}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        {t.form.message} {t.form.required}
                      </Label>
                      <Textarea 
                        id="message" 
                        placeholder={t.form.messagePlaceholder} 
                        rows={5} 
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required 
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="privacy" className="mt-1" required />
                      <label htmlFor="privacy" className="text-sm text-gray-600">
                        {t.form.privacy}{" "}
                        <Link href="#" className="text-green-600 hover:underline">
                          {t.form.privacyLink}
                        </Link>
                      </label>
                    </div>

                    {submitStatus === 'success' && (
                      <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                        {t.form.success}
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                        {t.form.error}
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                      disabled={isSubmitting}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? t.form.submitting : t.form.submit}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.map.title}</h2>
            <p className="text-xl text-gray-600">{t.map.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <YandexMap></YandexMap>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <Card className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">{t.map.workingHours.title}</h3>
                  <p className="text-sm text-gray-600">{t.map.workingHours.weekdays}</p>
                  <p className="text-sm text-gray-600">{t.map.workingHours.weekend}</p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
              <a href="tel:+998901756707">
                <CardContent className="p-6">
                  <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">{t.map.phoneCard.title}</h3>
                  <p className="text-sm text-gray-600">+998 90 175 67 07</p>
                  <p className="text-sm text-gray-600">{t.map.phoneCard.available}</p>
                </CardContent>
              </a>
              </Card>

              <Card className="text-center border-0 shadow-lg">
              <a href="mailto:info@ecomobile.world">
                <CardContent className="p-6">
                  <Mail className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">{t.map.emailCard.title}</h3>
                  <p className="text-sm text-gray-600">info@ecomobile.world</p>
                  <p className="text-sm text-gray-600">{t.map.emailCard.response}</p>
                </CardContent>
              </a>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.faq.title}</h2>
            <p className="text-xl text-gray-600">{t.faq.subtitle}</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {t.faq.questions.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
