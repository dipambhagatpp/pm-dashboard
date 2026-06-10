"use client"

import {
  Phone,
  PhoneCall,
  PhoneMissed,
  MonitorPlay,
  UserPlus,
  Receipt,
  IndianRupee,
  type LucideIcon,
} from "lucide-react"
import { formatINR, formatNumber, type DashboardData } from "@/lib/dashboard"
import { cn } from "@/lib/utils"

const ICONS: Record<string, LucideIcon> = {
  phone: Phone,
  phoneCall: PhoneCall,
  phoneMissed: PhoneMissed,
  monitorPlay: MonitorPlay,
  userPlus: UserPlus,
  receipt: Receipt,
  indianRupee: IndianRupee,
}

function MetricRow({
  row,
  index,
}: {
  row: DashboardData["todaysPerformance"][number]
  index: number
}) {
  const Icon = ICONS[row.icon] ?? Phone
  const fmt = (n: number) => (row.currency ? formatINR(n, { compact: true }) : formatNumber(n))
  // Today's contribution against the month-to-date total — a calm pace indicator.
  const todayShare = row.mtd > 0 ? Math.min((row.today / row.mtd) * 100, 100) : 0
  const dayOverDay =
    row.yesterday > 0 ? ((row.today - row.yesterday) / row.yesterday) * 100 : row.today > 0 ? 100 : 0

  return (
    <div
      className="animate-fade-rise group flex flex-col gap-3 py-5"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-secondary text-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-4 w-4" strokeWidth={2.1} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[0.95rem] font-medium tracking-tight text-foreground">{row.label}</span>
          <span className="text-xs text-muted-foreground">
            {dayOverDay === 0
              ? "No change vs yesterday"
              : `${dayOverDay > 0 ? "+" : ""}${dayOverDay.toFixed(0)}% vs yesterday`}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pl-14">
        <Stat label="Yesterday" value={fmt(row.yesterday)} muted />
        <Stat label="Today" value={fmt(row.today)} emphasis />
        <Stat label="Month till date" value={fmt(row.mtd)} />
      </div>

      <div className="ml-14 mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary/80 transition-all duration-700"
          style={{ width: `${Math.max(todayShare, row.today > 0 ? 6 : 0)}%` }}
        />
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  emphasis,
  muted,
}: {
  label: string
  value: string
  emphasis?: boolean
  muted?: boolean
}) {
  return (
    <div className="flex flex-col">
      <span className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">{label}</span>
      <span
        className={cn(
          "mt-0.5 text-base font-semibold tabular-nums tracking-tight",
          emphasis ? "text-foreground" : muted ? "text-muted-foreground" : "text-foreground/80",
        )}
      >
        {value}
      </span>
    </div>
  )
}

export function TodaysPerformance({ data }: { data: DashboardData["todaysPerformance"] }) {
  return (
    <div className="animate-fade-rise overflow-hidden rounded-[28px] border border-border/70 bg-card">
      <div className="flex items-end justify-between gap-4 px-7 pt-7 sm:px-9 sm:pt-9">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Daily statement
          </span>
          <h3 className="text-2xl font-semibold tracking-tight text-foreground">Today&apos;s Performance</h3>
        </div>
        <span className="hidden rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground sm:inline-flex">
          Yesterday · Today · MTD
        </span>
      </div>

      <div className="divide-y divide-border/70 px-7 pb-4 sm:px-9">
        {data.map((row, i) => (
          <MetricRow key={row.key} row={row} index={i} />
        ))}
      </div>
    </div>
  )
}
