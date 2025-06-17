"use client"

import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

export function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    checkIsMobile()

    // Вешаем слушатель только при клиенском рендере
    mql.addEventListener("change", checkIsMobile)

    return () => {
      mql.removeEventListener("change", checkIsMobile)
    }
  }, [])

  return isMobile
}
