"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatINR, type DashboardData } from "@/lib/dashboard"

export function PaceTracker({ pace }: { pace: DashboardData["pace"] }) {
  return (
    <div className="animate-fade-rise flex h-full flex-col rounded-[24px] border border-border/70 bg-card p-6">
      <div className="flex items-baseline justify-between">
        <h3 className="text-base font-semibold tracking-tight text-foreground">Pace Tracker</h3>
        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {pace.daysRemaining} days left
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {pace.rows.map((row) => {
          const behind = row.delta < 0
          return (
            <div key={row.name} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{row.name}</span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
                    behind
                      ? "bg-[color-mix(in_oklch,var(--destructive)_12%,transparent)] text-[var(--destructive)]"
                      : "bg-[color-mix(in_oklch,var(--success)_14%,transparent)] text-[var(--success)]",
                  )}
                >
                  {behind ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />}
                  {formatINR(Math.abs(row.delta), { compact: true })}
                </span>
              </div>
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-foreground/25"
                  style={{ width: `${Math.min((row.expectedByToday / row.target) * 100, 100)}%` }}
                />
                <div
                  className={cn("absolute inset-y-0 left-0 rounded-full", behind ? "bg-foreground/60" : "bg-primary")}
                  style={{ width: `${Math.min((row.actualAchieved / row.target) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Actual {formatINR(row.actualAchieved, { compact: true })}</span>
                <span>Expected {formatINR(row.expectedByToday, { compact: true })}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
