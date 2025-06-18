export interface FormData {
  name?: string
  phone?: string
  email?: string
  message?: string
  company?: string
  position?: string
  investmentAmount?: string
  model?: string
  source?: string
}

export async function sendToTelegram(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to send message'
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending to Telegram:', error)
    return {
      success: false,
      error: 'Network error'
    }
  }
} 