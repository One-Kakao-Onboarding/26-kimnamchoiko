"use client"

import { ChevronLeft, Mic, Search, MapPin, Building, GraduationCap, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchScreenProps {
  onBack: () => void
  onPlaceClick: () => void
}

export default function SearchScreen({ onBack, onPlaceClick }: SearchScreenProps) {
  const searchHistory = [
    { id: 1, name: "판교역", type: "place", icon: "pin" },
    { id: 2, name: "모히칸노래연습장", type: "place", icon: "pin" },
    { id: 3, name: "금호이수마운트밸리아파트", type: "place", icon: "pin" },
    { id: 4, name: "금호이수마운트밸리아파트", type: "search", icon: "search" },
    { id: 5, name: "아이홈아파트", type: "place", icon: "pin" },
    { id: 6, name: "부평 노래방", type: "search", icon: "search" },
    { id: 7, name: "락휴노래연습장 인천산산점", type: "place", icon: "pin" },
    { id: 8, name: "부평고등학교", type: "place", icon: "pin" },
    { id: 9, name: "부평고등학교", type: "search", icon: "search" },
    { id: 10, name: "세일고등학교", type: "search", icon: "search" },
  ]

  return (
    <div className="relative mx-auto h-[100dvh] w-full max-w-[430px] overflow-hidden bg-white">
      {/* 상단 검색바 */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
        {/* 상태바 영역 */}
        <div className="h-11" />

        {/* 검색 입력 */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3">
            <button onClick={onBack}>
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            <input
              type="text"
              placeholder="장소·주소·버스 검색"
              className="flex-1 text-[15px] text-gray-800 placeholder:text-gray-400 outline-none"
              autoFocus
            />
            <Mic className="h-5 w-5 text-gray-600" />
          </div>
        </div>

        {/* 카테고리 버튼들 */}
        <div className="flex gap-4 overflow-x-auto px-4 pb-3 scrollbar-hide">
          <button className="flex shrink-0 items-center gap-1.5">
            <div className="h-6 w-6 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold">
              AI
            </div>
            <span className="text-sm font-medium text-gray-900">AI맛집</span>
          </button>
          <button className="flex shrink-0 items-center gap-1.5">
            <span className="text-xl">🍽️</span>
            <span className="text-sm font-medium text-gray-900">음식점</span>
          </button>
          <button className="flex shrink-0 items-center gap-1.5">
            <span className="text-xl">☕</span>
            <span className="text-sm font-medium text-gray-900">카페</span>
          </button>
          <button className="flex shrink-0 items-center gap-1.5">
            <div className="h-6 w-6 rounded bg-gray-900 flex items-center justify-center text-white text-xs font-bold">
              24
            </div>
            <span className="text-sm font-medium text-gray-900">편의점</span>
          </button>
          <button className="flex shrink-0 items-center gap-1.5">
            <span className="text-xl">💊</span>
            <span className="text-sm font-medium text-gray-900">약국</span>
          </button>
        </div>

        {/* 집/회사/학교 섹션 */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <Building className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-800">집</span>
            <GraduationCap className="h-5 w-5 text-gray-600 ml-3" />
            <span className="text-sm font-medium text-gray-800">회사/학교</span>
          </div>
          <button className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-700">
            편집
          </button>
        </div>
      </div>

      {/* 추천 장소 카드 */}
      <div className="px-4 py-3 bg-gray-50">
        <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200 flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-pink-500 flex items-center justify-center shrink-0">
            <span className="text-white text-xl">✨</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-xs font-semibold text-blue-600">동천동, 주변 영어학원</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-0.5">인텔스학원</h3>
            <p className="text-xs text-gray-500">경기 용인시 수지구 동천동 36</p>
          </div>
          <ChevronLeft className="h-5 w-5 text-gray-400 rotate-180" />
        </div>
      </div>

      {/* 필터 버튼들 */}
      <div className="flex gap-2 px-4 py-3 bg-white border-b border-gray-100">
        <button className="rounded-full border-2 border-gray-900 bg-white px-4 py-1.5 text-sm font-medium text-gray-900">
          최근
        </button>
        <button className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-600">
          장소
        </button>
        <button className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-600">
          주소
        </button>
        <button className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-600">
          대중교통
        </button>
        <button className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-600">
          길찾기
        </button>
      </div>

      {/* 검색 이력 */}
      <div className="overflow-y-auto pb-4">
        {searchHistory.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.name === "판교역") {
                onPlaceClick()
              }
            }}
            className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50 w-full border-b border-gray-50"
          >
            <div className="flex h-10 w-10 items-center justify-center shrink-0">
              {item.icon === "pin" ? (
                <MapPin className="h-5 w-5 text-gray-500" />
              ) : item.icon === "search" ? (
                <Search className="h-5 w-5 text-gray-500" />
              ) : (
                <Clock className="h-5 w-5 text-gray-500" />
              )}
            </div>
            <span className="text-[15px] text-gray-800 text-left">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
