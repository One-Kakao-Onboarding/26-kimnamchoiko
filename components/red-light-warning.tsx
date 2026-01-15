"use client"

import { AlertTriangle, ExternalLink, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NewsArticle {
  title: string
  source: string
  thumbnail?: string
  url: string
  publishedAt: string
}

interface DrivingHabitTag {
  id: string
  label: string
  type: "bad" | "good"
}

interface RedLightWarningProps {
  isOpen: boolean
  onClose: () => void
  onAcceptSafeRoute: () => void
  userName?: string
  drivingHabitTag: string
  drivingHabitTags?: DrivingHabitTag[] // 개별 태그 배열 추가
  warningMessage: string
  contextMessage: string
  newsArticles: NewsArticle[]
  safetyLevel?: "red" | "orange" // 안전도 레벨 추가
  isWalkMode?: boolean // 도보 모드 여부
}

export default function RedLightWarning({
  isOpen,
  onClose,
  onAcceptSafeRoute,
  userName = "회원",
  drivingHabitTag,
  drivingHabitTags,
  warningMessage,
  contextMessage,
  newsArticles,
  safetyLevel = "red",
  isWalkMode = false,
}: RedLightWarningProps) {
  if (!isOpen) return null

  // 안전도 레벨에 따른 색상 및 텍스트
  const isOrange = safetyLevel === "orange"
  const headerColors = isOrange
    ? "from-amber-500 to-amber-600"
    : "from-red-500 to-red-600"
  const headerIcon = isOrange ? "🟡" : "🔴"
  const headerTitle = isOrange ? "주의 필요" : "위험 감지"
  const headerSubtitle = isOrange ? "Orange Light" : "Red Light"
  const iconBg = isOrange ? "bg-amber-300" : "bg-red-300"
  const iconColor = isOrange ? "text-amber-500" : "text-red-500"
  const messageBg = isOrange ? "bg-amber-50" : "bg-red-50"
  const messageText = isOrange ? "text-amber-700" : "text-red-700"
  const headerTextColor = isOrange ? "text-amber-100" : "text-red-100"

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] animate-in slide-in-from-bottom duration-300">
        {/* 신호등 헤더 */}
        <div className={cn("rounded-t-3xl bg-gradient-to-br px-6 py-6 text-white shadow-2xl", headerColors)}>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <div className={cn("h-10 w-10 animate-pulse rounded-full", iconBg)} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{headerIcon} {headerTitle}</h2>
              <p className={cn("mt-0.5 text-xs", headerTextColor)}>{headerSubtitle}</p>
            </div>
          </div>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="bg-white px-6 py-6 shadow-2xl max-h-[60vh] overflow-y-auto">
          {/* 사용자 맞춤 경고 메시지 */}
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle className={cn("h-5 w-5", iconColor)} />
              <h3 className="font-bold text-gray-900">
                {userName}님, {warningMessage}
              </h3>
            </div>
            <div className={cn("rounded-xl p-4", messageBg)}>
              <p className={cn("text-sm leading-relaxed", messageText)}>{contextMessage}</p>
            </div>
          </div>

          {/* 운전 습관 태그 표시 */}
          <div className="mb-4">
            <span className="text-xs text-gray-500 mb-2 block">
              회원님의 {isWalkMode ? "도보 성향" : "운전 성향"}:
            </span>
            <div className="flex flex-wrap gap-2">
              {drivingHabitTags && drivingHabitTags.length > 0 ? (
                drivingHabitTags.map((tag) => (
                  <div
                    key={tag.id}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium",
                      tag.type === "bad"
                        ? safetyLevel === "red"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    )}
                  >
                    {tag.label}
                  </div>
                ))
              ) : (
                <div className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium",
                  safetyLevel === "red"
                    ? "bg-red-100 text-red-700"
                    : "bg-amber-100 text-amber-700"
                )}>
                  {drivingHabitTag}
                </div>
              )}
            </div>
          </div>

          {/* 뉴스 근거 자료 */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-0.5 flex-1 bg-gray-200" />
              <span className="text-xs font-semibold text-gray-500">📰 관련 소식</span>
              <div className="h-0.5 flex-1 bg-gray-200" />
            </div>

            <div className="space-y-3">
              {newsArticles.map((article, index) => (
                <a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 transition-all hover:border-red-300 hover:bg-red-50"
                >
                  <div className="flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-red-700">
                      {article.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                      <span>{article.source}</span>
                      <span>•</span>
                      <span>{article.publishedAt}</span>
                      <ExternalLink className="ml-auto h-3 w-3" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="space-y-2">
            <Button
              onClick={onAcceptSafeRoute}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 py-6 text-base font-bold text-white shadow-lg hover:from-emerald-600 hover:to-emerald-700"
            >
              🟢 안전한 경로 추천받기
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full text-sm text-gray-500 hover:text-gray-700"
            >
              괜찮아요, 원래 경로로 갈게요
            </Button>
          </div>

          {/* 안내 문구 */}
          <p className="mt-4 text-center text-xs text-gray-400">
            AI가 회원님의 {isWalkMode ? "이동 패턴" : "운전 습관"}과 실시간 상황을 분석했어요
          </p>
        </div>
      </div>
    </div>
  )
}
