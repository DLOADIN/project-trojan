"use client"

import { Card } from "../ui/card"
import { LineChart, Line, ResponsiveContainer } from "recharts"


const accidentData = [
  { value: 10 },
  { value: 15 },
  { value: 12 },
  { value: 18 },
  { value: 20 },
  { value: 25 },
  { value: 22 },
  { value: 28 },
  { value: 30 },
  { value: 27 },
  { value: 33 },
  { value: 35 },
  { value: 32 },
  { value: 38 },
  { value: 40 },
  { value: 37 },
  { value: 43 },
  { value: 45 },
  { value: 42 },
  { value: 48 },
  { value: 50 },
  { value: 47 },
  { value: 53 },
  { value: 55 },
  { value: 52 },
  { value: 58 },
  { value: 60 },
  { value: 57 },
  { value: 63 },
  { value: 65 },
]

export function OverviewSection() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="rounded-none border border-[#f1f1f1] bg-white p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#1a1d1f]">Total Accidents</span>
          <span className="text-xs text-[#10b981]">+25%</span>
        </div>
        <div className="mt-1">
          <div className="text-2xl font-semibold text-[#1a1d1f]">325</div>
          <div className="text-xs text-[#6f767e]">Last 30 days</div>
        </div>
        <div className="h-[80px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={accidentData}>
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      {/* Repeat for other cards with similar styling */}
    </div>
  )
}

