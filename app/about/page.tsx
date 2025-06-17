"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Award, Globe, Leaf, ChevronRight, Mail, Linkedin } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"

export default function AboutPage() {
  const { language } = useLanguage()

  const translations = {
    ru: {
      hero: {
        badge: "Наша история",
        title: "Мы создаём будущее городского транспорта",
        description:
          "Ecomobile — это команда инженеров, дизайнеров и предпринимателей, объединённых общей целью: сделать городской транспорт экологичным, эффективным и доступным для всех.",
      },
      mission: {
        title: "Наша миссия",
        description:
          "Революционизировать городской транспорт через внедрение экологически чистых и экономически эффективных решений, основанных на передовых технологиях быстрой замены батарей.",
      },
      vision: {
        title: "Наше видение",
        description:
          "Мир, где каждый городской автомобиль работает на чистой энергии, где технология быстрой замены батарей делает электротранспорт удобнее традиционного, а города становятся чище и тише.",
      },
      values: {
        title: "Наши ценности",
        subtitle: "Принципы, которые направляют нашу работу и определяют наш подход к бизнесу",
        ecology: {
          title: "Экологичность",
          description:
            "Мы верим в ответственность перед будущими поколениями и стремимся к нулевому углеродному следу в транспорте.",
        },
        innovation: {
          title: "Инновации",
          description: "Постоянное совершенствование и внедрение передовых технологий для создания лучших решений.",
        },
        customer: {
          title: "Клиентоориентированность",
          description: "Потребности наших клиентов — в центре всех наших решений и разработок продуктов.",
        },
      },
      team: {
        title: "Наша команда",
        subtitle: "Профессионалы с опытом в автомобильной промышленности, энергетике и технологиях",
        ceo: {
          name: "Алексей Смирнов",
          position: "CEO & Основатель",
          description: "15 лет в автомобильной индустрии, бывший директор по развитию Tesla в СНГ",
        },
        cto: {
          name: "Мария Козлова",
          position: "CTO",
          description: "Эксперт по батарейным технологиям, PhD в области энергетики",
        },
        design: {
          name: "Дмитрий Петров",
          position: "Head of Design",
          description: "Промышленный дизайнер с опытом работы в BMW и Audi",
        },
      },
      cta: {
        title: "Присоединяйтесь к нашей миссии",
        subtitle: "Вместе мы можем изменить будущее городского транспорта",
        contact: "Связаться с нами",
        investors: "Для инвесторов",
      },
    },
    uz: {
      hero: {
        badge: "Bizning tariximiz",
        title: "Biz shahar transportining kelajagini yaratamiz",
        description:
          "Ecomobile - bu umumiy maqsad bilan birlashgan muhandislar, dizaynerlar va tadbirkorlar jamoasi: shahar transportini ekologik, samarali va hamma uchun ochiq qilish.",
      },
      mission: {
        title: "Bizning missiyamiz",
        description:
          "Batareyalarni tez almashtirish texnologiyalariga asoslangan ekologik toza va iqtisodiy samarali yechimlarni joriy etish orqali shahar transportini inqilob qilish.",
      },
      vision: {
        title: "Bizning ko'z o'ngimiz",
        description:
          "Har bir shahar avtomobili toza energiya bilan ishlaydigan, batareyalarni tez almashtirish texnologiyasi elektrotransportni an'anaviydan qulayroq qiladigan va shaharlar tozaroq va jimroq bo'ladigan dunyo.",
      },
      values: {
        title: "Bizning qadriyatlarimiz",
        subtitle: "Ishimizni yo'naltiradigan va biznesga yondashuvimizni belgilaydigan tamoyillar",
        ecology: {
          title: "Ekologiklik",
          description:
            "Biz kelajak avlodlar oldidagi mas'uliyatga ishonamiz va transportda nol uglerod iziga intilishimiz.",
        },
        innovation: {
          title: "Innovatsiyalar",
          description:
            "Eng yaxshi yechimlarni yaratish uchun doimiy takomillashtirish va ilg'or texnologiyalarni joriy etish.",
        },
        customer: {
          title: "Mijozga yo'nalganlik",
          description:
            "Mijozlarimizning ehtiyojlari - barcha qarorlarimiz va mahsulot ishlab chiqishimizning markazida.",
        },
      },
      team: {
        title: "Bizning jamoamiz",
        subtitle: "Avtomobil sanoati, energetika va texnologiyalar sohasida tajribaga ega mutaxassislar",
        ceo: {
          name: "Aleksey Smirnov",
          position: "CEO va Asoschisi",
          description: "Avtomobil sanoatida 15 yillik tajriba, MDH da Tesla rivojlanish direktori",
        },
        cto: {
          name: "Mariya Kozlova",
          position: "CTO",
          description: "Batareya texnologiyalari bo'yicha ekspert, energetika sohasida PhD",
        },
        design: {
          name: "Dmitriy Petrov",
          position: "Dizayn rahbari",
          description: "BMW va Audi da ish tajribasi bor sanoat dizayneri",
        },
      },
      cta: {
        title: "Bizning missiyamizga qo'shiling",
        subtitle: "Birgalikda biz shahar transportining kelajagini o'zgartirishimiz mumkin",
        contact: "Biz bilan bog'lanish",
        investors: "Investorlar uchun",
      },
    },
    en: {
      hero: {
        badge: "Our Story",
        title: "We are creating the future of urban transport",
        description:
          "Ecomobile is a team of engineers, designers and entrepreneurs united by a common goal: to make urban transport ecological, efficient and accessible to everyone.",
      },
      mission: {
        title: "Our Mission",
        description:
          "To revolutionize urban transport through the implementation of environmentally clean and economically efficient solutions based on advanced battery swapping technologies.",
      },
      vision: {
        title: "Our Vision",
        description:
          "A world where every urban vehicle runs on clean energy, where battery swapping technology makes electric transport more convenient than traditional, and cities become cleaner and quieter.",
      },
      values: {
        title: "Our Values",
        subtitle: "Principles that guide our work and define our approach to business",
        ecology: {
          title: "Ecology",
          description:
            "We believe in responsibility to future generations and strive for zero carbon footprint in transport.",
        },
        innovation: {
          title: "Innovation",
          description:
            "Continuous improvement and implementation of advanced technologies to create the best solutions.",
        },
        customer: {
          title: "Customer Focus",
          description: "Our customers' needs are at the center of all our decisions and product development.",
        },
      },
      team: {
        title: "Our Team",
        subtitle: "Professionals with experience in automotive industry, energy and technology",
        ceo: {
          name: "Alexey Smirnov",
          position: "CEO & Founder",
          description: "15 years in automotive industry, former Tesla development director in CIS",
        },
        cto: {
          name: "Maria Kozlova",
          position: "CTO",
          description: "Battery technology expert, PhD in energy field",
        },
        design: {
          name: "Dmitry Petrov",
          position: "Head of Design",
          description: "Industrial designer with experience at BMW and Audi",
        },
      },
      cta: {
        title: "Join Our Mission",
        subtitle: "Together we can change the future of urban transport",
        contact: "Contact Us",
        investors: "For Investors",
      },
    },
  }

  const t = translations[language as keyof typeof translations] || translations.ru

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mb-6">{t.hero.badge}</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t.hero.title.split("городского транспорта")[0] ||
                t.hero.title.split("shahar transportining")[0] ||
                t.hero.title.split("urban transport")[0]}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {language === "ru" && " городского транспорта"}
                {language === "uz" && " shahar transportining kelajagini"}
                {language === "en" && " urban transport"}
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">{t.hero.description}</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-12">
                <div>
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.mission.title}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">{t.mission.description}</p>
                </div>

                <div>
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                    <Globe className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.vision.title}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">{t.vision.description}</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl flex items-center justify-center">
                <img src="ecomobile.jpeg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.values.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.values.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">{t.values.ecology.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.values.ecology.description}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{t.values.innovation.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.values.innovation.description}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">{t.values.customer.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.values.customer.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      {/* <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.team.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.team.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">АС</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.team.ceo.name}</h3>
                <p className="text-green-600 font-medium mb-3">{t.team.ceo.position}</p>
                <p className="text-gray-600 text-sm mb-4">{t.team.ceo.description}</p>
                <div className="flex justify-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">МК</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.team.cto.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{t.team.cto.position}</p>
                <p className="text-gray-600 text-sm mb-4">{t.team.cto.description}</p>
                <div className="flex justify-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">ДП</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.team.design.name}</h3>
                <p className="text-purple-600 font-medium mb-3">{t.team.design.position}</p>
                <p className="text-gray-600 text-sm mb-4">{t.team.design.description}</p>
                <div className="flex justify-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">{t.cta.title}</h2>
            <p className="text-xl text-green-100 mb-8">{t.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <a href="/contacts">
                  {t.cta.contact}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
              asChild
                size="lg"
                className="bg-white border-white text-green-600 hover:bg-gray-100"
              >
                <a href="/investors">
                  {t.cta.investors}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
