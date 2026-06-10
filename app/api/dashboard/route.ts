import { NextResponse } from "next/server"

// In a real deployment this data would come from a database or upstream service.
// Here it is assembled server-side so the client renders everything dynamically.
export const dynamic = "force-dynamic"

function buildPayload() {
  const today = {
    revenue: 360452,
    calls: 156,
    demos: 14,
    attemptedCalls: 156,
    connectedCalls: 64,
    transactions: 3,
    newRegistrations: 12,
  }

  const mtd = {
    revenue: 365780,
    calls: 497,
    demos: 82,
    attemptedCalls: 319,
    connectedCalls: 497,
    transactions: 42,
    newRegistrations: 86,
  }

  const revenueTrend = [
    { month: "February", revenue: 780038, orders: 105, arpu: 7429 },
    { month: "March", revenue: 1292397, orders: 154, arpu: 8392 },
    { month: "April", revenue: 2379009, orders: 232, arpu: 10254 },
    { month: "May", revenue: 2170565, orders: 200, arpu: 10853 },
    { month: "June MTD", revenue: 360452, orders: 45, arpu: 8010 },
  ]

  const rmLeaderboard = [
    { name: "Jeel", target: 500000, achieved: 125345, calls: 204, demos: 24, closures: 16 },
    { name: "Het", target: 500000, achieved: 103001, calls: 146, demos: 22, closures: 13 },
    { name: "Brinda", target: 500000, achieved: 137433, calls: 147, demos: 36, closures: 13 },
    { name: "Rushi", target: 500000, achieved: 0, calls: 0, demos: 0, closures: 0 },
    { name: "Bhavin", target: 500000, achieved: 0, calls: 0, demos: 0, closures: 0 },
    { name: "Mihir", target: 500000, achieved: 0, calls: 0, demos: 0, closures: 0 },
  ].map((rm) => ({
    ...rm,
    achievedPct: rm.target ? (rm.achieved / rm.target) * 100 : 0,
    conversionRate: rm.demos ? (rm.closures / rm.demos) * 100 : 0,
  }))

  const platformSplit = [
    { platform: "Hyperpure", count: 4, share: 4.65, revenue: 6787534 },
    { platform: "Udaan", count: 29, share: 33.72, revenue: 83973 },
    { platform: "DMart", count: 53, share: 61.63, revenue: 68830 },
  ]

  const allTimePlatformSplit = [
    { platform: "Hyperpure", revenue: 6787534 },
    { platform: "Udaan", revenue: 83973 },
    { platform: "DMart", revenue: 68830 },
  ]

  const daysRemaining = 20
  const pace = rmLeaderboard.slice(0, 3).map((rm) => {
    const expectedByToday = rm.target / 30 * (30 - daysRemaining)
    return {
      name: rm.name,
      target: rm.target,
      expectedByToday: Math.round(expectedByToday),
      actualAchieved: rm.achieved,
      delta: Math.round(rm.achieved - expectedByToday),
    }
  })

  const bestDays = [
    { name: "Jeel", amount: 25319, date: "8 Jun" },
    { name: "Het", amount: 41997, date: "5 Jun" },
    { name: "Brinda", amount: 39938, date: "2 Jun" },
  ]
  const highestDay = { amount: 106377, date: "5 Jun" }

  const rmStatus = [
    { name: "Jeel", submittedToday: false },
    { name: "Het", submittedToday: false },
    { name: "Brinda", submittedToday: false },
  ]

  const monthlyInsights = {
    totalRevenue: 6982462,
    totalOrders: 736,
    arpu: 9487,
    highestRevenueMonth: "April",
    avgDailyRevenue: 36578,
    avgMonthlyRevenue: 1163744,
    topRM: "Jeel",
    topPlatform: "Hyperpure",
    revenuePerCallMTD: 736,
    revenuePerDemoMTD: 4461,
    targetAchievement: 24.39,
    demoToClosureRatio: 51.22,
  }

  const statusBreakdown = [
    { status: "Demo", count: 250 },
    { status: "Order", count: 174 },
    { status: "Interested", count: 384 },
    { status: "Not Interested", count: 384 },
    { status: "Call Back", count: 157 },
    { status: "Delayed", count: 403 },
    { status: "Call not connected", count: 933 },
    { status: "POS Inactive", count: 248 },
    { status: "Prospect", count: 3 },
    { status: "Integration", count: 45 },
  ]

  const registrationSplit = [
    { type: "Hyperpure", count: 4 },
    { type: "Udaan", count: 29 },
    { type: "DMart", count: 53 },
  ]

  const transactionSummary = {
    todayAmount: 32969,
    mtdAmount: 365780,
    todayCount: 3,
    mtdCount: 42,
  }

  // Apple Health / Wallet style daily statement — Yesterday / Today / Month till date.
  const todaysPerformance = [
    { key: "attemptedCalls", label: "Attempted Calls", icon: "phone", yesterday: 156, today: 0, mtd: 319 },
    { key: "connectedCalls", label: "Connected Calls", icon: "phoneCall", yesterday: 64, today: 0, mtd: 497 },
    { key: "notConnectedCalls", label: "Not Connected Calls", icon: "phoneMissed", yesterday: 69, today: 0, mtd: 138 },
    { key: "demoDone", label: "Demo Done", icon: "monitorPlay", yesterday: 14, today: 0, mtd: 82 },
    { key: "regHyperpure", label: "Hyperpure Registrations", icon: "userPlus", yesterday: 0, today: 0, mtd: 4 },
    { key: "regUdaan", label: "Udaan Registrations", icon: "userPlus", yesterday: 5, today: 0, mtd: 29 },
    { key: "regDmart", label: "DMart Registrations", icon: "userPlus", yesterday: 7, today: 0, mtd: 53 },
    { key: "txnCount", label: "Transaction Count", icon: "receipt", yesterday: 3, today: 0, mtd: 42 },
    { key: "txnAmount", label: "Transaction Amount", icon: "indianRupee", yesterday: 32969, today: 0, mtd: 365780, currency: true },
  ]

  return {
    meta: {
      title: "Purchase Manager Dashboard",
      date: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    },
    today,
    mtd,
    revenueTrend,
    rmLeaderboard,
    platformSplit,
    allTimePlatformSplit,
    pace: { daysRemaining, rows: pace },
    bestDays,
    highestDay,
    rmStatus,
    monthlyInsights,
    statusBreakdown,
    registrationSplit,
    transactionSummary,
    todaysPerformance,
  }
}

export async function GET() {
  return NextResponse.json(buildPayload())
}
