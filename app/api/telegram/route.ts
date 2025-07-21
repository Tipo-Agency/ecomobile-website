import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      phone, 
      message, 
      company, 
      position, 
      investmentAmount, 
      model, 
      source,
      // Кредитные данные
      city,
      personType,
      vehiclePrice,
      downPayment,
      loanTerm,
      loanAmount,
      monthlyPayment
    } = body

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram credentials not configured')
      return NextResponse.json(
        { error: 'Telegram bot not configured' },
        { status: 500 }
      )
    }

    // Формируем сообщение для Telegram
    const isCreditApplication = vehiclePrice || loanAmount || monthlyPayment
    let telegramMessage = isCreditApplication 
      ? `💳 *Заявка на кредит*\n\n`
      : `🔔 *Новая заявка с сайта*\n\n`
    
    if (source) {
      telegramMessage += `📍 *Источник:* ${source}\n\n`
    }

    if (name) {
      telegramMessage += `👤 *Имя:* ${name}\n`
    }

    if (phone) {
      telegramMessage += `📞 *Телефон:* ${phone}\n`
    }

    if (company) {
      telegramMessage += `🏢 *Компания:* ${company}\n`
    }

    if (position) {
      telegramMessage += `💼 *Должность:* ${position}\n`
    }

    if (investmentAmount) {
      telegramMessage += `💰 *Объем инвестиций:* ${investmentAmount}\n`
    }

    if (model) {
      telegramMessage += `🚗 *Модель:* ${model}\n`
    }

    // Кредитная информация
    if (city) {
      telegramMessage += `🏙️ *Город:* ${city}\n`
    }

    if (personType) {
      telegramMessage += `👥 *Тип лица:* ${personType}\n`
    }

    if (vehiclePrice) {
      telegramMessage += `💰 *Цена автомобиля:* ${vehiclePrice}\n`
    }

    if (downPayment) {
      telegramMessage += `💳 *Первоначальный взнос:* ${downPayment}\n`
    }

    if (loanTerm) {
      telegramMessage += `📅 *Срок кредита:* ${loanTerm}\n`
    }

    if (loanAmount) {
      telegramMessage += `🏦 *Сумма кредита:* ${loanAmount}\n`
    }

    if (monthlyPayment) {
      telegramMessage += `📊 *Ежемесячный платеж:* ${monthlyPayment}\n`
    }

    if (message) {
      telegramMessage += `\n💬 *Сообщение:*\n${message}\n`
    }

    telegramMessage += `\n⏰ *Время:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })}`

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'Markdown',
        }),
      }
    )

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.text()
      console.error('Telegram API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to send message to Telegram' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending to Telegram:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 