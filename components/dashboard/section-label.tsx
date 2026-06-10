"use client"

import { cn } from "@/lib/utils"

export function SectionLabel({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {eyebrow ? (
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</span>
      ) : null}
      <h2 className="text-pretty text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h2>
      {description ? <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">{description}</p> : null}
    </div>
  )
}
