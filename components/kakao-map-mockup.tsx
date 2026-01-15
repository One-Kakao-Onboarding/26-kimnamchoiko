"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  X,
  MoreVertical,
  Clock,
  User,
  Layers,
  Mic,
  Crosshair,
  Shield,
  AlertTriangle,
  Eye,
  Zap,
  TrendingUp,
  Heart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import RedLightWarning from "@/components/red-light-warning"
import GreenLightSolution from "@/components/green-light-solution"
import PedestrianSafetyAlert from "@/components/pedestrian-safety-alert"

// 교통수단 아이콘 컴포넌트
function CarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
  )
}

function BusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
    </svg>
  )
}

function WalkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
    </svg>
  )
}

function BikeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" />
    </svg>
  )
}

// 운전 습관 태그 타입
interface DrivingHabitTag {
  id: string
  label: string
  type: "bad" | "good"
}

// 경로 타입 정의
interface RouteOption {
  id: string
  label: string
  time: number
  distance: string
  taxiFare: string
  warning?: string
  mapImage: string
  // AI 안전 분석 데이터
  safetyLevel: "green" | "orange" | "red"
  impactScore: number
  aiAnalysis: string
  // 개인화된 구어체 멘트
  personalizedMessage: string
  drivingTip: string
  hazards: { id: string; label: string; icon: "ice" | "construction" | "school" | "cctv" | "dark" | "crowd" }[]
  // 운전 습관 기반 분석
  drivingHabitAnalysis: {
    brakeScore: number // 급정거 습관 점수
    speedScore: number // 속도 유지 점수
    recommendation: string
  }
}

interface RouteFilter {
  id: string
  label: string
  active: boolean
}

// 운전 습관 태그 데이터
const drivingHabitTags: DrivingHabitTag[] = [
  { id: "snow-speeding", label: "#눈길에도_조금빠름", type: "bad" },
  { id: "frequent-brake", label: "#급정거가_잦은편", type: "bad" },
  { id: "rain-speeding", label: "#빗길_과속", type: "bad" },
  { id: "tunnel-lane-change", label: "#터널_차선변경", type: "bad" },
  { id: "defensive-driving", label: "#방어운전_만렙", type: "good" },
  { id: "stop-line", label: "#정지선_칼준수", type: "good" },
  { id: "rain-slow", label: "#빗길_감속주행", type: "good" },
  { id: "best-driver", label: "#베스트드라이버", type: "good" },
]

// 사용자 운전 습관 (예시 데이터)
const userDrivingHabits: DrivingHabitTag[] = [
  drivingHabitTags[0], // #눈길에도_조금빠름
  drivingHabitTags[1], // #급정거가_잦은편
]

// 사용자 도보 성향 태그
const userWalkingHabits = ["#빠른길_선호", "#빠른발걸음러"]

