"use client"

import { Search, Mic, Navigation, Layers, Compass, Home, Bus, Car, MapPin, Bookmark, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

interface KakaoMapMainProps {
  onSearchClick: () => void
}

export default function KakaoMapMain({ onSearchClick }: KakaoMapMainProps) {
  return (
    <div className="relative mx-auto h-[100dvh] w-full max-w-[430px] overflow-hidden bg-[#f8f5f0]">
      {/* 지도 영역 - 배경 이미지 */}
      <div className="absolute inset-0">
        <img
          src="/images/map_image.png"
          alt="카카오맵 지도"
          className="h-full w-full object-cover"
          style={{ objectPosition: "center" }}
        />
      </div>

      {/* 상단 영역 */}
      <div className="absolute top-0 left-0 right-0 z-20">
        {/* 상태바 영역 */}
        <div className="h-11" />

        {/* 검색창 */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onSearchClick}
              className="flex flex-1 items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-lg border border-gray-200"
            >
              <Search className="h-5 w-5 text-gray-600" />
              <span className="text-[15px] text-gray-600">용인시 수지구 고기동</span>
              <Mic className="ml-auto h-5 w-5 text-gray-600" />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3182F6] shadow-lg">
              <Navigation className="h-5 w-5 text-white" fill="white" />
            </button>
          </div>
        </div>

        {/* 카테고리 버튼들 */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide">
          <button className="flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md border border-gray-200">
            <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
              <MapPin className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-800">친구위치</span>
          </button>
          <button className="flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md border border-gray-200">
            <div className="h-5 w-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold">
              AI
            </div>
            <span className="text-sm font-medium text-gray-800">AI맛집</span>
          </button>
          <button className="flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md border border-gray-200">
            <div className="h-5 w-5 rounded-full bg-black flex items-center justify-center">
              <span className="text-white text-xs font-bold">흑</span>
            </div>
            <span className="text-sm font-medium text-gray-800">흑백요리사2</span>
          </button>
          <button className="flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md border border-gray-200">
            <span className="text-lg">🍽️</span>
            <span className="text-sm font-medium text-gray-800">음식점</span>
          </button>
          <button className="flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md border border-gray-200">
            <span className="text-lg">☕</span>
            <span className="text-sm font-medium text-gray-800">카페</span>
          </button>
        </div>
      </div>

      {/* 우측 버튼들 */}
      <div className="absolute right-4 top-52 z-20 flex flex-col gap-2">
        <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md border border-gray-200">
          <Navigation className="h-5 w-5 text-gray-700" />
        </button>
        <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md border border-gray-200">
          <Layers className="h-5 w-5 text-gray-700" />
        </button>
        <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md border border-gray-200">
          <Compass className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* 왼쪽 하단 버튼들 */}
      <div className="absolute left-4 bottom-24 z-20 flex flex-col gap-2">
        {/* 온도 버튼 */}
        <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md border border-gray-200">
          <span className="text-sm font-medium text-gray-700">9°</span>
        </button>
        {/* 미세먼지 버튼 */}
        <button className="flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-2 shadow-md">
          <span className="text-xs font-bold text-white">미세</span>
        </button>
      </div>

      {/* 우측 하단 버튼들 */}
      <div className="absolute right-4 bottom-24 z-20 flex flex-col gap-2">
        {/* 위치 조정/타겟 버튼 */}
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200">
          <svg className="h-6 w-6 text-[#3182F6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <circle cx="12" cy="12" r="8" />
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
          </svg>
        </button>
      </div>

      {/* 하단 네비게이션 바 */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around px-4 py-2">
          <button className="flex flex-col items-center gap-1 py-2">
            <Home className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-600">홈</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-2">
            <Bus className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-600">대중교통</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-2">
            <Car className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-600">내비</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-2">
            <MapPin className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-600">주변</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-2">
            <Bookmark className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-600">즐겨찾기</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-2">
            <Menu className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-600">전체</span>
          </button>
        </div>
      </div>
    </div>
  )
}
