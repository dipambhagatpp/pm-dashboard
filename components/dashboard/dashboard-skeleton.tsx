export function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-12">
      <div className="flex flex-col gap-3">
        <div className="h-4 w-40 animate-pulse rounded-full bg-secondary" />
        <div className="h-10 w-80 animate-pulse rounded-2xl bg-secondary" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-44 animate-pulse rounded-[24px] bg-secondary" style={{ animationDelay: `${i * 60}ms` }} />
        ))}
      </div>

      <div className="mt-6 h-[420px] animate-pulse rounded-[28px] bg-secondary" />

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-72 animate-pulse rounded-[24px] bg-secondary" />
        ))}
      </div>
    </div>
  )
}
