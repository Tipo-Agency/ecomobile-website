"use client"

import Script from "next/script"
import { useEffect, useRef, useState } from "react"

export default function YandexMap() {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    if (!mapReady || !window.ymaps || !mapRef.current) return

    window.ymaps.ready(() => {
      const map = new window.ymaps.Map(mapRef.current, {
        center: [41.311144, 69.279728],
        zoom: 13,
        controls: ['fullscreenControl'],
      })

      const locations = [
        { coords: [41.311144, 69.279728], content: "Планируемое расширение", color: "#3B82F6" },
        { coords: [41.3275, 69.2817], content: "Активные станции", color: "#00C853" },
        { coords: [41.302, 69.265], content: "Скоро открытие", color: "#FFD600" },
        { coords: [41.3155, 69.2482], content: "Активные станции", color: "#00C853" },
        { coords: [41.3371, 69.2734], content: "Планируемое расширение", color: "#3B82F6" },
        { coords: [41.3228, 69.2456], content: "Скоро открытие", color: "#FFD600" },
        { coords: [41.3119, 69.2322], content: "Активные станции", color: "#00C853" },
        { coords: [41.3012, 69.2713], content: "Планируемое расширение", color: "#3B82F6" },
        { coords: [41.3288, 69.2901], content: "Активные станции", color: "#00C853" },
        { coords: [41.3194, 69.2992], content: "Скоро открытие", color: "#FFD600" },
        { coords: [41.3097, 69.2814], content: "Планируемое расширение", color: "#3B82F6" },
        { coords: [41.3253, 69.2605], content: "Активные станции", color: "#00C853" },
        { coords: [41.3102, 69.2687], content: "Скоро открытие", color: "#FFD600" },
      ]
      
      
      locations.forEach(loc => {
        const placemark = new window.ymaps.Placemark(loc.coords, {
          balloonContent: loc.content,
        }, {
          preset: 'islands#dotIcon',
          iconColor: loc.color,
        })
        map.geoObjects.add(placemark)
      })
    })
  }, [mapReady])

  return (
    <>
      <Script
        src="https://api-maps.yandex.ru/2.1/?apikey=ac2e95bf-f199-4184-937d-24722f5cc478&lang=ru_RU"
        strategy="afterInteractive"
        onLoad={() => setMapReady(true)}
      />

      <div
        ref={mapRef}
        className="w-full h-full min-h-[400px]"
      />
    </>
  )
}
