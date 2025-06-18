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
        { coords: [41.311144, 69.279728], content: "", color: "#3B82F6" },
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
