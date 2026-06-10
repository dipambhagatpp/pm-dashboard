export type RM = {
  name: string
  target: number
  achieved: number
  calls: number
  demos: number
  closures: number
  achievedPct: number
  conversionRate: number
}

export type DashboardData = {
  meta: { title: string; date: string; lastUpdated: string }
  today: {
    revenue: number
    calls: number
    demos: number
    attemptedCalls: number
    connectedCalls: number
    transactions: number
    newRegistrations: number
  }
  mtd: {
    revenue: number
    calls: number
    demos: number
    attemptedCalls: number
    connectedCalls: number
    transactions: number
    newRegistrations: number
  }
  revenueTrend: { month: string; revenue: number; orders: number; arpu: number }[]
  rmLeaderboard: RM[]
  platformSplit: { platform: string; count: number; share: number; revenue: number }[]
  allTimePlatformSplit: { platform: string; revenue: number }[]
  pace: {
    daysRemaining: number
    rows: { name: string; target: number; expectedByToday: number; actualAchieved: number; delta: number }[]
  }
  bestDays: { name: string; amount: number; date: string }[]
  highestDay: { amount: number; date: string }
  rmStatus: { name: string; submittedToday: boolean }[]
  monthlyInsights: {
    totalRevenue: number
    totalOrders: number
    arpu: number
    highestRevenueMonth: string
    avgDailyRevenue: number
    avgMonthlyRevenue: number
    topRM: string
    topPlatform: string
    revenuePerCallMTD: number
    revenuePerDemoMTD: number
    targetAchievement: number
    demoToClosureRatio: number
  }
  statusBreakdown: { status: string; count: number }[]
  registrationSplit: { type: string; count: number }[]
  transactionSummary: { todayAmount: number; mtdAmount: number; todayCount: number; mtdCount: number }
  todaysPerformance: {
    key: string
    label: string
    icon: string
    yesterday: number
    today: number
    mtd: number
    currency?: boolean
  }[]
}

export function formatINR(value: number, opts?: { compact?: boolean }): string {
  if (opts?.compact && Math.abs(value) >= 100000) {
    if (Math.abs(value) >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`
    return `₹${(value / 100000).toFixed(2)}L`
  }
  return `₹${Math.round(value).toLocaleString("en-IN")}`
}

export function formatNumber(value: number): string {
  return Math.round(value).toLocaleString("en-IN")
}

export function formatDateLong(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })
}
