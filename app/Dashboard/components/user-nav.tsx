"use client"

import { Bell } from "lucide-react"
import Link from "next/link"

const date = new Date();
const TodayDate = date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });

export function UserNav() {
  return (
    <div className="flex items-center gap-4">
      <button className="relative rounded-full p-2 hover:bg-[#f8f9fa]"></button>
      <span className="text-sm text-[#1a1d1f]">{TodayDate}</span>
      <div className="flex items-center space-x-4">
            <Link href="../">
              <button className="bg-gray-900 text-white rounded-full px-6 py-2.5 text-[13px]">
                Sign Out
              </button>
            </Link>
          </div>
    </div>
  )
}