const routeOptions: RouteOption[] = [
  // 위험 경로 (red)
  {
    id: "shortest",
    label: "거리우선",
    time: 27,
    distance: "9km",
    taxiFare: "16,900원",
    warning: "어린이 보호구역 포함",
    mapImage: "/images/map_pangyo_1.png",
    safetyLevel: "red",
    impactScore: 45,
    aiAnalysis: "어린이 보호구역 3곳 통과, 주의 필요",
    personalizedMessage: "어제 폭설 영향으로 그림님의 평소 출근 경로에 블랙 아이스가 의심되니, 오늘은 카맵 지킴이의 추천 경로 어때요?",
    drivingTip: "30km/h 제한구간이 많아요. 시간 여유 있으실 때 추천드려요",
    hazards: [
      { id: "school", label: "스쿨존", icon: "school" },
      { id: "construction", label: "공사중", icon: "construction" },
    ],
    drivingHabitAnalysis: {
      brakeScore: 55,
      speedScore: 50,
      recommendation: "스쿨존에서 속도 조절이 중요해요. 평소보다 더 천천히 가주세요",
    },
  },
  // 주의 경로 (orange)
  {
    id: "fastest",
    label: "최소시간",
    time: 22,
    distance: "11.3km",
    taxiFare: "17,000원",
    mapImage: "/images/map_pangyo_2.png",
    safetyLevel: "orange",
    impactScore: 65,
    aiAnalysis: "서판교IC 구간 결빙 주의",
    personalizedMessage: "눈이 녹았다 얼기를 반복하면서\n일부 구간에서 미끄러질 수 있어요.\n속도를 살짝만 줄여도 훨씬 안전해요.",
    drivingTip: "평소 급가속하시는 편이라 이 구간은 천천히 가시는 게 좋겠어요",
    hazards: [
      { id: "ice", label: "결빙구간", icon: "ice" },
      { id: "crowd", label: "혼잡", icon: "crowd" },
    ],
    drivingHabitAnalysis: {
      brakeScore: 72,
      speedScore: 65,
      recommendation: "급가속 습관이 있으시네요. 이 경로에선 부드러운 출발이 안전해요",
    },
  },
  // 안전 경로 (green)
  {
    id: "recommended",
    label: "카맵 지킴이 추천",
    time: 22,
    distance: "10.7km",
    taxiFare: "17,300원",
    mapImage: "/images/map_pangyo_2.png",
    safetyLevel: "green",
    impactScore: 85,
    aiAnalysis: "AI 분석 결과 가장 안전한 경로",
    personalizedMessage: "블랙 아이스가 의심되는 구간을 피해 사고 가능성이 낮은 길로 안내했어요. 지금 선택이 더 안전할 것 같아요!",
    drivingTip: "평소 운전 스타일에 딱 맞는 경로예요",
    hazards: [{ id: "cctv", label: "CCTV 밀집", icon: "cctv" }],
    drivingHabitAnalysis: {
      brakeScore: 88,
      speedScore: 90,
      recommendation: "평소처럼 여유있게 운전하시면 돼요. 이 길은 회원님 스타일에 잘 맞아요",
    },
  },
  {
    id: "main-road",
    label: "큰길우선",
    time: 22,
    distance: "11.3km",
    taxiFare: "17,000원",
    mapImage: "/images/map_pangyo_3.png",
    safetyLevel: "green",
    impactScore: 82,
    aiAnalysis: "대로변 위주 안심 경로",
    personalizedMessage: "넓은 도로 위주라 운전하기 편하실 거예요! 시야도 탁 트여있어요 🛣️",
    drivingTip: "차선 변경이 적어서 스트레스 없이 가실 수 있어요",
    hazards: [{ id: "cctv", label: "CCTV 밀집", icon: "cctv" }],
    drivingHabitAnalysis: {
      brakeScore: 85,
      speedScore: 88,
      recommendation: "대로변이라 급정거 상황이 적어요. 평소대로 운전하셔도 괜찮아요",
    },
  },
  {
    id: "highway",
    label: "고속도로우선",
    time: 22,
    distance: "11.3km",
    taxiFare: "17,000원",
    mapImage: "/images/map_pangyo_1.png",
    safetyLevel: "orange",
    impactScore: 70,
    aiAnalysis: "경부고속도로 정체 구간 존재",
    personalizedMessage: "지금 경부고속도로가 조금 막혀요. 그래도 괜찮으시다면 이 길도 나쁘지 않아요 🚗",
    drivingTip: "정체 구간에서 자주 끼어들기가 있으니 여유롭게 가세요",
    hazards: [{ id: "crowd", label: "정체구간", icon: "crowd" }],
    drivingHabitAnalysis: {
      brakeScore: 70,
      speedScore: 75,
      recommendation: "고속도로에서 급제동하시는 경향이 있어요. 앞차와 거리 유지 부탁드려요",
    },
  },
  {
    id: "shortest",
    label: "거리우선",
    time: 27,
    distance: "9km",
    taxiFare: "16,900원",
    warning: "어린이 보호구역 포함",
    mapImage: "/images/map_pangyo_2.png",
    safetyLevel: "red",
    impactScore: 45,
    aiAnalysis: "어린이 보호구역 3곳 통과, 주의 필요",
    personalizedMessage: "가장 짧은 길인데... 스쿨존이 3군데나 있어요. 조심조심 가주세요! 🚸",
    drivingTip: "30km/h 제한구간이 많아요. 시간 여유 있으실 때 추천드려요",
    hazards: [
      { id: "school", label: "스쿨존", icon: "school" },
      { id: "construction", label: "공사중", icon: "construction" },
    ],
    drivingHabitAnalysis: {
      brakeScore: 55,
      speedScore: 50,
      recommendation: "스쿨존에서 속도 조절이 중요해요. 평소보다 더 천천히 가주세요",
    },
  },
]

