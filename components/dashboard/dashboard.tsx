"use client"

import useSWR from "swr"
import { TopNav } from "./top-nav"
import { KpiCard } from "./kpi-card"
import { RevenueTrend } from "./revenue-trend"
import { RmLeaderboard } from "./rm-leaderboard"
import { PlatformSplit } from "./platform-split"
import { PaceTracker } from "./pace-tracker"
import { ConversionTracker } from "./conversion-tracker"
import { MonthlyInsights } from "./monthly-insights"
import { BestDayAnalysis } from "./best-day-analysis"
import { RmStatus } from "./rm-status"
import { TodaysPerformance } from "./todays-performance"
import { DetailedAnalytics } from "./detailed-analytics"
import { DashboardSkeleton } from "./dashboard-skeleton"
import { SectionLabel } from "./section-label"
import { formatINR, formatNumber, type DashboardData } from "@/lib/dashboard"
import { DASHBOARD_API_URL, fetchDashboardData } from "@/lib/api"

export function Dashboard() {
  const { data, isLoading, isValidating } = useSWR<DashboardData>(DASHBOARD_API_URL, fetchDashboardData, {
    refreshInterval: 30000,
    revalidateOnFocus: false,
  })

  if (isLoading || !data) return <DashboardSkeleton />

  const trend = data.revenueTrend.map((d) => d.revenue)
  const ordersTrend = data.revenueTrend.map((d) => d.orders)

  return (
    <div className="min-h-screen bg-background">
      <TopNav
        title={data.meta.title}
        date={data.meta.date}
        lastUpdated={data.meta.lastUpdated}
        isRefreshing={isValidating}
      />

      <main className="mx-auto flex max-w-[1400px] flex-col gap-28 px-6 pb-32 pt-16 lg:px-12">
        {/* Hero */}
        <section className="flex flex-col gap-10">
          <SectionLabel
            eyebrow="Overview"
            title="Good momentum across the team today."
            description="A calm, real-time view of revenue, outreach and conversion — refreshed automatically every 30 seconds."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <KpiCard
              label="Revenue Today"
              value={data.today.revenue}
              format={(n) => formatINR(n, { compact: true })}
              caption="Across all platforms"
              trend={trend}
              delta={{ value: "Live", positive: true }}
              emphasis
              index={0}
            />
            <KpiCard
              label="Revenue MTD"
              value={data.mtd.revenue}
              format={(n) => formatINR(n, { compact: true })}
              caption="Month to date"
              trend={trend}
              index={1}
            />
            <KpiCard
              label="Calls Today"
              value={data.today.calls}
              format={formatNumber}
              caption={`${formatNumber(data.today.connectedCalls)} connected`}
              index={2}
            />
            <KpiCard
              label="Calls MTD"
              value={data.mtd.calls}
              format={formatNumber}
              caption="Connected calls"
              index={3}
            />
            <KpiCard
              label="Demos Today"
              value={data.today.demos}
              format={formatNumber}
              caption="Completed demos"
              index={4}
            />
            <KpiCard
              label="Demos MTD"
              value={data.mtd.demos}
              format={formatNumber}
              trend={ordersTrend}
              caption="Month to date"
              index={5}
            />
          </div>
        </section>

        {/* Centerpiece */}
        <section>
          <RevenueTrend data={data.revenueTrend} />
        </section>

        {/* Today's Performance — Apple Wallet style daily statement */}
        <section className="flex flex-col gap-8">
          <SectionLabel
            eyebrow="Daily statement"
            title="Every signal from today, at a glance."
            description="A vertical statement of each metric with yesterday, today and month-to-date — designed to read like Apple Health, not a spreadsheet."
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <TodaysPerformance data={data.todaysPerformance} />
            <div className="flex flex-col gap-6">
              <BestDayAnalysis bestDays={data.bestDays} highestDay={data.highestDay} />
              <RmStatus data={data.rmStatus} />
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="flex flex-col gap-8">
          <SectionLabel eyebrow="Team" title="Who's driving the numbers." />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <RmLeaderboard data={data.rmLeaderboard} />
            <PlatformSplit data={data.platformSplit} />
            <PaceTracker pace={data.pace} />
          </div>
        </section>

        {/* Section 4 */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ConversionTracker data={data.rmLeaderboard} />
          <MonthlyInsights insights={data.monthlyInsights} />
        </section>

        {/* Section 6 */}
        <section className="flex flex-col gap-8">
          <SectionLabel eyebrow="Deep dive" title="The full analytical picture." />
          <DetailedAnalytics data={data} />
        </section>
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-8 lg:px-12">
          <span className="text-xs text-muted-foreground">Purchase Manager Dashboard</span>
          <span className="text-xs text-muted-foreground">Auto-refreshing · Live data</span>
        </div>
      </footer>
    </div>
  )
}
