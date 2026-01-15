"use client"

import { Moon, Shield, X, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SafetyFeature {
  id: string
  label: string
  icon: "cctv" | "store" | "police" | "light"
}

interface PedestrianSafetyAlertProps {
  isOpen: boolean
  onClose: () => void
  onAcceptSafeRoute: () => void
  userName?: string
  situationMessage: string
  contextMessage: string
  safeRouteFeatures: SafetyFeature[]
  timeDifference: number
}

function SafetyFeatureIcon({ type, className }: { type: SafetyFeature["icon"]; className?: string }) {
  switch (type) {
    case "cctv":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 8c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z" />
        </svg>
      )
    case "store":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" />
        </svg>
      )
    case "police":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
        </svg>
      )
    case "light":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
        </svg>
      )
  }
}

export default function PedestrianSafetyAlert({
  isOpen,
  onClose,
  onAcceptSafeRoute,
  userName = "회원",
  situationMessage,
  contextMessage,
  safeRouteFeatures,
  timeDifference,
}: PedestrianSafetyAlertProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] animate-in slide-in-from-bottom duration-300">
        {/* 보라색 야간 안전 헤더 */}
        <div className="rounded-t-3xl bg-gradient-to-br from-indigo-600 to-purple-600 px-6 py-6 text-white shadow-2xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Moon className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">🌙 안심 귀가 안내</h2>
              <p className="mt-0.5 text-xs text-indigo-100">Safe Walk Home</p>
            </div>
          </div>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="bg-white px-6 py-6 shadow-2xl max-h-[60vh] overflow-y-auto">
          {/* 상황 알림 */}
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-500" />
              <h3 className="font-bold text-gray-900">{userName}님, {situationMessage}</h3>
            </div>
            <div className="rounded-xl bg-amber-50 p-4">
              <p className="text-sm leading-relaxed text-amber-800">{contextMessage}</p>
            </div>
          </div>

          {/* 안전 경로 제안 */}
          <div className="mb-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-indigo-600" />
              <h4 className="text-sm font-bold text-indigo-900">대로변 + 밝은 길 위주 경로</h4>
            </div>
            <p className="mb-3 text-xs leading-relaxed text-indigo-700">
              시간이 늦었으니, 조금 돌아가더라도 <span className="font-bold">사람들이 많이 다니는 대로변</span>으로 가는 게 어때요?
            </p>
            <div className="flex items-center gap-2 rounded-lg bg-white/60 px-3 py-2">
              <Clock className="h-4 w-4 text-indigo-600" />
              <span className="text-xs text-indigo-700">
                도착 예정 시간은 <span className="font-bold">{timeDifference}분 늦어지지만</span>, 가장 밝고 안전한 길이에요
              </span>
            </div>
          </div>

          {/* 안전 포인트 */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-0.5 flex-1 bg-gray-200" />
              <span className="text-xs font-semibold text-gray-500">✨ 이 길의 안전 포인트</span>
              <div className="h-0.5 flex-1 bg-gray-200" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {safeRouteFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5">
                  <SafetyFeatureIcon type={feature.icon} className="h-5 w-5 text-emerald-600" />
                  <span className="text-xs font-medium text-emerald-700">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 강조 메시지 */}
          <div className="mb-6 rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="mb-1 font-bold text-indigo-900">안심하고 가세요</h4>
                <p className="text-xs leading-relaxed text-indigo-700">
                  이 경로는 조도가 높은 밝은 길 위주로, CCTV와 24시간 편의점이 많아 야간에도 안전해요.
                </p>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="space-y-2">
            <Button
              onClick={onAcceptSafeRoute}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 py-6 text-base font-bold text-white shadow-lg hover:from-indigo-600 hover:to-purple-700"
            >
              🟢 안전한 경로로 안내받기
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full text-sm text-gray-500 hover:text-gray-700"
            >
              평소 가던 길로 갈게요
            </Button>
          </div>

          {/* 안내 문구 */}
          <p className="mt-4 text-center text-xs text-gray-400">
            범죄 발생 이력과 조도 데이터를 분석하여 추천드려요
          </p>
        </div>
      </div>
    </div>
  )
}
