"use client"

import { useCountUp } from "@/hooks/use-count-up"
import { cn } from "@/lib/utils"
import { Area, AreaChart, ResponsiveContainer } from "recharts"

type KpiProps = {
  label: string
  value: number
  format: (n: number) => string
  caption?: string
  trend?: number[]
  delta?: { value: string; positive: boolean }
  emphasis?: boolean
  index?: number
}

export function KpiCard({ label, value, format, caption, trend, delta, emphasis, index = 0 }: KpiProps) {
  const animated = useCountUp(value)
  const sparkData = (trend ?? []).map((v, i) => ({ i, v }))

  return (
    <div
      className={cn(
        "animate-fade-rise group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-border/70 p-6 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.18)]",
        emphasis ? "bg-primary text-primary-foreground" : "bg-card",
      )}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "text-sm font-medium",
            emphasis ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          {label}
        </span>
        {delta ? (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-semibold",
              emphasis
                ? "bg-primary-foreground/15 text-primary-foreground"
                : delta.positive
                  ? "bg-[color-mix(in_oklch,var(--success)_14%,transparent)] text-[var(--success)]"
                  : "bg-secondary text-muted-foreground",
            )}
          >
            {delta.value}
          </span>
        ) : null}
      </div>

      <div className="mt-6">
        <div
          className={cn(
            "text-3xl font-semibold tracking-tight tabular-nums sm:text-[2.1rem]",
            emphasis ? "text-primary-foreground" : "text-foreground",
          )}
        >
          {format(animated)}
        </div>
        {caption ? (
          <p className={cn("mt-1 text-xs", emphasis ? "text-primary-foreground/60" : "text-muted-foreground")}>
            {caption}
          </p>
        ) : null}
      </div>

      {sparkData.length > 1 ? (
        <div className="mt-4 h-10 w-full opacity-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData} margin={{ top: 2, bottom: 2, left: 0, right: 0 }}>
              <defs>
                <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={emphasis ? "var(--primary-foreground)" : "var(--chart-1)"}
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="100%"
                    stopColor={emphasis ? "var(--primary-foreground)" : "var(--chart-1)"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={emphasis ? "var(--primary-foreground)" : "var(--chart-1)"}
                strokeWidth={2}
                fill={`url(#spark-${label})`}
                dot={false}
                isAnimationActive
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : null}
    </div>
  )
}
