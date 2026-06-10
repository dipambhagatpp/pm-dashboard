"use client"

import { cn } from "@/lib/utils"
import { formatINR, type RM } from "@/lib/dashboard"

export function RmLeaderboard({ data }: { data: RM[] }) {
  const ranked = [...data].sort((a, b) => b.achieved - a.achieved)
  const max = Math.max(...ranked.map((r) => r.achieved), 1)

  return (
    <div className="animate-fade-rise flex h-full flex-col rounded-[24px] border border-border/70 bg-card p-6">
      <div className="flex items-baseline justify-between">
        <h3 className="text-base font-semibold tracking-tight text-foreground">RM Leaderboard</h3>
        <span className="text-xs text-muted-foreground">MTD achieved</span>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {ranked.map((rm, i) => (
          <div key={rm.name} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold tabular-nums",
                    i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
                  )}
                >
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-foreground">{rm.name}</span>
              </div>
              <span className="text-sm font-semibold tabular-nums text-foreground">
                {formatINR(rm.achieved, { compact: true })}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={cn("h-full rounded-full transition-all duration-1000", i === 0 ? "bg-primary" : "bg-foreground/35")}
                style={{ width: `${(rm.achieved / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
