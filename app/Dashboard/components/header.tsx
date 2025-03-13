"use client"

import { UserNav } from "./user-nav"

export function Header() {
  return (
    <header className="flex h-[60px] items-center border-b bg-white px-6">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-[#1a1d1f]">Dashboard</span>
        <span className="text-[#6f767e]">/</span>
        <span className="text-[#6f767e]">Home</span>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <UserNav />
      </div>
    </header>
  )
}

