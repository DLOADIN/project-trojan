"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

const overviewData = [
  { title: "Users", value: "14k", change: "+25%", trend: "up" },
  { title: "Conversions", value: "325", change: "-25%", trend: "down" },
  { title: "Event count", value: "200k", change: "+5%", trend: "up" },
]

const trendData = [
  { title: "Sessions", value: "13,277", change: "+35%", trend: "up" },
  { title: "Page views and downloads", value: "1.3M", change: "-8%", trend: "down" },
]

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        <Card className="flex items-center gap-4 p-4">
          <div>
            <CardTitle className="text-sm font-medium">Explore your data</CardTitle>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Uncover performance and visitor insights with our data wizardry.
            </p>
          </div>
          <Button className="bg-green-700 hover:bg-green-800">
            Get insights
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {overviewData.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <span className={`text-xs ${item.trend === "up" ? "text-green-700" : "text-red-600"}`}>
                {item.change}
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Last 30 days</p>
              <div className="mt-4 h-[50px] bg-gray-100 dark:bg-gray-700" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {trendData.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="text-base font-medium">{item.title}</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.value}{" "}
                <span className={item.trend === "up" ? "text-green-700" : "text-red-600"}>{item.change}</span>
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] bg-gray-100 dark:bg-gray-700" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

