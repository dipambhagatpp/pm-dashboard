"use client"

import { Check, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { type DashboardData } from "@/lib/dashboard"

export function RmStatus({ data }: { data: DashboardData["rmStatus"] }) {
  const submitted = data.filter((d) => d.submittedToday).length

  return (
    <div className="animate-fade-rise flex h-full flex-col rounded-[24px] border border-border/70 bg-card p-6 sm:p-8">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">{"Today's RM Status"}</h3>
        <span className="text-xs text-muted-foreground tabular-nums">
          {submitted}/{data.length} submitted
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {data.map((rm) => (
          <div
            key={rm.name}
            className="flex items-center justify-between rounded-2xl border border-border/70 bg-secondary/40 px-5 py-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-sm font-semibold text-foreground">
                {rm.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-foreground">{rm.name}</span>
            </div>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                rm.submittedToday
                  ? "bg-[color-mix(in_oklch,var(--success)_14%,transparent)] text-[var(--success)]"
                  : "bg-secondary text-muted-foreground",
              )}
            >
              {rm.submittedToday ? <Check className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
              {rm.submittedToday ? "Submitted" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
