"use client"

import { RadialBar, RadialBarChart, ResponsiveContainer, PolarAngleAxis } from "recharts"
import { type RM } from "@/lib/dashboard"

export function ConversionTracker({ data }: { data: RM[] }) {
  const active = data.filter((r) => r.demos > 0)

  return (
    <div className="animate-fade-rise flex h-full flex-col rounded-[24px] border border-border/70 bg-card p-6 sm:p-8">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">Conversion Tracker</h3>
        <span className="text-xs text-muted-foreground">Demos to closures</span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {active.map((rm) => (
          <div key={rm.name} className="flex flex-col items-center gap-3">
            <div className="relative h-28 w-28">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="72%"
                  outerRadius="100%"
                  data={[{ value: rm.conversionRate }]}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar dataKey="value" cornerRadius={20} fill="var(--chart-1)" background={{ fill: "var(--secondary)" }} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-semibold tabular-nums text-foreground">
                  {rm.conversionRate.toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-foreground">{rm.name}</span>
              <span className="text-xs text-muted-foreground tabular-nums">
                {rm.closures}/{rm.demos} demos
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
