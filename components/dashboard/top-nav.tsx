"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDateLong, formatTime } from "@/lib/dashboard"

export function TopNav({
  title,
  date,
  lastUpdated,
  isRefreshing,
}: {
  title: string
  date: string
  lastUpdated: string
  isRefreshing: boolean
}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled ? "frost border-b border-border/70" : "border-b border-transparent bg-background",
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-foreground">{title}</span>
            <span className="hidden text-xs text-muted-foreground sm:block">Executive analytics</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden flex-col items-end md:flex">
            <span className="text-sm font-medium text-foreground">{formatDateLong(date)}</span>
            <span className="text-xs text-muted-foreground">Updated {formatTime(lastUpdated)}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5">
            <RefreshCw
              className={cn("h-3.5 w-3.5 text-muted-foreground", isRefreshing && "animate-spin")}
              strokeWidth={2.2}
            />
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--success)]" />
            </span>
            <span className="text-xs font-medium text-muted-foreground">Live</span>
          </div>
        </div>
      </div>
    </header>
  )
}
