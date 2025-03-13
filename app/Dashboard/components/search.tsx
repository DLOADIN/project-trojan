"use client"

import { SearchIcon } from "lucide-react"

export function Search() {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f767e]" />
      <input
        type="search"
        placeholder="Search..."
        className="h-10 w-[280px] rounded-md border border-[#f1f1f1] bg-[#f8f9fa] pl-10 pr-4 text-sm text-[#1a1d1f] placeholder:text-[#6f767e] focus:outline-none focus:ring-1 focus:ring-[#e5e7eb]"
      />
    </div>
  )
}

