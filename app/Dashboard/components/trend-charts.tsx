"use client"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"

const lineChartData = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 1500 },
  { name: "Mar", total: 1300 },
  { name: "Apr", total: 1800 },
  { name: "May", total: 2000 },
  { name: "Jun", total: 2200 },
  { name: "Jul", total: 2500 },
  { name: "Aug", total: 2300 },
  { name: "Sep", total: 2800 },
  { name: "Oct", total: 3000 },
  { name: "Nov", total: 2700 },
  { name: "Dec", total: 3200 },
]

const barChartData = [
  { name: "Zone A", accidents: 45 },
  { name: "Zone B", accidents: 32 },
  { name: "Zone C", accidents: 28 },
  { name: "Zone D", accidents: 38 },
  { name: "Zone E", accidents: 25 },
  { name: "Zone F", accidents: 35 },
]

export function TrendCharts() {
  const chartConfig: ChartConfig = {
    total: {
      label: "Total Accidents",
      color: "hsl(var(--chart-1))",
    },
    accidents: {
      label: "Accidents",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="rounded-none border border-[#f1f1f1] bg-white">
        <CardHeader>
          <CardTitle>Monthly Accident Trends</CardTitle>
          <CardDescription>Number of accidents per month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <LineChart data={lineChartData}>
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  tickLine={false} 
                  axisLine={false}
                  style={{ fontSize: 12 }} 
                />
                <YAxis
                  stroke="#888888"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                  style={{ fontSize: 12 }}
                />
                <Line type="monotone" dataKey="total" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-none border border-[#f1f1f1] bg-white">
        <CardHeader>
          <CardTitle>Accidents by Zone</CardTitle>
          <CardDescription>Distribution of accidents across zones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <BarChart data={barChartData}>
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  tickLine={false} 
                  axisLine={false}
                  style={{ fontSize: 12 }} 
                />
                <YAxis
                  stroke="#888888"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                  style={{ fontSize: 12 }}
                />
                <Bar dataKey="accidents" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}