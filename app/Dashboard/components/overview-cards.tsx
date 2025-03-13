"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const overviewData = [
  { title: "Users", value: "14k", change: "+25%", trend: "up" },
  { title: "Conversions", value: "325", change: "-25%", trend: "down" },
  { title: "Event count", value: "200k", change: "+5%", trend: "up" },
]

export function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {overviewData.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <span className={`text-xs ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}>{item.change}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Last 30 days</p>
            {/* Add a placeholder for the chart */}
            <div className="mt-4 h-[50px] bg-gray-100 dark:bg-gray-700" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