// 도보 경로 옵션 (평균 2시간 10분, 9km)
const walkRouteOptions: RouteOption[] = [
    {
    id: "walk-dangerous",
    label: "거리우선",
    time: 108,
    distance: "8.0km",
    taxiFare: "약 1,080kcal",
    warning: "최근 사건 이력",
    mapImage: "/images/map_pangyo_1.png",
    safetyLevel: "red",
    impactScore: 45,
    aiAnalysis: "최근 인근에서 범죄/소란 이력 존재",
    personalizedMessage: "시간이 늦었으니, 오늘은 조금 돌아가더라도 사람들이 많이 다니는 대로변으로 가는 게 어때요?",
    drivingTip: "이 시간대에는 다른 경로를 추천드려요",
    hazards: [
      { id: "dark", label: "어두운 구간", icon: "dark" },
      { id: "construction", label: "인적 드묾", icon: "construction" },
    ],
    drivingHabitAnalysis: {
      brakeScore: 45,
      speedScore: 50,
      recommendation: "안전을 위해 다른 경로를 선택하세요",
    },
  },
  {
    id: "walk-recommended",
    label: "추천경로",
    time: 137,
    distance: "9.2km",
    taxiFare: "약 1,240kcal",
    mapImage: "/images/map_pangyo_2.png",
    safetyLevel: "green",
    impactScore: 90,
    aiAnalysis: "보도가 잘 정비되어 있고 CCTV가 많은 경로",
    personalizedMessage: "도착 예정 시간은 7분 늦어지지만, 가장 밝고 안전한 길입니다.",
    drivingTip: "쾌적한 보행로로 스트레스 없이 걸으실 수 있어요",
    hazards: [{ id: "cctv", label: "CCTV 밀집", icon: "cctv" }],
    drivingHabitAnalysis: {
      brakeScore: 90,
      speedScore: 90,
      recommendation: "보도가 잘 정비되어 있어 편하게 걸으실 수 있어요",
    },
  },
  {
    id: "walk-fastest",
    label: "최단거리",
    time: 120,
    distance: "8.5km",
    taxiFare: "약 1,150kcal",
    mapImage: "/images/map_pangyo_1.png",
    safetyLevel: "orange",
    impactScore: 65,
    aiAnalysis: "좁은 골목길 포함, 야간 이용 시 주의",
    personalizedMessage: "최근 이 시간대에 인적이 드문 구간이 있었어요. 주변을 살피며 이동해 주세요.",
    drivingTip: "조명이 어두운 구간이 있으니 시간대를 고려해주세요",
    hazards: [
      { id: "dark", label: "어두운 구간", icon: "dark" },
      { id: "construction", label: "공사중", icon: "construction" },
    ],
    drivingHabitAnalysis: {
      brakeScore: 65,
      speedScore: 70,
      recommendation: "골목길이 많아 주의가 필요해요",
    },
  },
  {
    id: "walk-main-road",
    label: "큰길우선",
    time: 140,
    distance: "9.5km",
    taxiFare: "약 1,280kcal",
    mapImage: "/images/map_pangyo_3.png",
    safetyLevel: "green",
    impactScore: 85,
    aiAnalysis: "대로변 위주로 밝고 안전한 경로",
    personalizedMessage: "큰길로만 가니까 안심이에요! 사람들도 많이 다니고 가게들도 많아서 좋아요 🛣️",
    drivingTip: "대로변이라 안전하지만 횡단보도가 많아 시간이 조금 더 걸려요",
    hazards: [
      { id: "cctv", label: "CCTV 밀집", icon: "cctv" },
      { id: "crowd", label: "보행자 많음", icon: "crowd" },
    ],
    drivingHabitAnalysis: {
      brakeScore: 85,
      speedScore: 80,
      recommendation: "대로변이라 안전하고 쾌적해요",
    },
  },
  {
    id: "walk-park",
    label: "공원길",
    time: 145,
    distance: "9.8km",
    taxiFare: "약 1,320kcal",
    mapImage: "/images/map_pangyo_2.png",
    safetyLevel: "green",
    impactScore: 88,
    aiAnalysis: "공원과 녹지를 경유하는 쾌적한 경로",
    personalizedMessage: "날씨 좋을 때는 이 길이 최고예요! 공원 산책하면서 가실 수 있어요 🌳",
    drivingTip: "공원길이라 경치도 좋고 공기도 맑아요",
    hazards: [],
    drivingHabitAnalysis: {
      brakeScore: 88,
      speedScore: 85,
      recommendation: "공원길이라 여유롭게 걸으실 수 있어요",
    },
  }
]

function getSafetyEmoji(level: RouteOption["safetyLevel"]) {
  switch (level) {
    case "green":
      return "💚"
    case "orange":
      return "🧡"
    case "red":
      return "❤️‍🔥"
  }
}

function getSafetyPersonalLabel(level: RouteOption["safetyLevel"]) {
  switch (level) {
    case "green":
      return "안심하고 가세요"
    case "orange":
      return "조금만 주의해주세요"
    case "red":
      return "각별히 조심해주세요"
  }
}

function getSafetyColors(level: RouteOption["safetyLevel"]) {
  switch (level) {
    case "green":
      return {
        bg: "bg-emerald-500",
        bgLight: "bg-emerald-50",
        text: "text-emerald-600",
        border: "border-emerald-500",
        ring: "ring-emerald-500",
      }
    case "orange":
      return {
        bg: "bg-amber-500",
        bgLight: "bg-amber-50",
        text: "text-amber-600",
        border: "border-amber-500",
        ring: "ring-amber-500",
      }
    case "red":
      return {
        bg: "bg-red-500",
        bgLight: "bg-red-50",
        text: "text-red-600",
        border: "border-red-500",
        ring: "ring-red-500",
      }
  }
}

function getSafetyLabel(level: RouteOption["safetyLevel"]) {
  switch (level) {
    case "green":
      return "안전"
    case "orange":
      return "주의"
    case "red":
      return "위험"
  }
}

function HazardIcon({ type, className }: { type: RouteOption["hazards"][0]["icon"]; className?: string }) {
  switch (type) {
    case "ice":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
        </svg>
      )
    case "construction":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 22h20L12 2zm0 4l7.53 14H4.47L12 6zm-1 6v4h2v-4h-2zm0 6v2h2v-2h-2z" />
        </svg>
      )
    case "school":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
        </svg>
      )
    case "cctv":
      return <Eye className={className} />
    case "dark":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
        </svg>
      )
    case "crowd":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      )
  }
}

function ImpactScoreGauge({ score, level }: { score: number; level: RouteOption["safetyLevel"] }) {
  const colors = getSafetyColors(level)
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-2 w-16 rounded-full bg-gray-200 overflow-hidden">
        <div
          className={cn("absolute left-0 top-0 h-full rounded-full transition-all duration-500", colors.bg)}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={cn("text-xs font-semibold", colors.text)}>{score}</span>
    </div>
  )
}

