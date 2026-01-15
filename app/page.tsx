"use client"

import { useState, useEffect } from "react"
import KakaoMapMockup from "@/components/kakao-map-mockup"
import Image from "next/image"

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOnboarding(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (showOnboarding) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <div className="relative h-full w-full max-w-[430px] mx-auto">
          <Image
            src="/onboarding_image.png"
            alt="카맵 지킴이 온보딩"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <KakaoMapMockup />
    </main>
  )
}
