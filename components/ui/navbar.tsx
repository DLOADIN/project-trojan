"use client"

import Link from "next/link"

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md">
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-12">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#00D959] rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-50px">A</span>
              </div>
              <span className="text-gray-900 text-lg font-medium">AccidentAI</span>
            </Link>
            <div className="hidden md:flex items-center space-x-10">
              <Link href="#Features" className="text-gray-600 hover:text-gray-800 text-[15px] transition-colors">
                Features
              </Link>
              <Link href="#mission" className="text-gray-600 hover:text-gray-800 text-[15px] transition-colors">
                Mission
              </Link>
              <Link href="#vision" className="text-gray-600 hover:text-gray-800 text-[15px] transition-colors">
                Vision
              </Link>
              <Link href="#faqs" className="text-gray-600 hover:text-gray-800 text-[15px] transition-colors">
                Faqs
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/Login">
              <button className="bg-gray-900 text-white rounded-full px-6 py-2.5 text-[13px]">
                LOGIN
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