function TrafficLightIndicator({ level }: { level: RouteOption["safetyLevel"] }) {
  const colors = getSafetyColors(level)
  return (
    <div className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-1", colors.bgLight)}>
      <div className={cn("h-3 w-3 rounded-full", colors.bg)} />
      <span className={cn("text-xs font-semibold", colors.text)}>{getSafetyLabel(level)}</span>
    </div>
  )
}

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

function DrivingHabitBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-16 shrink-0">{label}</span>
      <div className="relative h-1.5 flex-1 rounded-full bg-gray-200 overflow-hidden">
        <div
          className={cn("absolute left-0 top-0 h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-600 w-8 text-right">{score}점</span>
    </div>
  )
}

interface KakaoMapMockupProps {
  onBack?: () => void
}

export default function KakaoMapMockup({ onBack }: KakaoMapMockupProps) {
  const [selectedTransport, setSelectedTransport] = useState<"car" | "bus" | "walk" | "bike">("car")
  const [selectedRoute, setSelectedRoute] = useState(0)
  const [showAIAnalysis, setShowAIAnalysis] = useState(false)
  const [showRedLightWarning, setShowRedLightWarning] = useState(false)
  const [showGreenLightSolution, setShowGreenLightSolution] = useState(false)
  const [showPedestrianSafetyAlert, setShowPedestrianSafetyAlert] = useState(false)

  const [routeFilters, setRouteFilters] = useState<RouteFilter[]>([
    { id: "free-road", label: "무료도로", active: false },
    { id: "no-car-only", label: "자동차전용제외", active: false },
    { id: "child-safe", label: "어린이안심", active: false },
  ])

  // 앱 실행 시 자동 경고 표시 (3초 후)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedTransport === "car") {
        setShowRedLightWarning(true)
      } else if (selectedTransport === "walk") {
        // 보행자 모드에서는 야간(21시 이후) 자동 표시
        const currentHour = new Date().getHours()
        if (currentHour >= 21 || currentHour < 6) {
          setShowPedestrianSafetyAlert(true)
        }
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [selectedTransport])

  const routeCardsRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const toggleFilter = (filterId: string) => {
    setRouteFilters((prev) =>
      prev.map((filter) => (filter.id === filterId ? { ...filter, active: !filter.active } : filter)),
    )
  }

  const handleScroll = useCallback(() => {
    if (!routeCardsRef.current) return

    isScrollingRef.current = true

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false

      if (!routeCardsRef.current) return

      const container = routeCardsRef.current
      const containerRect = container.getBoundingClientRect()
      const containerCenter = containerRect.left + containerRect.width / 2

      let closestIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      cardRefs.current.forEach((card, index) => {
        if (card) {
          const cardRect = card.getBoundingClientRect()
          const cardCenter = cardRect.left + cardRect.width / 2
          const distance = Math.abs(containerCenter - cardCenter)

          if (distance < closestDistance) {
            closestDistance = distance
            closestIndex = index
          }
        }
      })

      setSelectedRoute(closestIndex)
    }, 100)
  }, [])

  const scrollToRoute = useCallback((index: number) => {
    const card = cardRefs.current[index]
    if (card && routeCardsRef.current) {
      const container = routeCardsRef.current
      const cardRect = card.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      const scrollLeft =
        container.scrollLeft + (cardRect.left - containerRect.left) - containerRect.width / 2 + cardRect.width / 2

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      })
    }
  }, [])

  useEffect(() => {
    scrollToRoute(selectedRoute)
  }, [])

  // 선택된 교통수단에 따라 적절한 경로 옵션 선택
  const currentRouteOptions = selectedTransport === "walk" ? walkRouteOptions : routeOptions

  // 교통수단 변경 시 경로 선택 초기화
  useEffect(() => {
    setSelectedRoute(0)
    scrollToRoute(0)
  }, [selectedTransport, scrollToRoute])

  const currentRoute = currentRouteOptions[selectedRoute]
  const currentSafetyColors = getSafetyColors(currentRoute.safetyLevel)

  // Red Light Warning 수락 핸들러
  const handleAcceptSafeRoute = () => {
    setShowRedLightWarning(false)
    // Green Light Solution 패널은 표시하지 않음
    // 추천 경로로 자동 전환 (내비추천)
    const recommendedIndex = currentRouteOptions.findIndex((r) => r.id === "recommended" || r.id === "walk-recommended")
    if (recommendedIndex !== -1) {
      setSelectedRoute(recommendedIndex)
      scrollToRoute(recommendedIndex)
    }
  }

  // Green Light Solution에서 안내 시작
  const handleStartNavigation = () => {
    setShowGreenLightSolution(false)
    // 실제로는 여기서 네비게이션 시작
    console.log("Navigation started with safe route")
  }

  // 보행자 안전 경로 수락
  const handleAcceptPedestrianSafeRoute = () => {
    setShowPedestrianSafetyAlert(false)
    // 안전한 보행자 경로로 전환
    console.log("Pedestrian safe route accepted")
  }

  return (
    <div className="relative mx-auto h-[100dvh] w-full max-w-[430px] overflow-hidden bg-[#f5f5f5]">
      {/* Red Light Warning 모달 */}
      <RedLightWarning
        isOpen={showRedLightWarning}
        onClose={() => setShowRedLightWarning(false)}
        onAcceptSafeRoute={handleAcceptSafeRoute}
        userName="그림"
        drivingHabitTag={
          selectedTransport === "walk"
            ? userWalkingHabits.join(", ")
            : userDrivingHabits.map((h) => h.label).join(", ")
        }
        drivingHabitTags={selectedTransport === "walk" ? undefined : userDrivingHabits}
        warningMessage={
          selectedTransport === "walk"
            ? currentRoute.safetyLevel === "red"
              ? "이 길 인근에서 최근 좋지 않은 사건(범죄/소란) 이력이 있어요!"
              : "이 시간대에는 조금 더 조심하면 좋아요."
            : currentRoute.safetyLevel === "red"
              ? "눈 오는 날 주행 속도가 여전히 조금 빨라요!"
              : "오늘은 평소보다 조금 더 조심하면 좋아요."
        }
        contextMessage={currentRoute.personalizedMessage}
        safetyLevel={currentRoute.safetyLevel === "orange" ? "orange" : "red"}
        isWalkMode={selectedTransport === "walk"}
        newsArticles={
          selectedTransport === "walk"
            ? [
                {
                  title:
                    currentRoute.safetyLevel === "red"
                      ? "[단독] 서울 강남구 일대 야간 소란 사건 발생"
                      : "서울시 야간 보행 안전 대책 강화",
                  source: currentRoute.safetyLevel === "red" ? "YTN" : "뉴스1",
                  thumbnail: "/images/news-placeholder.jpg",
                  url: "#",
                  publishedAt: "3시간 전",
                },
                {
                  title:
                    currentRoute.safetyLevel === "red"
                      ? "경기 용인·수지 일대 범죄 주의보"
                      : "최근 야간 시간대 소란 신고 증가",
                  source: "연합뉴스",
                  url: "#",
                  publishedAt: "5시간 전",
                },
              ]
            : [
          {
            title: currentRoute.safetyLevel === "red"
              ? "[속보] 서해안고속도로 추돌 사고... \"도로 결빙 주의 필요\""
              : currentRoute.safetyLevel === "orange"
              ? "[속보] 출근 시간대 도로 결빙 사고 증가"
              : "[속보] 서해안고속도로 추돌 사고… \"도로 결빙 주의 필요\"",
            source: "KBS 뉴스",
            thumbnail: "/images/news-placeholder.jpg",
            url: "#",
            publishedAt: "2시간 전",
          },
          {
            title: "경기 용인·수지 일대 도로 곳곳 결빙 주의보",
            source: "연합뉴스",
            url: "#",
            publishedAt: "4시간 전",
          },
        ]
        }
      />

      {/* Green Light Solution 모달 */}
      <GreenLightSolution
        isOpen={showGreenLightSolution}
        onClose={() => setShowGreenLightSolution(false)}
        onStartNavigation={handleStartNavigation}
        userName="그림"
        routeName={currentRoute.label}
        solutionMessage="그림님 이 길도 좋은 선택이에요!"
        reasoningMessage={currentRoute.personalizedMessage}
        userTags={selectedTransport === "walk" ? userWalkingHabits : userDrivingHabits.map((h) => h.label)}
        estimatedTime={currentRoute.time}
        distance={currentRoute.distance}
        safetyScore={currentRoute.impactScore}
        isWalkMode={selectedTransport === "walk"}
      />

      {/* 보행자 안심 귀가 알림 */}
      <PedestrianSafetyAlert
        isOpen={showPedestrianSafetyAlert}
        onClose={() => setShowPedestrianSafetyAlert(false)}
        onAcceptSafeRoute={handleAcceptPedestrianSafeRoute}
        userName="민지"
        situationMessage="평소 가시던 길 인근에 최근 좋지 않은 사건 이력이 있어요"
        contextMessage="시간이 늦었으니, 오늘은 조금 돌아가더라도 사람들이 많이 다니는 대로변으로 가는 게 어때요?"
        safeRouteFeatures={[
          { id: "cctv", label: "CCTV 밀집", icon: "cctv" },
          { id: "store", label: "24시간 편의점", icon: "store" },
          { id: "police", label: "지구대 인근", icon: "police" },
          { id: "light", label: "밝은 조명", icon: "light" },
        ]}
        timeDifference={7}
      />

      {/* 파란색 헤더 */}
      <header className="relative z-20 bg-[#4A90E2] px-4 pb-3 pt-3">
        {/* 교통수단 선택 - 중앙 배치, X 버튼 우측 끝 */}
        <div className="flex items-center justify-center relative">
          {/* 교통수단 아이콘들 - 중앙 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedTransport("car")}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200",
                selectedTransport === "car" ? "bg-white shadow-md" : "bg-transparent",
              )}
            >
              <CarIcon
                className={cn(
                  "h-7 w-7 transition-colors",
                  selectedTransport === "car" ? "text-[#4A90E2]" : "text-white",
                )}
              />
            </button>
            <button
              onClick={() => setSelectedTransport("bus")}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200",
                selectedTransport === "bus" ? "bg-white shadow-md" : "bg-transparent",
              )}
            >
              <BusIcon
                className={cn(
                  "h-7 w-7 transition-colors",
                  selectedTransport === "bus" ? "text-[#4A90E2]" : "text-white",
                )}
              />
            </button>
            <button
              onClick={() => setSelectedTransport("walk")}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200",
                selectedTransport === "walk" ? "bg-white shadow-md" : "bg-transparent",
              )}
            >
              <WalkIcon
                className={cn(
                  "h-7 w-7 transition-colors",
                  selectedTransport === "walk" ? "text-[#4A90E2]" : "text-white",
                )}
              />
            </button>
            <button
              onClick={() => setSelectedTransport("bike")}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200",
                selectedTransport === "bike" ? "bg-white shadow-md" : "bg-transparent",
              )}
            >
              <BikeIcon
                className={cn(
                  "h-7 w-7 transition-colors",
                  selectedTransport === "bike" ? "text-[#4A90E2]" : "text-white",
                )}
              />
            </button>
          </div>

          {/* X 닫기 버튼 - 우측 끝 고정 */}
          <button onClick={onBack} className="absolute right-0 flex h-10 w-10 items-center justify-center">
            <X className="h-7 w-7 text-white/80" strokeWidth={1.5} />
          </button>
        </div>

        {/* 출발지 -> 도착지 바 */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex flex-1 items-center rounded-lg bg-[#6BA3E8] px-4 py-3">
            <span className="flex-1 truncate text-[15px] text-white">경기 용인시 수지구 고...</span>
            <span className="mx-3 text-white/70">→</span>
            <span className="flex-1 truncate text-right text-[15px] text-white">판교역 신분당선</span>
          </div>
          <button className="flex h-10 w-8 items-center justify-center">
            <MoreVertical className="h-6 w-6 text-white" />
          </button>
        </div>
      </header>

      {/* 지도 영역 */}
      <div className="absolute inset-0 top-[124px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#f8f5f0]">
          {currentRouteOptions.map((route: RouteOption, index: number) => (
            <img
              key={route.id}
              src={route.mapImage || "/placeholder.svg"}
              alt={`${route.label} 경로 지도`}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                selectedRoute === index ? "opacity-100" : "opacity-0",
              )}
              style={{ objectPosition: "center 80%" }}
            />
          ))}
        </div>

        {/* 왼쪽 상단 시계 버튼 */}
        <button className="absolute left-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md">
          <Clock className="h-5 w-5 text-gray-600" />
        </button>

        {/* 오른쪽 상단 버튼들 */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md">
            <User className="h-5 w-5 text-gray-600" />
          </button>
          <button className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md">
            <Layers className="h-5 w-5 text-gray-600" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <div className="relative">
            <button
              onClick={() => {
                // AI 분석 패널 숨기기
                setShowAIAnalysis(false)
                // 현재 경로의 안전도에 따라 적절한 시트 표시
                const currentSafetyLevel = currentRouteOptions[selectedRoute].safetyLevel
                if (currentSafetyLevel === "red") {
                  setShowRedLightWarning(true)
                } else if (currentSafetyLevel === "orange") {
                  setShowRedLightWarning(true)
                } else {
                  setShowGreenLightSolution(true)
                }
              }}
              className={cn(
                "relative flex h-11 w-11 items-center justify-center rounded-full border shadow-md transition-all duration-200",
                showAIAnalysis ? "border-[#4A90E2] bg-[#4A90E2] text-white" : "border-gray-200 bg-white text-gray-600",
              )}
            >
              <span className="text-2xl">🚦</span>
            </button>

            {/* 안전도 말풍선 메시지 */}
            {!showAIAnalysis && (
              <div className="absolute right-14 top-1/2 -translate-y-1/2 animate-in fade-in slide-in-from-right-2 duration-300">
                <div className={cn(
                  "relative rounded-lg px-3 py-2 shadow-lg whitespace-nowrap",
                  currentRoute.safetyLevel === "green" && "bg-emerald-500",
                  currentRoute.safetyLevel === "orange" && "bg-amber-500",
                  currentRoute.safetyLevel === "red" && "bg-red-500"
                )}>
                  <p className="text-xs font-bold text-white">
                    {currentRoute.safetyLevel === "green" && "✓ 좋은 선택이에요!"}
                    {currentRoute.safetyLevel === "orange" && "⚠ 주의가 필요해요"}
                    {currentRoute.safetyLevel === "red" && "⚡ 오늘은 위험할 것 같아요!"}
                  </p>
                  {/* 말풍선 꼬리 */}
                  <div className={cn(
                    "absolute right-0 top-1/2 -translate-y-1/2 translate-x-full",
                    "w-0 h-0 border-l-8 border-y-4 border-y-transparent",
                    currentRoute.safetyLevel === "green" && "border-l-emerald-500",
                    currentRoute.safetyLevel === "orange" && "border-l-amber-500",
                    currentRoute.safetyLevel === "red" && "border-l-red-500"
                  )} />
                </div>
              </div>
            )}
          </div>
        </div>

        {showAIAnalysis && (
          <div className="absolute left-3 right-3 top-16 z-30 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl p-4 border border-gray-100">
              {/* 상단 헤더 - 신호등 색상 강조 */}
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-full", currentSafetyColors.bg)}>
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getSafetyEmoji(currentRoute.safetyLevel)}</span>
                    <h3 className={cn("font-bold text-base", currentSafetyColors.text)}>
                      {getSafetyPersonalLabel(currentRoute.safetyLevel)}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {selectedTransport === "walk"
                      ? "그림님의 이동 패턴을 분석하여, 가장 안전하고 편안한 경로를 추천드렸어요."
                      : "회원님의 운전 스타일을 분석했어요"}
                  </p>
                </div>
                <TrafficLightIndicator level={currentRoute.safetyLevel} />
              </div>

              {/* 사용자 운전 습관/도보 성향 태그 표시 */}
              {selectedTransport === "car" && userDrivingHabits.length > 0 && (
                <div className={cn(
                  "mb-4 rounded-xl p-3",
                  currentRoute.safetyLevel === "red"
                    ? "bg-red-50 border border-red-200"
                    : currentRoute.safetyLevel === "orange"
                      ? "bg-amber-50 border border-amber-200"
                      : "bg-emerald-50 border border-emerald-200"
                )}>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className={cn(
                      "h-4 w-4",
                      currentRoute.safetyLevel === "red"
                        ? "text-red-600"
                        : currentRoute.safetyLevel === "orange"
                          ? "text-amber-600"
                          : "text-emerald-600"
                    )} />
                    <span className={cn(
                      "text-xs font-semibold",
                      currentRoute.safetyLevel === "red"
                        ? "text-red-900"
                        : currentRoute.safetyLevel === "orange"
                          ? "text-amber-900"
                          : "text-emerald-900"
                    )}>회원님의 운전 성향</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {userDrivingHabits.map((habit: DrivingHabitTag) => (
                      <div
                        key={habit.id}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs font-medium",
                          habit.type === "bad"
                            ? currentRoute.safetyLevel === "red"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                        )}
                      >
                        {habit.label}
                      </div>
                    ))}
                  </div>
                  <p className={cn(
                    "text-xs mt-2 leading-relaxed",
                    currentRoute.safetyLevel === "red"
                      ? "text-red-700"
                      : currentRoute.safetyLevel === "orange"
                        ? "text-amber-700"
                        : "text-emerald-700"
                  )}>
                    이 습관들을 고려하여 안전한 경로를 추천해드려요
                  </p>
                </div>
              )}

              {/* 도보 성향 태그 표시 */}
              {selectedTransport === "walk" && userWalkingHabits.length > 0 && (
                <div className={cn(
                  "mb-4 rounded-xl p-3",
                  currentRoute.safetyLevel === "red"
                    ? "bg-red-50 border border-red-200"
                    : currentRoute.safetyLevel === "orange"
                      ? "bg-amber-50 border border-amber-200"
                      : "bg-emerald-50 border border-emerald-200"
                )}>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className={cn(
                      "h-4 w-4",
                      currentRoute.safetyLevel === "red"
                        ? "text-red-600"
                        : currentRoute.safetyLevel === "orange"
                          ? "text-amber-600"
                          : "text-emerald-600"
                    )} />
                    <span className={cn(
                      "text-xs font-semibold",
                      currentRoute.safetyLevel === "red"
                        ? "text-red-900"
                        : currentRoute.safetyLevel === "orange"
                          ? "text-amber-900"
                          : "text-emerald-900"
                    )}>회원님의 도보 성향</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {userWalkingHabits.map((habit: string) => (
                      <div
                        key={habit}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs font-medium",
                          currentRoute.safetyLevel === "red"
                            ? "bg-red-100 text-red-700"
                            : currentRoute.safetyLevel === "orange"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                        )}
                      >
                        {habit}
                      </div>
                    ))}
                  </div>
                  <p className={cn(
                    "text-xs mt-2 leading-relaxed",
                    currentRoute.safetyLevel === "red"
                      ? "text-red-700"
                      : currentRoute.safetyLevel === "orange"
                        ? "text-amber-700"
                        : "text-emerald-700"
                  )}>
                    이 성향을 고려하여 안전한 경로를 추천해드려요
                  </p>
                </div>
              )}

              {/* 개인화된 AI 멘트 - 구어체 */}
              <div className={cn("rounded-xl p-3.5 mb-4", currentSafetyColors.bgLight)}>
                <p className={cn("text-sm leading-relaxed", currentSafetyColors.text)}>
                  {currentRoute.personalizedMessage}
                </p>
              </div>

              {/* 운전 습관 / 도보 분석 */}
              <div className="bg-gray-50 rounded-xl p-3.5 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-gray-600" />
                  <span className="text-xs font-semibold text-gray-700">
                    {selectedTransport === "walk" ? "경로 안전 분석" : "회원님의 운전 습관 분석"}
                  </span>
                </div>
                <div className="space-y-2 mb-3">
                  <DrivingHabitBar
                    label={selectedTransport === "walk" ? "조명밝기" : "급정거"}
                    score={currentRoute.drivingHabitAnalysis.brakeScore}
                    color={
                      currentRoute.drivingHabitAnalysis.brakeScore >= 80
                        ? "bg-emerald-500"
                        : currentRoute.drivingHabitAnalysis.brakeScore >= 60
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }
                  />
                  <DrivingHabitBar
                    label={selectedTransport === "walk" ? "인적빈도" : "속도유지"}
                    score={currentRoute.drivingHabitAnalysis.speedScore}
                    color={
                      currentRoute.drivingHabitAnalysis.speedScore >= 80
                        ? "bg-emerald-500"
                        : currentRoute.drivingHabitAnalysis.speedScore >= 60
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }
                  />
                </div>
                <p className="text-xs text-gray-600 leading-relaxed bg-white rounded-lg p-2.5">
                  💡 {currentRoute.drivingHabitAnalysis.recommendation}
                </p>
              </div>

              {/* 오늘의 운전 팁 */}
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-xl">
                <Zap className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-blue-700">오늘의 맞춤 팁</span>
                  <p className="text-xs text-blue-600 mt-0.5 leading-relaxed">{currentRoute.drivingTip}</p>
                </div>
              </div>

              {/* 위험 요소 뱃지들 */}
              {currentRoute.hazards.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500 mb-2 block">이 경로의 주의 포인트</span>
                  <div className="flex flex-wrap gap-2">
                    {currentRoute.hazards.map((hazard: RouteOption["hazards"][0]) => (
                      <div key={hazard.id} className="flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1">
                        <HazardIcon type={hazard.icon} className="h-3.5 w-3.5 text-gray-600" />
                        <span className="text-xs text-gray-700">{hazard.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="absolute bottom-52 right-3 z-10 flex flex-col gap-2">
          {/* 음성 안내 버튼 */}
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md">
            <Mic className="h-5 w-5 text-gray-600" />
          </button>
          {/* 정확도 조절 버튼 */}
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md">
            <Crosshair className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="absolute bottom-4 left-0 right-0 z-20">
          {/* 필터 버튼들 */}
          <div className="mb-2 flex gap-2 px-3">
            {routeFilters.map((filter: RouteFilter) => {
              const isOrangeSafety = currentRoute.safetyLevel === "orange"
              return (
                <button
                  key={filter.id}
                  onClick={() => isOrangeSafety && toggleFilter(filter.id)}
                  disabled={!isOrangeSafety}
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-1.5 text-sm shadow-sm transition-all duration-200",
                    !isOrangeSafety && "opacity-40 cursor-not-allowed",
                    filter.active
                      ? "border-[#4A90E2] bg-[#4A90E2] text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300",
                    isOrangeSafety && !filter.active && "hover:border-gray-300",
                  )}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>

          {/* 경로 정보 카드 스크롤 컨테이너 */}
          <div
            ref={routeCardsRef}
            onScroll={handleScroll}
            className="flex gap-3 overflow-x-auto px-3 pb-1 scrollbar-hide"
            style={{
              scrollSnapType: "x mandatory",
            }}
          >
            {currentRouteOptions.map((route: RouteOption, index: number) => {
              const safetyColors = getSafetyColors(route.safetyLevel)
              return (
                <div
                  key={route.id}
                  ref={(el) => {
                    cardRefs.current[index] = el
                  }}
                  onClick={() => {
                    setSelectedRoute(index)
                    scrollToRoute(index)
                  }}
                  className={cn(
                    "flex min-w-[calc(100%-24px)] shrink-0 cursor-pointer flex-col rounded-2xl bg-white shadow-lg transition-all duration-200 border-2",
                    selectedRoute === index ? safetyColors.border : "border-transparent opacity-90",
                  )}
                  style={{ scrollSnapAlign: "center", padding: "16px" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-gray-700">{route.label}</span>
                        <TrafficLightIndicator level={route.safetyLevel} />
                        {route.warning && (
                          <span className="flex items-center gap-1 text-xs text-amber-500">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            {route.warning}
                          </span>
                        )}
                      </div>
                      {/* 시간 및 거리 */}
                      <div className="mt-1.5 flex items-baseline gap-2">
                        <span className={cn("text-4xl font-bold", safetyColors.text)}>
                          {selectedTransport === "walk" ? formatTime(route.time) : `${route.time}분`}
                        </span>
                        <span className="text-lg text-gray-600">{route.distance}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="text-xs text-gray-500">안전지수</span>
                        <ImpactScoreGauge score={route.impactScore} level={route.safetyLevel} />
                      </div>
                      {/* 택시비/칼로리 */}
                      <span className="mt-1 text-sm text-gray-500">
                        {selectedTransport === "walk" ? route.taxiFare : `택시비 약 ${route.taxiFare}~`}
                      </span>
                    </div>

                    <button
                      className={cn(
                        "flex h-20 w-20 flex-col items-center justify-center rounded-full ml-3",
                        safetyColors.bg,
                      )}
                    >
                      <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
                      </svg>
                      <span className="mt-1 text-xs font-medium text-white">안내시작</span>
                    </button>
                  </div>

                  {route.hazards.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 border-t border-gray-100 pt-3">
                      {route.hazards.map((hazard: RouteOption["hazards"][0]) => (
                        <div key={hazard.id} className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5">
                          <HazardIcon type={hazard.icon} className="h-3 w-3 text-gray-600" />
                          <span className="text-xs text-gray-600">{hazard.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-2 flex justify-center gap-1.5">
            {currentRouteOptions.map((route: RouteOption, index: number) => {
              const colors = getSafetyColors(route.safetyLevel)
              return (
                <div
                  key={index}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-200",
                    selectedRoute === index ? `w-4 ${colors.bg}` : "w-1.5 bg-gray-300",
                  )}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* Safe area padding for iOS */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-safe-area-inset-bottom bg-white" />
    </div>
  )
}
