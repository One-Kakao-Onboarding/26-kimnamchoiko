"use client"

import { useState, useEffect } from "react"
import KakaoMapMain from "@/components/kakao-map-main"
import Image from "next/image"

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [showSearch, setShowSearch] = useState(false)

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

  if (showSearch) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-xl font-bold mb-4">검색 스크린</p>
            <button
              onClick={() => setShowSearch(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              뒤로 가기
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <KakaoMapMain onSearchClick={() => setShowSearch(true)} />
    </main>
  )
}
