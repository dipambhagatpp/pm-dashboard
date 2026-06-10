"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { formatINR, formatNumber, type DashboardData } from "@/lib/dashboard"

function ChartCard({
  title,
  caption,
  children,
}: {
  title: string
  caption?: string
  children: React.ReactNode
}) {
  return (
    <div className="animate-fade-rise flex flex-col rounded-[24px] border border-border/70 bg-card p-6">
      <div className="flex items-baseline justify-between">
        <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>
        {caption ? <span className="text-xs text-muted-foreground">{caption}</span> : null}
      </div>
      <div className="mt-5 h-[220px] w-full">{children}</div>
    </div>
  )
}

const tooltipStyle = {
  borderRadius: 16,
  border: "1px solid var(--border)",
  background: "var(--card)",
  boxShadow: "0 12px 32px -16px rgba(0,0,0,0.2)",
  fontSize: 12,
}

export function DetailedAnalytics({ data }: { data: DashboardData }) {
  const rmRevenue = [...data.rmLeaderboard].filter((r) => r.achieved > 0).sort((a, b) => b.achieved - a.achieved)
  const platformRevenue = [...data.allTimePlatformSplit].sort((a, b) => b.revenue - a.revenue)

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <ChartCard title="Revenue by RM" caption="MTD">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rmRevenue} layout="vertical" margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
            <CartesianGrid horizontal={false} stroke="var(--border)" strokeDasharray="3 6" />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              width={64}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <Tooltip cursor={{ fill: "var(--secondary)" }} contentStyle={tooltipStyle} formatter={(v: number) => [formatINR(v), "Revenue"]} />
            <Bar dataKey="achieved" radius={[0, 8, 8, 0]} barSize={18} fill="var(--chart-1)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Revenue by Platform" caption="All-time">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={platformRevenue} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 6" />
            <XAxis
              dataKey="platform"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              dy={6}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={48}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              tickFormatter={(v) => formatINR(v, { compact: true })}
            />
            <Tooltip cursor={{ fill: "var(--secondary)" }} contentStyle={tooltipStyle} formatter={(v: number) => [formatINR(v), "Revenue"]} />
            <Bar dataKey="revenue" radius={[8, 8, 0, 0]} barSize={48}>
              {platformRevenue.map((_, i) => (
                <Cell key={i} fill={i === 0 ? "var(--chart-1)" : "var(--chart-4)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="ARPU Trend" caption="Per user revenue">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.revenueTrend} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 6" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} dy={6} />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={52}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              tickFormatter={(v) => formatINR(v, { compact: true })}
            />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [formatINR(v), "ARPU"]} />
            <Line type="monotone" dataKey="arpu" stroke="var(--chart-2)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--chart-2)" }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Monthly Orders Trend" caption="Order count">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.revenueTrend} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 6" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} dy={6} />
            <YAxis tickLine={false} axisLine={false} width={36} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [v, "Orders"]} />
            <Line type="monotone" dataKey="orders" stroke="var(--chart-1)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--chart-1)" }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="animate-fade-rise flex flex-col rounded-[24px] border border-border/70 bg-card p-6">
        <h3 className="text-base font-semibold tracking-tight text-foreground">Status Breakdown</h3>
        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
          {[...data.statusBreakdown]
            .sort((a, b) => b.count - a.count)
            .map((s) => {
              const max = Math.max(...data.statusBreakdown.map((x) => x.count))
              return (
                <div key={s.status} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{s.status}</span>
                    <span className="text-xs font-semibold tabular-nums text-foreground">{formatNumber(s.count)}</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-foreground/30" style={{ width: `${(s.count / max) * 100}%` }} />
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      <div className="animate-fade-rise flex flex-col rounded-[24px] border border-border/70 bg-card p-6">
        <h3 className="text-base font-semibold tracking-tight text-foreground">Transaction Summary</h3>
        <div className="mt-5 grid grid-cols-2 gap-4">
          {[
            { label: "Today amount", value: formatINR(data.transactionSummary.todayAmount, { compact: true }) },
            { label: "MTD amount", value: formatINR(data.transactionSummary.mtdAmount, { compact: true }) },
            { label: "Today count", value: formatNumber(data.transactionSummary.todayCount) },
            { label: "MTD count", value: formatNumber(data.transactionSummary.mtdCount) },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1 rounded-2xl bg-secondary/50 p-4">
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <span className="text-xl font-semibold tracking-tight tabular-nums text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3">
          <span className="text-xs text-muted-foreground">New registrations MTD</span>
          <span className="text-sm font-semibold tabular-nums text-foreground">{formatNumber(data.mtd.newRegistrations)}</span>
        </div>
      </div>
    </div>
  )
}
