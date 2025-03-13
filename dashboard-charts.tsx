"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const eventsData = [
  { name: "Jan", total: 234 },
  { name: "Feb", total: 345 },
  { name: "Mar", total: 267 },
  { name: "Apr", total: 456 },
  { name: "May", total: 387 },
  { name: "Jun", total: 524 },
  { name: "Jul", total: 643 },
]

const processingData = [
  { name: "Mon", total: 42 },
  { name: "Tue", total: 38 },
  { name: "Wed", total: 55 },
  { name: "Thu", total: 47 },
  { name: "Fri", total: 63 },
  { name: "Sat", total: 35 },
  { name: "Sun", total: 29 },
]

export function DashboardCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Events Detected</CardTitle>
          <CardDescription>Number of events detected per month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={eventsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#15803d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Processing Time</CardTitle>
          <CardDescription>Video processing time in minutes</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={processingData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#15803d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

