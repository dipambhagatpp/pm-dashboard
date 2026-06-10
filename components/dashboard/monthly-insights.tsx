"use client"

import { formatINR, type DashboardData } from "@/lib/dashboard"

export function MonthlyInsights({ insights }: { insights: DashboardData["monthlyInsights"] }) {
  const items: { label: string; value: string; sub?: string }[] = [
    { label: "All-time revenue", value: formatINR(insights.totalRevenue, { compact: true }) },
    { label: "Total orders", value: insights.totalOrders.toLocaleString("en-IN") },
    { label: "Avg ARPU", value: formatINR(insights.arpu) },
    { label: "Avg daily revenue", value: formatINR(insights.avgDailyRevenue, { compact: true }) },
    { label: "Avg monthly revenue", value: formatINR(insights.avgMonthlyRevenue, { compact: true }) },
    { label: "Peak month", value: insights.highestRevenueMonth },
    { label: "Top RM", value: insights.topRM },
    { label: "Top platform", value: insights.topPlatform },
    { label: "Revenue / call", value: formatINR(insights.revenuePerCallMTD) },
    { label: "Revenue / demo", value: formatINR(insights.revenuePerDemoMTD) },
    { label: "Target achievement", value: `${insights.targetAchievement.toFixed(1)}%` },
    { label: "Demo → closure", value: `${insights.demoToClosureRatio.toFixed(1)}%` },
  ]

  return (
    <div className="animate-fade-rise flex h-full flex-col rounded-[24px] border border-border/70 bg-card p-6 sm:p-8">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">Monthly Insights</h3>
        <span className="text-xs text-muted-foreground">All-time overview</span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">{item.label}</span>
            <span className="text-lg font-semibold tracking-tight tabular-nums text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
