"use client"

import { useMemo, useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { cn } from "@/lib/utils"
import { formatINR, type DashboardData } from "@/lib/dashboard"

type Metric = "revenue" | "orders" | "arpu"

const METRICS: { key: Metric; label: string }[] = [
  { key: "revenue", label: "Revenue" },
  { key: "orders", label: "Orders" },
  { key: "arpu", label: "ARPU" },
]

export function RevenueTrend({ data }: { data: DashboardData["revenueTrend"] }) {
  const [metric, setMetric] = useState<Metric>("revenue")

  const total = useMemo(() => data.reduce((acc, d) => acc + d.revenue, 0), [data])
  const peak = useMemo(() => data.reduce((m, d) => (d.revenue > m.revenue ? d : m), data[0]), [data])

  const formatY = (v: number) =>
    metric === "orders" ? String(v) : metric === "arpu" ? formatINR(v, { compact: true }) : formatINR(v, { compact: true })

  return (
    <div className="animate-fade-rise overflow-hidden rounded-[28px] border border-border/70 bg-card">
      <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Revenue performance
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {formatINR(total, { compact: true })}
          </h2>
          <p className="text-sm text-muted-foreground">
            Peak month <span className="font-medium text-foreground">{peak?.month}</span> at{" "}
            {formatINR(peak?.revenue ?? 0, { compact: true })}
          </p>
        </div>

        <div className="flex items-center gap-1 self-start rounded-full border border-border bg-secondary/50 p-1 lg:self-auto">
          {METRICS.map((m) => (
            <button
              key={m.key}
              onClick={() => setMetric(m.key)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300",
                metric === m.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[320px] w-full px-2 pb-6 sm:px-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 16, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 6" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={64}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              tickFormatter={formatY}
            />
            <Tooltip
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null
                const v = payload[0].value as number
                return (
                  <div className="rounded-2xl border border-border bg-card px-4 py-3 shadow-lg">
                    <p className="text-xs font-medium text-muted-foreground">{label}</p>
                    <p className="mt-1 text-base font-semibold text-foreground">
                      {metric === "orders" ? `${v} orders` : formatINR(v)}
                    </p>
                  </div>
                )
              }}
            />
            <Area
              type="monotone"
              dataKey={metric}
              stroke="var(--chart-1)"
              strokeWidth={2.5}
              fill="url(#trendFill)"
              dot={{ r: 3, fill: "var(--chart-1)", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "var(--chart-1)", stroke: "var(--card)", strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
