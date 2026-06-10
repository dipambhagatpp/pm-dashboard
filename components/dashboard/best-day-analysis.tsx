"use client"

import { Calendar, Trophy } from "lucide-react"
import { formatINR, type DashboardData } from "@/lib/dashboard"

export function BestDayAnalysis({
  bestDays,
  highestDay,
}: {
  bestDays: DashboardData["bestDays"]
  highestDay: DashboardData["highestDay"]
}) {
  const max = Math.max(...bestDays.map((d) => d.amount), 1)

  return (
    <div className="animate-fade-rise flex h-full flex-col rounded-[24px] border border-border/70 bg-card p-6 sm:p-8">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">Best Day Analysis</h3>
        <span className="text-xs text-muted-foreground">This month</span>
      </div>

      <div className="mt-6 flex items-center gap-4 rounded-2xl bg-secondary/60 p-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Trophy className="h-5 w-5" strokeWidth={2} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Highest single day</span>
          <span className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">
            {formatINR(highestDay.amount, { compact: true })}
          </span>
          <span className="text-xs text-muted-foreground">on {highestDay.date}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {bestDays.map((d) => (
          <div key={d.name} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{d.name}</span>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" /> {d.date}
                </span>
                <span className="text-sm font-semibold tabular-nums text-foreground">
                  {formatINR(d.amount, { compact: true })}
                </span>
              </div>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-foreground/40 transition-all duration-1000"
                style={{ width: `${(d.amount / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
