"use client"

import { CheckCircle2, X, Navigation, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GreenLightSolutionProps {
  isOpen: boolean
  onClose: () => void
  onStartNavigation: () => void
  userName?: string
  routeName: string
  solutionMessage: string
  reasoningMessage: string
  userTags: string[]
  estimatedTime: number
  distance: string
  safetyScore: number
  isWalkMode?: boolean
}

export default function GreenLightSolution({
  isOpen,
  onClose,
  onStartNavigation,
  userName = "회원",
  routeName,
  solutionMessage,
  reasoningMessage,
  userTags,
  estimatedTime,
  distance,
  safetyScore,
  isWalkMode = false,
}: GreenLightSolutionProps) {
  if (!isOpen) return null

  // 시간 포맷팅 함수
  function formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (hours === 0) {
      return `${mins}분`
    } else if (mins === 0) {
      return `${hours}시간`
    } else {
      return `${hours}시간 ${mins}분`
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] animate-in slide-in-from-bottom duration-300">
        {/* 초록 신호등 헤더 */}
        <div className="rounded-t-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 px-6 py-6 text-white shadow-2xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <div className="h-10 w-10 animate-pulse rounded-full bg-emerald-300" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">🟢 안전 경로 안내</h2>
              <p className="mt-0.5 text-xs text-emerald-100">Green Light</p>
            </div>
          </div>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="bg-white px-6 py-6 shadow-2xl max-h-[60vh] overflow-y-auto">
          {/* 맞춤 추천 메시지 */}
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <h3 className="font-bold text-gray-900">{solutionMessage}</h3>
            </div>
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-sm leading-relaxed text-emerald-700">{reasoningMessage}</p>
            </div>
          </div>

          {/* 경로 정보 */}
          <div className="mb-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-emerald-900">{routeName}</span>
              <div className="flex items-center gap-1 rounded-full bg-emerald-200 px-2.5 py-1">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-700" />
                <span className="text-xs font-bold text-emerald-700">안전지수 {safetyScore}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-600" />
                <span className="text-2xl font-bold text-emerald-900">{formatTime(estimatedTime)}</span>
              </div>
              <div className="h-6 w-px bg-emerald-300" />
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-emerald-600" />
                <span className="text-lg font-semibold text-emerald-800">{distance}</span>
              </div>
            </div>
          </div>

          {/* 운전 성향 태그 */}
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-0.5 flex-1 bg-gray-200" />
              <span className="text-xs font-semibold text-gray-500">운전성향</span>
              <div className="h-0.5 flex-1 bg-gray-200" />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {userTags.map((tag, index) => (
                <div
                  key={index}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium",
                    tag.startsWith("#")
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-blue-100 text-blue-700"
                  )}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* 안내 강조 메시지 */}
          <div className="mb-6 rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="mb-1 font-bold text-emerald-900">안심하고 가세요!</h4>
                <p className="text-xs leading-relaxed text-emerald-700">
                  {userName}님의 {isWalkMode ? "이동 패턴" : "운전 스타일"}을 분석하여, 가장 안전하고 편안한 경로를 추천드렸어요.
                </p>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="space-y-2">
            <Button
              onClick={onStartNavigation}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 py-6 text-base font-bold text-white shadow-lg hover:from-emerald-600 hover:to-emerald-700"
            >
              <Navigation className="mr-2 h-5 w-5" />
              안내 시작하기
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full text-sm text-gray-500 hover:text-gray-700"
            >
              다른 경로 둘러보기
            </Button>
          </div>

          {/* 안내 문구 */}
          <p className="mt-4 text-center text-xs text-gray-400">
            카카오맵이 회원님만을 위해 계산한 최적의 경로예요
          </p>
        </div>
      </div>
    </div>
  )
}
