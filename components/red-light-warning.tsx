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

interface RedLightWarningProps {
  isOpen: boolean
  onClose: () => void
  onAcceptSafeRoute: () => void
  userName?: string
  drivingHabitTag: string
  warningMessage: string
  contextMessage: string
  newsArticles: NewsArticle[]
}

export default function RedLightWarning({
  isOpen,
  onClose,
  onAcceptSafeRoute,
  userName = "회원",
  drivingHabitTag,
  warningMessage,
  contextMessage,
  newsArticles,
}: RedLightWarningProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative mx-4 w-full max-w-md animate-in zoom-in-95 duration-200">
        {/* 빨간 신호등 헤더 */}
        <div className="rounded-t-3xl bg-gradient-to-br from-red-500 to-red-600 px-6 py-8 text-white shadow-2xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <div className="h-12 w-12 animate-pulse rounded-full bg-red-300" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">🔴 위험 감지</h2>
              <p className="mt-1 text-sm text-red-100">Red Light</p>
            </div>
          </div>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="rounded-b-3xl bg-white px-6 py-6 shadow-2xl">
          {/* 사용자 맞춤 경고 메시지 */}
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h3 className="font-bold text-gray-900">
                {userName}님, {warningMessage}
              </h3>
            </div>
            <div className="rounded-xl bg-red-50 p-4">
              <p className="text-sm leading-relaxed text-red-700">{contextMessage}</p>
            </div>
          </div>

          {/* 운전 습관 태그 표시 */}
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs text-gray-500">회원님의 운전 성향:</span>
            <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
              {drivingHabitTag}
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
                  {article.thumbnail && (
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  )}
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
            AI가 회원님의 운전 습관과 실시간 상황을 분석했어요
          </p>
        </div>
      </div>
    </div>
  )
}
