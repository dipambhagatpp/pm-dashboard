import type { DashboardData } from "./dashboard"

/**
 * Configurable REST API endpoint for the dashboard.
 *
 * Set `NEXT_PUBLIC_DASHBOARD_API_URL` in your environment to point the
 * dashboard at any external REST service that returns the `DashboardData`
 * shape. When unset, it falls back to the built-in `/api/dashboard` route.
 */
export const DASHBOARD_API_URL = "/api/dashboard"

/**
 * Fetches the dashboard payload from the configured REST endpoint.
 * Every value rendered in the UI is derived from this response.
 */
export async function fetchDashboardData(url: string = DASHBOARD_API_URL): Promise<DashboardData> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch dashboard data: ${res.status} ${res.statusText}`)
  }

  return (await res.json()) as DashboardData
}
