"use client"

import { useState, useEffect } from "react"
import KakaoMapMain from "@/components/kakao-map-main"
import SearchScreen from "@/components/search-screen"
import KakaoMapMockup from "@/components/kakao-map-mockup"
import Image from "next/image"

type Screen = "main" | "search" | "route"

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<Screen>("main")

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

  if (currentScreen === "search") {
    return (
      <SearchScreen
        onBack={() => setCurrentScreen("main")}
        onPlaceClick={() => setCurrentScreen("route")}
      />
    )
  }

  if (currentScreen === "route") {
    return (
      <main className="min-h-screen bg-background">
        <KakaoMapMockup />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <KakaoMapMain onSearchClick={() => setCurrentScreen("search")} />
    </main>
  )
}
