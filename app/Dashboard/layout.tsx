"use client"

import type React from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./components/header"
import { AuthProvider } from '@/context/AuthContext';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex h-screen bg-[#f8f9fa]">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </AuthProvider>
  )
}