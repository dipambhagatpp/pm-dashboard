"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { formatNumber } from "@/lib/dashboard"

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-4)"]

export function PlatformSplit({
  data,
}: {
  data: { platform: string; count: number; share: number }[]
}) {
  const total = data.reduce((acc, d) => acc + d.count, 0)

  return (
    <div className="animate-fade-rise flex h-full flex-col rounded-[24px] border border-border/70 bg-card p-6">
      <div className="flex items-baseline justify-between">
        <h3 className="text-base font-semibold tracking-tight text-foreground">Registration Split</h3>
        <span className="text-xs text-muted-foreground">MTD by platform</span>
      </div>

      <div className="relative mt-2 h-[160px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="platform"
              innerRadius={52}
              outerRadius={74}
              paddingAngle={3}
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tabular-nums text-foreground">{formatNumber(total)}</span>
          <span className="text-xs text-muted-foreground">total</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {data.map((d, i) => (
          <div key={d.platform} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
              <span className="text-sm text-foreground">{d.platform}</span>
            </div>
            <span className="text-sm font-medium tabular-nums text-muted-foreground">{d.share.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
